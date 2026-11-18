GEO.unit({
  id: 'wegener', icon: '🧩', color: '#B7E2A0',
  title: 'Wegeners Theorie der Plattenverschiebung',
  blurb: 'Ein Puzzle aus Kontinenten – und vier Argumente dafür',
  sheet: {
    intro: 'Alfred Wegener behauptete 1912: Die Kontinente hingen einmal zusammen und sind auseinandergedriftet. Er hatte gute Belege – aber keine Erklärung für den Antrieb.',
    facts: [
      ['Alfred Wegener (1880–1930)', 'Deutscher Meteorologe und Polarforscher. Stellte 1912 seine Theorie der Kontinentalverschiebung vor. Er starb 1930 auf einer Expedition in Grönland.'],
      ['Theorie der Kontinentalverschiebung', 'Alle Kontinente waren einst in einem Urkontinent vereint. Er zerbrach, und die Teile drifteten langsam an ihre heutige Position.'],
      ['Pangäa', 'Der Urkontinent („ganze Erde“). Er begann vor rund 200 Millionen Jahren zu zerbrechen.'],
      ['Argument 1: Küstenverlauf', 'Die Küsten von Südamerika und Afrika passen zusammen wie Puzzleteile.'],
      ['Argument 2: Gesteine und Gebirge', 'Gleich alte Gesteine und Gebirgszüge setzen sich auf der anderen Seite des Atlantiks fort.'],
      ['Argument 3: Fossilien', 'Fossilien derselben Arten liegen auf Kontinenten, die heute ein Ozean trennt – etwa das Süßwasserreptil Mesosaurus in Südamerika und Afrika. Es hätte den Atlantik nie durchschwimmen können.'],
      ['Argument 4: Klimazeugen', 'Gletscherspuren in heute heißen Gebieten (Südafrika, Indien, Südamerika) und Kohle aus tropischen Wäldern in der Antarktis: Die Kontinente müssen früher woanders gelegen haben.'],
      ['Kritik an Wegener', 'Er konnte nicht erklären, welche Kraft die Kontinente bewegt. Außerdem war er Meteorologe und kein Geologe. Viele Forscher glaubten lieber an versunkene Landbrücken.'],
      ['Späte Bestätigung', 'Erst in den 1960er-Jahren bestätigte die Erforschung der Ozeanböden die Bewegung. Daraus entstand die Theorie der Plattentektonik.']
    ],
    merk: [
      'Vier Belege: Küsten – Gesteine – Fossilien – Klima.',
      'Schwachstelle: Der Antrieb fehlte. Den liefert erst die Plattentektonik (Strömungen im Erdmantel).',
      'Wegener: Kontinente pflügen durch den Meeresboden. Heute: Ganze Platten aus Kontinent und Ozeanboden bewegen sich.',
      'Zusatz: 1915 erschien sein Buch „Die Entstehung der Kontinente und Ozeane“. Weitere Fossil-Belege sind der Farn Glossopteris und das Landreptil Lystrosaurus.'
    ],
    figs: [{ d: 'pangaea', cap: 'Wegeners Belege am Beispiel Südamerika und Afrika' }]
  },
  lessons: [
    {
      title: 'Wegener und der Urkontinent',
      qs: [
        { t: 'mc', q: 'Was behauptete Alfred Wegener in seiner Theorie?',
          o: ['Die Kontinente waren einst vereint und haben sich langsam verschoben', 'Die Kontinente liegen seit der Entstehung der Erde am selben Ort',
            'Die Erde schrumpft und wirft dabei Falten', 'Die Ozeane sind durch eine große Flut entstanden'], a: 0,
          w: 'Das ist der Kern der Theorie der Kontinentalverschiebung.' },
        { t: 'type', q: 'Wie nannte Wegener den Urkontinent, in dem alle Kontinente vereint waren?', accept: ['Pangäa', 'Pangaea', 'Pangea'],
          w: 'Pangäa bedeutet „ganze Erde“.' },
        { t: 'tf', q: 'Alfred Wegener war von Beruf Geologe.', a: false,
          w: 'Er war Meteorologe und Polarforscher – ein Grund, warum ihn viele Geologen nicht ernst nahmen.' },
        { t: 'mc', q: 'In welchem Jahr stellte Wegener seine Theorie erstmals vor?', o: ['1912', '1812', '1960', '2004'], a: 0,
          w: '1912 hielt er seinen berühmten Vortrag, 1915 folgte das Buch dazu.' },
        { t: 'multi', q: 'Welche Argumente führte Wegener für seine Theorie an?',
          o: ['Die Küsten von Südamerika und Afrika passen zusammen', 'Gleiche Fossilien auf verschiedenen Kontinenten', 'Gleiche Gesteine beiderseits des Atlantiks', 'Satellitenmessungen der Plattenbewegung'], a: [0, 1, 2],
          w: 'Satelliten gab es zu Wegeners Zeit noch nicht. Heute lässt sich die Bewegung damit direkt messen.' },
        { t: 'label', d: 'pangaea', target: 'kueste', q: 'Welchen Beleg zeigen die blauen Linien?',
          w: 'Die Küstenlinien passen wie Puzzleteile zusammen – Wegeners bekanntestes Argument.' },
        { t: 'cloze', text: 'Wegeners Theorie heißt Theorie der {0}. Danach zerbrach der Urkontinent {1}, und die Kontinente {2} auseinander.',
          blanks: ['Kontinentalverschiebung', 'Pangäa', 'drifteten'], extra: ['Gebirgsbildung', 'Atlantis', 'schmolzen'] },
        { t: 'mc', q: 'Welche beiden Kontinente passen an ihren Küsten besonders auffällig zusammen?',
          o: ['Südamerika und Afrika', 'Europa und Australien', 'Asien und Nordamerika', 'Antarktis und Europa'], a: 0,
          w: 'Die Ostküste Südamerikas fügt sich fast lückenlos in die Westküste Afrikas.' }
      ]
    },
    {
      title: 'Die Argumente und die Kritik',
      qs: [
        { t: 'match', q: 'Ordne jedem Argument den passenden Beleg zu.',
          pairs: [['Küstenverlauf', 'Südamerika und Afrika passen wie Puzzleteile'], ['Fossilien', 'Mesosaurus in Südamerika und Afrika'],
            ['Gesteine', 'gleiche Gebirgszüge beiderseits des Atlantiks'], ['Klimazeugen', 'Gletscherspuren in heute heißen Gebieten']] },
        { t: 'mc', q: 'Warum ist der Mesosaurus ein so gutes Argument für Wegener?',
          o: ['Er lebte im Süßwasser und konnte keinen Ozean durchqueren – trotzdem liegen seine Fossilien auf beiden Seiten des Atlantiks',
            'Er konnte fliegen und so alle Kontinente erreichen', 'Er lebt heute noch in Afrika und Südamerika', 'Er war das größte Tier der Erdgeschichte'], a: 0,
          w: 'Wenn das Tier den Atlantik nicht überqueren konnte, müssen die Kontinente damals verbunden gewesen sein.' },
        { t: 'mc', q: 'In Südafrika und Indien fand man Spuren uralter Gletscher. Was folgerte Wegener daraus?',
          o: ['Diese Gebiete lagen früher viel näher am Südpol', 'Die ganze Erde war früher vereist', 'Gletscher entstehen auch in den Tropen', 'Die Funde sind Messfehler'], a: 0,
          w: 'Das Klima eines Ortes hängt von seiner Lage ab. Hat sich das Klima so stark geändert, hat sich die Lage geändert.' },
        { t: 'tf', q: 'Wegener konnte genau erklären, welche Kraft die Kontinente antreibt.', a: false,
          w: 'Das war die größte Schwäche seiner Theorie. Die Kräfte, die er vermutete, sind viel zu schwach.' },
        { t: 'multi', q: 'Warum lehnten die meisten Forscher Wegeners Theorie zunächst ab?',
          o: ['Er konnte den Antrieb der Bewegung nicht erklären', 'Er war kein Geologe', 'Viele hielten versunkene Landbrücken für die bessere Erklärung', 'Seine Fossilfunde waren gefälscht'], a: [0, 1, 2],
          w: 'Die Belege waren echt. Es fehlte der Mechanismus – und Wegener galt als Außenseiter.' },
        { t: 'tap', d: 'pangaea', target: 'fossil', q: 'Tippe auf den Beleg „gleiche Fossilien“.',
          w: 'Die grünen Flächen markieren Fundorte derselben Fossilien auf beiden Kontinenten.' },
        { t: 'mc', q: 'Wann wurde Wegeners Grundidee bestätigt?',
          o: ['In den 1960er-Jahren durch die Erforschung der Ozeanböden', 'Noch zu seinen Lebzeiten', 'Schon im Mittelalter', 'Sie gilt bis heute als widerlegt'], a: 0,
          w: 'Am Meeresboden fand man die mittelozeanischen Rücken, an denen neue Kruste entsteht – der fehlende Mechanismus.' },
        { t: 'sort', q: 'Wegeners Vorstellung oder heutige Plattentektonik?', buckets: ['Wegener', 'Plattentektonik heute'],
          items: [['Nur die Kontinente bewegen sich', 0], ['Kontinente pflügen durch den Meeresboden', 0], ['Der Antrieb bleibt ungeklärt', 0],
            ['Platten aus Kontinent und Ozeanboden bewegen sich', 1], ['Antrieb: Strömungen im Erdmantel', 1], ['Bewegung mit Satelliten messbar', 1]] }
      ]
    },
    {
      title: 'Wegener auf KA-Niveau',
      qs: [
        { t: 'material',
          mat: { kind: 'table', title: 'M1: Fossilfunde auf den Südkontinenten', head: ['Fossil', 'Lebensweise', 'Fundorte'],
            rows: [['Mesosaurus', 'Reptil im Süßwasser', 'Südamerika, Afrika'], ['Lystrosaurus', 'Reptil an Land', 'Afrika, Indien, Antarktis'],
              ['Glossopteris', 'Farnpflanze mit schweren Samen', 'Südamerika, Afrika, Indien, Antarktis, Australien']], src: 'vereinfachte Darstellung' },
          parts: [
            { t: 'mc', q: 'Welches Fossil wurde auf den meisten Kontinenten gefunden?', o: ['Glossopteris', 'Mesosaurus', 'Lystrosaurus'], a: 0,
              w: 'Glossopteris fand man auf fünf Landmassen – am weitesten verbreitet.' },
            { t: 'mc', q: 'Warum taugen diese Lebewesen als Beleg für Wegeners Theorie?',
              o: ['Keines von ihnen konnte einen Ozean überqueren', 'Sie konnten alle sehr gut schwimmen', 'Sie lebten erst nach dem Zerbrechen von Pangäa', 'Ihre Fossilien wurden vom Wind verweht'], a: 0,
              w: 'Süßwasser- und Landtiere und schwere Samen kommen nicht über ein Meer. Also hingen die Kontinente zusammen.' },
            { t: 'tf', q: 'Die Tabelle beweist, welche Kraft die Kontinente bewegt.', a: false,
              w: 'Sie belegt nur, dass die Kontinente zusammenhingen. Den Antrieb erklärt sie nicht – genau das fehlte Wegener.' }
          ] },
        { t: 'tap', d: 'pangaea', target: 'eis', q: 'Tippe auf den Beleg, der zeigt: Hier lag einmal Eis.',
          w: 'Gletscherspuren in heute warmen Gebieten sind ein Klimazeuge.' },
        { t: 'mc', q: 'Wegeners Gegner erklärten gleiche Fossilien mit „Landbrücken“. Was meinten sie damit?',
          o: ['Schmale Landverbindungen zwischen den Kontinenten, die später im Meer versunken sein sollen', 'Brücken, die frühe Menschen gebaut haben',
            'Vulkanketten, die bis heute bestehen', 'Eisschollen, auf denen Tiere trieben'], a: 0,
          w: 'Für solche versunkenen Landbrücken fand man am Meeresboden nie einen Hinweis.' },
        { t: 'tf', q: 'Wegeners Theorie und die heutige Plattentektonik sind genau dasselbe.', a: false,
          w: 'Wegener ließ nur die Kontinente wandern und kannte den Antrieb nicht. Heute weiß man: Ganze Platten bewegen sich, angetrieben durch Strömungen im Erdmantel.' },
        { t: 'order', q: 'Bringe die Ereignisse in die zeitliche Reihenfolge.',
          items: ['Pangäa beginnt zu zerbrechen', 'Wegener stellt seine Theorie vor', 'Wegener stirbt in Grönland', 'Die Erforschung der Ozeanböden bestätigt die Bewegung'] },
        { t: 'explain', op: 'Erläutere', q: 'Erläutere zwei Argumente, mit denen Wegener seine Theorie der Kontinentalverschiebung begründete.',
          points: ['Erstes Argument genannt (z. B. Küstenverlauf)', 'Erstes Argument mit Beispiel belegt (z. B. Südamerika und Afrika passen wie Puzzleteile)',
            'Zweites Argument genannt (z. B. Fossilien)', 'Zweites Argument mit Beispiel belegt (z. B. Mesosaurus beiderseits des Atlantiks)',
            'Schlussfolgerung: Die Kontinente müssen früher zusammengehangen haben'],
          model: 'Erstens passen die Küstenlinien der Kontinente zusammen: Die Ostküste Südamerikas fügt sich wie ein Puzzleteil an die Westküste Afrikas. Zweitens fand man auf beiden Kontinenten Fossilien derselben Arten, zum Beispiel des Süßwasserreptils Mesosaurus. Dieses Tier konnte den Atlantik nicht durchschwimmen. Beides lässt sich nur erklären, wenn die Kontinente früher zusammenhingen und später auseinanderdrifteten.',
          tip: 'Erläutern = erklären plus Beispiel. Zu jedem Argument gehört ein konkreter Beleg.' },
        { t: 'explain', op: 'Erkläre', q: 'Erkläre, warum Wegeners Theorie zu seinen Lebzeiten von den meisten Wissenschaftlern abgelehnt wurde.',
          points: ['Er konnte den Antrieb (die Kraft) nicht erklären', 'Die von ihm vermuteten Kräfte waren viel zu schwach', 'Er war Meteorologe, kein Geologe',
            'Es gab die Gegenerklärung der versunkenen Landbrücken', 'Beweise vom Ozeanboden fehlten damals noch'],
          model: 'Wegener konnte nicht erklären, welche Kraft die riesigen Kontinente bewegt. Die Kräfte, die er vermutete, waren dafür viel zu schwach. Außerdem war er Meteorologe und kein Geologe, weshalb ihn viele Fachleute nicht ernst nahmen. Sie erklärten gleiche Fossilien lieber mit versunkenen Landbrücken. Die Belege vom Ozeanboden, die seine Idee später bestätigten, gab es zu seinen Lebzeiten noch nicht.' },
        { t: 'explain', op: 'Beurteile', q: 'Beurteile die Aussage: „Wegener hatte mit seiner Theorie recht.“',
          points: ['Stimmt: Die Kontinente haben sich tatsächlich verschoben', 'Stimmt: Seine Belege (Küsten, Fossilien, Gesteine, Klima) gelten bis heute',
            'Stimmt nicht: Nicht die Kontinente allein wandern, sondern ganze Platten', 'Stimmt nicht: Den Antrieb konnte er nicht erklären',
            'Urteil: im Kern richtig, im Detail überholt'],
          model: 'Die Aussage stimmt nur teilweise. Richtig ist, dass die Kontinente einst zusammenhingen und sich verschoben haben; Wegeners Belege gelten bis heute. Falsch war seine Vorstellung, dass die Kontinente allein durch den Meeresboden pflügen – tatsächlich bewegen sich ganze Platten aus Kontinent und Ozeanboden. Auch den Antrieb konnte er nicht erklären. Insgesamt hatte Wegener im Kern recht, seine Theorie wurde aber durch die Plattentektonik korrigiert und ergänzt.',
          tip: 'Beurteilen: erst was dafür spricht, dann was dagegen spricht, dann ein klares Urteil.' }
      ]
    }
  ]
});
