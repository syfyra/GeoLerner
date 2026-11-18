GEO.unit({
  id: 'schutz', icon: '🛡️', color: '#C9B6F2',
  title: 'Schutz vor Erdbeben',
  blurb: 'Sicher bauen, früh warnen, richtig verhalten – und Maßnahmen bewerten',
  sheet: {
    intro: 'Erdbeben lassen sich nicht verhindern und nicht genau vorhersagen. Aber man kann dafür sorgen, dass sie viel weniger Menschen das Leben kosten.',
    facts: [
      ['Vorhersage', 'Man weiß, WO Erdbeben wahrscheinlich sind (Plattengrenzen), aber nicht, WANN genau. Eine verlässliche Vorhersage von Tag und Uhrzeit gibt es nicht.'],
      ['Erdbebensicheres Bauen', 'Biegsame Stahlskelette, Diagonalverstrebungen, tiefe Fundamente, leichte Dächer. Besonders wirksam: Lager aus Gummi oder Federn und Schwingungsdämpfer.'],
      ['Basisisolierung', 'Das Gebäude steht auf Gummi- oder Federlagern. Der Boden schwingt, das Haus macht die Bewegung nur abgeschwächt mit.'],
      ['Schwingungsdämpfer', 'Ein schweres Pendel im Gebäude schwingt gegen die Bewegung des Hauses und bremst sie.'],
      ['Frühwarnsystem', 'Messstationen erkennen die ersten, schwachen Wellen und warnen Sekunden vor den zerstörerischen Wellen: Züge bremsen, Gasleitungen schließen, Handys schlagen Alarm.'],
      ['Vorsorge', 'Bauvorschriften und Kontrollen, Katastrophenschutzübungen, Notfallpläne, Notfallrucksack (Wasser, Nahrung, Taschenlampe, Radio, Erste Hilfe), befestigte Möbel.'],
      ['Richtiges Verhalten', 'Drinnen: unter einen stabilen Tisch, weg von Fenstern, keinen Aufzug benutzen. Draußen: weg von Gebäuden und Stromleitungen. Danach: Gas und Strom abstellen, mit Nachbeben rechnen, an der Küste höher gelegene Orte aufsuchen.'],
      ['Arm und Reich', 'Schutz kostet Geld. Reiche Länder wie Japan können sich Technik, Kontrollen und Übungen leisten. In armen Ländern fehlt das Geld dafür – deshalb sind die Opferzahlen dort oft viel höher.']
    ],
    merk: [
      '„Nicht Erdbeben töten Menschen, sondern einstürzende Gebäude.“',
      'Schutz hat drei Säulen: sicher bauen – früh warnen – richtig verhalten.',
      'Ein Frühwarnsystem bringt nur Sekunden, am Epizentrum fast nichts. Es ersetzt kein sicheres Haus.',
      'Beim Bewerten immer Kriterien nutzen: Wirksamkeit, Kosten, Umsetzbarkeit, Grenzen. Am Ende steht dein begründetes Urteil.'
    ],
    figs: [{ d: 'haus', cap: 'So wird ein Hochhaus erdbebensicher' }]
  },
  lessons: [
    {
      title: 'Vorhersage und richtiges Verhalten',
      qs: [
        { t: 'tf', q: 'Wissenschaftler können Tag und Uhrzeit eines Erdbebens zuverlässig vorhersagen.', a: false,
          w: 'Man kennt die gefährdeten Gebiete, aber nicht den Zeitpunkt. Deshalb ist Vorsorge so wichtig.' },
        { t: 'mc', q: 'Du sitzt im Klassenzimmer und die Erde bebt. Was tust du?',
          o: ['Unter den Tisch kriechen, Kopf schützen, weg von den Fenstern', 'Sofort zum Aufzug rennen', 'Ans Fenster gehen und nachsehen', 'Auf den Tisch steigen'], a: 0,
          w: 'Die größte Gefahr sind herabfallende Teile und splitterndes Glas.' },
        { t: 'sort', q: 'Richtig oder gefährlich bei einem Erdbeben?', buckets: ['richtig', 'gefährlich'],
          items: [['unter einen stabilen Tisch kriechen', 0], ['im Freien Abstand zu Gebäuden halten', 0], ['nach dem Beben Gas abstellen', 0],
            ['den Aufzug benutzen', 1], ['sich ans Fenster stellen', 1], ['während des Bebens durchs Treppenhaus rennen', 1]] },
        { t: 'multi', q: 'Was gehört in einen Notfallrucksack?', o: ['Trinkwasser', 'Taschenlampe', 'Erste-Hilfe-Set', 'Spielkonsole'], a: [0, 1, 2],
          w: 'Dazu haltbare Lebensmittel, ein Radio mit Batterien, wichtige Papiere und Medikamente.' },
        { t: 'mc', q: 'Warum solltest du nach einem Erdbeben weiter vorsichtig sein?',
          o: ['Es kann Nachbeben geben, die beschädigte Häuser zum Einsturz bringen', 'Die Erde bleibt tagelang heiß', 'Danach regnet es immer stark', 'Erdbeben kommen immer genau dreimal'], a: 0,
          w: 'Nachbeben sind schwächer, treffen aber auf bereits beschädigte Gebäude.' },
        { t: 'cloze', text: 'Man kann sagen, {0} Erdbeben wahrscheinlich sind, aber nicht, {1} sie auftreten. Deshalb ist {2} so wichtig.',
          blanks: ['wo', 'wann', 'Vorsorge'], extra: ['warum', 'Glück', 'wie oft'] },
        { t: 'mc', q: 'Du bist am Strand, die Erde bebt stark. Was ist jetzt richtig?',
          o: ['Sofort ins Landesinnere oder auf eine Anhöhe gehen – es könnte ein Tsunami folgen', 'Am Strand bleiben, dort stürzt nichts ein', 'Ins Wasser gehen', 'Ein Foto vom Meer machen'], a: 0,
          w: 'Ein starkes Beben an der Küste ist das wichtigste natürliche Warnzeichen für einen Tsunami.' },
        { t: 'tf', q: 'Bei einem Erdbeben ist man im Freien direkt neben einem Hochhaus am sichersten.', a: false,
          w: 'Dort drohen herabfallende Fassadenteile und Glas. Im Freien gilt: Abstand zu Gebäuden.' }
      ]
    },
    {
      title: 'Sicher bauen, früh warnen',
      qs: [
        { t: 'label', d: 'haus', target: 'lager', w: 'Auf Gummi- oder Federlagern macht das Haus die Bewegung des Bodens nur abgeschwächt mit. Das nennt man Basisisolierung.' },
        { t: 'label', d: 'haus', target: 'pendel', w: 'Das schwere Pendel schwingt gegen die Bewegung des Hauses und bremst so das Schwanken.' },
        { t: 'mc', q: 'Wie schützt eine Basisisolierung ein Gebäude?',
          o: ['Das Haus steht auf Gummi- oder Federlagern und macht die Bodenbewegung nur abgeschwächt mit', 'Das Haus wird starr mit dem Fels verschraubt',
            'Die Wände werden doppelt so dick gemauert', 'Das Haus wird unterirdisch gebaut'], a: 0,
          w: 'Die Lager entkoppeln das Gebäude vom schwingenden Boden.' },
        { t: 'mc', q: 'Warum sind biegsame Stahlskelette besser als starre Ziegelmauern?',
          o: ['Sie schwingen mit, statt zu brechen', 'Sie sind immer billiger', 'Sie sind schwerer', 'Sie leiten die Erdbebenwellen zurück in den Boden'], a: 0,
          w: 'Starres Mauerwerk reißt und stürzt ein. Ein biegsames Skelett nimmt die Bewegung auf.' },
        { t: 'tap', d: 'haus', target: 'streben', q: 'Tippe auf die Diagonalverstrebungen.', w: 'Die schrägen Streben versteifen das Skelett, damit es sich nicht verformt.' },
        { t: 'mc', q: 'Wie funktioniert ein Erdbeben-Frühwarnsystem?',
          o: ['Es erkennt die ersten schwachen Wellen und warnt Sekunden vor den starken', 'Es sagt Erdbeben Tage im Voraus vorher', 'Es verhindert, dass Platten sich verhaken', 'Es misst die Temperatur im Erdinneren'], a: 0,
          w: 'Das Beben hat dann schon begonnen. Gewonnen werden nur Sekunden – aber die können Leben retten.' },
        { t: 'multi', q: 'Was kann in den Sekunden nach einer Frühwarnung automatisch passieren?',
          o: ['Schnellzüge bremsen', 'Gasleitungen schließen', 'Handys schlagen Alarm', 'Häuser werden stabiler'], a: [0, 1, 2],
          w: 'Die Stabilität eines Hauses lässt sich nur vorher beim Bauen beeinflussen.' },
        { t: 'tf', q: 'Ein Frühwarnsystem hilft den Menschen direkt am Epizentrum am meisten.', a: false,
          w: 'Dort kommen die starken Wellen fast gleichzeitig mit der Warnung an. Je weiter entfernt, desto mehr Vorwarnzeit.' },
        { t: 'match', q: 'Was bewirkt welche Maßnahme?',
          pairs: [['Basisisolierung', 'entkoppelt das Haus vom schwingenden Boden'], ['Schwingungsdämpfer', 'schweres Pendel bremst das Schwanken'],
            ['Diagonalverstrebungen', 'versteifen das Skelett'], ['Frühwarnsystem', 'warnt Sekunden vor den starken Wellen']] }
      ]
    },
    {
      title: 'Maßnahmen bewerten (KA-Niveau)',
      qs: [
        { t: 'material',
          mat: { kind: 'table', title: 'M1: Schutzmaßnahmen im Vergleich', head: ['Maßnahme und Kosten', 'Wirkung', 'Grenzen'],
            rows: [['Erdbebensicher bauen<small>Kosten: hoch</small>', 'sehr groß: Häuser bleiben stehen', 'alte Häuser müssen teuer nachgerüstet werden'],
              ['Frühwarnsystem<small>Kosten: mittel</small>', 'Sekunden Vorwarnzeit', 'am Epizentrum kaum Vorwarnzeit'],
              ['Übungen und Aufklärung<small>Kosten: niedrig</small>', 'Menschen reagieren richtig', 'schützen nicht vor einstürzenden Häusern'],
              ['Notfallvorrat<small>Kosten: niedrig</small>', 'hilft in den Tagen danach', 'schützt nicht während des Bebens']] },
          parts: [
            { t: 'mc', q: 'Welche Maßnahme verhindert am ehesten, dass Menschen unter Trümmern sterben?',
              o: ['Erdbebensicher bauen', 'Notfallvorrat', 'Frühwarnsystem', 'Übungen und Aufklärung'], a: 0,
              w: 'Nur stabile Gebäude verhindern Einstürze – die häufigste Todesursache bei Erdbeben.' },
            { t: 'mc', q: 'Ein armes Land hat wenig Geld. Welche Maßnahmen kann es am schnellsten umsetzen?',
              o: ['Übungen, Aufklärung und Notfallvorräte', 'Alle Häuser neu bauen', 'Jedes Hochhaus mit einem Pendel ausstatten', 'Keine – Schutz ist immer teuer'], a: 0,
              w: 'Laut Tabelle sind das die Maßnahmen mit niedrigen Kosten.' },
            { t: 'tf', q: 'Aus der Tabelle folgt: Eine einzige Maßnahme reicht aus, um die Bevölkerung zu schützen.', a: false,
              w: 'Jede Maßnahme hat Grenzen. Erst die Kombination schützt wirklich.' }
          ] },
        { t: 'material',
          mat: { kind: 'table', title: 'M2: Japan und Haiti im Vergleich', head: ['', 'Japan', 'Haiti'],
            rows: [['Wirtschaftskraft pro Kopf', 'sehr hoch', 'sehr niedrig'], ['Bauvorschriften', 'streng, werden kontrolliert', 'kaum vorhanden'],
              ['Frühwarnsystem', 'landesweit', 'keines'], ['Katastrophenübungen', 'regelmäßig, schon in der Schule', 'selten']], src: 'vereinfachte Darstellung' },
          parts: [
            { t: 'mc', q: 'Welches Land ist besser auf Erdbeben vorbereitet?', o: ['Japan', 'Haiti', 'Beide gleich gut'], a: 0,
              w: 'Japan liegt in allen vier Zeilen vorn.' },
            { t: 'mc', q: 'Was ist die wichtigste Ursache für diesen Unterschied?',
              o: ['Schutz kostet Geld, das armen Ländern fehlt', 'In Haiti gibt es keine Erdbeben', 'Japan liegt an keiner Plattengrenze', 'In Haiti sind Erdbeben immer schwächer'], a: 0,
              w: 'Die erste Zeile erklärt die anderen drei: Technik, Kontrollen und Übungen muss man sich leisten können.' }
          ] },
        { t: 'mc', q: 'Was bedeutet der Satz „Nicht Erdbeben töten Menschen, sondern Gebäude“?',
          o: ['Die meisten Opfer sterben durch einstürzende Häuser – sicheres Bauen rettet Leben', 'Erdbeben sind eigentlich ungefährlich', 'Man sollte keine Häuser mehr bauen', 'Gebäude lösen Erdbeben aus'], a: 0,
          w: 'Die Erschütterung selbst ist selten tödlich. Gefährlich sind Trümmer, Brände und Folgeschäden.' },
        { t: 'mc', q: 'Warum trifft ein gleich starkes Erdbeben arme Länder meist härter?',
          o: ['Es fehlt Geld für sicheres Bauen, Kontrollen und Rettungsdienste', 'Dort bebt die Erde länger', 'Dort sind die Platten dünner', 'Arme Länder liegen näher am Erdkern'], a: 0,
          w: 'Das Naturereignis ist dasselbe – die Verwundbarkeit der Gesellschaft ist verschieden.' },
        { t: 'tf', q: 'Erdbebensicheres Bauen lohnt sich nur für Hochhäuser.', a: false,
          w: 'Gerade einfache Wohnhäuser, Schulen und Krankenhäuser stürzen ein. Schon stabile Ecken und leichte Dächer helfen.' },
        { t: 'explain', op: 'Erkläre', q: 'Erkläre mithilfe der Skizze, wie ein Hochhaus vor Erdbeben geschützt wird.', fig: { d: 'haus' },
          points: ['Tiefes Fundament verankert das Haus', 'Lager aus Gummi oder Federn entkoppeln es vom Boden (Basisisolierung)',
            'Das biegsame Stahlskelett schwingt mit, statt zu brechen', 'Diagonalverstrebungen versteifen das Skelett', 'Ein Pendel als Schwingungsdämpfer bremst das Schwanken'],
          model: 'Das Hochhaus steht auf einem tiefen Fundament. Zwischen Fundament und Gebäude liegen Lager aus Gummi oder Federn: Bebt der Boden, macht das Haus die Bewegung nur abgeschwächt mit (Basisisolierung). Das Skelett aus Stahl ist biegsam und kann mitschwingen, statt zu brechen. Diagonalverstrebungen versteifen es, damit es sich nicht verformt. Oben im Gebäude hängt ein schweres Pendel, das gegen die Bewegung des Hauses schwingt und das Schwanken bremst.' },
        { t: 'explain', op: 'Bewerte', q: 'Eine Stadt im Erdbebengebiet hat wenig Geld. Sie kann entweder ein Frühwarnsystem einrichten oder Schulen und Krankenhäuser erdbebensicher umbauen. Bewerte beide Maßnahmen und entscheide dich.',
          points: ['Frühwarnsystem – Vorteil: erreicht alle; Züge und Gas werden gestoppt, Menschen können sich schützen',
            'Frühwarnsystem – Grenze: nur Sekunden, am Epizentrum fast keine Vorwarnzeit; unsichere Häuser stürzen trotzdem ein',
            'Umbau – Vorteil: Gebäude bleiben stehen; Krankenhäuser werden nach dem Beben dringend gebraucht',
            'Umbau – Grenze: teuer, schützt nur die Menschen in diesen Gebäuden', 'Eigenes Urteil mit Begründung'],
          model: 'Ein Frühwarnsystem erreicht die ganze Stadt: Züge bremsen, Gasleitungen schließen, und die Menschen können in Deckung gehen. Es bringt aber nur Sekunden, nahe am Epizentrum fast nichts – und unsichere Häuser stürzen trotzdem ein. Der Umbau von Schulen und Krankenhäusern ist teuer und schützt nur die Menschen in diesen Gebäuden. Dafür bleiben sie stehen, und Krankenhäuser werden nach einem Beben dringend gebraucht. Ich würde mich für den Umbau entscheiden, weil einstürzende Gebäude die meisten Opfer fordern und Kinder in Schulen besonders schutzbedürftig sind. Das Frühwarnsystem sollte folgen, sobald wieder Geld da ist. (Auch die andere Entscheidung kann richtig sein – wichtig ist die Begründung.)',
          tip: 'Bewerten: Kriterien nennen (Wirksamkeit, Kosten, Grenzen), abwägen, dann dein Urteil mit „weil“.' },
        { t: 'explain', op: 'Beurteile', q: 'Beurteile die Aussage: „Gegen Erdbeben kann man sowieso nichts tun.“',
          points: ['Stimmt: Erdbeben lassen sich nicht verhindern und nicht genau vorhersagen', 'Dagegen: Erdbebensicheres Bauen verhindert Einstürze',
            'Dagegen: Frühwarnung, Übungen und Notfallpläne senken die Opferzahl', 'Beleg: In gut vorbereiteten Ländern fordern selbst starke Beben viel weniger Opfer',
            'Urteil: Die Aussage ist falsch – die Folgen lassen sich deutlich verringern'],
          model: 'Richtig an der Aussage ist, dass man Erdbeben weder verhindern noch auf den Tag genau vorhersagen kann. Trotzdem ist sie falsch: Erdbebensichere Gebäude stürzen nicht ein, Frühwarnsysteme verschaffen wertvolle Sekunden, und Übungen sorgen dafür, dass Menschen richtig reagieren. Das zeigt der Vergleich von 2010: Das viel stärkere Beben in Chile forderte etwa 500 Todesopfer, das schwächere in Haiti über 200 000. Erdbeben kann man also nicht verhindern, ihre Folgen aber deutlich verringern.' }
      ]
    }
  ]
});
