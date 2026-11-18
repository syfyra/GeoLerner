(function () {
  'use strict';

  var M_2010 = {
    kind: 'table', title: 'M1: Zwei Erdbeben im Jahr 2010', head: ['', 'Haiti (Januar)', 'Chile (Februar)'],
    rows: [['Magnitude', '7,0', '8,8'], ['Tiefe des Herdes', '13 km', '35 km'], ['Entfernung zur nächsten Großstadt', '25 km', '105 km'],
      ['Todesopfer', 'über 200 000', 'ca. 500'], ['Bauvorschriften', 'kaum vorhanden, nicht kontrolliert', 'streng, werden kontrolliert']],
    src: 'gerundete Angaben; die Opferzahlen für Haiti schwanken je nach Quelle'
  };

  GEO.unit({
    id: 'erdbeben', icon: '📈', color: '#F8DF86',
    title: 'Verbreitung und Ausmaß von Erdbeben',
    blurb: 'Wo die Erde bebt, wie man die Stärke misst und wovon die Schäden abhängen',
    sheet: {
      intro: 'Erdbeben sind nicht zufällig verteilt: Sie zeichnen die Plattengrenzen nach. Wie schlimm ein Beben wird, hängt aber nicht nur von seiner Stärke ab.',
      facts: [
        ['Erdbeben', 'Plötzliche Erschütterung der Erdkruste. Platten verhaken sich, Spannung baut sich auf – bricht das Gestein, wird die Energie schlagartig frei.'],
        ['Hypozentrum (Erdbebenherd)', 'Der Ort in der Tiefe, an dem das Gestein bricht.'],
        ['Epizentrum', 'Der Punkt an der Erdoberfläche senkrecht über dem Hypozentrum. Hier sind die Erschütterungen meist am stärksten.'],
        ['Erdbebenwellen', 'Breiten sich vom Herd nach allen Seiten aus. Fachbegriff: seismische Wellen.'],
        ['Seismograph', 'Messgerät, das Erdbebenwellen aufzeichnet. Die Aufzeichnung heißt Seismogramm.'],
        ['Verbreitung', 'Die allermeisten Erdbeben (rund 90 %) ereignen sich an Plattengrenzen: rund um den Pazifik (Pazifischer Feuerring), im Gürtel vom Mittelmeer bis zum Himalaya und – schwächer – an den mittelozeanischen Rücken.'],
        ['Richterskala', 'Gibt die Magnitude an, also die Stärke (freigesetzte Energie) des Bebens. Sie wird aus dem Seismogramm berechnet und ist nach oben offen. Eine Stufe mehr bedeutet etwa 10-fachen Ausschlag und rund 30-fache Energie.'],
        ['Mercalli-Skala', 'Beschreibt die Intensität: die spürbaren Wirkungen und Schäden an einem Ort, in 12 Stufen. Sie hängt auch von Entfernung, Untergrund und Bauweise ab.'],
        ['Ausmaß der Schäden', 'Hängt ab von Magnitude, Tiefe des Herdes, Entfernung zum Epizentrum, Untergrund, Bevölkerungsdichte, Bauweise, Tageszeit und Vorbereitung. Dazu kommen Folgeschäden: Brände, Erdrutsche, Tsunamis, Seuchen.']
      ],
      merk: [
        'Hypo = unten (Herd), Epi = oben (Oberfläche).',
        'Richter misst die Energie (ein Wert pro Beben). Mercalli beschreibt die Schäden (an jedem Ort anders).',
        'Nicht die Magnitude allein entscheidet über die Opferzahl – entscheidend sind Lage, Bauweise und Vorbereitung.',
        'Stärkstes gemessenes Beben: Chile 1960, Magnitude 9,5.',
        'Zusatz: Fachleute nutzen heute meist die Momenten-Magnituden-Skala. In den Medien heißt es trotzdem oft „auf der Richterskala“.'
      ],
      figs: [{ d: 'beben', cap: 'Herd, Epizentrum und Erdbebenwellen' },
        { d: 'platten', nolegend: true, o: { layer: 'beben' }, cap: 'Verbreitung: Erdbeben (rote Punkte) häufen sich an den Plattengrenzen' }]
    },
    lessons: [
      {
        title: 'Wie ein Erdbeben entsteht',
        qs: [
          { t: 'mc', q: 'Wie entstehen die meisten Erdbeben?',
            o: ['Platten verhaken sich, Spannung baut sich auf und entlädt sich ruckartig', 'Durch Ebbe und Flut', 'Durch das Gewicht großer Städte', 'Durch starke Stürme'], a: 0,
            w: 'Solche tektonischen Beben machen den allergrößten Teil aller Erdbeben aus.' },
          { t: 'label', d: 'beben', target: 'hypo', w: 'Das Hypozentrum ist der Erdbebenherd in der Tiefe: Hier bricht das Gestein.' },
          { t: 'label', d: 'beben', target: 'epi', w: 'Das Epizentrum liegt an der Erdoberfläche, senkrecht über dem Hypozentrum.' },
          { t: 'mc', q: 'Was ist das Epizentrum?',
            o: ['Der Punkt an der Erdoberfläche senkrecht über dem Erdbebenherd', 'Der Ort in der Tiefe, an dem das Gestein bricht', 'Das Messgerät für Erdbeben', 'Die stärkste Erdbebenwelle'], a: 0,
            w: 'Epi = „auf, über“. Der Bruch in der Tiefe heißt Hypozentrum.' },
          { t: 'type', q: 'Wie heißt das Messgerät, das Erdbebenwellen aufzeichnet?', accept: ['Seismograph', 'Seismograf', 'Seismometer'],
            w: 'Der Seismograph zeichnet ein Seismogramm auf. Daraus berechnet man die Stärke des Bebens.' },
          { t: 'cloze', text: 'Der Ort in der Tiefe, an dem das Gestein bricht, heißt {0}. Senkrecht darüber an der Erdoberfläche liegt das {1}. Vom Herd breiten sich {2} nach allen Seiten aus.',
            blanks: ['Hypozentrum', 'Epizentrum', 'Erdbebenwellen'], extra: ['Seismogramm', 'Lavaströme', 'Krater'] },
          { t: 'order', q: 'Ordne: So kommt es zu einem Erdbeben.',
            items: ['Zwei Platten bewegen sich gegeneinander', 'Die Platten verhaken sich', 'Im Gestein baut sich Spannung auf', 'Das Gestein bricht ruckartig', 'Erdbebenwellen breiten sich aus'] },
          { t: 'tf', q: 'Das Hypozentrum liegt an der Erdoberfläche.', a: false,
            w: 'Es liegt in der Tiefe. An der Oberfläche darüber liegt das Epizentrum.' },
          { t: 'tap', d: 'beben', target: 'wellen', q: 'Tippe auf die Erdbebenwellen.', w: 'Die Wellen breiten sich vom Hypozentrum kreisförmig nach allen Seiten aus.' }
        ]
      },
      {
        title: 'Verbreitung und Stärke',
        qs: [
          { t: 'mc', q: 'Wo ereignen sich die meisten Erdbeben?',
            o: ['An den Plattengrenzen', 'Im Inneren der großen Platten', 'An den Polen', 'Nur auf dem Meeresboden'], a: 0,
            w: 'Dort bewegen sich Platten gegeneinander, verhaken sich und bauen Spannung auf.' },
          { t: 'multi', q: 'In welchen Zonen häufen sich Erdbeben?',
            o: ['Rund um den Pazifik', 'Im Gürtel vom Mittelmeer bis zum Himalaya', 'An den mittelozeanischen Rücken', 'Im Inneren Australiens'], a: [0, 1, 2],
            w: 'Alle drei Zonen sind Plattengrenzen. Das Innere Australiens liegt mitten auf einer Platte.' },
          { t: 'sort', q: 'Richterskala oder Mercalli-Skala?', buckets: ['Richterskala', 'Mercalli-Skala'],
            items: [['misst die freigesetzte Energie', 0], ['nach oben offen', 0], ['wird aus dem Seismogramm berechnet', 0],
              ['beschreibt die Schäden vor Ort', 1], ['12 Stufen', 1], ['an jedem Ort anders', 1]] },
          { t: 'mc', q: 'Ein Beben der Magnitude 7 im Vergleich zu Magnitude 6: Wie viel Energie wird frei?',
            o: ['Rund 30-mal so viel', 'Doppelt so viel', 'Ein Sechstel mehr', 'Genau 7-mal so viel'], a: 0,
            w: 'Jede Stufe bedeutet etwa 10-fachen Ausschlag im Seismogramm und rund 30-fache Energie.' },
          { t: 'tf', q: 'Die Richterskala endet bei Stufe 10.', a: false,
            w: 'Sie ist nach oben offen. Das stärkste bisher gemessene Beben erreichte 9,5 (Chile 1960).' },
          { t: 'tap', d: 'platten', layer: 'beben', target: 'pazifik', q: 'Die roten Punkte zeigen Erdbeben. Tippe auf die Platte, um deren Rand sich der „Feuerring“ zieht.',
            w: 'Rund um die Pazifische Platte liegt der Pazifische Feuerring mit den meisten Erdbeben und Vulkanen.' },
          { t: 'multi', q: 'Wovon hängt ab, wie groß die Schäden eines Erdbebens sind?',
            o: ['Stärke und Tiefe des Bebens', 'Bauweise der Häuser', 'Bevölkerungsdichte', 'Farbe der Hausdächer'], a: [0, 1, 2],
            w: 'Dazu kommen Entfernung zum Epizentrum, Untergrund, Tageszeit und Vorbereitung.' },
          { t: 'mc', q: 'Warum kann ein schwächeres Beben mehr Opfer fordern als ein stärkeres?',
            o: ['Weil Lage, Bauweise und Vorbereitung entscheidend sind', 'Weil schwache Beben immer länger dauern', 'Weil die Richterskala falsch misst', 'Das ist unmöglich'], a: 0,
            w: 'Ein flacher Herd unter einer dicht bebauten Stadt mit unsicheren Häusern ist viel gefährlicher als ein starkes Beben in dünn besiedeltem Gebiet.' },
          { t: 'num', q: 'Welche Magnitude hatte das stärkste je gemessene Erdbeben (Chile 1960)?', a: 9.5,
            w: 'Magnitude 9,5 – bis heute der Rekord.' },
          { t: 'match', q: 'Ordne die Fachbegriffe zu.',
            pairs: [['Hypozentrum', 'Bruchstelle in der Tiefe'], ['Epizentrum', 'Punkt an der Oberfläche über dem Herd'],
              ['Magnitude', 'Maß für die freigesetzte Energie'], ['Intensität', 'Stärke der Wirkungen vor Ort']] }
        ]
      },
      {
        title: 'Erdbeben auf KA-Niveau',
        qs: [
          { t: 'material', mat: M_2010,
            parts: [
              { t: 'mc', q: 'Welches Beben setzte mehr Energie frei?', o: ['Das Beben in Chile', 'Das Beben in Haiti', 'Beide gleich viel'], a: 0,
                w: 'Magnitude 8,8 gegenüber 7,0 – das sind fast zwei Stufen, also mehrere hundertmal so viel Energie.' },
              { t: 'mc', q: 'Was fällt beim Vergleich der Opferzahlen auf?',
                o: ['Das schwächere Beben forderte ein Vielfaches an Todesopfern', 'Das stärkere Beben forderte mehr Todesopfer', 'Beide forderten etwa gleich viele Opfer'], a: 0,
                w: 'In Haiti starben mehrere hundertmal so viele Menschen wie in Chile.' },
              { t: 'multi', q: 'Welche Erklärungen dafür lassen sich mit der Tabelle belegen?',
                o: ['Der Herd lag in Haiti flacher und näher an einer Großstadt', 'In Chile wird erdbebensicher gebaut und kontrolliert', 'In Haiti bebte die Erde mitten in der Nacht', 'Chile hat mehr Einwohner als Haiti'], a: [0, 1],
                w: 'Nur was im Material steht, zählt als Beleg: Tiefe, Entfernung und Bauvorschriften.' }
            ] },
          { t: 'material',
            mat: { kind: 'table', title: 'M2: Erdbeben weltweit pro Jahr', head: ['Magnitude', 'Anzahl pro Jahr (Durchschnitt)'],
              rows: [['8 und mehr', 'ca. 1'], ['7 bis 7,9', 'ca. 15'], ['6 bis 6,9', 'ca. 130'], ['5 bis 5,9', 'ca. 1300'], ['4 bis 4,9', 'ca. 13 000']], src: 'gerundete Werte' },
            parts: [
              { t: 'mc', q: 'Beschreibe den Zusammenhang.',
                o: ['Je stärker die Beben, desto seltener sind sie', 'Je stärker die Beben, desto häufiger sind sie', 'Alle Stärken kommen gleich häufig vor'], a: 0,
                w: 'Schwache Beben gibt es tausendfach, sehr starke nur etwa einmal im Jahr.' },
              { t: 'mc', q: 'Wie verändert sich die Anzahl ungefähr, wenn die Magnitude um eine Stufe sinkt?',
                o: ['Sie verzehnfacht sich', 'Sie verdoppelt sich', 'Sie verhundertfacht sich'], a: 0,
                w: '1 – 15 – 130 – 1300 – 13 000: von Stufe zu Stufe rund zehnmal so viele.' },
              { t: 'tf', q: 'Erdbeben ab Magnitude 8 gibt es im Durchschnitt nur etwa einmal pro Jahr.', a: true,
                w: 'So steht es in der ersten Zeile der Tabelle.' }
            ] },
          { t: 'material',
            mat: { kind: 'fig', title: 'M3: Verbreitung der Erdbeben', d: 'platten', o: { layer: 'beben' }, key: 'Rote Punkte: Erdbeben · Linien: Plattengrenzen', src: 'stark vereinfacht' },
            parts: [
              { t: 'mc', q: 'Beschreibe die Verteilung der Erdbeben.',
                o: ['Sie liegen in schmalen Gürteln, vor allem rund um den Pazifik', 'Sie sind gleichmäßig über die Erde verteilt', 'Die meisten liegen im Inneren der Kontinente'], a: 0,
                w: 'Auffällig sind der Ring um den Pazifik und der Gürtel vom Mittelmeer bis nach Südostasien.' },
              { t: 'mc', q: 'Wie lässt sich die Verteilung erklären?',
                o: ['Die Gürtel zeichnen die Plattengrenzen nach, an denen sich Platten verhaken', 'Dort ist das Klima besonders heiß', 'Dort leben die meisten Menschen'], a: 0,
                w: 'Erdbeben entstehen dort, wo sich Platten gegeneinander bewegen.' }
            ] },
          { t: 'mc', q: 'Warum sind Erdbeben mit flachem Herd oft besonders zerstörerisch?',
            o: ['Die Wellen erreichen die Oberfläche fast ungeschwächt', 'Flache Beben dauern immer länger', 'In der Tiefe gibt es keine Erdbebenwellen', 'Flache Beben haben immer die höchste Magnitude'], a: 0,
            w: 'Je kürzer der Weg bis zur Oberfläche, desto weniger Energie geht unterwegs verloren.' },
          { t: 'tf', q: 'Auch in Deutschland kann die Erde beben.', a: true,
            w: 'Zum Beispiel am Oberrheingraben und in der Kölner Bucht – meist nur schwach.' },
          { t: 'explain', op: 'Werte aus', q: 'Werte die Tabelle M1 aus: Vergleiche die beiden Erdbeben und erkläre den Unterschied bei den Opferzahlen.', mat: M_2010,
            points: ['Beschreibung: Chile hatte die viel höhere Magnitude (8,8 gegenüber 7,0)', 'Auffälligkeit: Trotzdem starben in Haiti ein Vielfaches mehr Menschen',
              'Erklärung Lage: Herd in Haiti flacher und nah an einer dicht besiedelten Großstadt', 'Erklärung Bauweise: in Haiti kaum Vorschriften, in Chile strenge, kontrollierte Bauvorschriften',
              'Gesamtaussage: Das Ausmaß hängt nicht nur von der Stärke ab, sondern von Lage, Bauweise und Vorbereitung'],
            model: 'Die Tabelle vergleicht zwei Erdbeben des Jahres 2010. Das Beben in Chile war mit Magnitude 8,8 deutlich stärker als das in Haiti mit 7,0. Trotzdem starben in Haiti über 200 000 Menschen, in Chile etwa 500. Das lässt sich so erklären: In Haiti lag der Herd nur 13 km tief und nur 25 km von einer Großstadt entfernt, die Erschütterungen trafen die Stadt also fast ungeschwächt. Außerdem gab es kaum Bauvorschriften, sodass sehr viele Häuser einstürzten. In Chile lag der Herd tiefer und weiter entfernt, und es wird streng erdbebensicher gebaut. Insgesamt zeigt die Tabelle: Das Ausmaß eines Erdbebens hängt nicht nur von seiner Stärke ab, sondern vor allem von Lage, Bauweise und Vorbereitung.',
            tip: 'Auswerten in drei Schritten: beschreiben (mit Zahlen), erklären, Gesamtaussage.' },
          { t: 'explain', op: 'Erkläre', q: 'Erkläre, warum rund um den Pazifik besonders viele und starke Erdbeben auftreten.',
            points: ['Rund um den Pazifik liegen Plattengrenzen (Pazifischer Feuerring)', 'Dort bewegen sich Platten aufeinander zu oder aneinander vorbei',
              'Ozeanische Platten tauchen ab (Subduktion) und verhaken sich', 'Spannung baut sich auf', 'Sie entlädt sich ruckartig als Erdbeben'],
            model: 'Rund um den Pazifik verlaufen Plattengrenzen, der sogenannte Pazifische Feuerring. Dort bewegen sich Platten aufeinander zu, und die schweren ozeanischen Platten tauchen unter die Nachbarplatten ab (Subduktion). Dabei verhaken sich die Platten immer wieder. Im Gestein baut sich Spannung auf. Wird sie zu groß, bricht das Gestein ruckartig, und die Energie wird als Erdbeben frei. Weil die Subduktionszonen sehr lang sind und sich dort große Spannungen aufbauen, sind die Beben dort besonders häufig und stark.' }
        ]
      }
    ]
  });
})();
