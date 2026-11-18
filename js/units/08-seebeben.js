GEO.unit({
  id: 'seebeben', icon: '🌊', color: '#7FD6C2',
  title: 'Seebeben',
  blurb: 'Wenn der Meeresboden bebt: Wie ein Tsunami entsteht und wie man sich schützt',
  sheet: {
    intro: 'Bebt die Erde unter dem Meer, kann ein Tsunami entstehen. Auf hoher See ist er kaum zu bemerken – an der Küste wird er zur Wasserwand.',
    facts: [
      ['Seebeben', 'Ein Erdbeben, dessen Herd unter dem Meeresboden liegt.'],
      ['Tsunami', 'Japanisch für „Hafenwelle“: eine Folge sehr langer Meereswellen, meist ausgelöst durch ein starkes Seebeben.'],
      ['Entstehung', 'Der Meeresboden hebt oder senkt sich ruckartig, häufig an Subduktionszonen. Dabei wird die gesamte Wassersäule darüber angehoben. Das Wasser schwappt zurück – Wellen breiten sich nach allen Seiten aus.'],
      ['Auf offenem Meer', 'Die Wellen sind bis zu 800 km/h schnell, aber meist unter einem Meter hoch und Hunderte Kilometer lang. Schiffe bemerken sie kaum.'],
      ['An der Küste', 'Im flachen Wasser werden die Wellen abgebremst. Das nachfolgende Wasser staut sich – die Welle türmt sich viele Meter hoch auf und dringt weit ins Land ein.'],
      ['Warnzeichen', 'Ein starkes Erdbeben an der Küste. Oder: Das Meer zieht sich plötzlich ungewöhnlich weit zurück. Dann sofort landeinwärts oder nach oben fliehen.'],
      ['Tsunami-Frühwarnsystem', 'Messgeräte am Meeresboden registrieren Beben und Druckänderungen. Bojen funken die Daten über Satelliten an ein Warnzentrum. Von dort gehen Warnungen an Sirenen, Radio und Handys.'],
      ['Schutz', 'Frühwarnung, ausgeschilderte Fluchtwege, Übungen, Schutzmauern, Küstenwälder (Mangroven) und Bauverbote direkt am Strand.'],
      ['Beispiele', 'Indischer Ozean 2004: Magnitude 9,1, rund 230 000 Tote, kein Warnsystem. Japan 2011: Magnitude 9,0, rund 18 500 Tote, Atomunglück von Fukushima.']
    ],
    merk: [
      'Tiefes Wasser = schnell und flach. Flaches Wasser = langsam und hoch.',
      'Nicht jedes Seebeben löst einen Tsunami aus: Es braucht ein starkes Beben, das den Meeresboden senkrecht versetzt.',
      'Ein Tsunami besteht aus mehreren Wellen. Die erste ist oft nicht die höchste.',
      'Zieht sich das Meer plötzlich zurück: nicht hinsehen, sondern rennen.',
      'Zusatz: Auch Vulkanausbrüche und große Rutschungen können Tsunamis auslösen.'
    ],
    figs: [{ d: 'tsunami', cap: 'Vom Seebeben zur Flutwelle' }]
  },
  lessons: [
    {
      title: 'Seebeben und Tsunami',
      qs: [
        { t: 'mc', q: 'Was ist ein Seebeben?',
          o: ['Ein Erdbeben mit Herd unter dem Meeresboden', 'Ein besonders heftiger Sturm auf See', 'Ein Vulkanausbruch an Land', 'Eine Springflut bei Vollmond'], a: 0,
          w: 'Seebeben entstehen wie alle Erdbeben – nur liegt der Herd unter dem Meer.' },
        { t: 'mc', q: 'Was bedeutet das japanische Wort „Tsunami“?', o: ['Hafenwelle', 'Riesenwelle', 'Erdbebenmeer', 'Sturmflut'], a: 0,
          w: 'Fischer bemerkten auf dem Meer nichts – und fanden bei der Rückkehr ihren Hafen zerstört vor.' },
        { t: 'order', q: 'Ordne: So entsteht ein Tsunami.',
          items: ['Starkes Seebeben: Der Meeresboden hebt sich ruckartig', 'Die Wassersäule darüber wird angehoben', 'Wellen breiten sich mit hoher Geschwindigkeit aus',
            'Im flachen Küstenwasser werden die Wellen abgebremst', 'Die Wellen türmen sich auf und überfluten die Küste'] },
        { t: 'label', d: 'tsunami', target: 'herd', w: 'Am Anfang steht das Seebeben: Der Meeresboden wird ruckartig angehoben.' },
        { t: 'tf', q: 'Auf dem offenen Meer ist ein Tsunami eine riesige, viele Meter hohe Wasserwand.', a: false,
          w: 'Dort ist er meist unter einem Meter hoch. Erst an der Küste türmt er sich auf.' },
        { t: 'mc', q: 'Wie schnell kann ein Tsunami auf dem offenen Ozean werden?',
          o: ['Bis zu 800 km/h – so schnell wie ein Flugzeug', 'Etwa 30 km/h – so schnell wie ein Fahrrad', 'Etwa 100 km/h – so schnell wie ein Auto', 'Schneller als der Schall'], a: 0,
          w: 'Je tiefer das Wasser, desto schneller die Welle.' },
        { t: 'cloze', text: 'Im tiefen Wasser ist ein Tsunami {0} und flach. Im flachen Wasser wird er {1} und {2}.',
          blanks: ['schnell', 'langsamer', 'höher'], extra: ['wärmer', 'leiser', 'salziger'], any: [[1, 2]] },
        { t: 'mc', q: 'Welches Warnzeichen kündigt an der Küste oft einen Tsunami an?',
          o: ['Das Meer zieht sich plötzlich ungewöhnlich weit zurück', 'Es beginnt zu regnen', 'Die Möwen fliegen aufs Meer hinaus', 'Das Wasser wird wärmer'], a: 0,
          w: 'Dann bleiben oft nur Minuten. Sofort landeinwärts oder nach oben!' },
        { t: 'tap', d: 'tsunami', target: 'kueste', q: 'Tippe auf die Stelle, an der sich die Welle auftürmt.',
          w: 'In Küstennähe wird die Welle langsamer – und dabei immer höher.' }
      ]
    },
    {
      title: 'Warnen und schützen',
      qs: [
        { t: 'mc', q: 'Warum türmt sich die Welle an der Küste auf?',
          o: ['Im flachen Wasser wird die Welle vorn abgebremst, das Wasser dahinter schiebt nach', 'An der Küste weht stärkerer Wind', 'Das Wasser wird an der Küste leichter', 'Flüsse drücken das Meer zurück'], a: 0,
          w: 'Die Energie bleibt gleich, die Welle wird kürzer – also muss sie höher werden.' },
        { t: 'tf', q: 'Jedes Seebeben löst einen Tsunami aus.', a: false,
          w: 'Es braucht ein starkes Beben, das den Meeresboden senkrecht versetzt. Die meisten Seebeben bleiben folgenlos.' },
        { t: 'multi', q: 'Welche Bedingungen begünstigen einen Tsunami?',
          o: ['Ein starkes Beben', 'Der Meeresboden wird senkrecht versetzt', 'Der Herd liegt flach unter dem Meeresboden', 'Das Beben findet nachts statt'], a: [0, 1, 2],
          w: 'Nur dann wird genug Wasser auf einmal angehoben.' },
        { t: 'order', q: 'Ordne die Meldekette eines Tsunami-Frühwarnsystems.',
          items: ['Messgeräte am Meeresboden registrieren Beben und Druckänderung', 'Bojen funken die Daten an Satelliten', 'Das Warnzentrum wertet die Daten aus',
            'Sirenen, Radio und Handys warnen die Bevölkerung', 'Die Menschen fliehen auf Anhöhen'] },
        { t: 'sort', q: 'Richtig oder lebensgefährlich bei Tsunami-Gefahr?', buckets: ['richtig', 'lebensgefährlich'],
          items: [['sofort landeinwärts oder nach oben fliehen', 0], ['in obere Stockwerke stabiler Gebäude gehen', 0], ['nach der ersten Welle weiter oben bleiben', 0],
            ['zum Strand gehen und zuschauen', 1], ['nach der ersten Welle sofort zurückkehren', 1], ['den trockengefallenen Meeresboden erkunden', 1]] },
        { t: 'mc', q: 'Warum starben 2004 am Indischen Ozean so viele Menschen?',
          o: ['Es gab dort kein Frühwarnsystem, und viele kannten die Warnzeichen nicht', 'Das Seebeben war sehr schwach', 'Die Wellen kamen ohne Erdbeben', 'Die Küsten waren unbewohnt'], a: 0,
          w: 'Zwischen Beben und Welle lagen teils Stunden – Zeit, die ohne Warnsystem ungenutzt blieb.' },
        { t: 'multi', q: 'Welche Maßnahmen schützen Küsten vor Tsunamis?',
          o: ['Frühwarnsysteme', 'Ausgeschilderte Fluchtwege und Übungen', 'Küstenwälder wie Mangroven', 'Hotels direkt am Strand'], a: [0, 1, 2],
          w: 'Bebauung direkt am Strand erhöht das Risiko. Wälder und Mauern bremsen die Welle.' },
        { t: 'mc', q: 'Warum besteht nach der ersten Tsunami-Welle weiter Gefahr?',
          o: ['Es folgen weitere Wellen, die oft höher sind', 'Das Wasser bleibt wochenlang stehen', 'Die erste Welle ist immer harmlos', 'Danach folgt immer ein Vulkanausbruch'], a: 0,
          w: 'Ein Tsunami ist eine Folge von Wellen. Zwischen ihnen können viele Minuten liegen.' },
        { t: 'label', d: 'tsunami', target: 'hochsee', w: 'Auf offenem Meer sind die Wellen flach, sehr lang und sehr schnell.' }
      ]
    },
    {
      title: 'Tsunami auf KA-Niveau',
      qs: [
        { t: 'material',
          mat: { kind: 'table', title: 'M1: Ein Tsunami läuft auf die Küste zu', head: ['Wassertiefe', 'Geschwindigkeit', 'Wellenhöhe'],
            rows: [['4000 m', 'ca. 710 km/h', 'unter 1 m'], ['200 m', 'ca. 160 km/h', 'ca. 2 m'], ['50 m', 'ca. 80 km/h', 'ca. 5 m'], ['10 m', 'ca. 36 km/h', '10 m und mehr']],
            src: 'Modellwerte: Geschwindigkeit berechnet, Wellenhöhen als Beispiel' },
          parts: [
            { t: 'mc', q: 'Beschreibe: Wie ändert sich die Geschwindigkeit, wenn das Wasser flacher wird?', o: ['Sie nimmt stark ab', 'Sie nimmt stark zu', 'Sie bleibt gleich'], a: 0,
              w: 'Von rund 710 km/h im tiefen Ozean auf 36 km/h kurz vor der Küste.' },
            { t: 'mc', q: 'Wie verändert sich gleichzeitig die Wellenhöhe?', o: ['Sie nimmt zu', 'Sie nimmt ab', 'Sie bleibt gleich'], a: 0,
              w: 'Je langsamer die Welle, desto höher türmt sie sich auf.' },
            { t: 'num', q: 'Um wie viele km/h ist die Welle bei 10 m Wassertiefe langsamer als bei 4000 m?', a: 674, unit: 'km/h',
              w: '710 km/h − 36 km/h = 674 km/h.' }
          ] },
        { t: 'material',
          mat: { kind: 'table', title: 'M2: Zwei Tsunami-Katastrophen', head: ['', 'Indischer Ozean 2004', 'Japan 2011'],
            rows: [['Magnitude des Seebebens', '9,1', '9,0'], ['Frühwarnsystem', 'keines', 'vorhanden'], ['Todesopfer', 'rund 230 000', 'rund 18 500'],
              ['Betroffene Länder', '14', 'vor allem Japan']], src: 'gerundete Angaben' },
          parts: [
            { t: 'mc', q: 'Was fällt beim Vergleich auf?',
              o: ['Bei fast gleicher Magnitude starben 2004 mehr als zehnmal so viele Menschen', '2011 war das Beben viel stärker', '2011 starben mehr Menschen', 'Beide forderten gleich viele Opfer'], a: 0,
              w: '230 000 gegenüber 18 500 – bei Magnitude 9,1 und 9,0.' },
            { t: 'mc', q: 'Welche Erklärung lässt sich mit der Tabelle belegen?',
              o: ['2004 gab es kein Frühwarnsystem', '2004 war das Wasser kälter', '2011 gab es kein Seebeben', '2011 waren mehr Länder betroffen'], a: 0,
              w: 'Die Zeile „Frühwarnsystem“ ist der entscheidende Unterschied im Material.' },
            { t: 'tf', q: 'Die Tabelle zeigt: Ein Frühwarnsystem verhindert alle Todesopfer.', a: false,
              w: 'Auch in Japan starben rund 18 500 Menschen. Ein Warnsystem senkt die Opferzahl, verhindert sie aber nicht.' }
          ] },
        { t: 'tap', d: 'tsunami', target: 'saeule', q: 'Tippe auf die angehobene Wassersäule.',
          w: 'Die gesamte Wassersäule über der Bruchstelle wird angehoben – vom Meeresboden bis zur Oberfläche.' },
        { t: 'num', q: 'Ein Tsunami ist auf dem offenen Ozean 800 km/h schnell. Wie viele Stunden braucht er für 2400 km?', a: 3, unit: 'Stunden',
          w: '2400 km : 800 km/h = 3 Stunden. So viel Zeit bliebe für eine Warnung.' },
        { t: 'mc', q: 'Warum bemerken Schiffe auf hoher See einen Tsunami kaum?',
          o: ['Die Welle ist dort unter einem Meter hoch und Hunderte Kilometer lang', 'Schiffe sind schneller als die Welle', 'Die Welle läuft nur am Meeresboden entlang', 'Auf hoher See gibt es keine Tsunamis'], a: 0,
          w: 'Das Schiff wird nur ganz sanft angehoben und wieder abgesenkt.' },
        { t: 'tf', q: 'Wenn sich das Meer plötzlich weit zurückzieht, ist die Gefahr vorüber.', a: false,
          w: 'Im Gegenteil: Das ist das Warnzeichen. Die Welle folgt meist wenige Minuten später.' },
        { t: 'explain', op: 'Erkläre', q: 'Erkläre mithilfe der Skizze die Entstehung eines Tsunamis – vom Seebeben bis zur Küste.', fig: { d: 'tsunami' },
          points: ['Auslöser: starkes Seebeben, der Meeresboden hebt oder senkt sich ruckartig', 'Die gesamte Wassersäule wird angehoben; Wellen breiten sich nach allen Seiten aus',
            'Offenes Meer: sehr schnell (bis 800 km/h), aber flach und sehr lang', 'Küste: Flaches Wasser bremst die Welle, das nachfolgende Wasser staut sich',
            'Die Welle türmt sich meterhoch auf und überflutet das Land'],
          model: 'Bei einem starken Seebeben wird der Meeresboden ruckartig angehoben oder abgesenkt. Dadurch wird die gesamte Wassersäule darüber bewegt, und es breiten sich Wellen nach allen Seiten aus. Auf dem offenen Meer sind diese Wellen bis zu 800 km/h schnell, aber nur wenige Dezimeter hoch und Hunderte Kilometer lang. Nähern sie sich der Küste, wird das Wasser flacher. Die Wellen werden abgebremst, das nachfolgende Wasser staut sich, und die Welle türmt sich viele Meter hoch auf. Sie trifft als Wasserwand auf die Küste und überflutet das Land.',
          tip: 'Kette bilden: Auslöser → Wassersäule → offenes Meer → Küste → Folgen.' },
        { t: 'explain', op: 'Bewerte', q: 'Ein Küstenort will sich vor Tsunamis schützen: mit einer hohen Schutzmauer oder mit Frühwarnsystem und Fluchtwegen. Bewerte beide Möglichkeiten.',
          points: ['Mauer – Vorteil: schützt auch Häuser und Menschen, die nicht fliehen können', 'Mauer – Nachteile: sehr teuer, kann überspült werden, verbaut die Küste, wiegt in falscher Sicherheit',
            'Warnsystem und Fluchtwege – Vorteil: vergleichsweise günstig, rettet viele Leben', 'Warnsystem – Grenzen: wenig Zeit bei nahem Beben, Gebäude werden trotzdem zerstört, Menschen müssen richtig reagieren',
            'Eigenes begründetes Urteil'],
          model: 'Eine Schutzmauer schützt auch Gebäude und Menschen, die nicht fliehen können. Sie ist aber sehr teuer, verbaut die Küste und kann von einer besonders hohen Welle überspült werden – 2011 geschah das in Japan vielerorts. Außerdem wiegt sie die Menschen in falscher Sicherheit. Ein Frühwarnsystem mit Fluchtwegen und Übungen ist deutlich günstiger und kann sehr viele Leben retten. Es schützt aber keine Gebäude, und bei einem nahen Seebeben bleibt nur wenig Zeit. Ich halte Frühwarnsystem, Fluchtwege und regelmäßige Übungen für die wichtigere Maßnahme, weil sie mit wenig Geld die meisten Menschenleben schützen. Eine Mauer wäre eine sinnvolle Ergänzung, wenn genug Geld vorhanden ist.',
          tip: 'Erst beide Seiten abwägen, dann entscheiden. Dein Urteil braucht ein „weil“.' }
      ]
    }
  ]
});
