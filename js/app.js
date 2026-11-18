/* GeoLerner – App: Lernpfad, Arena, Profil und die Spielrunden */
(function () {
  'use strict';

  var el = U.el, $ = U.$, $$ = U.$$, shuffle = U.shuffle;

  // ------------------------------------------------------------- Index
  var ALL = [], LESSONS = [], EXTRA = [], BYID = {};
  var LEVELS = ['Grundlagen', 'Vertiefung', 'KA-Niveau'];
  GEO.units.forEach(function (u, ui) {
    u.no = ui + 1;
    u.lessons.forEach(function (l, li) {
      l.id = u.id + '.' + li;
      l.unit = u;
      l.no = li + 1;
      l.level = LEVELS[li] || '';
      l.items = l.qs.filter(Boolean).map(function (q, qi) {
        var it = { q: q, id: l.id + '.' + qi, unit: u, lesson: l };
        ALL.push(it);
        BYID[it.id] = it;
        return it;
      });
      LESSONS.push(l);
    });
  });
  // Fragen-Töpfe der Arena (Zahlen-Drill, Operatoren-Trainer)
  Object.keys(GEO.pools).forEach(function (pid) {
    var p = GEO.pools[pid];
    var pu = (p.unit && unitById(p.unit)) || { id: pid, title: p.title, icon: p.icon, color: p.color, pseudo: true };
    p.items = p.qs.filter(Boolean).map(function (q, qi) {
      var it = { q: q, id: pid + '.' + qi, unit: pu, pool: p };
      EXTRA.push(it);
      BYID[it.id] = it;
      return it;
    });
  });
  function lessonById(id) { return LESSONS.filter(function (l) { return l.id === id; })[0]; }
  function unitById(id) { return GEO.units.filter(function (u) { return u.id === id; })[0]; }
  function itemById(id) { return BYID[id]; }
  function openMistakes() { return Store.mistakeIds().filter(itemById); }

  var BADGES = [
    { id: 'first', ico: '🌱', n: 'Erster Ausbruch', d: 'Erste Lektion abgeschlossen' },
    { id: 'perfect', ico: '💎', n: 'Fehlerfrei', d: 'Eine Lektion ohne Fehler' },
    { id: 'combo10', ico: '⛓️', n: 'Kettenreaktion', d: '10 richtige Antworten in Folge' },
    { id: 'streak3', ico: '🔥', n: 'Dauerbrenner', d: '3 Tage in Folge gelernt' },
    { id: 'xp100', ico: '⚡', n: 'Hochdruck', d: '100 XP an einem Tag' },
    { id: 'half', ico: '⛰️', n: 'Halbe Höhe', d: 'Die Hälfte aller Lektionen geschafft' },
    { id: 'all', ico: '🏆', n: 'Geo-Profi', d: 'Alle Lektionen abgeschlossen' },
    { id: 'stars', ico: '🌟', n: 'Sternensammler', d: 'Überall drei Sterne' },
    { id: 'boss', ico: '⚔️', n: 'Boss-Bezwinger', d: 'KA-Simulation bestanden' },
    { id: 'boss1', ico: '👑', n: 'Einser-Kandidat', d: 'KA-Simulation mit Note 1' },
    { id: 'blitz', ico: '🌩️', n: 'Blitzbirne', d: '200 Punkte in der Blitzrunde' },
    { id: 'clean', ico: '🧹', n: 'Aufgeräumt', d: 'Fehler-Training komplett geleert' },
    { id: 'zahlen', ico: '🔢', n: 'Zahlenfest', d: 'Zahlen-Drill ohne Fehler' },
    { id: 'material', ico: '🗺️', n: 'Kartenleser', d: 'Material-Training ohne Fehler' },
    { id: 'ops', ico: '🧰', n: 'Operator-Profi', d: 'Operatoren-Trainer ohne Fehler' },
    { id: 'night', ico: '🌙', n: 'Nachtschicht', d: 'Nach 22 Uhr gelernt' },
    { id: 'sheets', ico: '📄', n: 'Spicker', d: 'Alle Spickzettel gelesen' }
  ];

  var tab = 'path';

  // ------------------------------------------------------------ Helfer
  function fmt(s) { s = Math.max(0, s); var m = Math.floor(s / 60), r = s % 60; return m + ':' + (r < 10 ? '0' : '') + r; }
  function grade(p) { return p >= 0.9 ? 1 : p >= 0.75 ? 2 : p >= 0.6 ? 3 : p >= 0.45 ? 4 : p >= 0.2 ? 5 : 6; }
  function starStr(n) {
    var s = '';
    for (var i = 0; i < 3; i++) s += '<i class="' + (i < n ? 'on' : '') + '">★</i>';
    return '<span class="stars" aria-label="' + n + ' von 3 Sternen">' + s + '</span>';
  }
  function progress() {
    var stars = 0, done = 0;
    LESSONS.forEach(function (l) { var r = Store.lesson(l.id); if (r) { done++; stars += r.stars; } });
    // KA-Bereitschaft: drei Viertel aus den Sternen, ein Viertel aus dem besten Boss-Fight
    var sp = stars / (LESSONS.length * 3), bp = Store.s.boss.best || 0;
    return { stars: stars, max: LESSONS.length * 3, done: done, total: LESSONS.length, pct: Math.round((sp * 0.75 + bp * 0.25) * 100) };
  }
  function nextLesson() {
    for (var i = 0; i < LESSONS.length; i++) if (!Store.lesson(LESSONS[i].id)) return LESSONS[i];
    return null;
  }
  function kaInfo() {
    var d = Store.dayDiff(Store.today(), GEO.KA.date);
    if (d > 1) return { d: d, t: 'Noch ' + d + ' Tage bis zur KA', cls: '' };
    if (d === 1) return { d: d, t: 'Morgen ist KA', cls: 'hot' };
    if (d === 0) return { d: d, t: 'Heute ist KA – viel Erfolg!', cls: 'hot' };
    return { d: d, t: 'KA geschrieben', cls: 'done' };
  }
  function greet() {
    var ka = kaInfo(), h = new Date().getHours();
    if (!Store.s.seenIntro && Store.s.xp === 0) return { mood: 'happy', line: Magmus.say('hello') };
    if (ka.d === 0) return { mood: 'cool', line: Magmus.say('kaToday') };
    if (ka.d === 1) return { mood: 'smug', line: Magmus.say('kaTomorrow') };
    if (h >= 22 || h < 5) return { mood: 'sleep', line: Magmus.say('night') };
    if (Store.streak() > 0 && !Store.doneToday()) return { mood: 'roast', line: Magmus.say('streakWait') };
    if (ka.d > 1 && ka.d <= 10) return { mood: 'think', line: Magmus.say('kaSoon') };
    if (ka.d < 0 && ka.d >= -7) return { mood: 'cheer', line: Magmus.say('kaOver') };
    return { mood: 'happy', line: Magmus.say('idle') };
  }
  function solution(q) {
    var names;
    switch (q.t) {
      case 'mc': return q.o[q.a];
      case 'tf': return q.a ? 'Richtig' : 'Falsch';
      case 'multi': return q.a.map(function (i) { return q.o[i]; }).join(' · ');
      case 'type': return q.accept[0];
      case 'num': return U.de(q.a) + (q.unit ? ' ' + q.unit : '');
      case 'material': return q.parts.map(function (p, i) { return 'abcdef'.charAt(i) + ') ' + solution(p); }).join('<br>');
      case 'cloze': return q.text.replace(/\{(\d)\}/g, function (m, k) { return '<b>' + q.blanks[k] + '</b>'; });
      case 'order': return q.items.join(' → ');
      case 'match': return q.pairs.map(function (p) { return p[0] + ' → ' + p[1]; }).join('<br>');
      case 'sort': return q.items.map(function (it) { return it[0] + ' → ' + q.buckets[it[1]]; }).join('<br>');
      case 'label': names = Diagrams.names(q.d); return q.o ? q.o[q.a] : names[q.target];
      case 'tap': names = Diagrams.names(q.d); return names[[].concat(q.target)[0]];
      case 'explain': return q.model;
    }
    return '';
  }

  // --------------------------------------------------------- Grundgerüst
  function tabBtn(id, ico, label) {
    return '<button class="tab" data-act="tab" data-tab="' + id + '"><span class="tab-i">' + ico + '</span><span>' + label + '</span></button>';
  }
  function shell() {
    $('#app').innerHTML =
      '<header class="top"><div class="wrap top-in">' +
      '<button class="brand" data-act="tab" data-tab="path" aria-label="Zum Lernpfad">' + Magmus.svg('happy', 42) +
      '<span class="brand-t">Geo<b>Lerner</b></span></button>' +
      '<div class="stats"><span class="stat" id="st-streak"></span><span class="stat" id="st-xp"></span></div>' +
      '</div></header>' +
      '<main class="wrap view" id="view"></main>' +
      '<nav class="tabs" aria-label="Bereiche"><div class="wrap tabs-in">' +
      tabBtn('path', '🧭', 'Lernpfad') + tabBtn('arena', '⚔️', 'Arena') + tabBtn('profile', '📊', 'Profil') +
      '</div></nav>';
  }
  function updateTop() {
    var s = Store.streak();
    $('#st-streak').innerHTML = '<span aria-hidden="true">🔥</span> ' + s;
    $('#st-streak').className = 'stat' + (Store.doneToday() ? ' on' : '');
    $('#st-streak').title = 'Streak: ' + s + (s === 1 ? ' Tag' : ' Tage') + ' in Folge';
    $('#st-xp').innerHTML = '<span aria-hidden="true">⚡</span> ' + Store.s.xp + ' XP';
    $$('.tab').forEach(function (b) { b.classList.toggle('on', b.dataset.tab === tab); });
  }
  function render() {
    var v = $('#view');
    v.innerHTML = tab === 'arena' ? viewArena() : tab === 'profile' ? viewProfile() : viewPath();
    v.className = 'wrap view view-' + tab;
    updateTop();
  }

  // ------------------------------------------------------------ Lernpfad
  function viewPath() {
    var g = greet(), ka = kaInfo(), p = progress(), nx = nextLesson();
    var h = '<section class="hero card">' +
      '<button class="hero-mag" data-act="poke" aria-label="Magmus anstupsen">' + Magmus.svg(g.mood, 112) + '</button>' +
      '<div class="hero-txt"><p class="bubble">' + g.line + '</p>' +
      '<div class="pills"><span class="pill ' + ka.cls + '">' + ka.t + '</span>' +
      '<span class="pill ghost">Heute: ' + Store.s.daily.xp + ' / ' + Store.DAILY_GOAL + ' XP</span></div>' +
      '<div class="meter" role="img" aria-label="KA-Bereitschaft ' + p.pct + ' Prozent"><i style="width:' + p.pct + '%"></i></div>' +
      '<small class="muted">KA-Bereitschaft ' + p.pct + ' % · ' + p.done + ' von ' + p.total + ' Lektionen</small>' +
      '</div></section>';

    GEO.units.forEach(function (u) {
      h += '<section class="unit" style="--c:' + u.color + '">' +
        '<header class="unit-head card"><span class="unit-ico" aria-hidden="true">' + u.icon + '</span>' +
        '<div class="unit-t"><small>Einheit ' + u.no + '</small><h2>' + u.title + '</h2><p>' + u.blurb + '</p></div>' +
        '<button class="btn sm ghost" data-act="sheet" data-unit="' + u.id + '">📄 Spickzettel</button></header>' +
        '<div class="trail">';
      u.lessons.forEach(function (l, i) {
        var r = Store.lesson(l.id), isNext = nx && nx.id === l.id;
        h += '<div class="node-wrap pos' + (i % 3) + '">' +
          '<button class="node' + (r ? ' done' : '') + (isNext ? ' next' : '') + '" data-act="lesson" data-id="' + l.id +
          '" aria-label="Lektion ' + l.no + ': ' + l.title + '">' +
          '<svg class="hex" viewBox="0 0 100 110" aria-hidden="true"><polygon class="hex-s" points="50,11 93,34 93,82 50,105 7,82 7,34"/>' +
          '<polygon class="hex-f" points="50,4 93,27 93,75 50,98 7,75 7,27"/></svg>' +
          '<span class="nuc">' + (r ? '✓' : l.no) + '</span></button>' +
          '<div class="node-lbl"><small>' + l.level + '</small><b>' + l.title + '</b>' + starStr(r ? r.stars : 0) + '</div></div>';
      });
      h += '</div></section>';
    });

    h += '<section class="mode card mode-boss"><div class="mode-fig">' + Magmus.boss('normal', 92) + '</div><div class="mode-t">' +
      '<h2>Am Ende wartet der Endgegner</h2><p>Wenn die Einheiten sitzen: Tritt in der Arena gegen die Klassenarbeit an.</p>' +
      '<button class="btn" data-act="tab" data-tab="arena">Zur Arena</button></div></section>';
    return h;
  }

  // --------------------------------------------------------------- Arena
  function drillInfo(kind, empty) {
    var d = Store.s.drills[kind];
    return d ? 'Bestwert: ' + d.best + ' % · ' + d.plays + (d.plays === 1 ? ' Runde' : ' Runden') : empty;
  }
  function viewArena() {
    var b = Store.s.boss, nM = openMistakes().length, bi = bossInfo();
    var best = b.best == null ? 'Noch nicht gekämpft' : 'Beste Note: ' + grade(b.best) + ' (' + Math.round(b.best * 100) + ' %)';
    function mode(cls, fig, title, text, info, btn) {
      return '<section class="mode card ' + cls + '"><div class="mode-fig' + (fig.charAt(0) === '<' ? '' : ' big-emoji') + '" aria-hidden="true">' + fig +
        '</div><div class="mode-t"><h2>' + title + '</h2><p>' + text + '</p>' + (info ? '<small class="muted">' + info + '</small>' : '') + btn + '</div></section>';
    }
    return '<h1 class="h-page">Arena</h1>' +
      mode('mode-boss', Magmus.boss('normal', 96), 'Boss-Fight: KA-Simulation',
        bi.n + ' Aufgaben quer durch alle Themen – von „nennen“ bis „bewerten“, mit Material. ' + BOSS_MIN + ' Minuten, am Ende gibt es eine Note.',
        best, '<button class="btn" data-act="boss">Kampf starten</button>') +
      mode('mode-blitz', '⚡', 'Blitzrunde', '60 Sekunden. Antippen heißt antworten. Serien bringen den Multiplikator hoch.',
        'Rekord: ' + Store.s.blitzHigh + ' Punkte', '<button class="btn gold" data-act="blitz">Los</button>') +
      mode('mode-review', '🩹', 'Fehler-Training', 'Was du falsch hattest, kommt hier wieder – so lange, bis es sitzt.',
        nM ? nM + (nM === 1 ? ' offene Frage' : ' offene Fragen') : 'Keine offenen Fehler',
        '<button class="btn moss" data-act="review"' + (nM ? '' : ' disabled') + '>Trainieren</button>') +
      '<h2 class="h-sec arena-sec">Gezielt trainieren</h2>' +
      mode('mode-zahlen', '🔢', 'Zahlen-Drill', 'Tiefe, Temperatur und Druck der Erdschalen im Schnelldurchlauf – bis jede Zahl sitzt.' +
        (GEO.WERTE.geprueft ? '' : ' <span class="warn-inline">⚠️ Vorschlagswerte, bitte mit dem Heft abgleichen.</span>'),
        drillInfo('zahlen', 'Noch nicht gedrillt'), '<button class="btn" data-act="drill" data-kind="zahlen">Drillen</button>') +
      mode('mode-material', '🗺️', 'Material-Training', 'Nur Tabellen, Diagramme, Karten und Schaubilder auswerten – genau wie in der KA.',
        drillInfo('material', 'Noch nicht trainiert'), '<button class="btn gold" data-act="drill" data-kind="material">Auswerten</button>') +
      mode('mode-ops', '🧰', 'Operatoren-Trainer', 'Nennen, beschreiben, erklären, auswerten, bewerten: Was will die Aufgabe von dir?',
        drillInfo('ops', 'Noch nicht trainiert'),
        '<div class="btn-row"><button class="btn moss" data-act="drill" data-kind="ops">Trainieren</button>' +
        '<button class="btn ghost" data-act="ops">Übersicht</button></div>') +
      mode('mode-sheets', '📄', 'Alle Spickzettel', 'Der komplette KA-Stoff zum Durchlesen. Ideal für den Abend davor.', '',
        '<button class="btn ghost" data-act="sheets">Öffnen</button>');
  }

  // -------------------------------------------------------------- Profil
  function viewProfile() {
    var lv = Store.level(), p = progress(), st = Store.s.stats, set = Store.s.settings;
    var acc = st.answered ? Math.round(st.correct / st.answered * 100) : 0;
    function tile(v, l) { return '<div class="tile"><b>' + v + '</b><span>' + l + '</span></div>'; }
    var h = '<h1 class="h-page">Profil</h1>' +
      '<section class="card level"><div class="level-fig">' + Magmus.svg('cool', 92) + '</div><div class="level-t">' +
      '<small>Level ' + lv.n + '</small><h2>' + lv.title + '</h2>' +
      '<div class="meter"><i style="width:' + lv.pct + '%"></i></div>' +
      '<small class="muted">' + lv.into + ' / ' + lv.span + ' XP bis zum nächsten Level</small></div></section>' +

      '<section class="tiles">' + tile(Store.streak(), 'Tage Streak') + tile(Store.s.streak.best || 0, 'Bester Streak') +
      tile(Store.s.xp, 'XP gesamt') + tile(acc + ' %', 'Trefferquote') + tile(p.done + '/' + p.total, 'Lektionen') +
      tile(p.stars + '/' + p.max, 'Sterne') + '</section>' +

      '<section class="card"><h2 class="h-sec">Abzeichen</h2><div class="badges">';
    BADGES.forEach(function (b) {
      var has = !!Store.s.badges[b.id];
      h += '<div class="badge' + (has ? ' has' : '') + '" title="' + b.d + '"><span class="b-ico" aria-hidden="true">' + (has ? b.ico : '🔒') +
        '</span><b>' + b.n + '</b><small>' + b.d + '</small></div>';
    });
    h += '</div></section>' +

      '<section class="card settings"><h2 class="h-sec">Einstellungen</h2>' +
      '<div class="row"><span>Töne</span><button class="btn sm ' + (set.sound ? 'moss' : 'ghost') + '" data-act="sound" aria-pressed="' + set.sound + '">' +
      (set.sound ? 'An' : 'Aus') + '</button></div>' +
      '<div class="row"><span>Design</span><div class="seg">' +
      ['auto', 'light', 'dark'].map(function (t) {
        return '<button class="' + (set.theme === t ? 'on' : '') + '" data-act="theme" data-theme="' + t + '">' +
          { auto: 'Auto', light: 'Hell', dark: 'Dunkel' }[t] + '</button>';
      }).join('') + '</div></div>' +
      '<div class="row"><span>Zahlen zum Schalenaufbau</span><span class="pill ' + (GEO.WERTE.geprueft ? 'done' : 'hot') + '">' +
      (GEO.WERTE.geprueft ? 'mit Heft abgeglichen' : 'Vorschlag – ungeprüft') + '</span></div>' +
      '<div class="row"><span>Fortschritt</span><button class="btn sm ghost danger" data-act="reset">Zurücksetzen</button></div>' +
      (GEO.WERTE.geprueft ? '' : '<p class="muted small">Die Zahlen für Tiefe, Temperatur und Druck stehen zentral in <code>js/werte.js</code>. ' +
        'Gleiche sie mit deinem Heft ab und setze dort <code>geprueft: true</code>.</p>') +
      '<p class="muted small">Dein Fortschritt wird nur in diesem Browser gespeichert. Es werden keine Daten verschickt.</p></section>';
    return h;
  }

  // ------------------------------------------------------ Dialoge, Sheets
  function dialog(o) {
    var d = el('div', 'dlg');
    d.innerHTML = '<div class="dlg-box card" role="dialog" aria-modal="true">' +
      (o.fig ? '<div class="dlg-fig">' + o.fig + '</div>' : '') +
      '<h2>' + o.title + '</h2>' + (o.text ? '<p>' + o.text + '</p>' : '') +
      '<div class="dlg-btns">' + (o.no ? '<button class="btn ghost" data-d="no">' + o.no + '</button>' : '') +
      '<button class="btn ' + (o.yesCls || '') + '" data-d="yes">' + o.yes + '</button></div></div>';
    // kind: 'yes' | 'no' | 'cancel' (Escape oder Klick daneben)
    function done(kind) {
      document.removeEventListener('keydown', key, true);
      d.remove();
      var f = kind === 'yes' ? o.onYes : kind === 'no' ? o.onNo : (o.onCancel || null);
      if (f) f();
    }
    function key(e) {
      if (e.key === 'Escape') { e.stopPropagation(); e.preventDefault(); done('cancel'); }
      if (e.key === 'Enter') { e.stopPropagation(); e.preventDefault(); done('yes'); }
    }
    d.addEventListener('click', function (e) {
      var t = e.target.closest('[data-d]');
      if (t) done(t.getAttribute('data-d'));
      else if (e.target === d) done('cancel');
    });
    document.addEventListener('keydown', key, true);
    document.body.appendChild(d);
    var y = $('[data-d="yes"]', d);
    if (y) y.focus({ preventScroll: true });
    return d;
  }

  function sheetHTML(u) {
    var s = u.sheet;
    var h = '<article class="sheet" id="sheet-' + u.id + '" style="--c:' + u.color + '">' +
      '<header class="sheet-head"><span class="unit-ico" aria-hidden="true">' + u.icon + '</span><div><small>Einheit ' + u.no +
      '</small><h2>' + u.title + '</h2></div></header>' +
      '<p class="sheet-intro">' + s.intro + '</p><dl class="facts">' +
      s.facts.map(function (f) { return '<div><dt>' + f[0] + '</dt><dd>' + f[1] + '</dd></div>'; }).join('') + '</dl>';
    if (s.merk) {
      h += '<div class="merk"><h3>Merk dir</h3><ul>' + s.merk.map(function (m) { return '<li>' + m + '</li>'; }).join('') + '</ul></div>';
    }
    if (s.extra) h += typeof s.extra === 'function' ? s.extra() : s.extra;
    (s.figs || []).forEach(function (f) {
      var o = { legend: !f.nolegend };
      Object.keys(f.o || {}).forEach(function (k) { o[k] = f.o[k]; });
      h += '<figure class="sheet-fig"><div class="fig">' + Diagrams.render(f.d, o) + '</div>';
      if (!f.nolegend) h += '<ol class="legend">' + Diagrams.legend(f.d).map(function (n) { return '<li>' + n + '</li>'; }).join('') + '</ol>';
      h += '<figcaption>' + (f.cap || Diagrams.title(f.d)) + '</figcaption></figure>';
    });
    return h + '</article>';
  }

  function overlay(title, body, foot) {
    var o = el('div', 'stage sheet-ov');
    o.innerHTML = '<header class="stage-top"><div class="wrap stage-top-in"><button class="icon-btn" data-o="close" aria-label="Schließen">✕</button>' +
      '<strong class="ov-title">' + title + '</strong></div></header>' +
      '<div class="stage-body"><div class="wrap ov-body">' + body + '</div></div>' +
      (foot ? '<footer class="stage-foot"><div class="wrap">' + foot + '</div></footer>' : '');
    function close() {
      document.removeEventListener('keydown', key);
      o.remove();
      document.body.classList.remove('in-stage');
      render();
    }
    function key(e) { if (e.key === 'Escape') close(); }
    o.addEventListener('click', function (e) {
      var t = e.target.closest('[data-o]');
      if (!t) return;
      var a = t.getAttribute('data-o');
      if (a === 'close') close();
      else if (a === 'lesson') { close(); startLesson(t.getAttribute('data-id')); }
      else if (a === 'drill') { close(); startDrill(t.getAttribute('data-kind')); }
      else if (a === 'jump') {
        var target = $('#sheet-' + t.getAttribute('data-unit'), o);
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
    document.addEventListener('keydown', key);
    if (document.activeElement && document.activeElement.blur) document.activeElement.blur();
    document.body.appendChild(o);
    document.body.classList.add('in-stage');
    return o;
  }

  function markSheet(id) {
    Store.s.sheets[id] = true;
    if (GEO.units.every(function (u) { return Store.s.sheets[u.id]; })) Store.badge('sheets');
    Store.save();
  }
  function openSheet(id) {
    var u = unitById(id);
    if (!u) return;
    markSheet(id);
    var l = u.lessons.filter(function (x) { return !Store.lesson(x.id); })[0] || u.lessons[0];
    overlay('Spickzettel', '<p class="bubble ov-say">' + Magmus.say('sheet') + '</p>' + sheetHTML(u),
      '<button class="btn big" data-o="lesson" data-id="' + l.id + '">Lektion ' + l.no + ' starten</button>');
  }
  function opsHTML() {
    var h = '<article class="sheet" id="sheet-ops" style="--c:#C9B6F2"><header class="sheet-head"><span class="unit-ico" aria-hidden="true">🧰</span>' +
      '<div><small>Methode</small><h2>Operatoren: Was will die Aufgabe?</h2></div></header>' +
      '<p class="sheet-intro">Das Verb in der Aufgabe heißt Operator. Es legt fest, was und wie viel du schreiben sollst. ' +
      'Je höher der Anforderungsbereich (AFB), desto mehr Punkte gibt es meistens.</p>';
    GEO.AFB.forEach(function (a, i) {
      h += '<h3 class="afb-h"><span class="pill">AFB ' + ['I', 'II', 'III'][i] + '</span> ' + a + '</h3><dl class="facts">';
      GEO.OPS.filter(function (o) { return o.afb === i + 1; }).forEach(function (o) {
        h += '<div><dt>' + o.op + '</dt><dd>' + o.was + (o.start ? '<br><i>So fängst du an: ' + o.start + '</i>' : '') + '</dd></div>';
      });
      h += '</dl>';
    });
    h += '<div class="merk"><h3>Material auswerten in drei Schritten</h3><ul>' + GEO.MATERIAL_TIPPS.map(function (m) { return '<li>' + m + '</li>'; }).join('') + '</ul></div>';
    return h + '</article>';
  }
  function openOps() {
    overlay('Operatoren', '<p class="bubble ov-say">' + Magmus.say('opsSheet') + '</p>' + opsHTML(),
      '<button class="btn big moss" data-o="drill" data-kind="ops">Operatoren trainieren</button>');
  }
  function openAllSheets() {
    GEO.units.forEach(function (u) { Store.s.sheets[u.id] = true; });
    Store.badge('sheets');
    Store.save();
    var idx = '<nav class="sheet-idx">' + GEO.units.map(function (u) {
      return '<button data-o="jump" data-unit="' + u.id + '" style="--c:' + u.color + '">' + u.icon + ' ' + u.title + '</button>';
    }).join('') + '<button data-o="jump" data-unit="ops" style="--c:#C9B6F2">🧰 Operatoren</button></nav>';
    overlay('Alle Spickzettel', idx + GEO.units.map(sheetHTML).join('') + opsHTML());
  }

  // ------------------------------------------------------- Abzeichen etc.
  function checkBadges(res) {
    var got = [], p = progress(), h = new Date().getHours();
    function give(id) { if (Store.badge(id)) got.push(BADGES.filter(function (b) { return b.id === id; })[0]); }
    if (p.done >= 1) give('first');
    if (res.mode === 'lesson' && !res.failed && res.wrong === 0) give('perfect');
    if (Store.s.stats.bestCombo >= 10) give('combo10');
    if (Store.streak() >= 3) give('streak3');
    if (Store.s.daily.xp >= 100) give('xp100');
    if (p.done >= Math.ceil(p.total / 2)) give('half');
    if (p.done >= p.total) give('all');
    if (p.stars >= p.max) give('stars');
    if (res.mode === 'boss' && res.grade <= 4) give('boss');
    if (res.mode === 'boss' && res.grade === 1) give('boss1');
    if (res.mode === 'blitz' && res.score >= 200) give('blitz');
    if (res.mode === 'review' && openMistakes().length === 0) give('clean');
    if (res.mode === 'drill' && res.reason === 'done' && res.wrong === 0) give(res.kind);
    if (h >= 22 || h < 4) give('night');
    Store.save();
    return got;
  }

  // =========================================================== Spielrunde
  /* cfg: mode, items[{q,id,unit,pts}], hearts, seconds, fb ('full'|'quick'|'flash'),
          instant, again(), finish(res) -> { fig, title, line, tiles[], extra, btns } */
  function runSession(cfg) {
    var st = {
      queue: cfg.items.map(function (it) { return { it: it, tries: 0 }; }),
      total: cfg.items.length, done: 0, hearts: cfg.hearts || 0,
      combo: 0, bestCombo: 0, firstOk: 0, wrong: 0, answered: 0, correct: 0,
      log: [], score: 0, left: cfg.seconds || 0, ended: false, paused: false,
      cur: null, ctl: null, phase: 'ask', t0: Date.now(), hp: 0, hpMax: 0
    };
    if (cfg.mode === 'boss') {
      cfg.items.forEach(function (it) { st.hpMax += it.pts || 1; });
      st.hp = st.hpMax;
    }

    var root = el('div', 'stage mode-' + cfg.mode);
    root.innerHTML =
      '<header class="stage-top"><div class="wrap stage-top-in">' +
      '<button class="icon-btn" data-s="quit" aria-label="Runde beenden">✕</button>' +
      '<div class="bar"><i></i></div><div class="stage-info"></div></div></header>' +
      (cfg.mode === 'boss' ? '<div class="boss-strip"><div class="wrap boss-in"><div class="boss-fig">' + Magmus.boss('normal', 64) +
        '</div><div class="boss-meta"><b>Die Klassenarbeit</b><div class="hpbar"><i></i></div><small class="hp-t"></small></div></div></div>' : '') +
      '<div class="stage-body"><div class="wrap stage-main"></div></div>' +
      '<footer class="stage-foot"><div class="wrap"><button class="btn big check" data-s="check" disabled>Prüfen</button></div></footer>' +
      '<div class="fb" hidden><div class="wrap fb-in"></div></div>';
    if (document.activeElement && document.activeElement.blur) document.activeElement.blur();
    document.body.appendChild(root);
    document.body.classList.add('in-stage');

    var bar = $('.bar i', root), info = $('.stage-info', root), main = $('.stage-main', root),
      body = $('.stage-body', root), checkBtn = $('.check', root), fb = $('.fb', root), fbIn = $('.fb-in', root);
    var timer = null, pendingNext = null;

    var api = {
      instant: !!cfg.instant,
      ready: function (b) { checkBtn.disabled = !b; },
      label: function (t) { checkBtn.textContent = t; },
      submit: function () { doCheck(); },
      tap: function () { Sfx.play('tap'); },
      sfx: function (n) { Sfx.play(n); }
    };

    function hud() {
      var pct = cfg.mode === 'blitz' ? st.left / cfg.seconds * 100 : st.done / st.total * 100;
      bar.style.width = U.clamp(pct, 0, 100) + '%';
      var h = '';
      if (cfg.mode === 'blitz') {
        var mult = Math.min(5, 1 + Math.floor(st.combo / 3));
        h += '<span class="hud score">' + st.score + (mult > 1 ? ' <em>×' + mult + '</em>' : '') + '</span>';
      }
      if (cfg.mode === 'review' || cfg.mode === 'drill') h += '<span class="hud">' + st.done + '/' + st.total + '</span>';
      if (cfg.hearts) h += '<span class="hud hearts"><span aria-hidden="true">❤️</span> ' + st.hearts + '</span>';
      if (cfg.seconds) h += '<span class="hud clock' + (st.left <= 10 ? ' low' : '') + '"><span aria-hidden="true">⏱</span> ' + fmt(st.left) + '</span>';
      info.innerHTML = h;
      if (cfg.mode === 'boss') {
        $('.hpbar i', root).style.width = (st.hp / st.hpMax * 100) + '%';
        $('.hp-t', root).textContent = 'Du hast ' + (st.hpMax - st.hp) + ' von ' + st.hpMax + ' BE · Aufgabe ' +
          Math.min(st.done + 1, st.total) + '/' + st.total;
      }
    }

    function next() {
      pendingNext = null;
      if (st.ended) return;
      if (!st.queue.length) return finish('done');
      st.cur = st.queue.shift();
      st.phase = 'ask';
      fb.hidden = true;
      root.classList.remove('has-fb', 'flash-ok', 'flash-bad');
      var q = st.cur.it.q;
      main.innerHTML = '';
      main.setAttribute('data-qid', st.cur.it.id);
      var head = el('div', 'qhead',
        '<div class="q-mag">' + Magmus.svg(q.t === 'explain' || q.t === 'material' ? 'think' : st.cur.tries ? 'smug' : 'happy', 56) + '</div>' +
        '<div class="q-meta"><span class="q-hint">' + QT.hint(q) + '</span>' +
        (q.zusatz ? '<span class="q-again q-zusatz">Zusatz</span>' : '') +
        (st.cur.tries ? '<span class="q-again">' + (st.cur.tries > 1 ? 'Noch ein Versuch' : 'Zweite Chance') + '</span>' : '') +
        (st.cur.it.pts > 1 ? '<span class="q-again">' + st.cur.it.pts + ' BE</span>' : '') + '</div>');
      var h2 = el('h2', 'qtext' + (q.t === 'tf' ? ' quote' : ''), QT.title(q));
      var area = el('div', 'qarea q-' + q.t);
      main.appendChild(head); main.appendChild(h2); main.appendChild(area);
      checkBtn.textContent = 'Prüfen';
      checkBtn.disabled = true;
      checkBtn.hidden = false;
      st.ctl = QT.make(q, area, api);
      if (st.ctl.auto || (cfg.instant && !st.ctl.twoStep)) checkBtn.hidden = true;
      root.classList.toggle('no-foot', checkBtn.hidden);
      body.scrollTop = 0;
      hud();
    }

    function doCheck() {
      if (st.phase !== 'ask' || st.ended) return;
      var r = st.ctl.check();
      if (r.pending) return;
      st.phase = 'fb';
      var item = st.cur.it, first = st.cur.tries === 0, pts = item.pts || 1, earned = 0;
      st.cur.tries++;
      st.answered++;
      Store.stat(r.ok);
      if (r.ok) {
        st.correct++;
        st.combo++;
        st.bestCombo = Math.max(st.bestCombo, st.combo);
        if (first) st.firstOk++;
        if (cfg.mode !== 'blitz') Store.solveMistake(item.id);
      } else {
        st.combo = 0;
        st.wrong++;
        if (cfg.mode !== 'blitz') Store.addMistake(item.id);
      }
      if (cfg.mode === 'lesson' || cfg.mode === 'review' || cfg.mode === 'drill') {
        if (r.ok) st.done++;
        else {
          if (cfg.mode === 'lesson') st.hearts--;
          if (st.cur.tries < (cfg.tries || 2)) st.queue.push(st.cur); else st.done++;
        }
      } else if (cfg.mode === 'boss') {
        earned = r.frac != null ? Math.round(pts * r.frac) : (r.ok ? pts : 0);
        st.hp -= earned;
        st.done++;
      } else {
        if (r.ok) st.score += 10 * Math.min(5, 1 + Math.floor((st.combo - 1) / 3));
        st.done++;
      }
      st.log.push({ it: item, ok: r.ok, earned: earned, pts: pts });
      Store.save();
      hud();
      feedback(r, earned, pts);
    }

    function feedback(r, earned, pts) {
      var q = st.cur.it.q;
      if (cfg.fb === 'flash') {
        Sfx.play(r.ok ? (st.combo % 3 === 0 ? 'combo' : 'ok') : 'bad');
        root.classList.add(r.ok ? 'flash-ok' : 'flash-bad');
        pendingNext = setTimeout(next, r.ok ? 280 : 750);
        return;
      }
      if (cfg.fb === 'quick') {
        var good = earned > 0;
        Sfx.play(good ? 'hit' : 'bad');
        var bf = $('.boss-fig', root);
        bf.innerHTML = Magmus.boss(good ? 'hit' : 'laugh', 64);
        bf.classList.remove('shake');
        void bf.offsetWidth;
        if (good) bf.classList.add('shake');
        fb.className = 'fb ' + (good ? 'ok' : 'bad');
        fbIn.className = 'wrap fb-in toast ' + (good ? 'ok' : 'bad');
        fbIn.innerHTML = '<strong>' + (earned === pts ? 'Treffer! ' + earned + ' BE für dich.' :
          earned > 0 ? 'Teiltreffer: ' + earned + ' von ' + pts + ' BE.' : 'Daneben. Der Boss lacht.') + '</strong>';
        fb.hidden = false;
        root.classList.add('has-fb');
        pendingNext = setTimeout(function () { bf.innerHTML = Magmus.boss('normal', 64); next(); }, good ? 1000 : 1500);
        return;
      }
      var line, mood;
      if (r.ok) {
        line = q.quip || (st.combo === 3 ? Magmus.say('combo3') : st.combo === 5 ? Magmus.say('combo5') : st.combo === 10 ? Magmus.say('combo10') :
          r.close ? Magmus.say('close') : q.t === 'explain' ? Magmus.say('explainOk') : q.t === 'material' ? Magmus.say('matOk') : Magmus.say('ok'));
        mood = st.combo >= 5 ? 'cool' : U.pick(['cheer', 'cheer', 'smug']);
        Sfx.play(st.combo === 3 || st.combo === 5 || st.combo === 10 ? 'combo' : 'ok');
      } else {
        line = q.t === 'explain' ? Magmus.say('explainBad') : q.t === 'material' ? Magmus.say('matBad') : Magmus.say('bad');
        mood = U.pick(['roast', 'shock', 'sad']);
        Sfx.play('bad');
      }
      var plain = q.t === 'tap' || q.t === 'sort' || q.t === 'match';
      fb.className = 'fb ' + (r.ok ? 'ok' : 'bad');
      fbIn.className = 'wrap fb-in ' + (r.ok ? 'ok' : 'bad');
      fbIn.innerHTML = '<div class="fb-top"><div class="fb-mag">' + Magmus.svg(mood, 62) + '</div><strong>' + line + '</strong></div>' +
        '<div class="fb-txt">' +
        (!r.ok && r.right ? '<p class="fb-right">' + (plain ? '' : '<span>Richtig wäre:</span> ') + r.right + '</p>' : '') +
        (r.note ? '<p class="fb-note">' + r.note + '</p>' : '') +
        (q.w ? '<p class="fb-why">' + q.w + '</p>' : '') +
        (q.vorschlag ? '<p class="fb-warn">⚠️ Vorschlagswert – gleiche ihn mit deinem Heft ab.</p>' : '') +
        (!r.ok && cfg.mode === 'lesson' ? '<p class="fb-heart">−1 Herz' + (st.hearts > 0 && st.cur.tries < 2 ? ' · die Frage kommt gleich nochmal' : '') + '</p>' : '') +
        '</div><button class="btn big ' + (r.ok ? 'moss' : '') + '" data-s="next">Weiter</button>';
      fb.hidden = false;
      root.classList.add('has-fb');
      var nb = $('[data-s="next"]', fb);
      if (nb) nb.focus({ preventScroll: true });
    }

    function afterFb() {
      if (st.phase !== 'fb' || cfg.fb !== 'full') return;
      if (cfg.mode === 'lesson' && st.hearts <= 0) return finish('fail');
      next();
    }

    function finish(reason) {
      if (st.ended) return;
      st.ended = true;
      clearInterval(timer);
      clearTimeout(pendingNext);
      Store.s.stats.bestCombo = Math.max(Store.s.stats.bestCombo, st.bestCombo);
      Store.s.stats.sessions++;
      var res = {
        mode: cfg.mode, kind: cfg.kind, reason: reason, failed: reason === 'fail', total: st.total, done: st.done,
        answered: st.answered, correct: st.correct, wrong: st.wrong, firstOk: st.firstOk,
        bestCombo: st.bestCombo, score: st.score, secs: Math.round((Date.now() - st.t0) / 1000),
        log: st.log, hp: st.hp, hpMax: st.hpMax
      };
      var out = cfg.finish(res);            // vergibt XP und liefert die Anzeige
      var xpr = Store.addXP(out.xp || 0);
      var badges = checkBadges(res);
      Store.save();

      var h = '<div class="stage-body"><div class="wrap result">' +
        '<div class="res-fig">' + out.fig + '</div><h2>' + out.title + '</h2>' + (out.sub ? '<p class="res-sub">' + out.sub + '</p>' : '') +
        '<p class="bubble res-line">' + out.line + '</p><div class="tiles">' +
        '<div class="tile xp"><b>+' + (out.xp || 0) + '</b><span>XP</span></div>' +
        out.tiles.map(function (t) { return '<div class="tile"><b>' + t[0] + '</b><span>' + t[1] + '</span></div>'; }).join('') + '</div>';
      if (xpr.levelUp) {
        var lv = Store.level();
        h += '<div class="res-card lvl"><span aria-hidden="true">🎉</span><div><b>Level ' + lv.n + ': ' + lv.title + '</b><small>' + Magmus.say('levelUp') + '</small></div></div>';
      }
      badges.forEach(function (b) {
        h += '<div class="res-card"><span aria-hidden="true">' + b.ico + '</span><div><b>Neues Abzeichen: ' + b.n + '</b><small>' + b.d + '</small></div></div>';
      });
      h += (out.extra || '') + '<div class="res-btns">' + out.btns.map(function (b) {
        return '<button class="btn big ' + (b.cls || '') + '" data-s="' + b.s + '"' + (b.go ? ' data-go="' + b.go + '"' : '') + '>' + b.t + '</button>';
      }).join('') + '</div></div></div>';
      root.className = 'stage stage-result mode-' + cfg.mode;
      root.innerHTML = h;
      if (out.party) { Sfx.play(xpr.levelUp ? 'level' : 'win'); Sfx.confetti(); }
      else Sfx.play(res.failed ? 'lose' : xpr.levelUp ? 'level' : 'ok');
      var first = $('.res-btns .btn', root);
      if (first) first.focus({ preventScroll: true });
    }

    function close(silent) {
      st.ended = true;
      clearInterval(timer);
      clearTimeout(pendingNext);
      document.removeEventListener('keydown', onKey);
      root.remove();
      document.body.classList.remove('in-stage');
      if (!silent) render();
    }

    function askQuit() {
      if (st.ended || st.paused) return;
      st.paused = true;
      dialog({
        fig: Magmus.svg('sad', 84), title: 'Runde abbrechen?', text: Magmus.say('quit'),
        no: 'Beenden', yes: 'Weiterlernen', yesCls: 'moss',
        onYes: function () { st.paused = false; },
        onCancel: function () { st.paused = false; },
        onNo: function () { close(); }
      });
    }

    function onKey(e) {
      if (st.paused || e.repeat) return;
      var tag = e.target && e.target.tagName || '';
      if (st.ended) return;
      if (e.key === 'Escape') return askQuit();
      if (e.key === 'Enter') {
        if (tag === 'TEXTAREA') return;
        e.preventDefault();                     // Enter darf nie einen Knopf hinter der Runde auslösen
        if (st.phase === 'fb') { if (cfg.fb === 'full') afterFb(); }
        else if (!checkBtn.hidden && !checkBtn.disabled) doCheck();
      } else if (/^[1-9]$/.test(e.key) && tag !== 'INPUT' && tag !== 'TEXTAREA' && st.phase === 'ask' && st.ctl && st.ctl.key) {
        st.ctl.key(+e.key);
      }
    }

    root.addEventListener('click', function (e) {
      var t = e.target.closest('[data-s]');
      if (!t) return;
      var a = t.getAttribute('data-s');
      if (a === 'quit') askQuit();
      else if (a === 'check') doCheck();
      else if (a === 'next') afterFb();
      else if (a === 'home') close();
      else if (a === 'again') { close(true); cfg.again(); }
      else if (a === 'go') { close(true); route(t.getAttribute('data-go')); }
    });
    document.addEventListener('keydown', onKey);

    if (cfg.seconds) {
      timer = setInterval(function () {
        if (st.paused || st.ended) return;
        st.left--;
        if (st.left <= 5 && st.left > 0) Sfx.play('tick');
        hud();
        if (st.left <= 0) finish('time');
      }, 1000);
    }
    next();
  }

  function route(go) {
    var p = (go || '').split(':');
    if (p[0] === 'lesson') startLesson(p[1]);
    else if (p[0] === 'sheet') { render(); openSheet(p[1]); }
    else if (p[0] === 'review') startReview();
    else if (p[0] === 'boss') startBoss();
    else if (p[0] === 'blitz') startBlitz();
    else if (p[0] === 'drill') startDrill(p[1]);
    else if (p[0] === 'ops') { render(); openOps(); }
    else render();
  }

  // -------------------------------------------------------------- Lektion
  function startLesson(id) {
    var l = lessonById(id);
    if (!l) return;
    Store.s.seenIntro = true;
    runSession({
      mode: 'lesson', items: l.items, hearts: 5, fb: 'full',
      again: function () { startLesson(id); },
      finish: function (res) {
        var acc = res.answered ? Math.round(res.correct / res.answered * 100) : 0;
        var tiles = [[acc + ' %', 'Trefferquote'], [fmt(res.secs), 'Zeit']];
        if (res.failed) {
          return {
            xp: 2, fig: Magmus.svg('sad', 130), title: 'Herzen aufgebraucht', sub: 'Einheit ' + l.unit.no + ' · ' + l.title,
            line: Magmus.say('fail'), tiles: tiles,
            btns: [{ t: 'Nochmal versuchen', s: 'again' }, { t: 'Spickzettel lesen', s: 'go', go: 'sheet:' + l.unit.id, cls: 'ghost' },
              { t: 'Zurück', s: 'home', cls: 'ghost' }]
          };
        }
        var stars = res.wrong === 0 ? 3 : res.wrong <= 2 ? 2 : 1;
        Store.lessonDone(id, stars);
        var nx = LESSONS[LESSONS.indexOf(l) + 1];
        var btns = [];
        if (nx) btns.push({ t: 'Nächste Lektion', s: 'go', go: 'lesson:' + nx.id });
        btns.push({ t: nx ? 'Zum Lernpfad' : 'Fertig', s: 'home', cls: nx ? 'ghost' : '' });
        if (stars < 3) btns.push({ t: 'Nochmal für 3 Sterne', s: 'again', cls: 'ghost' });
        return {
          xp: 10 + (res.wrong === 0 ? 5 : 0), party: true,
          fig: '<div class="res-stars">' + starStr(stars) + '</div>' + Magmus.svg(stars === 3 ? 'cool' : 'cheer', 130),
          title: 'Lektion geschafft', sub: 'Einheit ' + l.unit.no + ' · ' + l.level + ' · ' + l.title,
          line: Magmus.say(res.wrong === 0 ? 'perfect' : 'done'), tiles: tiles, btns: btns
        };
      }
    });
  }

  // -------------------------------------------------------- Fehler-Training
  function startReview() {
    var items = shuffle(openMistakes().map(itemById)).slice(0, 10);
    if (!items.length) {
      dialog({ fig: Magmus.svg('smug', 84), title: 'Nichts zu reparieren', text: Magmus.say('review0'), yes: 'Okay' });
      return;
    }
    runSession({
      mode: 'review', items: items, fb: 'full',
      again: startReview,
      finish: function (res) {
        var open = openMistakes().length;
        var btns = [];
        if (open) btns.push({ t: 'Weiter trainieren', s: 'again' });
        btns.push({ t: 'Zurück', s: 'home', cls: open ? 'ghost' : '' });
        return {
          xp: Math.min(10, res.correct), party: open === 0,
          fig: Magmus.svg(open ? 'happy' : 'cheer', 130), title: open ? 'Training beendet' : 'Alle Fehler ausgebügelt',
          line: Magmus.say('reviewDone'),
          tiles: [[res.correct + '/' + res.answered, 'richtig'], [open, 'noch offen']], btns: btns
        };
      }
    });
  }

  // -------------------------------------------------------------- Blitz
  function startBlitz() {
    var pool = shuffle(ALL.filter(function (it) { return (it.q.t === 'mc' || it.q.t === 'tf') && !it.q.fig && !it.q.mat && !it.q.zusatz; }));
    dialog({
      fig: '<div class="big-emoji">⚡</div>', title: 'Blitzrunde', text: '60 Sekunden. Antippen heißt antworten. Alle drei richtigen in Folge steigt der Multiplikator.',
      no: 'Lieber nicht', yes: 'Los!', yesCls: 'gold',
      onYes: function () {
        runSession({
          mode: 'blitz', items: pool, seconds: 60, fb: 'flash', instant: true,
          again: startBlitz,
          finish: function (res) {
            var high = res.score > Store.s.blitzHigh;
            if (high) Store.s.blitzHigh = res.score;
            return {
              xp: Math.min(15, Math.floor(res.score / 20)), party: high && res.score > 0,
              fig: Magmus.svg(high ? 'cool' : 'think', 130), title: res.score + ' Punkte' + (high ? ' – neuer Rekord!' : ''),
              line: Magmus.say(high || res.score >= 150 ? 'blitzGood' : 'blitzMeh'),
              tiles: [[res.correct, 'richtig'], [res.wrong, 'falsch'], [res.bestCombo, 'beste Serie'], [Store.s.blitzHigh, 'Rekord']],
              btns: [{ t: 'Nochmal', s: 'again', cls: 'gold' }, { t: 'Zurück', s: 'home', cls: 'ghost' }]
            };
          }
        });
      }
    });
  }

  // ---------------------------------------------------------------- Boss
  var BOSS_MIN = 25;
  function buildBoss() {
    var quickT = ['mc', 'tf', 'multi', 'type', 'num', 'cloze', 'order', 'sort', 'match'], out = [];
    var pool = ALL.filter(function (it) { return !it.q.zusatz; });
    function of(it, pts) { return { q: it.q, id: it.id, unit: it.unit, lesson: it.lesson, pts: pts }; }
    function distinct(list, n) {
      var seen = {}, got = [];
      list.forEach(function (it) { if (got.length < n && !seen[it.unit.id]) { seen[it.unit.id] = true; got.push(it); } });
      return got;
    }
    // Anforderungsbereich I/II: je Einheit zwei kurze Aufgaben, dazu Skizzen
    GEO.units.forEach(function (u) {
      shuffle(pool.filter(function (it) { return it.unit === u && quickT.indexOf(it.q.t) >= 0 && !it.q.mat; })).slice(0, 2)
        .forEach(function (it) { out.push(of(it, 1)); });
    });
    shuffle(pool.filter(function (it) { return it.q.t === 'label' || it.q.t === 'tap'; })).slice(0, 3)
      .forEach(function (it) { out.push(of(it, 1)); });
    out = shuffle(out);
    // Material auswerten: 1 BE je Teilaufgabe
    distinct(shuffle(pool.filter(function (it) { return it.q.t === 'material'; })), 2)
      .forEach(function (it) { out.push(of(it, it.q.parts.length)); });
    // KA-Aufgaben mit Operator: zwei beliebige, dazu eine zum Beurteilen/Bewerten
    var ex = shuffle(pool.filter(function (it) { return it.q.t === 'explain'; }));
    var judge = ex.filter(function (it) { return /^(Bewerte|Beurteile)/.test(it.q.op); })[0];
    var rest = distinct(ex.filter(function (it) { return it !== judge && (!judge || it.unit !== judge.unit); }), judge ? 2 : 3);
    rest.concat(judge ? [judge] : []).forEach(function (it) { out.push(of(it, 3)); });
    return out;
  }
  function bossInfo() {
    var items = buildBoss(), be = 0;
    items.forEach(function (it) { be += it.pts; });
    return { n: items.length, be: be };
  }

  function startBoss() {
    var items = buildBoss(), be = 0;
    items.forEach(function (it) { be += it.pts; });
    dialog({
      fig: Magmus.boss('normal', 110), title: 'Boss-Fight: die Klassenarbeit',
      text: Magmus.say('bossIntro') + ' ' + items.length + ' Aufgaben, ' + be + ' Bewertungseinheiten (BE), ' + BOSS_MIN + ' Minuten. Die Auflösung gibt es am Ende.',
      no: 'Noch nicht', yes: 'Kämpfen',
      onYes: function () {
        runSession({
          mode: 'boss', items: items, seconds: BOSS_MIN * 60, fb: 'quick',
          again: startBoss,
          finish: function (res) {
            var got = res.hpMax - res.hp, pct = got / res.hpMax, g = grade(pct);
            res.grade = g;
            Store.s.boss.tries++;
            if (Store.s.boss.best == null || pct > Store.s.boss.best) Store.s.boss.best = pct;

            // Auswertung nach Thema
            var per = {};
            res.log.forEach(function (l) {
              var k = l.it.unit.id;
              per[k] = per[k] || { u: l.it.unit, e: 0, p: 0 };
              per[k].e += l.earned; per[k].p += l.pts;
            });
            var extra = '<h3 class="h-sec">So lief es pro Thema</h3><div class="per">', weak = [];
            GEO.units.forEach(function (u) {
              var x = per[u.id];
              if (!x) return;
              if (x.e / x.p < 0.6) weak.push(u);
              extra += '<div class="per-row"><span>' + u.icon + ' ' + u.title + '</span><div class="meter sm"><i style="width:' +
                (x.e / x.p * 100) + '%;background:' + u.color + '"></i></div><b>' + x.e + '/' + x.p + '</b></div>';
            });
            extra += '</div>';
            if (weak.length) {
              extra += '<div class="res-card weak"><span aria-hidden="true">🎯</span><div><b>Hier lohnt sich Üben am meisten</b><small>' +
                weak.map(function (u) { return u.title; }).join(' · ') + '</small></div></div>';
            }
            var miss = res.log.filter(function (l) { return l.earned < l.pts; });
            if (res.reason === 'time') extra += '<p class="muted">Die Zeit ist abgelaufen. Nicht bearbeitete Aufgaben zählen 0 BE.</p>';
            if (miss.length) {
              extra += '<h3 class="h-sec">Deine Schwachstellen</h3><div class="miss">';
              miss.forEach(function (l) {
                var q = l.it.q;
                extra += '<details><summary><span>' + (q.t === 'material' ? q.mat.title : QT.title(q)) + '</span><small>' + l.it.unit.title + ' · ' + l.earned + '/' + l.pts +
                  ' BE</small></summary>' + '<p><b>Lösung:</b> ' + solution(q) + '</p>' + (q.w ? '<p>' + q.w + '</p>' : '') + '</details>';
              });
              extra += '</div>';
            }
            extra += '<p class="muted small">Notenschlüssel zur Orientierung: 1 ab 90 %, 2 ab 75 %, 3 ab 60 %, 4 ab 45 %, 5 ab 20 %. Deine Lehrkraft kann anders bewerten.</p>';

            var btns = [];
            if (openMistakes().length) btns.push({ t: 'Schwachstellen trainieren', s: 'go', go: 'review', cls: 'moss' });
            btns.push({ t: 'Nochmal kämpfen', s: 'again', cls: btns.length ? 'ghost' : '' });
            btns.push({ t: 'Zurück', s: 'home', cls: 'ghost' });
            return {
              xp: Math.round(pct * 30), party: g <= 2,
              fig: '<div class="res-duo">' + Magmus.svg(g <= 2 ? 'cool' : g <= 4 ? 'happy' : 'sad', 110) + Magmus.boss(g <= 4 ? 'dead' : 'laugh', 104) + '</div>',
              title: 'Note ' + g, line: Magmus.say(g <= 2 ? 'bossWin' : g <= 4 ? 'bossMid' : 'bossLose'),
              tiles: [[got + '/' + res.hpMax, 'BE'], [Math.round(pct * 100) + ' %', 'erreicht'], [fmt(res.secs), 'Zeit']],
              extra: extra, btns: btns
            };
          }
        });
      }
    });
  }

  // ---------------------------------------- Zahlen-Drill, Material, Operatoren
  var DRILLS = {
    zahlen: { title: 'Zahlen-Drill', n: 10, tries: 3, ok: 'drillDone', meh: 'drillMeh',
      items: function () { return GEO.pools.zahlen.items; } },
    material: { title: 'Material-Training', n: 5, tries: 2, ok: 'matOk', meh: 'matBad',
      items: function () { return ALL.filter(function (it) { return it.q.t === 'material' || (it.q.mat && it.q.t !== 'explain'); }); } },
    ops: { title: 'Operatoren-Trainer', n: 10, tries: 2, ok: 'opsDone', meh: 'explainBad',
      items: function () { return GEO.pools.operatoren.items; } }
  };
  function startDrill(kind) {
    var d = DRILLS[kind];
    if (!d) return;
    var items = shuffle(d.items()).slice(0, d.n);
    if (!items.length) {
      dialog({ fig: Magmus.svg('think', 84), title: 'Noch keine Aufgaben', text: 'Für diesen Modus fehlen Werte. Trage sie in js/werte.js ein.', yes: 'Okay' });
      return;
    }
    runSession({
      mode: 'drill', kind: kind, items: items, tries: d.tries, fb: 'full',
      again: function () { startDrill(kind); },
      finish: function (res) {
        var pct = Math.round(res.firstOk / res.total * 100), clean = res.wrong === 0;
        Store.drillDone(kind, pct);
        return {
          xp: Math.min(12, 2 + res.firstOk), party: clean,
          fig: Magmus.svg(clean ? 'cool' : pct >= 60 ? 'cheer' : 'think', 130), title: d.title + (clean ? ': fehlerfrei!' : ' geschafft'),
          line: Magmus.say(pct >= 80 ? d.ok : d.meh),
          tiles: [[res.firstOk + '/' + res.total, 'auf Anhieb richtig'], [pct + ' %', 'Quote'], [fmt(res.secs), 'Zeit']],
          btns: [{ t: 'Noch eine Runde', s: 'again' }].concat(kind === 'ops' ? [{ t: 'Operatoren-Übersicht', s: 'go', go: 'ops', cls: 'ghost' }] : [],
            [{ t: 'Zurück', s: 'home', cls: 'ghost' }])
        };
      }
    });
  }

  // ------------------------------------------------------------- Aktionen
  function applyTheme() {
    var t = Store.s.settings.theme;
    if (t === 'auto') t = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', t);
    var m = $('meta[name="theme-color"]');
    if (m) m.setAttribute('content', t === 'dark' ? '#17161C' : '#F6EFE4');
  }

  var ACT = {
    tab: function (d) { tab = d.tab; render(); window.scrollTo(0, 0); },
    lesson: function (d) { startLesson(d.id); },
    sheet: function (d) { openSheet(d.unit); },
    sheets: openAllSheets,
    poke: function (d, t) {
      t.innerHTML = Magmus.svg(U.pick(['shock', 'smug', 'roast', 'cheer', 'think', 'cool']), 112);
      t.classList.remove('poked');
      void t.offsetWidth;
      t.classList.add('poked');
      var b = $('.hero .bubble');
      if (b) b.textContent = Magmus.say('poke');
      Sfx.play('tap');
    },
    boss: startBoss,
    blitz: startBlitz,
    review: startReview,
    drill: function (d) { startDrill(d.kind); },
    ops: openOps,
    sound: function () {
      Store.s.settings.sound = !Store.s.settings.sound;
      Store.save();
      Sfx.play('ok');
      render();
    },
    theme: function (d) { Store.s.settings.theme = d.theme; Store.save(); applyTheme(); render(); },
    reset: function () {
      dialog({
        fig: Magmus.svg('shock', 84), title: 'Alles zurücksetzen?', text: 'XP, Streak, Sterne und Abzeichen werden gelöscht. Das lässt sich nicht rückgängig machen.',
        no: 'Abbrechen', yes: 'Ja, löschen', yesCls: 'danger',
        onYes: function () { Store.reset(); render(); }
      });
    }
  };

  function init() {
    Store.load();
    // Fehler zu Fragen, die es nicht mehr gibt (z. B. nach geänderten Werten), aufräumen
    Store.mistakeIds().forEach(function (id) { if (!itemById(id)) Store.dropMistake(id); });
    applyTheme();
    shell();
    render();
    document.addEventListener('click', function (e) {
      var t = e.target.closest('[data-act]');
      if (!t || t.disabled) return;
      var f = ACT[t.getAttribute('data-act')];
      if (f) f(t.dataset, t);
    });
    if (window.matchMedia) {
      var mq = window.matchMedia('(prefers-color-scheme: dark)');
      var onChange = function () { applyTheme(); };
      if (mq.addEventListener) mq.addEventListener('change', onChange);
      else if (mq.addListener) mq.addListener(onChange);
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();

  window.App = { render: render, all: ALL, extra: EXTRA, lessons: LESSONS, buildBoss: buildBoss, drills: DRILLS };
})();
