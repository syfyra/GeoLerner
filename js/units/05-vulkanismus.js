GEO.unit({
  id: 'vulkan', icon: '🌋', color: '#FFA988',
  title: 'Vulkanismus',
  blurb: 'Magma, Schlot und Krater – und warum manche Vulkane explodieren',
  sheet: {
    intro: 'Ein Vulkan ist ein Ventil der Erde: Hier gelangen Magma, Gase und Gesteinsbrocken an die Oberfläche. Wie heftig das abläuft, hängt vor allem davon ab, wie zäh das Magma ist.',
    facts: [
      ['Vulkan', 'Stelle der Erdoberfläche, an der Magma, Gase und Gesteinsbrocken aus dem Erdinneren austreten.'],
      ['Magma und Lava', 'Magma ist die gashaltige Gesteinsschmelze im Erdinneren. Sobald sie an der Oberfläche austritt, heißt sie Lava.'],
      ['Aufbau', 'Magmakammer (Speicher in der Tiefe) → Schlot (Aufstiegskanal) → Krater (Öffnung). Dazu oft Nebenkrater an den Flanken.'],
      ['Förderprodukte', 'Lava, Asche und Gesteinsbrocken sowie Gase wie Wasserdampf, Kohlenstoffdioxid und Schwefeldioxid.'],
      ['Schichtvulkan', 'Steiler Kegel aus abwechselnden Lava- und Ascheschichten. Zähflüssiges, gasreiches Magma verstopft den Schlot – der Ausbruch ist explosiv. Typisch für Subduktionszonen. Beispiele: Vesuv, Ätna, Fuji, Mount St. Helens.'],
      ['Schildvulkan', 'Flach und breit. Dünnflüssige, gasarme Lava fließt ruhig aus und weit. Beispiele: Mauna Loa und Kilauea auf Hawaii.'],
      ['Verbreitung', 'Die meisten Vulkane liegen an Plattengrenzen: an Subduktionszonen (Pazifischer Feuerring) und an mittelozeanischen Rücken (Island).'],
      ['Gefahren', 'Lavaströme, Ascheregen, Glutwolken, Schlammströme, giftige Gase.'],
      ['Nutzen', 'Fruchtbare Böden aus verwitterter Asche, Erdwärme, Rohstoffe und Baustoffe, Tourismus.']
    ],
    merk: [
      'Im Berg Magma, draußen Lava.',
      'Zähflüssig und gasreich = explosiv = Schichtvulkan. Dünnflüssig und gasarm = ruhig = Schildvulkan.',
      'Weg des Magmas: Magmakammer → Schlot → Krater.',
      'Vulkane kündigen sich an: viele kleine Erdbeben, der Berg wölbt sich auf, mehr Gase treten aus.',
      'Zusatz: Hot-Spot-Vulkane wie auf Hawaii liegen mitten in einer Platte über einer ortsfesten, besonders heißen Stelle im Erdmantel.'
    ],
    figs: [{ d: 'vulkan', cap: 'Schichtvulkan im Querschnitt' }, { d: 'schild', cap: 'Zum Vergleich: Schildvulkan' }]
  },
  lessons: [
    {
      title: 'Aufbau eines Vulkans',
      qs: [
        { t: 'mc', q: 'Was ist der Unterschied zwischen Magma und Lava?',
          o: ['Magma ist die Schmelze im Erdinneren, Lava die ausgetretene Schmelze', 'Magma ist kalt, Lava ist heiß',
            'Lava ist die Schmelze im Erdinneren, Magma die ausgetretene', 'Es gibt keinen Unterschied'], a: 0,
          w: 'Merksatz: Im Berg Magma, draußen Lava.' },
        { t: 'label', d: 'vulkan', target: 'kammer', w: 'In der Magmakammer sammelt sich das Magma, bevor es aufsteigt.' },
        { t: 'label', d: 'vulkan', target: 'schlot', w: 'Durch den Schlot steigt das Magma von der Magmakammer zum Krater auf.' },
        { t: 'order', q: 'Welchen Weg nimmt das Magma bei einem Ausbruch?', items: ['Magmakammer', 'Schlot', 'Krater', 'Lavastrom am Hang'] },
        { t: 'tap', d: 'vulkan', target: 'krater', q: 'Tippe auf den Krater.', w: 'Der Krater ist die Öffnung am Gipfel, aus der Lava, Asche und Gase austreten.' },
        { t: 'multi', q: 'Was fördert ein Vulkan bei einem Ausbruch?', o: ['Lava', 'Asche', 'Gase', 'Grundwasser'], a: [0, 1, 2],
          w: 'Vulkane fördern Schmelze (Lava), Lockermaterial (Asche, Gesteinsbrocken) und Gase.' },
        { t: 'type', q: 'Wie heißt der Kanal, durch den das Magma nach oben steigt?', accept: ['Schlot', 'Förderschlot', 'Vulkanschlot'],
          w: 'Der Schlot verbindet Magmakammer und Krater.' },
        { t: 'tf', q: 'Solange die Gesteinsschmelze noch in der Magmakammer ist, nennt man sie Lava.', a: false,
          w: 'Im Erdinneren heißt sie Magma. Lava heißt sie erst, wenn sie ausgetreten ist.' },
        { t: 'tap', d: 'vulkan', target: 'neben', q: 'Tippe auf den Nebenkrater.', w: 'Über einen Seitenschlot kann Magma auch an der Flanke austreten.' }
      ]
    },
    {
      title: 'Vulkantypen und Verbreitung',
      qs: [
        { t: 'sort', q: 'Schichtvulkan oder Schildvulkan?', buckets: ['Schichtvulkan', 'Schildvulkan'],
          items: [['steiler Kegel', 0], ['explosive Ausbrüche', 0], ['zähflüssiges Magma', 0], ['flach und breit', 1], ['ruhig ausfließende Lava', 1], ['dünnflüssige Lava', 1]] },
        { t: 'mc', q: 'Warum brechen Schichtvulkane meist explosiv aus?',
          o: ['Das zähflüssige Magma hält die Gase zurück, bis der Druck zu groß wird', 'Sie liegen höher als andere Vulkane', 'Ihre Lava ist besonders dünnflüssig', 'Sie enthalten kein Gas'], a: 0,
          w: 'Wie bei einer geschüttelten Flasche: Der Druck der Gase entlädt sich schlagartig.' },
        { t: 'mc', fig: { d: 'schild' }, q: 'Welcher Vulkantyp ist hier abgebildet?', o: ['Schildvulkan', 'Schichtvulkan', 'Nebenkrater', 'Faltengebirge'], a: 0,
          w: 'Flache, weit auslaufende Hänge aus dünnflüssiger Lava: ein Schildvulkan.' },
        { t: 'match', q: 'Ordne die Vulkane zu.',
          pairs: [['Vesuv', 'Schichtvulkan in Italien'], ['Mauna Loa', 'Schildvulkan auf Hawaii'], ['Fuji', 'Schichtvulkan in Japan'], ['Mount St. Helens', 'Schichtvulkan in den USA']] },
        { t: 'mc', q: 'Wo liegen die meisten Vulkane der Erde?',
          o: ['An den Plattengrenzen', 'In der Mitte der Kontinente', 'An den Polen', 'Gleichmäßig über die Erde verteilt'], a: 0,
          w: 'Vor allem an Subduktionszonen und an mittelozeanischen Rücken.' },
        { t: 'type', q: 'Wie nennt man den Vulkangürtel rund um den Pazifik?', accept: ['Pazifischer Feuerring', 'Feuerring', 'Ring of Fire', 'Feuergürtel', 'Pazifischer Feuergürtel'],
          w: 'Rund um den Pazifik tauchen Platten ab. Dort liegen etwa drei Viertel aller aktiven Vulkane.' },
        { t: 'multi', q: 'Welche Gefahren gehen von einem Vulkanausbruch aus?', o: ['Glutwolken', 'Ascheregen', 'Schlammströme', 'Fruchtbare Böden'], a: [0, 1, 2],
          w: 'Fruchtbare Böden sind ein Nutzen – sie entstehen, wenn die Asche verwittert.' },
        { t: 'cloze', text: 'Schichtvulkane bestehen aus abwechselnden Schichten von {0} und {1}. Sie entstehen vor allem an {2}.',
          blanks: ['Lava', 'Asche', 'Subduktionszonen'], extra: ['Sand', 'Transformstörungen', 'Eis'], any: [[0, 1]] },
        { t: 'mc', zusatz: true, q: 'Hawaii liegt mitten auf der Pazifischen Platte. Wie entstehen dort die Vulkane?',
          o: ['Über einem Hot Spot: einer ortsfesten, besonders heißen Stelle im Erdmantel', 'Durch Subduktion', 'Durch eine Transformstörung', 'Durch Meteoriteneinschläge'], a: 0,
          w: 'Die Platte wandert über den Hot Spot hinweg. So entsteht nach und nach eine Kette von Vulkaninseln.' }
      ]
    },
    {
      title: 'Vulkanismus auf KA-Niveau',
      qs: [
        { t: 'material',
          mat: { kind: 'table', title: 'M1: Zwei Vulkane im Vergleich', head: ['', 'Vulkan A', 'Vulkan B'],
            rows: [['Form', 'flach, sehr breit', 'steiler Kegel'], ['Lava', 'dünnflüssig, gasarm', 'zähflüssig, gasreich'],
              ['Ausbruch', 'ruhiges Ausfließen', 'explosiv, mit Aschewolke'], ['Lage', 'mitten im Pazifik', 'an einer Subduktionszone']] },
          parts: [
            { t: 'mc', q: 'Welcher Vulkan ist ein Schichtvulkan?', o: ['Vulkan B', 'Vulkan A', 'Beide', 'Keiner von beiden'], a: 0,
              w: 'Steiler Kegel, zähes Magma, explosiver Ausbruch: alles Merkmale des Schichtvulkans.' },
            { t: 'mc', q: 'Welcher Vulkan ist für die Menschen in der Umgebung gefährlicher – und warum?',
              o: ['Vulkan B: Explosive Ausbrüche kommen plötzlich, mit Asche und Glutwolken', 'Vulkan A: Dünnflüssige Lava ist heißer',
                'Vulkan A: Flache Vulkane erkennt man schlechter', 'Beide sind ungefährlich'], a: 0,
              w: 'Vor langsam fließender Lava kann man meist fliehen, vor einer Glutwolke nicht.' },
            { t: 'tf', q: 'Aus der Tabelle folgt: Die Form eines Vulkans hängt damit zusammen, wie zäh seine Lava ist.', a: true,
              w: 'Dünnflüssige Lava fließt weit und baut flache Schilde. Zähe Lava bleibt nahe am Krater und türmt steile Kegel auf.' }
          ] },
        { t: 'material',
          mat: { kind: 'bar', title: 'M2: Wo liegen die aktiven Vulkane?', unit: 'Prozent aller aktiven Vulkane an Land',
            data: [['Pazifischer Feuerring', 75, '75 %'], ['übrige Welt', 25, '25 %']], src: 'gerundet' },
          parts: [
            { t: 'num', q: 'Wie viel Prozent der aktiven Vulkane liegen am Pazifischen Feuerring?', a: 75, unit: '%',
              w: 'Drei von vier aktiven Vulkanen liegen rund um den Pazifik.' },
            { t: 'mc', q: 'Wie lässt sich diese Häufung erklären?',
              o: ['Rund um den Pazifik tauchen Platten ab – dabei entsteht Magma', 'Im Pazifik ist das Wasser besonders warm', 'Dort ist die Erdkruste am dicksten', 'Das ist reiner Zufall'], a: 0,
              w: 'Der Feuerring zeichnet die Subduktionszonen am Rand des Pazifiks nach.' }
          ] },
        { t: 'tap', d: 'vulkan', target: 'lava', q: 'Tippe auf den Lavastrom.', w: 'Die ausgetretene Lava fließt als Lavastrom den Hang hinab.' },
        { t: 'mc', q: 'Am Vesuv leben Hunderttausende Menschen. Was ist KEIN typischer Grund, an einem Vulkan zu siedeln?',
          o: ['Dort gibt es niemals Erdbeben', 'Fruchtbare Böden aus Vulkanasche', 'Einnahmen durch Tourismus', 'Lange Ruhephasen lassen die Gefahr vergessen'], a: 0,
          w: 'Im Gegenteil: Vulkangebiete sind fast immer auch Erdbebengebiete.' },
        { t: 'tf', q: 'Vulkanausbrüche lassen sich meist besser vorhersagen als Erdbeben.', a: true,
          w: 'Sie kündigen sich an: viele kleine Erdbeben, der Berg wölbt sich auf, mehr Gase treten aus.' },
        { t: 'explain', op: 'Vergleiche', q: 'Vergleiche Schichtvulkan und Schildvulkan.',
          points: ['Gemeinsamkeit: Bei beiden steigt Magma durch einen Schlot an die Oberfläche', 'Form: steiler Kegel – flacher, breiter Schild',
            'Lava: zähflüssig und gasreich – dünnflüssig und gasarm', 'Ausbruch: explosiv – ruhiges Ausfließen', 'Aufbau oder Beispiel: Lava- und Ascheschichten (Vesuv) – fast nur Lava (Mauna Loa)'],
          model: 'Bei beiden Vulkantypen steigt Magma aus einer Magmakammer durch einen Schlot an die Oberfläche. Der Schichtvulkan hat die Form eines steilen Kegels. Sein Magma ist zähflüssig und gasreich, deshalb bricht er explosiv aus. Er besteht aus abwechselnden Schichten von Lava und Asche, ein Beispiel ist der Vesuv. Der Schildvulkan ist dagegen flach und sehr breit. Seine Lava ist dünnflüssig und gasarm, sie fließt ruhig aus und weit. Er besteht fast nur aus Lavaschichten, ein Beispiel ist der Mauna Loa auf Hawaii. Die Zähigkeit des Magmas bestimmt also Form und Ausbruchsart.' },
        { t: 'explain', op: 'Erkläre', q: 'Erkläre, warum Menschen trotz der Gefahr in der Nähe von Vulkanen leben.',
          points: ['Verwitterte Asche ergibt sehr fruchtbare Böden: hohe Erträge', 'Erdwärme liefert Energie und Heizwärme', 'Rohstoffe und Baustoffe',
            'Tourismus bringt Arbeitsplätze', 'Ausbrüche sind selten; die Gefahr wird unterschätzt oder es fehlen Alternativen'],
          model: 'Vulkanasche verwittert zu sehr mineralreichen, fruchtbaren Böden, die hohe Ernten ermöglichen. Außerdem lässt sich die Erdwärme zum Heizen und zur Stromerzeugung nutzen, und Vulkangestein liefert Rohstoffe und Baustoffe. Vulkane ziehen Touristen an, was Arbeitsplätze schafft. Weil zwischen zwei Ausbrüchen oft viele Jahrzehnte liegen, wird die Gefahr leicht unterschätzt – und viele Menschen haben dort ihre Heimat und keine Alternative.' },
        { t: 'explain', op: 'Beurteile', q: 'Am Vesuv leben mehr als 600 000 Menschen in der gefährlichsten Zone. Beurteile, ob man das Wohnen dort verbieten sollte.',
          points: ['Dafür: Im Ernstfall sind Hunderttausende in Lebensgefahr', 'Dafür: So viele Menschen lassen sich kaum rechtzeitig in Sicherheit bringen',
            'Dagegen: Heimat, Arbeitsplätze und fruchtbare Böden gingen verloren', 'Alternative: Überwachung, Evakuierungspläne, keine Neubauten in der Gefahrenzone', 'Begründetes Urteil'],
          model: 'Für ein Verbot spricht, dass bei einem Ausbruch Hunderttausende in Lebensgefahr wären und eine Evakuierung so vieler Menschen lange dauert. Dagegen spricht, dass die Menschen dort ihre Heimat, ihre Arbeit und fruchtbare Felder haben; eine Umsiedlung wäre extrem teuer und kaum durchsetzbar. Sinnvoller als ein vollständiges Verbot sind deshalb eine ständige Überwachung des Vulkans, geübte Evakuierungspläne und ein Verbot von Neubauten in der gefährlichsten Zone. So sinkt das Risiko, ohne dass alle ihre Heimat verlieren.',
          tip: 'Beurteilen: Argumente dafür und dagegen abwägen, dann ein klares Urteil mit Begründung.' }
      ]
    }
  ]
});
