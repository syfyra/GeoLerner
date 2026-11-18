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
  // richtige Antwort plus bis zu drei andere Werte aus der Tabelle
  function opts(right, all) {
    var rest = uniq(all).filter(function (v) { return v !== right; });
    return [right].concat(rest.slice(0, 3));
  }
  function mark(q) { if (q) q.vorschlag = VOR; return q; }

  var withT = S.filter(function (s) { return s.tiefe && has(s.tiefe[0]) && has(s.tiefe[1]); });
  var withC = S.filter(function (s) { return has(s.temp); });
  var withP = S.filter(function (s) { return has(s.druck); });
  function grenze(i) { return i === last ? 'im Erdmittelpunkt' : 'an der Untergrenze ' + S[i].gen; }

  // ------------------------------------------------ Zahlen-Fragen erzeugen
  var Z = { start: [], end: [], dick: [], mcT: [], numC: [], mcC: [], numP: [], mcP: [], tf: [], match: [], extra: [] };

  S.forEach(function (s, i) {
    if (withT.indexOf(s) >= 0) {
      var span = cap(s.nom) + ' reicht von ' + de(s.tiefe[0]) + ' bis ' + de(s.tiefe[1]) + ' km Tiefe.';
      if (i > 0) {
        Z.start[i] = mark({ t: 'num', q: 'In welcher Tiefe beginnt ' + s.nom + '?', a: s.tiefe[0], unit: 'km', w: span });
      }
      Z.end[i] = mark({ t: 'num', q: i === last ? 'In welcher Tiefe liegt der Erdmittelpunkt?' : 'Bis in welche Tiefe reicht ' + s.nom + '?',
        a: s.tiefe[1], unit: 'km', w: i === last ? 'Der Erdradius beträgt rund ' + de(s.tiefe[1]) + ' km.' : span });
      if (i > 0) {
        Z.dick[i] = mark({ t: 'num', q: 'Wie mächtig (dick) ist ' + s.nom + '?', a: s.tiefe[1] - s.tiefe[0], unit: 'km',
          w: 'Rechnung: ' + de(s.tiefe[1]) + ' km − ' + de(s.tiefe[0]) + ' km = ' + de(s.tiefe[1] - s.tiefe[0]) + ' km.' });
      }
      if (withT.length >= 3) {
        Z.mcT[i] = mark({ t: 'mc', q: 'In welchem Tiefenbereich liegt ' + s.nom + '?',
          o: opts(rng(s.tiefe), withT.map(function (x) { return rng(x.tiefe); })), a: 0, w: span });
      }
    }
    if (has(s.temp)) {
      var wc = 'Die Temperatur erreicht ' + grenze(i) + ' etwa ' + de(s.temp) + ' °C.';
      Z.numC[i] = mark({ t: 'num', q: i === last ? 'Wie heiß ist es ungefähr im Erdmittelpunkt?' : 'Welche Temperatur herrscht ungefähr ' + grenze(i) + '?',
        a: s.temp, unit: '°C', w: wc });
      if (withC.length >= 3) {
        Z.mcC[i] = mark({ t: 'mc', q: i === last ? 'Welche Temperatur herrscht im Erdmittelpunkt?' : 'Bis zu welcher Temperatur wird es ' + s.dat + ' heiß?',
          o: opts('etwa ' + de(s.temp) + ' °C', withC.map(function (x) { return 'etwa ' + de(x.temp) + ' °C'; })), a: 0, w: wc });
      }
    }
    if (has(s.druck)) {
      var wp = 'Der Druck erreicht ' + grenze(i) + ' etwa ' + de(s.druck) + ' ' + DE + '.';
      Z.numP[i] = mark({ t: 'num', q: 'Wie hoch ist der Druck ungefähr ' + grenze(i) + '?', a: s.druck, unit: DE, w: wp });
      if (withP.length >= 3) {
        Z.mcP[i] = mark({ t: 'mc', q: 'Welcher Druck herrscht ' + grenze(i) + '?',
          o: opts('etwa ' + de(s.druck) + ' ' + DE, withP.map(function (x) { return 'etwa ' + de(x.druck) + ' ' + DE; })), a: 0, w: wp });
      }
    }
    // richtig/falsch: abwechselnd eine wahre und eine vertauschte Aussage
    if (i > 0 && withT.indexOf(s) >= 0) {
      var other = withT.filter(function (x) { return x !== s && x.tiefe[0] !== s.tiefe[0] && x.tiefe[0] > 0; })[0];
      var wahr = i % 2 === 1 || !other;
      Z.tf[i] = mark({ t: 'tf', q: cap(s.nom) + ' beginnt in ' + de(wahr ? s.tiefe[0] : other.tiefe[0]) + ' km Tiefe.', a: wahr,
        w: cap(s.nom) + ' beginnt in ' + de(s.tiefe[0]) + ' km Tiefe.' });
    }
  });

  function pairs(list, f) {
    var p = list.map(function (s) { return [cap(s.name), f(s)]; });
    return uniq(p.map(function (x) { return x[1]; })).length === p.length && p.length >= 3 ? p : null;
  }
  var pT = pairs(withT, function (s) { return rng(s.tiefe); });
  var pC = pairs(withC, function (s) { return 'bis etwa ' + de(s.temp) + ' °C'; });
  var pP = pairs(withP, function (s) { return 'bis etwa ' + de(s.druck) + ' ' + DE; });
  if (pT) Z.match.push(mark({ t: 'match', q: 'Ordne jeder Schale ihren Tiefenbereich zu.', pairs: pT }));
  if (pC) Z.match.push(mark({ t: 'match', q: 'Ordne jeder Schale die Temperatur an ihrer Untergrenze zu.', pairs: pC }));
  if (pP) Z.match.push(mark({ t: 'match', q: 'Ordne jeder Schale den Druck an ihrer Untergrenze zu.', pairs: pP }));

  var oz = W.ozeanischeKruste, ko = W.kontinentaleKruste;
  if (oz && ko) {
    var krOpts = uniq([rng(oz), rng(ko)].concat(has(W.lithosphaere) ? ['rund ' + de(W.lithosphaere) + ' km'] : [],
      withT.length > 1 ? ['rund ' + de(withT[1].tiefe[1]) + ' km'] : []));
    Z.extra.push(mark({ t: 'mc', q: 'Wie dick ist die ozeanische Kruste ungefähr?', o: krOpts, a: 0,
      w: 'Die ozeanische Kruste ist mit ' + rng(oz) + ' viel dünner als die kontinentale (' + rng(ko) + ').' }));
    Z.extra.push(mark({ t: 'mc', q: 'Wie dick ist die kontinentale Kruste ungefähr?', o: [krOpts[1], krOpts[0]].concat(krOpts.slice(2)), a: 0,
      w: 'Die kontinentale Kruste ist ' + rng(ko) + ' dick – am dicksten unter Hochgebirgen.' }));
  }
  if (has(W.lithosphaere)) {
    Z.extra.push(mark({ t: 'num', q: 'Wie dick ist die Lithosphäre ungefähr?', a: W.lithosphaere, unit: 'km',
      w: 'Die Lithosphäre (Erdkruste plus oberster, fester Erdmantel) ist rund ' + de(W.lithosphaere) + ' km dick.' }));
  }

  function flat(list) { return list.filter(Boolean); }
  var ALLE = flat(Z.match).concat(flat(Z.start), flat(Z.end), flat(Z.numC), flat(Z.numP), flat(Z.mcT), flat(Z.mcC), flat(Z.mcP), flat(Z.dick), flat(Z.tf), Z.extra);

  GEO.pool('zahlen', { title: 'Zahlen-Drill', icon: '🔢', color: '#9DD4F1', unit: 'schalen', qs: ALLE });

  // Lektion 2: eine feste Auswahl quer durch Tiefe, Temperatur und Druck
  var mid = Math.max(0, last - 2);
  var L2 = uniq(flat([Z.match[0], Z.start[last - 1], Z.start[last], Z.end[last], Z.match[1], Z.numC[last], Z.numC[mid],
    Z.numP[last], Z.mcP[mid], Z.tf[2] || Z.tf[1], Z.dick[last - 1]]));

  // ------------------------------------------------ Tabelle für Spickzettel und Material
  function hinweis() {
    return VOR ? '<p class="werte-warn">⚠️ <b>Vorschlagswerte.</b> Die Zahlen unterscheiden sich je nach Schulbuch. Gleiche sie mit deinem Heft ab und ändere sie in <code>js/werte.js</code>.</p>' : '';
  }
  function tabelle() {
    var h = '<div class="mat mat-table"><div class="mat-h"><span class="mat-tag">Zahlen</span><strong>Der Schalenaufbau in Zahlen</strong></div>' +
      '<div class="mat-scroll"><table class="mat-table"><thead><tr><th>Schale und Zustand</th><th>Tiefe (km)</th><th>Temperatur unten (°C)</th><th>Druck unten (' + DE + ')</th></tr></thead><tbody>';
    S.forEach(function (s) {
      h += '<tr><th>' + cap(s.name) + '<small>' + s.zustand + '</small></th><td class="nw">' + (s.tiefe ? de(s.tiefe[0]) + '–' + de(s.tiefe[1]) : '–') +
        '</td><td class="nw">' + (has(s.temp) ? 'ca. ' + de(s.temp) : '–') + '</td><td class="nw">' + (has(s.druck) ? 'ca. ' + de(s.druck) : '–') + '</td></tr>';
    });
    h += '</tbody></table></div><small class="mat-src">„unten“ = an der Untergrenze der Schale' +
      (oz && ko ? ' · ozeanische Kruste ' + rng(oz) + ', kontinentale Kruste ' + rng(ko) : '') + '</small></div>';
    return hinweis() + h;
  }
  GEO.werteTabelle = tabelle;

  var MAT_TAB = {
    kind: 'table', title: 'M1: Der Schalenaufbau in Zahlen', head: ['Schale', 'Tiefe in km', 'Temperatur unten in °C', 'Druck unten in ' + DE],
    rows: S.map(function (s) { return [cap(s.name), s.tiefe ? de(s.tiefe[0]) + '–' + de(s.tiefe[1]) : '–', has(s.temp) ? s.temp : '–', has(s.druck) ? s.druck : '–']; }),
    src: '„unten“ = an der Untergrenze der Schale' + (VOR ? ' · Vorschlagswerte, mit dem Heft abgleichen' : '')
  };

  // Material-Aufgaben nur, wenn alle Werte vorhanden sind
  var voll = withT.length === n && withC.length === n && n >= 3;
  var k = Math.max(1, last - 1);            // vorletzte Schale (im Standard: äußerer Erdkern)
  var matTab = voll && mark({
    t: 'material', mat: MAT_TAB,
    parts: [
      { t: 'num', q: 'Wie mächtig ist ' + S[k].nom + '? Rechne mit den Werten der Tabelle.', a: S[k].tiefe[1] - S[k].tiefe[0], unit: 'km',
        w: 'Untergrenze minus Obergrenze: ' + de(S[k].tiefe[1]) + ' − ' + de(S[k].tiefe[0]) + ' = ' + de(S[k].tiefe[1] - S[k].tiefe[0]) + ' km.' },
      { t: 'num', q: 'Um wie viel Grad steigt die Temperatur von der Obergrenze ' + S[k].gen + ' bis zum Erdmittelpunkt?', a: S[last].temp - S[k - 1].temp, unit: '°C',
        w: de(S[last].temp) + ' °C − ' + de(S[k - 1].temp) + ' °C = ' + de(S[last].temp - S[k - 1].temp) + ' °C.' },
      { t: 'mc', q: 'Welche Aussage lässt sich aus der Tabelle ableiten?',
        o: ['Temperatur und Druck nehmen mit der Tiefe zu', 'Die Temperatur nimmt mit der Tiefe ab', 'Der Druck ist in allen Schalen gleich', 'Die Erdkruste ist die mächtigste Schale'], a: 0,
        w: 'Von Schale zu Schale steigen beide Werte. Das ist die Gesamtaussage der Tabelle.' }
    ]
  });

  var g0 = voll ? (S[0].temp - 15) / (S[0].tiefe[1] - S[0].tiefe[0]) : 0;
  var gN = voll ? (S[last].temp - S[last - 1].temp) / (S[last].tiefe[1] - S[last].tiefe[0]) : 0;
  var matLinie = voll && mark({
    t: 'material',
    mat: { kind: 'line', title: 'M2: Temperatur im Erdinneren', x: 'Tiefe in km', y: 'Temperatur in °C',
      pts: [[0, 15]].concat(S.map(function (s) { return [s.tiefe[1], s.temp]; })), src: VOR ? 'Vorschlagswerte, mit dem Heft abgleichen' : '' },
    parts: [
      { t: 'mc', q: 'Beschreibe den Verlauf: Wie verändert sich die Temperatur mit zunehmender Tiefe?',
        o: ['Sie steigt bis zum Erdmittelpunkt immer weiter an', 'Sie steigt erst und fällt im Erdkern wieder', 'Sie bleibt ab dem Erdmantel gleich', 'Sie sinkt mit der Tiefe'], a: 0,
        w: 'Die Kurve steigt durchgehend – im Erdmittelpunkt ist es am heißesten.' },
      { t: 'num', q: 'Lies ab: Welche Temperatur herrscht in ' + de(S[k].tiefe[0]) + ' km Tiefe?', a: S[k - 1].temp, unit: '°C',
        w: 'In ' + de(S[k].tiefe[0]) + ' km Tiefe endet ' + S[k - 1].nom + ', dort beginnt ' + S[k].nom + '.' },
      { t: 'tf', q: 'In der Erdkruste steigt die Temperatur pro Kilometer viel stärker an als im inneren Erdkern.', a: g0 > gN,
        w: 'In der Kruste sind es rund ' + Math.round(g0) + ' °C pro Kilometer, im innersten Teil nur etwa ' + de(Math.round(gN * 10) / 10) + ' °C pro Kilometer. Die Kurve ist am Anfang am steilsten.' }
    ]
  });

  var aufbauPunkte = S.map(function (s) { return cap(s.name) + (s.tiefe ? ': ' + rng(s.tiefe) : '') + ', ' + s.zustand; });
  var aufbauText = S.map(function (s, i) {
    return (i === 0 ? 'Ganz außen liegt ' : i === last ? 'Im Zentrum liegt ' : 'Darunter folgt ') + s.nom +
      (s.tiefe ? ' (' + rng(s.tiefe) + ')' : '') + '. ' + (s.nom.indexOf('die') === 0 ? 'Sie' : 'Er') +
      ' ist ' + s.zustand + '. Material: ' + s.stoff + '.';
  }).join(' ') + ' Temperatur und Druck nehmen von außen nach innen zu.';

  // ---------------------------------------------------------------- Einheit
  GEO.unit({
    id: 'schalen', icon: '🌍', color: '#9DD4F1',
    title: 'Schalenaufbau der Erde',
    blurb: 'Kruste, Mantel, Kern – mit Tiefe, Temperatur und Druck',
    sheet: {
      intro: 'Die Erde ist aufgebaut wie ein Pfirsich: dünne Haut (Kruste), dickes Fruchtfleisch (Mantel), Kern in der Mitte. Je tiefer, desto heißer und desto höher der Druck.',
      facts: [
        ['Erdkruste', 'Die dünne, feste äußere Schale. Kontinentale Kruste: dick, leichter, vor allem Granit. Ozeanische Kruste: dünn, schwerer, vor allem Basalt.'],
        ['Erdmantel', 'Die mächtigste Schale aus schwerem Gestein. Man unterscheidet den oberen und den unteren Erdmantel.'],
        ['Lithosphäre', 'Die feste Gesteinshülle: Erdkruste plus oberster, fester Teil des Erdmantels. Sie ist in Platten zerbrochen.'],
        ['Asthenosphäre', 'Die zähplastische Fließzone im oberen Erdmantel direkt unter der Lithosphäre. Auf ihr bewegen sich die Platten.'],
        ['Äußerer Erdkern', 'Flüssig, aus Eisen und Nickel.'],
        ['Innerer Erdkern', 'Fest, aus Eisen und Nickel – obwohl er am heißesten ist. Der enorme Druck verhindert das Schmelzen.'],
        ['Woher weiß man das?', 'Die tiefste Bohrung reicht nur rund 12 km tief. Den Aufbau kennt man aus Erdbebenwellen: An den Grenzen der Schalen ändern sie Tempo und Richtung.']
      ],
      merk: [
        'Reihenfolge von außen nach innen: Erdkruste – oberer Erdmantel – unterer Erdmantel – äußerer Erdkern – innerer Erdkern.',
        'Temperatur, Druck und Dichte nehmen mit der Tiefe zu.',
        'Nur der äußere Erdkern ist flüssig. Der innere ist fest – wegen des Drucks.',
        'Zahlen lernst du am besten als Grenzen: Wo beginnt was?'
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
            w: 'Nur der äußere Erdkern ist flüssig. Der Erdmantel ist fest, auch wenn er sehr langsam fließen kann.' },
          { t: 'tf', q: 'Der innere Erdkern ist flüssig, weil es dort am heißesten ist.', a: false,
            w: 'Er ist fest. Der Druck ist dort so hoch, dass das Material trotz der Hitze nicht schmelzen kann.' },
          { t: 'match', q: 'Was passt zu welcher Schale?',
            pairs: [['Erdkruste', 'fest, leichtes Gestein wie Granit und Basalt'], ['Erdmantel', 'schweres Gestein, mächtigste Schale'],
              ['Äußerer Erdkern', 'flüssiges Eisen und Nickel'], ['Innerer Erdkern', 'festes Eisen und Nickel']] },
          { t: 'tap', d: 'schalen', target: 'umantel', q: 'Tippe auf den unteren Erdmantel.', w: 'Der untere Erdmantel ist die dicke Schale direkt über dem äußeren Erdkern.' },
          { t: 'type', q: 'Wie heißt die zähplastische Fließzone im oberen Erdmantel, auf der sich die Platten bewegen?', accept: ['Asthenosphäre', 'Asthenosphaere', 'Astenosphäre'],
            w: 'Die Asthenosphäre liegt direkt unter der festen Lithosphäre.' },
          { t: 'cloze', text: 'Die {0} besteht aus der Erdkruste und dem obersten, festen Teil des Erdmantels. Sie ist in {1} zerbrochen, die sich auf der {2} bewegen.',
            blanks: ['Lithosphäre', 'Platten', 'Asthenosphäre'], extra: ['Atmosphäre', 'Schichten', 'Erdkruste'] },
          { t: 'sort', q: 'Kontinentale oder ozeanische Kruste?', buckets: ['kontinentale Kruste', 'ozeanische Kruste'],
            items: [['dicker', 0], ['vor allem Granit', 0], ['leichter (geringere Dichte)', 0], ['dünner', 1], ['vor allem Basalt', 1], ['schwerer (höhere Dichte)', 1]] }
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
            w: 'Erdbebenwellen durchleuchten die Erde wie ein Röntgengerät. An Schichtgrenzen werden sie gebrochen und reflektiert.' },
          { t: 'tf', q: 'Mit den tiefsten Bohrungen hat der Mensch bereits den Erdmantel erreicht.', a: false,
            w: 'Rund 12 km – das ist nicht einmal die halbe Dicke der kontinentalen Kruste.' },
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
