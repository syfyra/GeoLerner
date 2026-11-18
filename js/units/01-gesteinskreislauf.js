(function () {
  'use strict';

  var PROZESSE = ['erstarrung', 'verwitterung', 'diagenese', 'metamorphose', 'aufschmelzung'];
  var GESTEINE = ['magma', 'magmatit', 'sediment', 'sedimentit', 'metamorphit'];

  GEO.unit({
    id: 'gestein', icon: '🪨', color: '#E0BE84',
    title: 'Gesteinskreislauf',
    blurb: 'Erstarren, abtragen, umwandeln, aufschmelzen – und wieder von vorn',
    sheet: {
      intro: 'Kein Gestein bleibt für immer, wie es ist. Über Millionen Jahre wird jedes Gestein abgetragen, umgewandelt oder aufgeschmolzen – und zu einem neuen. Das ist der Gesteinskreislauf.',
      facts: [
        ['Gestein', 'Festes Gemenge aus Mineralen. Granit besteht zum Beispiel aus Feldspat, Quarz und Glimmer.'],
        ['Magmatisches Gestein (Erstarrungsgestein)', 'Entsteht, wenn Magma abkühlt und erstarrt. In der Tiefe langsam: Tiefengestein mit großen Kristallen (Granit). An der Oberfläche schnell: Ergussgestein mit winzigen Kristallen (Basalt).'],
        ['Sedimentgestein (Ablagerungsgestein)', 'Entsteht aus abgelagertem Material, das unter dem Druck neuer Schichten verfestigt wird. Erkennbar an Schichten, oft mit Fossilien. Beispiele: Sandstein, Kalkstein, Tonstein.'],
        ['Metamorphes Gestein (Umwandlungsgestein)', 'Entsteht, wenn Gestein in der Tiefe unter hohem Druck und hoher Temperatur umgewandelt wird – ohne zu schmelzen. Beispiele: Marmor (aus Kalkstein), Gneis (aus Granit), Schiefer (aus Tonstein).'],
        ['Verwitterung', 'Gestein wird an der Erdoberfläche durch Temperaturwechsel, Frost, Wasser und Pflanzen zerkleinert und zersetzt.'],
        ['Abtragung (Erosion) und Transport', 'Wasser, Wind und Eis tragen das gelockerte Material ab und transportieren es weiter.'],
        ['Ablagerung (Sedimentation)', 'Wo die Transportkraft nachlässt, bleibt das Material liegen – in Seen, an Flussmündungen und im Meer.'],
        ['Aufschmelzung', 'Gelangt Gestein sehr tief ins Erdinnere, schmilzt es zu Magma. Der Kreislauf beginnt von vorn.'],
        ['Endogene und exogene Kräfte', 'Endogen = aus dem Erdinneren (Vulkanismus, Plattenbewegung, Gebirgsbildung). Exogen = von außen (Verwitterung, Abtragung und Ablagerung durch Wasser, Wind und Eis).']
      ],
      merk: [
        'Drei Gesteinsgruppen: magmatisch (erstarrt), Sediment (abgelagert), metamorph (umgewandelt).',
        'Sediment-Kette: Verwitterung → Abtragung → Transport → Ablagerung → Verfestigung.',
        'Langsam abgekühlt = große Kristalle (Granit). Schnell abgekühlt = winzige Kristalle (Basalt).',
        'Der Kreislauf hat keinen Anfang und kein Ende. Und es gibt Abkürzungen: Jedes Gestein kann verwittern, umgewandelt oder aufgeschmolzen werden.',
        'Zusatz: Die Verfestigung von Sedimenten heißt in der Fachsprache Diagenese.'
      ],
      figs: [{ d: 'kreislauf', nolegend: true, cap: 'Der Gesteinskreislauf' }]
    },
    lessons: [
      {
        title: 'Die drei Gesteinsgruppen',
        qs: [
          { t: 'mc', q: 'In welche drei Gruppen teilt man Gesteine nach ihrer Entstehung ein?',
            o: ['Magmatische Gesteine, Sedimentgesteine, metamorphe Gesteine', 'Harte, weiche und flüssige Gesteine', 'Vulkanische, ozeanische und kontinentale Gesteine', 'Granit, Basalt und Marmor'], a: 0,
            w: 'Entscheidend ist die Entstehung: erstarrt, abgelagert oder umgewandelt.' },
          { t: 'match', q: 'Wie entsteht welche Gesteinsgruppe?',
            pairs: [['Magmatisches Gestein', 'aus erstarrtem Magma'], ['Sedimentgestein', 'aus abgelagertem, verfestigtem Material'], ['Metamorphes Gestein', 'durch Druck und Hitze umgewandelt']] },
          { t: 'tf', q: 'Granit ist ein Sedimentgestein.', a: false,
            w: 'Granit ist ein magmatisches Tiefengestein: Er ist langsam in der Tiefe erstarrt.' },
          { t: 'sort', q: 'Zu welcher Gesteinsgruppe gehört das Gestein?', buckets: ['magmatisch', 'Sediment', 'metamorph'],
            items: [['Granit', 0], ['Basalt', 0], ['Sandstein', 1], ['Kalkstein', 1], ['Marmor', 2], ['Gneis', 2]] },
          { t: 'type', q: 'Wie heißt geschmolzenes Gestein im Erdinneren?', accept: ['Magma'],
            w: 'Im Erdinneren heißt die Schmelze Magma. Tritt sie an der Oberfläche aus, nennt man sie Lava.' },
          { t: 'cloze', text: 'Magmatische Gesteine entstehen, wenn {0} abkühlt und {1}. Geschieht das langsam in der Tiefe, bilden sich {2} Kristalle.',
            blanks: ['Magma', 'erstarrt', 'große'], extra: ['verwittert', 'winzige', 'Sand'] },
          { t: 'mc', q: 'Welches Gestein ist ein Ergussgestein, also schnell an der Erdoberfläche erstarrt?',
            o: ['Basalt', 'Granit', 'Sandstein', 'Marmor'], a: 0,
            w: 'Basalt erstarrt schnell aus Lava und hat deshalb nur winzige Kristalle. Granit erstarrt langsam in der Tiefe.' },
          { t: 'label', d: 'kreislauf', target: 'metamorphit', not: PROZESSE, q: 'Welches Gestein fehlt hier im Kreislauf?',
            w: 'Unter hohem Druck und hoher Temperatur wird Gestein umgewandelt: Es entsteht metamorphes Gestein.' },
          { t: 'mc', q: 'Woran erkennst du ein Sedimentgestein besonders gut?',
            o: ['An Schichten und oft an Fossilien', 'An großen, glitzernden Kristallen', 'An eingeschlossenen Gasblasen', 'An seiner dunklen Farbe'], a: 0,
            w: 'Sedimente lagern sich Schicht für Schicht ab. Dabei werden oft Reste von Lebewesen eingebettet.' }
        ]
      },
      {
        title: 'Vom Fels zum Sandkorn und zurück',
        qs: [
          { t: 'order', q: 'Wie entsteht ein Sedimentgestein? Bringe die Schritte in die richtige Reihenfolge.',
            items: ['Verwitterung zerkleinert das Gestein', 'Wasser, Wind oder Eis tragen das Material ab und transportieren es',
              'Das Material lagert sich in Schichten ab', 'Der Druck neuer Schichten verfestigt es zu Gestein'] },
          { t: 'mc', q: 'Was passiert bei der Metamorphose?',
            o: ['Gestein wird durch hohen Druck und hohe Temperatur umgewandelt, ohne zu schmelzen', 'Gestein schmilzt vollständig zu Magma',
              'Gestein wird von Flüssen abgetragen', 'Lockeres Material wird zu Gestein verfestigt'], a: 0,
            w: 'Metamorphose heißt Umwandlung. Das Gestein bleibt dabei fest, nur Gefüge und Minerale verändern sich.' },
          { t: 'tf', q: 'Bei der Metamorphose schmilzt das Gestein vollständig auf.', a: false,
            w: 'Dann wäre es Magma. Bei der Metamorphose bleibt das Gestein fest.' },
          { t: 'match', q: 'Aus welchem Gestein entsteht welches metamorphe Gestein?',
            pairs: [['Kalkstein', 'Marmor'], ['Granit', 'Gneis'], ['Tonstein', 'Schiefer']] },
          { t: 'mc', q: 'Granit hat große, gut sichtbare Kristalle. Was verrät das über seine Entstehung?',
            o: ['Das Magma ist langsam in der Tiefe abgekühlt', 'Die Lava ist sehr schnell an der Luft erstarrt', 'Er wurde im Meer abgelagert', 'Er wurde von Gletschern geformt'], a: 0,
            w: 'Je langsamer die Abkühlung, desto mehr Zeit haben die Kristalle zu wachsen.' },
          { t: 'tap', d: 'kreislauf', hide: 'prozesse', target: 'diagenese', q: 'Tippe auf den Pfeil, an dem aus lockeren Sedimenten festes Sedimentgestein wird.',
            w: 'Der Druck der darüberliegenden Schichten presst die Sedimente zusammen und verfestigt sie.' },
          { t: 'sort', q: 'Endogen (aus dem Erdinneren) oder exogen (von außen)?', buckets: ['endogen', 'exogen'],
            items: [['Vulkanausbruch', 0], ['Gebirgsbildung', 0], ['Aufschmelzung in der Tiefe', 0], ['Verwitterung durch Frost', 1], ['Abtragung durch einen Fluss', 1], ['Ablagerung im Meer', 1]] },
          { t: 'multi', q: 'Wodurch wird verwittertes Material abgetragen und transportiert?',
            o: ['Fließendes Wasser', 'Wind', 'Gletschereis', 'Magma'], a: [0, 1, 2],
            w: 'Wasser, Wind und Eis sind die exogenen Kräfte, die Material abtragen und verfrachten.' },
          { t: 'type', q: 'Wie nennt man das Zerkleinern und Zersetzen von Gestein an der Erdoberfläche?', accept: ['Verwitterung'],
            w: 'Verwitterung lockert das Gestein. Erst danach kann es abgetragen werden.' }
        ]
      },
      {
        title: 'Kreislauf auf KA-Niveau',
        qs: [
          { t: 'material',
            mat: { kind: 'table', title: 'M1: Vier Gesteinsproben', head: ['Probe', 'Beobachtung'],
              rows: [['A', 'große, gut sichtbare Kristalle; keine Schichten'], ['B', 'deutliche Schichten; Abdruck einer Muschel'],
                ['C', 'gebändert und sehr hart; keine Fossilien'], ['D', 'dunkel, sehr feinkörnig; kleine Gasblasen']] },
            parts: [
              { t: 'mc', q: 'Zu welcher Gesteinsgruppe gehört Probe B?', o: ['Sedimentgestein', 'magmatisches Gestein', 'metamorphes Gestein'], a: 0,
                w: 'Schichten und Fossilien sind typisch für Sedimentgesteine.' },
              { t: 'mc', q: 'Welche Probe ist schnell an der Erdoberfläche aus Lava erstarrt?', o: ['Probe D', 'Probe A', 'Probe B', 'Probe C'], a: 0,
                w: 'Feine Körnung und Gasblasen zeigen: schnell erstarrte Lava, zum Beispiel Basalt.' },
              { t: 'mc', q: 'Probe C ist gebändert, sehr hart und fossilfrei. Was ist am wahrscheinlichsten?',
                o: ['Ein metamorphes Gestein wie Gneis', 'Ein Sedimentgestein wie Sandstein', 'Ein Ergussgestein wie Basalt'], a: 0,
                w: 'Die Bänderung entsteht, wenn sich Minerale unter hohem Druck neu ausrichten.' }
            ] },
          { t: 'label', d: 'kreislauf', target: 'aufschmelzung', not: GESTEINE, q: 'Welcher Vorgang fehlt an diesem Pfeil?',
            w: 'In großer Tiefe schmilzt Gestein zu Magma. Damit schließt sich der Kreislauf.' },
          { t: 'mc', q: 'Ein Granitblock liegt im Hochgebirge an der Oberfläche. Auf welchem Weg kann aus ihm Sandstein werden?',
            o: ['Verwitterung, Abtragung, Ablagerung, Verfestigung', 'Aufschmelzung, Abkühlung, Erstarrung', 'Umwandlung durch Druck und Hitze', 'Gar nicht – Granit bleibt immer Granit'], a: 0,
            w: 'Sandstein ist ein Sedimentgestein. Der Weg dorthin führt immer über Verwitterung, Abtragung und Ablagerung.' },
          { t: 'tf', q: 'Der Gesteinskreislauf hat einen festen Anfang und ein festes Ende.', a: false,
            w: 'Es ist ein Kreislauf: Jedes Gestein kann wieder verwittern, umgewandelt oder aufgeschmolzen werden.' },
          { t: 'mc', q: 'Warum findet man in Granit keine Fossilien, in Kalkstein aber häufig?',
            o: ['Granit erstarrt aus glühendem Magma, Kalkstein entsteht aus Ablagerungen mit Resten von Lebewesen', 'Granit ist viel älter als alle Lebewesen',
              'In Kalkstein leben noch heute Tiere', 'Granit kommt nur in der Tiefsee vor'], a: 0,
            w: 'In über 700 °C heißer Schmelze bleibt nichts erhalten. In Meeresablagerungen werden Schalen und Skelette dagegen eingebettet.' },
          { t: 'multi', q: 'Welche Aussagen zum Gesteinskreislauf stimmen?',
            o: ['Auch Sedimentgestein kann wieder verwittern', 'Metamorphes Gestein kann aufgeschmolzen werden', 'Er läuft in wenigen Jahren ab', 'Nur magmatisches Gestein kann verwittern'], a: [0, 1],
            w: 'Der Kreislauf dauert Millionen Jahre, und jede Gesteinsgruppe kann jeden Weg nehmen.' },
          { t: 'explain', op: 'Beschreibe', q: 'Beschreibe den Gesteinskreislauf mithilfe der Skizze. Beginne beim Magma.', fig: { d: 'kreislauf' },
            points: ['Magma kühlt ab und erstarrt zu magmatischem Gestein', 'An der Oberfläche: Verwitterung, Abtragung, Transport und Ablagerung als Sedimente',
              'Sedimente werden zu Sedimentgestein verfestigt', 'In der Tiefe: Umwandlung durch Druck und Hitze zu metamorphem Gestein',
              'Aufschmelzung zu Magma – der Kreislauf schließt sich'],
            model: 'Magma kühlt ab und erstarrt zu magmatischem Gestein. Gelangt dieses an die Erdoberfläche, wird es durch Verwitterung zerkleinert, von Wasser, Wind oder Eis abgetragen, transportiert und als Sediment abgelagert. Unter dem Druck neuer Schichten verfestigen sich die Sedimente zu Sedimentgestein. Gerät dieses in größere Tiefe, wird es durch hohen Druck und hohe Temperatur zu metamorphem Gestein umgewandelt. In noch größerer Tiefe schmilzt es zu Magma auf – der Kreislauf beginnt von vorn.',
            tip: 'Beim Beschreiben der Reihe nach vorgehen und jeden Pfeil mit dem Fachbegriff benennen.' },
          { t: 'explain', op: 'Erkläre', q: 'Granit und Basalt entstehen beide aus Gesteinsschmelze. Erkläre, warum Granit große und Basalt nur winzige Kristalle hat.',
            points: ['Granit erstarrt in der Tiefe (Tiefengestein)', 'Dort kühlt das Magma sehr langsam ab', 'Die Kristalle haben viel Zeit zu wachsen: große Kristalle',
              'Basalt erstarrt an der Erdoberfläche aus Lava (Ergussgestein)', 'Schnelle Abkühlung: keine Zeit zum Wachsen, winzige Kristalle'],
            model: 'Granit ist ein Tiefengestein. Das Magma bleibt in der Erdkruste stecken und kühlt dort sehr langsam ab. Die Kristalle haben deshalb viel Zeit zu wachsen und werden groß. Basalt ist ein Ergussgestein: Die Lava tritt an der Erdoberfläche aus und kühlt an Luft oder Wasser sehr schnell ab. Den Kristallen bleibt keine Zeit zum Wachsen, deshalb ist Basalt feinkörnig.',
            tip: 'Erklären heißt: Ursache (Abkühlgeschwindigkeit) und Folge (Kristallgröße) verbinden.' }
        ]
      }
    ]
  });
})();
