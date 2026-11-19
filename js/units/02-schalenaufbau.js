/* Einheit 2 – Schalenaufbau der Erde
   Alle Fragen mit Zahlen werden aus js/werte.js erzeugt. Dort ändern, nicht hier. */
(function () {
  'use strict';

  var W = GEO.WERTE, S = W.schalen, DE = W.druckEinheit, VOR = !W.geprueft, n = S.length, last = n - 1;
  var de = U.de;

  function has(v) { return v != null; }
  function cap(s) { return s.charAt(0).toUpperCase() + s.slice(1); }
  function rng(a) { return de(a[0]) + '–' + de(a[1]) + ' km'; }
  function uniq(a) { return a.filter(function (v, i) { return a.indexOf(v) === i; }); }
  function flat(list) { return list.filter(Boolean); }
  // richtige Antwort plus bis zu drei andere Werte aus der Tabelle
  function opts(right, all) {
    var rest = uniq(all).filter(function (v) { return v !== right; });
    return [right].concat(rest.slice(0, 3));
  }
  function mark(q) { if (q) q.vorschlag = VOR; return q; }
  function punkte(list) {
    return (list || []).filter(function (p) { return p && has(p[0]) && has(p[1]); }).sort(function (a, b) { return a[0] - b[0]; });
  }

  var TEMP = punkte(W.temperatur), DRUCK = punkte(W.druck);
  var withT = S.filter(function (s) { return s.tiefe && has(s.tiefe[0]) && has(s.tiefe[1]); });
  var ende = withT.length ? withT[withT.length - 1].tiefe[1] : null;      // Erdmittelpunkt

  // Tiefen, die im Buch für dieselbe Grenze stehen (z. B. „ca. 5000 km“ und 5150 km)
  function auch(v) {
    var out = [];
    (W.gleichwertig || []).forEach(function (g) {
      if (g.indexOf(v) >= 0) g.forEach(function (x) { if (x !== v && out.indexOf(x) < 0) out.push(x); });
    });
    return out;
  }
  function gleich(a, b) { return a === b || auch(a).indexOf(b) >= 0; }

  // Wo liegt eine Tiefe? Liefert Bausteine für Fragen, Erklärungen und Tabellen.
  function ort(t) {
    var i;
    if (has(ende) && gleich(t, ende)) return { mitte: true, wo: 'im Erdmittelpunkt', kurz: 'Erdmittelpunkt', satz: '' };
    for (i = 0; i < n; i++) {
      if (S[i].tiefe && gleich(t, S[i].tiefe[1])) {
        return { wo: 'in ' + de(t) + ' km Tiefe, an der Untergrenze ' + S[i].gen, kurz: 'Untergrenze ' + S[i].gen, satz: ' Dort liegt die Untergrenze ' + S[i].gen + '.' };
      }
    }
    for (i = 0; i < n; i++) {
      if (S[i].tiefe && t > S[i].tiefe[0] && t < S[i].tiefe[1]) {
        return { wo: 'in ' + de(t) + ' km Tiefe, also ' + S[i].dat, kurz: S[i].dat, satz: ' Diese Tiefe liegt ' + S[i].dat + '.' };
      }
    }
    return { wo: 'in ' + de(t) + ' km Tiefe', kurz: '', satz: '' };
  }
  function inTiefe(t, o) { return o.mitte ? 'Im Erdmittelpunkt (' + de(t) + ' km Tiefe)' : 'In ' + de(t) + ' km Tiefe'; }

  // ------------------------------------------------ Zahlen-Fragen erzeugen
  var Z = { start: [], end: [], dick: [], mcT: [], numC: [], mcC: [], revC: [], numP: [], mcP: [], revP: [], tf: [], match: {}, extra: [] };

  // ---- Tiefe der Schalen
  S.forEach(function (s, i) {
    if (withT.indexOf(s) < 0) return;
    var von = s.tiefe[0], bis = s.tiefe[1];
    var span = cap(s.nom) + ' reicht von ' + de(von) + ' bis ' + de(bis) + ' km Tiefe.';
    function zusatz(v) { return auch(v).length ? ' Im Buch steht für diese Grenze auch ' + auch(v).map(de).join(' oder ') + ' km – beides zählt.' : ''; }
    if (i > 0) {
      Z.start[i] = mark({ t: 'num', q: 'In welcher Tiefe beginnt ' + s.nom + '?', a: von, alt: auch(von), unit: 'km', w: span + zusatz(von) });
      // Mächtigkeit: bei doppelt angegebenen Grenzen zählt jede Rechnung
      var dicken = [];
      [bis].concat(auch(bis)).forEach(function (b) { [von].concat(auch(von)).forEach(function (a) { dicken.push(b - a); }); });
      Z.dick[i] = mark({ t: 'num', q: 'Wie mächtig (dick) ist ' + s.nom + '?', a: bis - von, alt: uniq(dicken).slice(1), unit: 'km',
        w: 'Rechnung: ' + de(bis) + ' km − ' + de(von) + ' km = ' + de(bis - von) + ' km.' });
    }
    Z.end[i] = mark({ t: 'num', q: i === last ? 'In welcher Tiefe liegt der Erdmittelpunkt?' : 'Bis in welche Tiefe reicht ' + s.nom + '?',
      a: bis, alt: auch(bis), unit: 'km', w: (i === last ? 'Der Erdradius beträgt ' + de(bis) + ' km.' : span) + zusatz(bis) });
    if (withT.length >= 3) {
      Z.mcT[i] = mark({ t: 'mc', q: 'In welchem Tiefenbereich liegt ' + s.nom + '?',
        o: opts(rng(s.tiefe), withT.map(function (x) { return rng(x.tiefe); })), a: 0, w: span });
    }
    // richtig/falsch: abwechselnd eine wahre und eine vertauschte Aussage
    if (i > 0) {
      var other = withT.filter(function (x) { return x !== s && x.tiefe[0] !== von && x.tiefe[0] > 0; })[0];
      var wahr = i % 2 === 1 || !other;
      Z.tf[i] = mark({ t: 'tf', q: cap(s.nom) + ' beginnt in ' + de(wahr ? von : other.tiefe[0]) + ' km Tiefe.', a: wahr,
        w: cap(s.nom) + ' beginnt in ' + de(von) + ' km Tiefe.' });
    }
  });

  // ---- Temperatur und Druck: ein Wert pro Tiefe, wie in der Spalte im Buch
  function messwerte(list, einheit, num, mc, rev, frage, frageMitte, verb, umgekehrt) {
    var alle = list.map(function (p) { return 'etwa ' + de(p[1]) + ' ' + einheit; });
    list.forEach(function (p, j) {
      var t = p[0], v = p[1], o = ort(t);
      var w = inTiefe(t, o) + ' ' + verb + ' etwa ' + de(v) + ' ' + einheit + '.' + o.satz;
      var q = o.mitte ? frageMitte : frage + ' ungefähr ' + o.wo + '?';
      num[j] = mark({ t: 'num', q: q, a: v, unit: einheit, w: w });
      if (list.length >= 3) mc[j] = mark({ t: 'mc', q: q, o: opts('etwa ' + de(v) + ' ' + einheit, alle), a: 0, w: w });
      rev[j] = mark({ t: 'num', q: umgekehrt + ' etwa ' + de(v) + ' ' + einheit + '?', a: t, alt: auch(t), unit: 'km', w: w });
    });
  }
  messwerte(TEMP, '°C', Z.numC, Z.mcC, Z.revC, 'Welche Temperatur herrscht', 'Wie heiß ist es ungefähr im Erdmittelpunkt?', 'herrschen', 'In welcher Tiefe herrschen');
  messwerte(DRUCK, DE, Z.numP, Z.mcP, Z.revP, 'Wie hoch ist der Druck', 'Wie hoch ist der Druck ungefähr im Erdmittelpunkt?', 'beträgt der Druck', 'In welcher Tiefe beträgt der Druck');

  function paare(p) { return p.length >= 3 && uniq(p.map(function (x) { return x[1]; })).length === p.length ? p : null; }
  var pT = paare(withT.map(function (s) { return [cap(s.name), rng(s.tiefe)]; }));
  var pC = paare(TEMP.map(function (p) { return [de(p[0]) + ' km Tiefe', 'etwa ' + de(p[1]) + ' °C']; }));
  var pP = paare(DRUCK.map(function (p) { return [de(p[0]) + ' km Tiefe', 'etwa ' + de(p[1]) + ' ' + DE]; }));
  if (pT) Z.match.tiefe = mark({ t: 'match', q: 'Ordne jeder Schale ihren Tiefenbereich zu.', pairs: pT });
  if (pC) Z.match.temp = mark({ t: 'match', q: 'Welche Temperatur herrscht in welcher Tiefe?', pairs: pC });
  if (pP) Z.match.druck = mark({ t: 'match', q: 'Welcher Druck herrscht in welcher Tiefe?', pairs: pP });

  var oz = W.ozeanischeKruste, ko = W.kontinentaleKruste;
  if (oz && ko) {
    var krOpts = uniq([rng(oz), rng(ko)].concat(withT.length > 2 ? ['rund ' + de(withT[1].tiefe[1]) + ' km', 'rund ' + de(withT[2].tiefe[1]) + ' km'] : []));
    Z.extra.push(mark({ t: 'mc', q: 'Wie mächtig ist die ozeanische Erdkruste im Mittel?', o: krOpts, a: 0,
      w: 'Die ozeanische Erdkruste ist mit ' + rng(oz) + ' viel dünner als die kontinentale (' + rng(ko) + ').' }));
    Z.extra.push(mark({ t: 'mc', q: 'Wie mächtig ist die kontinentale Erdkruste im Mittel?', o: [krOpts[1], krOpts[0]].concat(krOpts.slice(2)), a: 0,
      w: 'Die kontinentale Erdkruste ist im Mittel ' + rng(ko) + ' mächtig – unter Gebirgen noch mehr.' }));
  }

  var ALLE = flat([Z.match.tiefe, Z.match.temp, Z.match.druck]).concat(flat(Z.start), flat(Z.end), flat(Z.numC), flat(Z.numP), flat(Z.revC), flat(Z.revP),
    flat(Z.mcT), flat(Z.mcC), flat(Z.mcP), flat(Z.dick), flat(Z.tf), Z.extra);

  GEO.pool('zahlen', { title: 'Zahlen-Drill', icon: '🔢', color: '#9DD4F1', unit: 'schalen', qs: ALLE });

  // Lektion 2: eine feste Auswahl quer durch Tiefe, Temperatur und Druck
  var midC = Math.floor((TEMP.length - 1) / 2);
  var L2 = uniq(flat([Z.match.tiefe, Z.start[last - 1], Z.start[last], Z.end[last], Z.match.temp, Z.numC[TEMP.length - 1], Z.numC[midC],
    Z.match.druck, Z.numP[DRUCK.length - 1], Z.numP[0], Z.tf[2] || Z.tf[1]]));

  // ------------------------------------------------ Tabellen für Spickzettel und Material
  // Tiefen aus Temperatur und Druck zusammenführen; doppelt angegebene Grenzen bilden eine Zeile
  var ZEILEN = [];
  uniq(TEMP.concat(DRUCK).map(function (p) { return p[0]; })).sort(function (a, b) { return a - b; }).forEach(function (t) {
    var z = ZEILEN.filter(function (x) { return gleich(x.tiefen[0], t); })[0];
    if (!z) { z = { tiefen: [], temp: null, druck: null }; ZEILEN.push(z); }
    z.tiefen.push(t);
    TEMP.forEach(function (p) { if (p[0] === t) z.temp = p[1]; });
    DRUCK.forEach(function (p) { if (p[0] === t) z.druck = p[1]; });
  });
  function zeilenKopf(z) { return z.tiefen.map(de).join(' / ') + '<small>' + ort(z.tiefen[0]).kurz + '</small>'; }
  function fuss() {
    return (W.gleichwertig || []).map(function (g) { return 'Die Angaben ' + g.map(de).join(' und ') + ' km stehen im Buch für dieselbe Grenze.'; });
  }

  function hinweis() {
    return VOR ? '<p class="werte-warn">⚠️ <b>Vorschlagswerte.</b> Die Zahlen unterscheiden sich je nach Schulbuch. Gleiche sie mit deinem Heft ab und ändere sie in <code>js/werte.js</code>.</p>' : '';
  }
  function tabelle() {
    var h = '<div class="mat mat-table"><div class="mat-h"><span class="mat-tag">Zahlen</span><strong>Die Schalen und ihre Tiefe</strong></div>' +
      '<div class="mat-scroll"><table class="mat-table"><thead><tr><th>Schale und Zustand</th><th>Tiefe (km)</th><th>Material</th></tr></thead><tbody>';
    S.forEach(function (s) {
      h += '<tr><th>' + cap(s.name) + '<small>' + s.zustand + '</small></th><td class="nw">' + (s.tiefe ? de(s.tiefe[0]) + '–' + de(s.tiefe[1]) : '–') +
        '</td><td>' + s.stoff + '</td></tr>';
    });
    h += '</tbody></table></div>' + (oz && ko ? '<small class="mat-src">Mittlere Mächtigkeit: ozeanische Erdkruste ' + rng(oz) + ', kontinentale Erdkruste ' + rng(ko) + '</small>' : '') + '</div>';
    if (ZEILEN.length) {
      h += '<div class="mat mat-table"><div class="mat-h"><span class="mat-tag">Zahlen</span><strong>Temperatur und Druck in der Tiefe</strong></div>' +
        '<div class="mat-scroll"><table class="mat-table"><thead><tr><th>Tiefe (km)</th><th>Temperatur (°C)</th><th>Druck (' + DE + ')</th></tr></thead><tbody>';
      ZEILEN.forEach(function (z) {
        h += '<tr><th>' + zeilenKopf(z) + '</th><td class="nw">' + (has(z.temp) ? de(z.temp) : '–') + '</td><td class="nw">' + (has(z.druck) ? de(z.druck) : '–') + '</td></tr>';
      });
      h += '</tbody></table></div><small class="mat-src">' + fuss().concat(W.quelle ? ['Quelle: ' + W.quelle] : []).join(' · ') + '</small></div>';
    }
    return hinweis() + h;
  }
  GEO.werteTabelle = tabelle;

  function steigend(list) { return list.every(function (p, j) { return j === 0 || p[1] > list[j - 1][1]; }); }
  var quelle = VOR ? 'Vorschlagswerte, mit dem Heft abgleichen' : (W.quelle ? 'nach: ' + W.quelle : '');

  // Material 1: Tabelle mit Temperatur und Druck
  var T0 = TEMP[0], TN = TEMP[TEMP.length - 1], D0 = DRUCK[0], D1 = DRUCK[1];
  var matTab = TEMP.length >= 3 && DRUCK.length >= 2 && steigend(TEMP) && steigend(DRUCK) && mark({
    t: 'material',
    mat: { kind: 'table', title: 'M1: Temperatur und Druck im Erdinneren', head: ['Tiefe in km', 'Temperatur in °C', 'Druck in ' + DE],
      rows: ZEILEN.map(function (z) { return [zeilenKopf(z), has(z.temp) ? z.temp : '–', has(z.druck) ? z.druck : '–']; }), src: quelle },
    parts: [
      { t: 'num', q: 'Um wie viel Grad steigt die Temperatur zwischen ' + de(T0[0]) + ' km und ' + de(TN[0]) + ' km Tiefe?', a: TN[1] - T0[1], unit: '°C',
        w: de(TN[1]) + ' °C − ' + de(T0[1]) + ' °C = ' + de(TN[1] - T0[1]) + ' °C.' },
      { t: 'num', q: 'Um wie viel ' + DE + ' steigt der Druck zwischen ' + de(D0[0]) + ' km und ' + de(D1[0]) + ' km Tiefe?', a: D1[1] - D0[1], unit: DE,
        w: de(D1[1]) + ' ' + DE + ' − ' + de(D0[1]) + ' ' + DE + ' = ' + de(D1[1] - D0[1]) + ' ' + DE + '.' },
      { t: 'mc', q: 'Welche Gesamtaussage lässt sich aus der Tabelle ableiten?',
        o: ['Temperatur und Druck nehmen mit der Tiefe zu', 'Die Temperatur nimmt mit der Tiefe ab', 'Der Druck ist in jeder Tiefe gleich', 'Im Erdkern ist es kälter als im Erdmantel'], a: 0,
        w: 'Von Zeile zu Zeile steigen beide Werte. Das ist die Gesamtaussage der Tabelle.' }
    ]
  });

  // Material 2: Liniendiagramm der Temperatur
  var seg = TEMP.slice(1).map(function (p, j) { return { von: TEMP[j][0], bis: p[0], d: p[1] - TEMP[j][1] }; });
  var flach = seg.slice().sort(function (a, b) { return a.d - b.d; });
  var eindeutig = flach.length >= 3 && flach[0].d < flach[1].d;
  // am flachsten ist die Kurve dort, wo die Temperatur pro Kilometer am wenigsten steigt
  var flachste = seg.slice().sort(function (a, b) { return a.d / (a.bis - a.von) - b.d / (b.bis - b.von); })[0];
  function bereich(s) { return 'zwischen ' + de(s.von) + ' und ' + de(s.bis) + ' km'; }
  var matLinie = TEMP.length >= 4 && steigend(TEMP) && eindeutig && mark({
    t: 'material',
    mat: { kind: 'line', title: 'M2: Temperatur im Erdinneren', x: 'Tiefe in km', y: 'Temperatur in °C', pts: TEMP, src: quelle },
    parts: [
      { t: 'mc', q: 'Beschreibe den Verlauf: Wie verändert sich die Temperatur mit zunehmender Tiefe?',
        o: ['Sie steigt bis zum Erdmittelpunkt immer weiter an', 'Sie steigt erst und fällt im Erdkern wieder', 'Sie bleibt ab dem Erdmantel gleich', 'Sie sinkt mit der Tiefe'], a: 0,
        w: 'Die Kurve steigt durchgehend – im Erdmittelpunkt ist es am heißesten.' },
      { t: 'num', q: 'Lies ab: Welche Temperatur herrscht in ' + de(TEMP[midC][0]) + ' km Tiefe?', a: TEMP[midC][1], unit: '°C',
        w: inTiefe(TEMP[midC][0], ort(TEMP[midC][0])) + ' herrschen etwa ' + de(TEMP[midC][1]) + ' °C.' + ort(TEMP[midC][0]).satz },
      { t: 'mc', q: 'In welchem Tiefenbereich steigt die Temperatur am wenigsten?',
        o: opts(bereich(flach[0]), seg.map(bereich)), a: 0,
        w: cap(bereich(flach[0])) + ' steigt sie nur um ' + de(flach[0].d) + ' °C.' + (flachste === flach[0] ? ' Dort verläuft die Kurve am flachsten.' : '') }
    ]
  });

  var aufbauPunkte = S.map(function (s) { return cap(s.name) + (s.tiefe ? ': ' + rng(s.tiefe) : '') + ', ' + s.zustand; });
  var aufbauText = S.map(function (s, i) {
    return (i === 0 ? 'Ganz außen liegt ' : i === last ? 'Im Zentrum liegt ' : 'Darunter folgt ') + s.nom +
      (s.tiefe ? ' (' + rng(s.tiefe) + ')' : '') + '. ' + (s.nom.indexOf('die') === 0 ? 'Sie' : 'Er') +
      ' ist ' + s.zustand + '. Material: ' + s.stoff + '.';
  }).join(' ') + ' Temperatur und Druck nehmen von außen nach innen zu' +
    (TEMP.length >= 2 ? ': die Temperatur von etwa ' + de(T0[1]) + ' °C in ' + de(T0[0]) + ' km Tiefe auf etwa ' + de(TN[1]) + ' °C ' + ort(TN[0]).wo : '') +
    (DRUCK.length ? ', der Druck auf etwa ' + de(DRUCK[DRUCK.length - 1][1]) + ' ' + DE : '') + '.';

  // Grenzen mit eigenem Namen
  var kern = S.filter(function (s) { return s.id === 'akern'; })[0];
  var kernTiefe = kern && kern.tiefe ? de(kern.tiefe[0]) : null;

  // ---------------------------------------------------------------- Einheit
  GEO.unit({
    id: 'schalen', icon: '🌍', color: '#9DD4F1',
    title: 'Schalenaufbau der Erde',
    blurb: 'Kruste, Mantel, Kern – mit Tiefe, Temperatur und Druck',
    sheet: {
      intro: 'Die Erde ist aufgebaut wie ein Pfirsich: dünne Haut (Kruste), dickes Fruchtfleisch (Mantel), Kern in der Mitte. Je tiefer, desto heißer und desto höher der Druck.',
      facts: flat([
        ['Erdkruste', 'Die dünne, feste äußere Schale.'],
        ['Kontinentale Erdkruste', (ko ? 'Im Mittel ' + rng(ko) + ' mächtig, unter Gebirgen bis zu 80 km. ' : '') + 'Leichter (mittlere Dichte 2,7 g/cm³). Enthält vor allem Silicium und Aluminium, kurz SiAl. Typisches Gestein: Granit.'],
        ['Ozeanische Erdkruste', (oz ? 'Im Mittel nur ' + rng(oz) + ' mächtig. ' : '') + 'Schwerer (mittlere Dichte 3 g/cm³). Enthält vor allem Silicium und Magnesium, kurz SiMa. Typisches Gestein: Basalt.'],
        ['Moho-Grenze', 'Die Grenze zwischen Erdkruste und Erdmantel.'],
        ['Erdmantel', 'Die mächtigste Schale aus schwerem Gestein. Man unterscheidet den oberen und den unteren Erdmantel.'],
        ['Lithosphäre', 'Die starre Gesteinshülle: Erdkruste plus oberster, fester Teil des Erdmantels. Sie ist in Platten zerbrochen.'],
        ['Asthenosphäre', 'Die verformbare (zähplastische) Zone im oberen Erdmantel direkt unter der Lithosphäre. Auf ihr bewegen sich die Platten.'],
        kernTiefe ? ['Wiechert-Gutenberg-Grenze', 'Die Grenze zwischen Erdmantel und Erdkern in ' + kernTiefe + ' km Tiefe.'] : null,
        ['Äußerer Erdkern', 'Flüssig, aus Eisen und Nickel.'],
        ['Innerer Erdkern', 'Fest, aus Eisen und Nickel – obwohl er am heißesten ist. Der enorme Druck verhindert das Schmelzen.'],
        ['Woher weiß man das?', 'Die tiefste Bohrung (Halbinsel Kola) reicht nur rund 12 km tief. Den Aufbau kennt man aus Erdbebenwellen: An der Moho-Grenze und an der Wiechert-Gutenberg-Grenze ändern sie Tempo und Richtung.']
      ]),
      merk: [
        'Reihenfolge von außen nach innen: Erdkruste – oberer Erdmantel – unterer Erdmantel – äußerer Erdkern – innerer Erdkern.',
        'Temperatur, Druck und Dichte nehmen mit der Tiefe zu.',
        'Nur der äußere Erdkern ist flüssig. Der innere ist fest – wegen des Drucks.',
        'Zahlen lernst du am besten als Paare: Tiefe und Wert gehören zusammen.'
      ],
      extra: tabelle,
      figs: [{ d: 'schalen', cap: 'Schnitt durch die Erde (nicht maßstabsgetreu: Die Kruste ist in Wirklichkeit viel dünner)' }]
    },
    lessons: [
      {
        title: 'Die Schalen im Überblick',
        qs: [
          { t: 'order', q: 'Ordne die Schalen von außen nach innen.', items: S.map(function (s) { return cap(s.name); }) },
          { t: 'label', d: 'schalen', target: 'akern', w: 'Der äußere Erdkern liegt zwischen Erdmantel und innerem Erdkern. Er ist flüssig.' },
          { t: 'mc', q: 'Welche Schale der Erde ist flüssig?', o: ['Der äußere Erdkern', 'Der innere Erdkern', 'Die Erdkruste', 'Der untere Erdmantel'], a: 0,
            w: 'Nur der äußere Erdkern ist flüssig. Der Erdmantel ist fest, auch wenn er sich sehr langsam verformen kann.' },
          { t: 'tf', q: 'Der innere Erdkern ist flüssig, weil es dort am heißesten ist.', a: false,
            w: 'Er ist fest. Der Druck ist dort so hoch, dass das Material trotz der Hitze nicht schmelzen kann.' },
          { t: 'match', q: 'Was passt zu welcher Schale?',
            pairs: [['Erdkruste', 'fest, leichtes Gestein wie Granit und Basalt'], ['Erdmantel', 'schweres Gestein, mächtigste Schale'],
              ['Äußerer Erdkern', 'flüssiges Eisen und Nickel'], ['Innerer Erdkern', 'festes Eisen und Nickel']] },
          { t: 'tap', d: 'schalen', target: 'umantel', q: 'Tippe auf den unteren Erdmantel.', w: 'Der untere Erdmantel ist die dicke Schale direkt über dem äußeren Erdkern.' },
          { t: 'type', q: 'Wie heißt die verformbare Zone im oberen Erdmantel, auf der sich die Platten bewegen?', accept: ['Asthenosphäre', 'Asthenosphaere', 'Astenosphäre'],
            w: 'Die Asthenosphäre liegt direkt unter der starren Lithosphäre.' },
          { t: 'cloze', text: 'Die {0} besteht aus der Erdkruste und dem obersten, festen Teil des Erdmantels. Sie ist in {1} zerbrochen, die sich auf der {2} bewegen.',
            blanks: ['Lithosphäre', 'Platten', 'Asthenosphäre'], extra: ['Atmosphäre', 'Schichten', 'Erdkruste'] },
          { t: 'sort', q: 'Kontinentale oder ozeanische Erdkruste?', buckets: ['kontinentale Kruste', 'ozeanische Kruste'],
            items: [['mächtiger (dicker)', 0], ['kurz: SiAl', 0], ['leichter (geringere Dichte)', 0], ['typisches Gestein: Granit', 0],
              ['dünner', 1], ['kurz: SiMa', 1], ['schwerer (höhere Dichte)', 1], ['typisches Gestein: Basalt', 1]] },
          { t: 'match', q: 'Ordne die Grenzen und Zonen zu.',
            pairs: [['Moho-Grenze', 'zwischen Erdkruste und Erdmantel'], ['Wiechert-Gutenberg-Grenze', 'zwischen Erdmantel und Erdkern'],
              ['Lithosphäre', 'starre Gesteinshülle'], ['Asthenosphäre', 'verformbare Zone im oberen Erdmantel']] }
        ]
      },
      {
        title: 'Tiefe, Temperatur, Druck',
        qs: L2
      },
      {
        title: 'Schalenaufbau auf KA-Niveau',
        qs: [
          matTab,
          { t: 'mc', q: 'Der innere Erdkern ist heißer als der äußere – trotzdem ist er fest. Warum?',
            o: ['Der enorme Druck presst das Material so stark zusammen, dass es nicht schmelzen kann', 'Er besteht aus einem anderen Stoff, der nie schmilzt',
              'Dort ist es in Wirklichkeit kälter', 'Er wird vom Erdmantel gekühlt'], a: 0,
            w: 'Mit dem Druck steigt die Schmelztemperatur. Im inneren Kern reicht selbst die größte Hitze nicht zum Schmelzen.' },
          matLinie,
          { t: 'mc', q: 'Die tiefste Bohrung der Welt reicht nur rund 12 km tief. Woher kennt man trotzdem den Aufbau des Erdinneren?',
            o: ['Aus Erdbebenwellen, die an den Grenzen der Schalen Tempo und Richtung ändern', 'Aus Fotos von Satelliten', 'Aus Lava, die direkt aus dem Erdkern stammt', 'Aus Bohrungen am Meeresboden bis zum Kern'], a: 0,
            w: 'Erdbebenwellen durchleuchten die Erde wie ein Röntgengerät. An Grenzen wie der Moho-Grenze und der Wiechert-Gutenberg-Grenze werden sie gebrochen und reflektiert.' },
          { t: 'tf', q: 'Mit den tiefsten Bohrungen hat der Mensch bereits den Erdmantel erreicht.', a: false,
            w: 'Rund 12 km – das ist nicht einmal die halbe Mächtigkeit der kontinentalen Erdkruste.' },
          { t: 'explain', op: 'Erkläre', q: 'Erkläre, warum der innere Erdkern fest ist, obwohl dort die höchsten Temperaturen herrschen.',
            points: ['Temperatur und Druck nehmen mit der Tiefe zu', 'Im äußeren Kern reicht die Hitze zum Schmelzen: Er ist flüssig',
              'Im inneren Kern ist der Druck noch viel höher', 'Hoher Druck presst die Teilchen zusammen und verhindert das Schmelzen', 'Deshalb bleibt der innere Kern trotz größter Hitze fest'],
            model: 'Mit zunehmender Tiefe steigen Temperatur und Druck. Im äußeren Erdkern ist es so heiß, dass Eisen und Nickel geschmolzen sind. Im inneren Erdkern ist es zwar noch heißer, aber auch der Druck ist dort am höchsten. Er presst die Teilchen so stark zusammen, dass das Material nicht schmelzen kann. Deshalb ist der innere Erdkern fest.',
            tip: 'Immer beide Größen nennen: Temperatur UND Druck.' },
          mark({ t: 'explain', op: 'Beschreibe', q: 'Beschreibe den Schalenaufbau der Erde von außen nach innen. Nenne zu jeder Schale Tiefe und Zustand.', fig: { d: 'schalen' },
            points: aufbauPunkte, model: aufbauText, tip: 'Von außen nach innen vorgehen und nichts auslassen. Zahlen bringen Punkte.' })
        ]
      }
    ]
  });
})();
