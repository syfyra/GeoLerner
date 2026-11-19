#!/usr/bin/env node
/* Prüft alle Fragen, Spickzettel, Skizzen und die Werte-Datei auf formale Fehler.
   Aufruf:  node tools/validate.js  */
'use strict';

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.join(__dirname, '..');
const ctx = { window: {}, console };
ctx.window.window = ctx.window;
vm.createContext(ctx);

function load(rel) {
  const code = fs.readFileSync(path.join(root, rel), 'utf8');
  vm.runInContext('with (window) { ' + code + '\n }', ctx, { filename: rel });
}

['js/geo.js', 'js/werte.js', 'js/diagrams.js', 'js/material.js', 'js/operatoren.js'].forEach(load);
const unitFiles = fs.readdirSync(path.join(root, 'js/units')).filter(f => f.endsWith('.js')).sort();
unitFiles.forEach(f => load('js/units/' + f));

const { GEO, Diagrams, Mat, U } = ctx.window;
const TYPES = ['mc', 'multi', 'tf', 'match', 'cloze', 'order', 'sort', 'type', 'num', 'label', 'tap', 'material', 'explain'];
const PART_TYPES = ['mc', 'multi', 'tf', 'type', 'num'];
const errors = [];
const warnings = [];
const count = {};
let total = 0;

function err(where, msg) { errors.push(where + ': ' + msg); }
function warn(where, msg) { warnings.push(where + ': ' + msg); }
function isStr(s) { return typeof s === 'string' && s.trim().length > 0; }
function isNum(n) { return typeof n === 'number' && isFinite(n); }
function partsOf(d) { return Diagrams.has(d) ? Object.keys(Diagrams.names(d)) : null; }

function checkFig(where, f) {
  if (!f || !Diagrams.has(f.d)) return err(where, 'unbekannte Skizze ' + (f && f.d));
  const svg = Diagrams.render(f.d, f.o || f);
  if (svg.indexOf('<svg') !== 0) err(where, 'Skizze ' + f.d + ' lässt sich nicht zeichnen');
}

function checkMat(where, m) {
  if (!m || Mat.kinds.indexOf(m.kind) < 0) return err(where, 'unbekannte Material-Art');
  if (!isStr(m.title)) err(where, 'Material ohne Titel');
  switch (m.kind) {
    case 'table':
      if (!Array.isArray(m.head) || m.head.length < 2) err(where, 'Tabelle ohne Kopfzeile');
      else if (!Array.isArray(m.rows) || m.rows.length < 2) err(where, 'Tabelle mit zu wenigen Zeilen');
      else m.rows.forEach((r, i) => { if (!Array.isArray(r) || r.length !== m.head.length) err(where, 'Tabellenzeile ' + (i + 1) + ' hat die falsche Spaltenzahl'); });
      break;
    case 'bar':
      if (!Array.isArray(m.data) || m.data.length < 2 || m.data.some(d => !isStr(d[0]) || !isNum(d[1]) || d[1] < 0)) err(where, 'Balkendiagramm: Daten fehlerhaft');
      break;
    case 'line':
      if (!Array.isArray(m.pts) || m.pts.length < 3 || m.pts.some(p => !isNum(p[0]) || !isNum(p[1]))) err(where, 'Liniendiagramm: Punkte fehlerhaft');
      if (!isStr(m.x) || !isStr(m.y)) err(where, 'Liniendiagramm: Achsentitel fehlen');
      break;
    case 'fig':
      checkFig(where, { d: m.d, o: m.o });
      ((m.o && m.o.spots) || []).forEach(s => { if (Diagrams.spots.indexOf(s) < 0) err(where, 'unbekannter Kartenpunkt ' + s); });
      break;
    case 'text':
      if (!isStr(m.text)) err(where, 'Textquelle ohne Text');
      break;
  }
  if (Mat.render(m).indexOf('<div class="mat') !== 0) err(where, 'Material lässt sich nicht darstellen');
}

function checkQ(w, q, inPart) {
  if (!q || typeof q !== 'object') return err(w, 'keine Frage');
  if (TYPES.indexOf(q.t) < 0) return err(w, 'unbekannter Typ ' + q.t);
  if (inPart && PART_TYPES.indexOf(q.t) < 0) return err(w, 'Typ ' + q.t + ' ist als Teilaufgabe nicht erlaubt');
  if (q.fig) checkFig(w, q.fig);
  if (q.mat && q.t !== 'material') checkMat(w, q.mat);
  const needsQ = ['mc', 'multi', 'tf', 'order', 'sort', 'type', 'num', 'tap', 'explain'];
  if (needsQ.indexOf(q.t) >= 0 && !isStr(q.q)) err(w, 'Fragetext fehlt');
  const needsWhy = ['mc', 'multi', 'tf', 'type', 'num', 'label', 'tap'];
  if (needsWhy.indexOf(q.t) >= 0 && !isStr(q.w)) err(w, 'Erklärung (w) fehlt');

  switch (q.t) {
    case 'mc':
      if (!Array.isArray(q.o) || q.o.length < 2) err(w, 'Optionen fehlen');
      else {
        if (!(q.a >= 0 && q.a < q.o.length)) err(w, 'Antwortindex ungültig');
        if (new Set(q.o).size !== q.o.length) err(w, 'doppelte Optionen');
        if (q.o.some(o => !isStr(o))) err(w, 'leere Option');
      }
      break;
    case 'multi':
      if (!Array.isArray(q.o) || q.o.length < 3) err(w, 'Optionen fehlen');
      else if (!Array.isArray(q.a) || !q.a.length || q.a.some(i => !(i >= 0 && i < q.o.length))) err(w, 'Antworten ungültig');
      else if (q.a.length === q.o.length) err(w, 'alle Optionen richtig – sinnlos');
      else if (new Set(q.o).size !== q.o.length) err(w, 'doppelte Optionen');
      break;
    case 'tf':
      if (typeof q.a !== 'boolean') err(w, 'Antwort muss true/false sein');
      break;
    case 'match':
      if (!Array.isArray(q.pairs) || q.pairs.length < 3) err(w, 'zu wenige Paare');
      else {
        if (q.pairs.some(p => !Array.isArray(p) || p.length !== 2 || !isStr(p[0]) || !isStr(p[1]))) err(w, 'Paar fehlerhaft');
        if (new Set(q.pairs.map(p => p[1])).size !== q.pairs.length) err(w, 'doppelte rechte Seite');
        if (new Set(q.pairs.map(p => p[0])).size !== q.pairs.length) err(w, 'doppelte linke Seite');
        if (q.pairs.length > 5) warn(w, 'mehr als 5 Paare – auf dem Handy eng');
      }
      break;
    case 'cloze': {
      if (!isStr(q.text) || !Array.isArray(q.blanks)) { err(w, 'Text oder Lücken fehlen'); break; }
      const used = (q.text.match(/\{(\d)\}/g) || []).map(m => +m[1]);
      if (used.length !== q.blanks.length) err(w, 'Anzahl Lücken passt nicht');
      used.forEach((n, i) => { if (n !== i) err(w, 'Lücken nicht fortlaufend nummeriert'); });
      const words = q.blanks.concat(q.extra || []);
      if (new Set(words).size !== words.length) err(w, 'doppelte Wörter in der Wortbank');
      (q.any || []).forEach(g => g.forEach(i => { if (!(i >= 0 && i < q.blanks.length)) err(w, 'any-Gruppe ungültig'); }));
      break;
    }
    case 'order':
      if (!Array.isArray(q.items) || q.items.length < 3) err(w, 'zu wenige Schritte');
      else if (new Set(q.items).size !== q.items.length) err(w, 'doppelte Schritte');
      break;
    case 'sort':
      if (!Array.isArray(q.buckets) || q.buckets.length < 2 || q.buckets.length > 3) err(w, 'Kategorien ungültig');
      else if (!Array.isArray(q.items) || q.items.length < 4) err(w, 'zu wenige Elemente');
      else {
        if (q.items.some(it => !isStr(it[0]) || !(it[1] >= 0 && it[1] < q.buckets.length))) err(w, 'Element ungültig');
        q.buckets.forEach((b, i) => { if (!q.items.some(it => it[1] === i)) err(w, 'Kategorie „' + b + '“ ist leer'); });
      }
      break;
    case 'type':
      if (!Array.isArray(q.accept) || !q.accept.length || q.accept.some(a => !isStr(a))) err(w, 'accept fehlt');
      break;
    case 'num':
      if (!isNum(q.a)) err(w, 'Zahl (a) fehlt');
      else if (U.num(U.de(q.a)) !== q.a) err(w, 'Zahl lässt sich nicht eindeutig eintippen: ' + q.a);
      if (q.tol != null && !(isNum(q.tol) && q.tol >= 0)) err(w, 'Toleranz ungültig');
      if (q.alt != null && !(Array.isArray(q.alt) && q.alt.every(isNum))) err(w, 'alt muss eine Liste von Zahlen sein');
      break;
    case 'label': {
      const parts = partsOf(q.d);
      if (!parts) { err(w, 'unbekannte Skizze ' + q.d); break; }
      if (parts.indexOf(q.target) < 0) err(w, 'unbekannte Struktur ' + q.target);
      (q.not || []).forEach(k => { if (parts.indexOf(k) < 0) err(w, 'not: unbekannte Struktur ' + k); });
      if (q.o) {
        if (!(q.a >= 0 && q.a < q.o.length)) err(w, 'Antwortindex ungültig');
      } else if (parts.filter(k => k !== q.target && (q.not || []).indexOf(k) < 0).length < 3) err(w, 'zu wenige Strukturen für automatische Optionen');
      break;
    }
    case 'tap': {
      const parts = partsOf(q.d);
      if (!parts) { err(w, 'unbekannte Skizze ' + q.d); break; }
      [].concat(q.target).forEach(t => { if (parts.indexOf(t) < 0) err(w, 'unbekannte Struktur ' + t); });
      break;
    }
    case 'material':
      checkMat(w, q.mat);
      if (!Array.isArray(q.parts) || q.parts.length < 2 || q.parts.length > 4) err(w, 'Material braucht 2 bis 4 Teilaufgaben');
      else q.parts.forEach((p, i) => checkQ(w + ' Teil ' + 'abcd'[i], p, true));
      break;
    case 'explain':
      if (!Array.isArray(q.points) || q.points.length < 3) err(w, 'zu wenige Bewertungspunkte');
      if (!isStr(q.model)) err(w, 'Musterlösung fehlt');
      if (!isStr(q.op)) err(w, 'Operator fehlt');
      else if (!GEO.opTip(q.op)) err(w, 'Operator „' + q.op + '“ steht nicht in js/operatoren.js');
      break;
  }
}

// ---- Werte-Datei
(function () {
  const W = GEO.WERTE, w = 'js/werte.js';
  if (!W || !Array.isArray(W.schalen) || W.schalen.length < 3) return err(w, 'mindestens drei Schalen nötig');
  if (!isStr(W.druckEinheit)) err(w, 'druckEinheit fehlt');
  let prev = null, max = 0;
  W.schalen.forEach(s => {
    ['id', 'name', 'nom', 'gen', 'dat', 'zustand', 'stoff'].forEach(k => { if (!isStr(s[k])) err(w, 'Schale ' + (s.id || '?') + ': Feld ' + k + ' fehlt'); });
    if (s.tiefe != null) {
      if (!Array.isArray(s.tiefe) || s.tiefe.length !== 2 || !isNum(s.tiefe[0]) || !isNum(s.tiefe[1]) || s.tiefe[1] <= s.tiefe[0]) err(w, 'Schale ' + s.id + ': tiefe muss [von, bis] sein');
      else {
        if (prev && prev.tiefe && prev.tiefe[1] !== s.tiefe[0]) err(w, 'Schale ' + s.id + ' beginnt nicht dort, wo ' + prev.id + ' endet');
        max = Math.max(max, s.tiefe[1]);
      }
    }
    prev = s;
  });
  const gleich = [];
  (W.gleichwertig || []).forEach(g => {
    if (!Array.isArray(g) || g.length < 2 || g.some(x => !isNum(x))) err(w, 'gleichwertig: erwartet werden Listen aus Tiefen, z. B. [5000, 5150]');
    else g.forEach(x => gleich.push(x));
  });
  [['temperatur', '°C'], ['druck', W.druckEinheit]].forEach(([key, unit]) => {
    const list = W[key];
    if (list == null) return warn(w, key + ' fehlt – danach wird nicht gefragt');
    if (!Array.isArray(list)) return err(w, key + ' muss eine Liste aus [Tiefe, Wert] sein');
    let last = null;
    list.forEach((p, i) => {
      if (!Array.isArray(p) || p.length !== 2 || !isNum(p[0]) || !isNum(p[1])) return err(w, key + ' Eintrag ' + (i + 1) + ': erwartet wird [Tiefe in km, Wert]');
      if (p[0] < 0 || (max && p[0] > max && gleich.indexOf(p[0]) < 0)) err(w, key + ': Tiefe ' + p[0] + ' km liegt außerhalb der Erde');
      if (last && p[0] <= last[0]) err(w, key + ': Tiefen müssen von oben nach unten sortiert sein (' + p[0] + ' km)');
      if (last && p[1] <= last[1]) warn(w, key + ': Wert in ' + p[0] + ' km Tiefe ist nicht höher als darüber (' + p[1] + ' ' + unit + ')');
      last = p;
    });
    if (new Set(list.map(p => p[1])).size !== list.length) warn(w, key + ': derselbe Wert steht mehrfach – Zuordnungsaufgaben entfallen dann');
  });
  ['ozeanischeKruste', 'kontinentaleKruste'].forEach(k => {
    if (W[k] != null && !(Array.isArray(W[k]) && W[k].length === 2 && isNum(W[k][0]) && isNum(W[k][1]) && W[k][1] > W[k][0])) err(w, k + ' muss [von, bis] oder null sein');
  });
  if (!W.geprueft) warn(w, 'Die Zahlen zum Schalenaufbau sind noch als „ungeprüft“ markiert (geprueft: false)');
})();

// ---- Einheiten
const ids = new Set();
GEO.units.forEach(u => {
  const uw = 'Einheit ' + u.id;
  ['id', 'icon', 'color', 'title', 'blurb'].forEach(k => { if (!isStr(u[k])) err(uw, 'Feld ' + k + ' fehlt'); });
  if (ids.has(u.id)) err(uw, 'Kennung doppelt vergeben');
  ids.add(u.id);
  if (!u.sheet || !isStr(u.sheet.intro) || !Array.isArray(u.sheet.facts) || !u.sheet.facts.length) err(uw, 'Spickzettel unvollständig');
  else {
    u.sheet.facts.forEach((f, i) => { if (!Array.isArray(f) || f.length !== 2 || !isStr(f[0]) || !isStr(f[1])) err(uw, 'Fakt ' + i + ' fehlerhaft'); });
    if (!Array.isArray(u.sheet.merk) || !u.sheet.merk.length) err(uw, 'Merksätze fehlen');
    if (!Array.isArray(u.sheet.figs) || !u.sheet.figs.length) err(uw, 'Spickzettel ohne Skizze');
    (u.sheet.figs || []).forEach(f => checkFig(uw + ' Spickzettel', f));
    if (u.sheet.extra && !isStr(typeof u.sheet.extra === 'function' ? u.sheet.extra() : u.sheet.extra)) err(uw, 'Spickzettel-Zusatz ist leer');
  }
  if (!Array.isArray(u.lessons) || u.lessons.length !== 3) err(uw, 'erwartet werden 3 Lektionen');

  (u.lessons || []).forEach((l, li) => {
    if (!isStr(l.title)) err(uw + '.' + li, 'Lektionstitel fehlt');
    const qs = (l.qs || []).filter(Boolean);
    if (qs.length < 5) err(uw + '.' + li, 'zu wenige Fragen (' + qs.length + ')');
    qs.forEach((q, qi) => {
      total++;
      count[q.t] = (count[q.t] || 0) + 1;
      checkQ(u.id + '.' + li + '.' + qi + ' (' + q.t + ')', q, false);
    });
    if (li === 2) {
      if (!qs.some(q => q.t === 'material')) err(uw + '.' + li, 'KA-Lektion ohne Material-Aufgabe');
      if (!qs.some(q => q.t === 'explain')) err(uw + '.' + li, 'KA-Lektion ohne KA-Aufgabe mit Operator');
    }
  });
});

// ---- Fragen-Töpfe der Arena
let poolTotal = 0;
Object.keys(GEO.pools).forEach(pid => {
  const p = GEO.pools[pid], qs = (p.qs || []).filter(Boolean);
  if (!isStr(p.title)) err('Topf ' + pid, 'Titel fehlt');
  if (qs.length < 5) err('Topf ' + pid, 'zu wenige Fragen (' + qs.length + ')');
  qs.forEach((q, qi) => { poolTotal++; checkQ(pid + '.' + qi + ' (' + q.t + ')', q, false); });
});
['zahlen', 'operatoren'].forEach(pid => { if (!GEO.pools[pid]) err('Arena', 'Topf ' + pid + ' fehlt'); });

// ---- Operatoren
GEO.OPS.forEach(o => {
  if (!isStr(o.op) || !isStr(o.was) || !(o.afb >= 1 && o.afb <= 3) || !Array.isArray(o.imp) || !o.imp.length) err('Operator ' + o.op, 'unvollständig');
});

// ---- Jede Skizze muss sich in allen Varianten zeichnen lassen
Diagrams.all.forEach(d => {
  const parts = partsOf(d);
  [{ legend: true }, { tap: true }, { mark: parts[0] }, { marks: [{ part: parts[0], text: '✓', cls: 'good' }] }].forEach(o => {
    if (Diagrams.render(d, o).indexOf('<svg') !== 0) err('Skizze ' + d, 'lässt sich nicht zeichnen');
  });
  if (Diagrams.legend(d).some(n => !isStr(n))) err('Skizze ' + d, 'Legende unvollständig');
});

// ---- index.html muss alle Einheiten laden
const index = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
unitFiles.forEach(f => { if (index.indexOf('js/units/' + f) < 0) err('index.html', 'Einheit ' + f + ' wird nicht geladen'); });
if (/(src|href)="(\/|https?:)/.test(index)) err('index.html', 'absoluter oder externer Pfad – auf GitHub Pages im Unterordner funktioniert das nicht');

console.log(GEO.units.length + ' Einheiten, ' + GEO.units.reduce((n, u) => n + u.lessons.length, 0) + ' Lektionen, ' + total + ' Fragen im Lernpfad, ' +
  poolTotal + ' weitere in der Arena');
console.log(Object.keys(count).sort().map(k => k + ': ' + count[k]).join(' · '));
if (warnings.length) console.log('\n' + warnings.length + ' Hinweis(e):\n  ' + warnings.join('\n  '));
if (errors.length) {
  console.error('\n' + errors.length + ' Fehler:\n  ' + errors.join('\n  '));
  process.exit(1);
}
console.log('\nAlles in Ordnung.');
