GEO.unit({
  id: 'platten', icon: '🧱', color: '#F4A9A8',
  title: 'Plattentektonik',
  blurb: 'Wo die Platten liegen und was an ihren Grenzen passiert',
  sheet: {
    intro: 'Die feste Gesteinshülle der Erde ist in Platten zerbrochen. Sie bewegen sich wenige Zentimeter pro Jahr – und an ihren Grenzen passiert fast alles Spannende: Gebirge, Vulkane, Erdbeben.',
    facts: [
      ['Lithosphäre', 'Die feste Gesteinshülle der Erde: Erdkruste plus oberster, fester Teil des Erdmantels. Sie ist in Platten zerbrochen.'],
      ['Asthenosphäre', 'Die zähplastische Fließzone darunter. Auf ihr bewegen sich die Platten.'],
      ['Lithosphärenplatten', 'Sieben große Platten (Eurasische, Afrikanische, Nordamerikanische, Südamerikanische, Pazifische, Indisch-Australische, Antarktische) und mehrere kleine, zum Beispiel die Nazca-Platte.'],
      ['Antrieb', 'Konvektionsströme im Erdmantel: Heißes Material steigt auf, kühlt ab und sinkt wieder. Diese Strömungen nehmen die Platten mit – wenige Zentimeter pro Jahr.'],
      ['Divergierende Plattengrenze', 'Platten bewegen sich auseinander. Magma steigt auf und bildet neue ozeanische Kruste. Es entstehen mittelozeanische Rücken (Mittelatlantischer Rücken, Island) oder Grabenbrüche (Ostafrika).'],
      ['Konvergierende Plattengrenze', 'Platten bewegen sich aufeinander zu. Die schwerere ozeanische Platte taucht ab (Subduktion): Tiefseerinne, Erdbeben, Vulkane, Faltengebirge (Anden). Stoßen zwei Kontinente zusammen, falten sie sich zu einem Hochgebirge auf (Himalaya).'],
      ['Konservative Plattengrenze', 'Platten gleiten aneinander vorbei (Transformstörung). Kruste entsteht nicht und wird nicht zerstört. Die Platten verhaken sich – es folgen starke Erdbeben, aber kein Vulkanismus. Beispiel: San-Andreas-Verwerfung in Kalifornien.'],
      ['Subduktion', 'Abtauchen einer Platte unter eine andere. In der Tiefe schmilzt Gestein auf, Magma steigt auf und speist Vulkane.'],
      ['Ozeanbodenspreizung', 'An den mittelozeanischen Rücken wächst der Ozeanboden nach beiden Seiten. Deshalb ist er am Rücken am jüngsten.']
    ],
    merk: [
      'divergierend = auseinander ← →, konvergierend = aufeinander zu → ←, konservativ = aneinander vorbei ⇄.',
      'Divergierend: Kruste entsteht. Konvergierend: Kruste wird verschluckt. Konservativ: weder noch.',
      'Erdbeben gibt es an allen drei Grenzen. Vulkane nur an divergierenden Grenzen und an Subduktionszonen.',
      'Ozeanische Kruste ist schwerer als kontinentale – deshalb taucht immer sie ab.',
      'Deutschland liegt auf der Eurasischen Platte.'
    ],
    figs: [
      { d: 'platten', cap: 'Die großen Lithosphärenplatten (stark vereinfacht)' },
      { d: 'divergent', cap: 'Divergierend: Platten driften auseinander' },
      { d: 'konvergent', cap: 'Konvergierend: Eine Platte taucht ab (Subduktion)' },
      { d: 'konservativ', cap: 'Konservativ: Platten gleiten aneinander vorbei' }
    ]
  },
  lessons: [
    {
      title: 'Platten und ihr Antrieb',
      qs: [
        { t: 'mc', q: 'Was ist die Lithosphäre?',
          o: ['Die feste Gesteinshülle aus Erdkruste und oberstem Erdmantel', 'Die Lufthülle der Erde', 'Der flüssige äußere Erdkern', 'Die Fließzone im Erdmantel'], a: 0,
          w: 'Die Lithosphäre ist rund 100 km dick und in Platten zerbrochen.' },
        { t: 'type', q: 'Wie heißt die zähplastische Fließzone, auf der sich die Platten bewegen?', accept: ['Asthenosphäre', 'Asthenosphaere', 'Astenosphäre'],
          w: 'Die Asthenosphäre liegt direkt unter der Lithosphäre im oberen Erdmantel.' },
        { t: 'mc', q: 'Was treibt die Bewegung der Platten an?',
          o: ['Konvektionsströme im Erdmantel', 'Die Anziehungskraft des Mondes', 'Der Wind über den Ozeanen', 'Der Umlauf der Erde um die Sonne'], a: 0,
          w: 'Heißes Mantelmaterial steigt auf, kühlt ab und sinkt wieder. Diese Strömungen nehmen die Platten mit.' },
        { t: 'mc', q: 'Wie schnell bewegen sich die Platten?',
          o: ['Wenige Zentimeter pro Jahr', 'Wenige Meter pro Tag', 'Mehrere Kilometer pro Jahr', 'Gar nicht mehr'], a: 0,
          w: 'Etwa so schnell, wie Fingernägel wachsen. In Millionen Jahren kommen so Tausende Kilometer zusammen.' },
        { t: 'label', d: 'platten', target: 'pazifik', w: 'Die Pazifische Platte ist die größte Platte. Sie besteht fast nur aus Ozeanboden.' },
        { t: 'tap', d: 'platten', target: 'afrika', q: 'Tippe auf die Afrikanische Platte.', w: 'Die Afrikanische Platte reicht im Westen bis zum Mittelatlantischen Rücken.' },
        { t: 'tf', q: 'Deutschland liegt auf der Eurasischen Platte.', a: true,
          w: 'Die Eurasische Platte trägt Europa und den größten Teil Asiens.' },
        { t: 'cloze', text: 'Im Erdmantel steigt {0} Material auf, kühlt ab und {1} wieder. Diese {2} bewegen die Platten.',
          blanks: ['heißes', 'sinkt', 'Konvektionsströme'], extra: ['kaltes', 'Gezeiten', 'gefriert'] },
        { t: 'label', d: 'platten', target: 'nazca', w: 'Die Nazca-Platte liegt vor der Westküste Südamerikas. Sie taucht unter den Kontinent ab.' }
      ]
    },
    {
      title: 'Die drei Plattengrenzen',
      qs: [
        { t: 'match', q: 'Was passiert an welcher Plattengrenze?',
          pairs: [['divergierend', 'Platten bewegen sich auseinander'], ['konvergierend', 'Platten bewegen sich aufeinander zu'], ['konservativ', 'Platten gleiten aneinander vorbei']] },
        { t: 'sort', q: 'Welche Art von Plattengrenze ist das?', buckets: ['konvergierend', 'divergierend', 'konservativ'],
          items: [['Anden', 0], ['Himalaya', 0], ['Japan', 0], ['Mittelatlantischer Rücken', 1], ['Island', 1], ['Ostafrikanischer Graben', 1], ['San-Andreas-Verwerfung', 2]] },
        { t: 'mc', q: 'Was bedeutet Subduktion?',
          o: ['Eine Platte taucht unter eine andere ab', 'Zwei Platten entfernen sich voneinander', 'Magma erstarrt am Meeresboden', 'Ein Kontinent zerbricht'], a: 0,
          w: 'Subduktion gibt es an konvergierenden Plattengrenzen.' },
        { t: 'mc', q: 'Eine ozeanische und eine kontinentale Platte stoßen zusammen. Welche taucht ab – und warum?',
          o: ['Die ozeanische, weil sie schwerer (dichter) ist', 'Die kontinentale, weil sie dicker ist', 'Immer die kleinere Platte', 'Keine, beide falten sich auf'], a: 0,
          w: 'Ozeanische Kruste besteht aus schwerem Basalt, kontinentale aus leichterem Granit.' },
        { t: 'label', d: 'konvergent', target: 'rinne', w: 'Wo die ozeanische Platte abtaucht, entsteht eine Tiefseerinne.' },
        { t: 'tap', d: 'divergent', target: 'ruecken', q: 'Tippe auf den Mittelozeanischen Rücken.', w: 'Am Rücken steigt Magma auf und bildet neuen Ozeanboden.' },
        { t: 'tf', q: 'An einer konservativen Plattengrenze entsteht neue Kruste.', a: false,
          w: 'Konservativ heißt „erhaltend“: Kruste wird weder gebildet noch zerstört.' },
        { t: 'mc', q: 'Warum gibt es an der San-Andreas-Verwerfung starke Erdbeben, aber keine Vulkane?',
          o: ['Die Platten verhaken sich beim Vorbeigleiten, aber es steigt kein Magma auf', 'Die Kruste ist dort zu dick für Magma', 'Alle Vulkane dort sind erloschen', 'Dort taucht eine Platte sehr tief ab'], a: 0,
          w: 'Magma entsteht bei Subduktion oder steigt an auseinanderdriftenden Platten auf. Beides fehlt an einer Transformstörung.' },
        { t: 'sort', q: 'Was entsteht an welcher Plattengrenze?', buckets: ['konvergierend', 'divergierend'],
          items: [['Tiefseerinne', 0], ['Faltengebirge', 0], ['Inselbogen', 0], ['Mittelozeanischer Rücken', 1], ['neuer Ozeanboden', 1], ['Grabenbruch', 1]] },
        { t: 'label', d: 'konservativ', target: 'stoerung', w: 'An der Transformstörung gleiten die Platten aneinander vorbei.' }
      ]
    },
    {
      title: 'Plattentektonik auf KA-Niveau',
      qs: [
        { t: 'material',
          mat: { kind: 'fig', title: 'M1: Platten und ihre Bewegungsrichtung', d: 'platten', o: { arrows: true, spots: ['A', 'B', 'C'] },
            key: 'Pfeile: Bewegungsrichtung der Platten · A, B, C: ausgewählte Plattengrenzen', src: 'stark vereinfacht' },
          parts: [
            { t: 'mc', q: 'Welche Art von Plattengrenze liegt bei A (Island)?', o: ['divergierend', 'konvergierend', 'konservativ'], a: 0,
              w: 'Bei Island driften die Nordamerikanische und die Eurasische Platte auseinander.' },
            { t: 'mc', q: 'Bei B bewegen sich Nazca-Platte und Südamerikanische Platte aufeinander zu. Was ist die Folge?',
              o: ['Die Nazca-Platte taucht ab; es entstehen Tiefseerinne, Anden und Vulkane', 'Es bildet sich ein mittelozeanischer Rücken',
                'Die Platten gleiten folgenlos aneinander vorbei', 'Südamerika zerbricht in zwei Teile'], a: 0,
              w: 'Konvergierende Grenze mit Subduktion: Die schwerere ozeanische Platte taucht unter den Kontinent.' },
            { t: 'mc', q: 'Welche Art von Plattengrenze liegt bei C (Kalifornien)?', o: ['konservativ', 'divergierend', 'konvergierend'], a: 0,
              w: 'San-Andreas-Verwerfung: Pazifische und Nordamerikanische Platte gleiten aneinander vorbei.' }
          ] },
        { t: 'material',
          mat: { kind: 'table', title: 'M2: Alter des Ozeanbodens im Atlantik', head: ['Entfernung vom Mittelatlantischen Rücken', 'Alter des Ozeanbodens'],
            rows: [['0 km', 'entsteht gerade'], ['500 km', 'ca. 25 Mio. Jahre'], ['1000 km', 'ca. 50 Mio. Jahre'], ['2000 km', 'ca. 100 Mio. Jahre']],
            src: 'Modellrechnung: Der Ozeanboden wächst um 2 cm pro Jahr nach jeder Seite' },
          parts: [
            { t: 'mc', q: 'Beschreibe den Zusammenhang in der Tabelle.',
              o: ['Je weiter vom Rücken entfernt, desto älter ist der Ozeanboden', 'Je weiter vom Rücken entfernt, desto jünger ist der Ozeanboden',
                'Der Ozeanboden ist überall gleich alt', 'Am Rücken ist der Ozeanboden am ältesten'], a: 0,
              w: 'Das Alter nimmt gleichmäßig zu: 500 km mehr bedeuten 25 Millionen Jahre mehr.' },
            { t: 'mc', q: 'Wie lässt sich das erklären?',
              o: ['Am Rücken entsteht ständig neue Kruste und schiebt die ältere nach außen', 'Am Rücken taucht alte Kruste ab',
                'Der Ozeanboden wächst von den Küsten her', 'Vulkane an der Küste erzeugen den Ozeanboden'], a: 0,
              w: 'Das ist die Ozeanbodenspreizung an einer divergierenden Plattengrenze.' },
            { t: 'num', q: 'Wie alt wäre der Ozeanboden nach diesem Modell in 3000 km Entfernung?', a: 150, unit: 'Mio. Jahre',
              w: 'Je 500 km kommen 25 Millionen Jahre dazu: 3000 km entsprechen 150 Millionen Jahren.' }
          ] },
        { t: 'label', d: 'divergent', target: 'magma', w: 'Zwischen den auseinanderdriftenden Platten steigt Magma auf und erstarrt zu neuer Kruste.' },
        { t: 'mc', q: 'Der Himalaya entstand an einer konvergierenden Plattengrenze – trotzdem gibt es dort kaum Vulkane. Warum?',
          o: ['Zwei kontinentale Platten stoßen zusammen; keine taucht tief ab und schmilzt auf', 'Der Himalaya ist zu hoch für Vulkane',
            'Dort ist es zu kalt für Magma', 'Die Platten gleiten dort aneinander vorbei'], a: 0,
          w: 'Kontinentale Kruste ist zu leicht zum Abtauchen. Die Platten schieben sich zusammen und falten sich auf.' },
        { t: 'tf', q: 'Weil an den mittelozeanischen Rücken ständig neue Kruste entsteht, wird die Erde immer größer.', a: false,
          w: 'An den Subduktionszonen wird genauso viel Kruste wieder verschluckt und aufgeschmolzen.' },
        { t: 'order', q: 'Ordne den Ablauf an einer Subduktionszone.',
          items: ['Zwei Platten bewegen sich aufeinander zu', 'Die ozeanische Platte taucht unter die kontinentale ab', 'In der Tiefe schmilzt Gestein teilweise auf',
            'Magma steigt auf', 'An der Oberfläche brechen Vulkane aus'] },
        { t: 'explain', op: 'Erkläre', q: 'Erkläre mithilfe des Blockbildes die Entstehung der Anden und ihrer Vulkane.', fig: { d: 'konvergent' },
          points: ['Nazca-Platte (ozeanisch) und Südamerikanische Platte (kontinental) bewegen sich aufeinander zu',
            'Die schwerere ozeanische Platte taucht ab (Subduktion); es entsteht eine Tiefseerinne', 'Der Rand des Kontinents wird gestaucht und aufgefaltet: Faltengebirge',
            'In der Tiefe schmilzt Gestein auf, Magma steigt auf: Vulkane', 'Die Platten verhaken sich beim Abtauchen: Erdbeben'],
          model: 'Vor der Westküste Südamerikas bewegen sich die ozeanische Nazca-Platte und die kontinentale Südamerikanische Platte aufeinander zu (konvergierende Plattengrenze). Die schwerere ozeanische Platte taucht unter den Kontinent ab – das nennt man Subduktion. An der Abtauchstelle entsteht eine Tiefseerinne. Der Rand des Kontinents wird gestaucht und zu einem Faltengebirge aufgefaltet: den Anden. In der Tiefe schmilzt Gestein auf. Das Magma steigt auf und speist die Vulkane der Anden. Weil sich die Platten immer wieder verhaken, kommt es außerdem zu starken Erdbeben.',
          tip: 'Fachbegriffe, die Punkte bringen: konvergierend, Subduktion, Tiefseerinne, Faltengebirge.' },
        { t: 'explain', op: 'Vergleiche', q: 'Vergleiche divergierende und konvergierende Plattengrenzen.',
          points: ['Gemeinsamkeit: An beiden gibt es Erdbeben und Vulkanismus', 'Bewegung: auseinander – aufeinander zu', 'Kruste: wird neu gebildet – wird verschluckt und aufgeschmolzen',
            'Formen: mittelozeanischer Rücken, Grabenbruch – Tiefseerinne, Faltengebirge', 'Beispiele: Mittelatlantischer Rücken, Island – Anden, Japan'],
          model: 'An beiden Plattengrenzen treten Erdbeben und Vulkanismus auf. An divergierenden Grenzen bewegen sich die Platten auseinander; Magma steigt auf und bildet neue Kruste. Dabei entstehen mittelozeanische Rücken oder Grabenbrüche, zum Beispiel der Mittelatlantische Rücken mit Island. An konvergierenden Grenzen bewegen sich die Platten dagegen aufeinander zu. Die schwerere Platte taucht ab und wird aufgeschmolzen, Kruste wird also zerstört. Hier entstehen Tiefseerinnen und Faltengebirge wie die Anden. Insgesamt gleichen sich Neubildung und Zerstörung von Kruste aus.',
          tip: 'Vergleichen: erst Gemeinsamkeiten, dann Unterschiede nach Kriterien, am Ende ein Fazit.' }
      ]
    }
  ]
});
