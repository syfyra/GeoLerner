/* GeoLerner – Operatoren: Was verlangt die Aufgabe? (Übersicht + Fragen für den Operatoren-Trainer) */
(function () {
  'use strict';

  GEO.AFB = ['Wiedergeben', 'Erklären und anwenden', 'Urteilen'];

  // imp = Befehlsformen, an denen der Operator in einer Aufgabe erkannt wird
  GEO.OPS = [
    { op: 'nennen', afb: 1, imp: ['Nenne', 'Benenne'],
      was: 'Informationen knapp aufzählen – ohne Erklärung. Stichpunkte oder ein Satz reichen.',
      start: '„Die drei Gesteinsgruppen sind …“' },
    { op: 'beschreiben', afb: 1, imp: ['Beschreibe'],
      was: 'Einen Sachverhalt oder ein Material geordnet und mit Fachbegriffen wiedergeben: Was sehe ich? Noch keine Ursachen.',
      start: '„Die Karte zeigt …“, „Auffällig ist, dass …“' },
    { op: 'verorten', afb: 1, imp: ['Verorte', 'Lokalisiere'],
      was: 'Die Lage eines Ortes oder Raumes genau angeben.',
      start: '„… liegt an der Grenze zwischen der … und der … Platte.“' },
    { op: 'erklären', afb: 2, imp: ['Erkläre'],
      was: 'Ursachen und Zusammenhänge darlegen: Warum ist das so? Schritt für Schritt als Kette.',
      start: '„…, weil …“, „Dadurch …“, „Das führt dazu, dass …“' },
    { op: 'erläutern', afb: 2, imp: ['Erläutere'],
      was: 'Wie erklären, aber zusätzlich mit Beispielen oder Belegen anschaulich machen.',
      start: '„Zum Beispiel …“, „Das zeigt sich an …“' },
    { op: 'vergleichen', afb: 2, imp: ['Vergleiche'],
      was: 'Gemeinsamkeiten und Unterschiede nach Kriterien gegenüberstellen und am Ende ein Ergebnis formulieren.',
      start: '„Beide …“, „Im Gegensatz dazu …“, „Insgesamt …“' },
    { op: 'auswerten', afb: 2, imp: ['Werte', 'Analysiere'],
      was: 'Material beschreiben, die wichtigen Aussagen herausarbeiten, mit Fachwissen erklären und eine Gesamtaussage formulieren.',
      start: '„Das Material zeigt …“, „Daraus lässt sich ableiten, dass …“' },
    { op: 'interpretieren', afb: 2, imp: ['Interpretiere'],
      was: 'Die Bedeutung eines Materials herausarbeiten: Aussagen deuten, begründen und Schlüsse ziehen.',
      start: '„Das bedeutet, dass …“, „Erklären lässt sich das durch …“' },
    { op: 'beurteilen', afb: 3, imp: ['Beurteile'],
      was: 'Eine Aussage oder Maßnahme mit Fachwissen prüfen: Was spricht dafür, was dagegen? Am Ende steht ein begründetes Urteil.',
      start: '„Dafür spricht …“, „Dagegen spricht …“, „Insgesamt ist das sinnvoll, weil …“' },
    { op: 'bewerten', afb: 3, imp: ['Bewerte'],
      was: 'Wie beurteilen, aber zusätzlich mit eigenen Maßstäben: Was ist dir wichtig? Ein eigenes, begründetes Urteil.',
      start: '„Meiner Meinung nach …, weil …“, „Wichtiger als … finde ich …“' }
  ];

  GEO.MATERIAL_TIPPS = [
    'Orientieren: Was für ein Material ist das? Titel, Thema, Raum, Zeit, Einheiten und Legende lesen.',
    'Beschreiben: Was ist zu sehen? Höchst- und Tiefstwerte, Verlauf, Verteilung – immer mit Zahlen oder Orten belegen.',
    'Erklären und deuten: Warum ist das so? Mit Fachwissen verknüpfen und eine Gesamtaussage formulieren.'
  ];

  // Kurzer Hinweis für KA-Aufgaben: „Erkläre“ -> was das heißt
  GEO.opTip = function (op) {
    var first = String(op || '').split(' ')[0];
    var hit = GEO.OPS.filter(function (o) { return o.imp.indexOf(first) >= 0; })[0];
    return hit ? hit.was : '';
  };

  GEO.pool('operatoren', {
    title: 'Operatoren', icon: '🧰', color: '#C9B6F2',
    qs: [
      { t: 'type', q: 'Wie heißt das Verb in einer Aufgabe, das dir sagt, was du tun sollst?', accept: ['Operator', 'Operatoren'],
        w: 'Nennen, beschreiben, erklären, bewerten … Der Operator legt fest, wie ausführlich deine Antwort sein muss.' },
      { t: 'match', q: 'Was verlangt welcher Operator?',
        pairs: [['nennen', 'aufzählen, ohne zu erklären'], ['beschreiben', 'geordnet wiedergeben: Was sehe ich?'],
          ['erklären', 'Ursachen und Zusammenhänge darlegen'], ['bewerten', 'eigenes, begründetes Urteil fällen']] },
      { t: 'sort', q: 'In welchen Anforderungsbereich gehört der Operator?', buckets: ['AFB I: wiedergeben', 'AFB II: erklären', 'AFB III: urteilen'],
        items: [['nennen', 0], ['beschreiben', 0], ['erklären', 1], ['vergleichen', 1], ['auswerten', 1], ['beurteilen', 2], ['bewerten', 2]] },
      { t: 'mc', q: 'Aufgabe: „Nenne die drei Gesteinsgruppen.“ Welche Antwort passt am besten zum Operator?',
        o: ['Magmatische Gesteine, Sedimentgesteine und metamorphe Gesteine.',
          'Magmatische Gesteine entstehen, wenn Magma abkühlt. Das geschieht entweder in der Tiefe oder an der Oberfläche …',
          'Ich finde, Gesteine sind ein wichtiges Thema.', 'Gesteine gibt es überall auf der Erde.'], a: 0,
        w: 'Bei „nennen“ reicht die knappe Aufzählung. Mehr zu schreiben kostet Zeit und bringt keine Extrapunkte.' },
      { t: 'mc', q: 'Aufgabe: „Erkläre, warum es an der San-Andreas-Verwerfung häufig Erdbeben gibt.“ Welche Antwort passt?',
        o: ['Dort gleiten zwei Platten aneinander vorbei. Sie verhaken sich, Spannung baut sich auf und entlädt sich ruckartig als Erdbeben.',
          'An der San-Andreas-Verwerfung gibt es häufig Erdbeben. Sie liegt in Kalifornien.',
          'Ich würde dort lieber nicht wohnen, weil es mir zu gefährlich wäre.', 'San-Andreas-Verwerfung, Kalifornien, Erdbeben.'], a: 0,
        w: 'Erklären heißt: die Ursachenkette liefern. Nur zu wiederholen, dass es Erdbeben gibt, ist noch keine Erklärung.' },
      { t: 'mc', q: 'Aufgabe: „Beschreibe die Verteilung der Erdbeben auf der Karte.“ Welche Antwort passt?',
        o: ['Die Erdbeben liegen in schmalen Gürteln, vor allem rund um den Pazifik und zwischen Mittelmeer und Himalaya. Im Inneren der Kontinente gibt es nur wenige.',
          'Erdbeben entstehen, weil sich Platten verhaken und die Spannung sich plötzlich löst.',
          'Die Karte ist sehr übersichtlich gestaltet.', 'Ich finde, man sollte in Erdbebengebieten strenger bauen.'], a: 0,
        w: 'Beschreiben heißt: sagen, was zu sehen ist – wo viel, wo wenig. Die Ursache gehört erst zum „Erklären“.' },
      { t: 'tf', q: 'Bei „beschreiben“ musst du auch die Ursachen erklären.', a: false,
        w: 'Beschreiben ist nur das Was. Das Warum kommt erst bei „erklären“.' },
      { t: 'tf', q: 'Bei „bewerten“ gehört ein eigenes, begründetes Urteil dazu.', a: true,
        w: 'Genau. Erst Argumente dafür und dagegen, dann dein Urteil – immer mit Begründung.' },
      { t: 'tf', q: 'Bei „nennen“ reichen Stichpunkte.', a: true,
        w: 'Nennen ist der kürzeste Operator: aufzählen, fertig.' },
      { t: 'mc', q: 'Was unterscheidet „bewerten“ von „beurteilen“?',
        o: ['Beim Bewerten kommen eigene Maßstäbe dazu: Was ist mir wichtig?', 'Beim Bewerten braucht man keine Argumente',
          'Beurteilen ist nur eine Aufzählung', 'Es gibt überhaupt keinen Unterschied'], a: 0,
        w: 'Beurteilen bleibt beim Fachlichen. Beim Bewerten sagst du zusätzlich, was du selbst für wichtig hältst – und begründest es.' },
      { t: 'order', q: 'Ordne die Schritte beim Auswerten eines Materials.',
        items: ['Material einordnen: Titel, Thema, Einheiten, Legende', 'Inhalt beschreiben: Werte, Verlauf, Auffälligkeiten',
          'Zusammenhänge mit Fachwissen erklären', 'Gesamtaussage formulieren'] },
      { t: 'mc', q: 'Zu welchem Operator passt der Satzanfang „Im Gegensatz dazu …“?',
        o: ['vergleichen', 'nennen', 'verorten', 'beschreiben'], a: 0,
        w: 'Beim Vergleichen stellst du Gemeinsamkeiten und Unterschiede gegenüber.' },
      { t: 'mc', q: 'Zu welchem Operator passen die Formulierungen „…, weil …“ und „Das führt dazu, dass …“?',
        o: ['erklären', 'nennen', 'beschreiben', 'verorten'], a: 0,
        w: 'Diese Wörter verbinden Ursache und Folge – das Kennzeichen einer Erklärung.' },
      { t: 'mc', q: 'Welcher dieser Operatoren verlangt am meisten von dir?',
        o: ['bewerten', 'nennen', 'beschreiben', 'erklären'], a: 0,
        w: 'Bewerten gehört zum höchsten Anforderungsbereich: Du brauchst Fachwissen, Argumente und ein eigenes Urteil.' },
      { t: 'cloze', text: 'Beim {0} stellst du Gemeinsamkeiten und {1} gegenüber und formulierst am Ende ein {2}.',
        blanks: ['Vergleichen', 'Unterschiede', 'Ergebnis'], extra: ['Nennen', 'Meinungen', 'Diagramm'] },
      { t: 'multi', q: 'Was gehört zu einer vollständigen Bewertung, zum Beispiel einer Schutzmaßnahme?',
        o: ['Argumente dafür', 'Argumente dagegen', 'Ein eigenes Urteil mit Begründung', 'Nur die eigene Meinung, ohne Begründung'], a: [0, 1, 2],
        w: 'Eine Meinung ohne Begründung ist keine Bewertung. Nutze Kriterien wie Wirksamkeit, Kosten und Umsetzbarkeit.' },
      { t: 'mc', q: 'Aufgabe: „Werte die Tabelle aus.“ Was machst du zuerst?',
        o: ['Titel, Spalten und Einheiten lesen: Worum geht es?', 'Sofort die eigene Meinung aufschreiben',
          'Die Tabelle abschreiben', 'Die größte Zahl suchen und nur diese nennen'], a: 0,
        w: 'Erst orientieren, dann beschreiben, dann erklären, am Ende eine Gesamtaussage.' },
      { t: 'sort', q: 'Beschreiben, erklären oder bewerten? Ordne die Sätze zu.', buckets: ['beschreiben', 'erklären', 'bewerten'],
        items: [['Die Erdbeben liegen vor allem an den Plattengrenzen.', 0], ['Die Temperatur steigt von 3000 auf 5000 °C.', 0],
          ['Weil sich die Platten verhaken, baut sich Spannung auf.', 1], ['Dadurch schmilzt die abtauchende Platte teilweise auf.', 1],
          ['Am wichtigsten finde ich erdbebensicheres Bauen.', 2], ['Ich halte Frühwarnsysteme für sinnvoll, weil sie viele Leben retten.', 2]] }
    ]
  });
})();
