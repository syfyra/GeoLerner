/* GeoLerner – Magmus, der freche kleine Vulkan (und sein Erzfeind: die Klassenarbeit) */
(function () {
  'use strict';

  var INK = '#24212B', ROCK = '#B9806A', ROCK2 = '#D3A088', LAVA = '#FF6A3D', GLOW = '#FFC145', SMOKE = '#DDD6E3';

  function eye(cx, cy, r, px, py, pr) {
    return '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="#fff" stroke="' + INK + '" stroke-width="2.5"/>' +
      '<circle cx="' + (cx + px) + '" cy="' + (cy + py) + '" r="' + pr + '" fill="' + INK + '"/>' +
      '<circle cx="' + (cx + px + 1.3) + '" cy="' + (cy + py - 1.5) + '" r="1.2" fill="#fff"/>';
  }
  function line(d, w, cls) {
    return '<path' + (cls ? ' class="' + cls + '"' : '') + ' d="' + d + '" fill="none" stroke="' + INK + '" stroke-width="' + (w || 3.5) +
      '" stroke-linecap="round" stroke-linejoin="round"/>';
  }
  function lid(cx, cy) {
    return '<path d="M' + (cx - 8) + ' ' + cy + 'a8 8 0 0 1 16 0z" fill="' + ROCK2 + '" stroke="' + INK + '" stroke-width="2.5" stroke-linejoin="round"/>';
  }
  function puff(cx, cy, r, fill) {
    return '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="' + (fill || SMOKE) + '" stroke="' + INK + '" stroke-width="2.2"/>';
  }
  function drop(cx, cy, r, fill) {
    return '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="' + (fill || LAVA) + '" stroke="' + INK + '" stroke-width="2"/>';
  }

  var FACES = {
    happy: function () {
      return eye(57, 78, 7.5, 1, 1, 3.6) + eye(83, 78, 7.5, 1, 1, 3.6) + line('M61 91q9 8 18 0');
    },
    cheer: function () {
      return line('M50 80q7-9 14 0M76 80q7-9 14 0') +
        '<path d="M59 88q11 16 22 0z" fill="' + INK + '" stroke="' + INK + '" stroke-width="2.5" stroke-linejoin="round"/>' +
        '<path d="M66 96q4 3 8 0" fill="none" stroke="#FF8FA3" stroke-width="3" stroke-linecap="round"/>';
    },
    smug: function () {
      return eye(57, 78, 7.5, 2, 1.5, 3.4) + eye(83, 78, 7.5, 2, 1.5, 3.4) + lid(57, 78) + lid(83, 78) +
        line('M76 65q7-5 14-1', 3) + line('M62 92q8 5 17-3');
    },
    roast: function () {
      return eye(57, 79, 7.5, -2, 1.5, 3.4) + eye(83, 79, 7.5, -2, 1.5, 3.4) + lid(57, 79) + lid(83, 79) +
        line('M49 66h15M76 66h15', 3) + line('M62 94h16');
    },
    shock: function () {
      return eye(57, 77, 9, 0, 0, 2.8) + eye(83, 77, 9, 0, 0, 2.8) + line('M49 62q7-4 14 0M77 62q7-4 14 0', 3) +
        '<ellipse cx="70" cy="96" rx="4.5" ry="6" fill="' + INK + '"/>';
    },
    sad: function () {
      return eye(57, 80, 7.5, 0, 2, 3.6) + eye(83, 80, 7.5, 0, 2, 3.6) + line('M48 68l14-4M92 68l-14-4', 3) +
        line('M61 97q9-7 18 0') + '<path d="M93 86q4 7 0 10q-4-3 0-10z" fill="#6CCBFF" stroke="' + INK + '" stroke-width="1.5"/>';
    },
    sleep: function () {
      return line('M50 79h14M76 79h14') + '<circle cx="70" cy="92" r="3" fill="' + INK + '"/>';
    },
    think: function () {
      return eye(57, 78, 7.5, 2, -2, 3.4) + eye(83, 78, 7.5, 2, -2, 3.4) + line('M76 65q7-5 14-1', 3) + line('M49 67h14', 3) +
        line('M63 93q6-4 12 0');
    },
    cool: function () {
      return '<path d="M44 71h52v7a10.5 10.5 0 0 1-21 0v-2h-10v2a10.5 10.5 0 0 1-21 0z" fill="' + INK + '"/>' +
        '<path d="M50 75h7M81 75h7" stroke="#fff" stroke-width="2" stroke-linecap="round" opacity=".7"/>' +
        line('M62 93q8 5 17-3');
    }
  };

  // Was gerade aus dem Krater kommt
  var TOPS = {
    happy: function () { return puff(76, 22, 6) + puff(68, 14, 4.5); },
    cheer: function () {
      return line('M70 30V12M62 30L52 13M78 30L88 13', 3) + drop(70, 9, 4.5, GLOW) + drop(50, 10, 4) + drop(90, 10, 4) +
        drop(38, 24, 3, GLOW) + drop(102, 24, 3, GLOW) + drop(60, 3, 2.5) + drop(81, 2, 2.5, GLOW);
    },
    smug: function () { return puff(78, 20, 5); },
    roast: function () { return puff(62, 20, 7, '#8E869A') + puff(74, 15, 8.5, '#8E869A') + puff(84, 23, 6, '#8E869A'); },
    shock: function () {
      return '<path d="M70 28V11M57 30L48 16M83 30L92 16M47 36L35 30M93 36L105 30" fill="none" stroke="' + LAVA +
        '" stroke-width="4" stroke-linecap="round"/>';
    },
    sad: function () { return '<path d="M70 28q-6-6 0-11q5-5 0-10" fill="none" stroke="#8E869A" stroke-width="3" stroke-linecap="round"/>'; },
    sleep: function () {
      return '<text x="86" y="26" font-size="16" font-weight="800" fill="' + INK + '" font-family="sans-serif">z</text>' +
        '<text x="99" y="14" font-size="12" font-weight="800" fill="' + INK + '" font-family="sans-serif">z</text>';
    },
    think: function () { return puff(76, 26, 3) + puff(84, 17, 4.5) + puff(96, 8, 6.5); },
    cool: function () { return '<path d="M94 12l2.5 6l6 2.5l-6 2.5l-2.5 6l-2.5-6l-6-2.5l6-2.5z" fill="' + GLOW + '" stroke="' + INK + '" stroke-width="1.8" stroke-linejoin="round"/>'; }
  };

  var ARMS = {
    cheer: 'M34 76q-17-6-17-25M106 76q17-6 17-25',
    think: 'M33 80q-13 6-11 18M107 78q17 4 4 -14',
    cool: 'M33 80q-15 2-15 16M107 80q15 2 15 16',
    sad: 'M33 82q-10 10-8 20M107 82q10 10 8 20'
  };

  function svg(mood, size) {
    mood = FACES[mood] ? mood : 'happy';
    size = size || 120;
    var blush = (mood === 'happy' || mood === 'cheer' || mood === 'smug')
      ? '<circle cx="46" cy="89" r="4.5" fill="#FF3D7F" opacity=".3"/><circle cx="94" cy="89" r="4.5" fill="#FF3D7F" opacity=".3"/>' : '';
    return '<svg class="mag mag-' + mood + '" viewBox="0 0 140 124" width="' + size + '" height="' + Math.round(size * 124 / 140) +
      '" aria-hidden="true" focusable="false">' +
      TOPS[mood]() +
      line('M54 112v8M86 112v8M46 121h11M83 121h11', 5, 'limb') +
      line(ARMS[mood] || 'M33 80q-13 5-12 18M107 80q13 5 12 18', 5, 'limb') +
      // Kegel
      '<path d="M24 108L47 44Q50 36 58 36H82Q90 36 93 44L116 108Q119 116 110 116H30Q21 116 24 108Z" fill="' + ROCK + '" stroke="' + INK +
      '" stroke-width="5" stroke-linejoin="round"/>' +
      '<path d="M41 104L55 62Q57 57 62 57H78Q83 57 85 62L99 104Q100 108 96 108H44Q40 108 41 104Z" fill="' + ROCK2 + '"/>' +
      // Lava, die über den Kraterrand läuft
      '<path d="M46 47Q50 36 58 36H82Q90 36 94 47Q95 58 89 56Q85 54 83 49Q80 44 77 51Q75 60 70 60Q65 60 64 51Q62 44 58 49Q56 55 51 56Q45 57 46 47Z" fill="' +
      LAVA + '" stroke="' + INK + '" stroke-width="3.5" stroke-linejoin="round"/>' +
      '<ellipse cx="70" cy="38" rx="13" ry="3.6" fill="' + GLOW + '" stroke="' + INK + '" stroke-width="2.5"/>' +
      blush + FACES[mood]() + '</svg>';
  }

  // ---- Endgegner: die Klassenarbeit ----
  var BOSS = {
    normal: function () {
      return eye(54, 66, 9, 1, 1, 4) + eye(88, 66, 9, -1, 1, 4) + line('M42 52l20 7M100 52l-20 7', 4.5) +
        line('M49 90l7-7l7 7l7-7l7 7l7-7l7 7');
    },
    hit: function () {
      return line('M47 60l12 6l-12 6M95 60l-12 6l12 6', 4) + '<ellipse cx="71" cy="90" rx="6" ry="7" fill="' + INK + '"/>';
    },
    laugh: function () {
      return line('M46 68q8-10 16 0M80 68q8-10 16 0', 4) + line('M42 52l20 7M100 52l-20 7', 4.5) +
        '<path d="M50 84h42q-2 18-21 18t-21-18z" fill="' + INK + '"/><path d="M56 84h30v5h-30z" fill="#fff"/>';
    },
    dead: function () {
      return line('M47 60l13 13M60 60l-13 13M82 60l13 13M95 60l-13 13', 4) + line('M52 92q5-6 9.5 0t9.5 0t9.5 0');
    }
  };

  function boss(mood, size) {
    mood = BOSS[mood] ? mood : 'normal';
    size = size || 130;
    return '<svg class="boss boss-' + mood + '" viewBox="0 0 150 152" width="' + size + '" height="' + Math.round(size * 152 / 150) +
      '" aria-hidden="true" focusable="false"><g transform="rotate(-5 72 78)">' +
      line('M114 82q22-8 18-32', 5, 'limb') + line('M28 82q-18 4-16 24', 5, 'limb') +
      '<g transform="translate(131 42) rotate(24)"><rect x="-4.5" y="-24" width="9" height="30" rx="2" fill="#E5383B" stroke="' + INK +
      '" stroke-width="2.5"/><path d="M-4.5 6l4.5 10l4.5-10z" fill="#F7C9A0" stroke="' + INK + '" stroke-width="2" stroke-linejoin="round"/></g>' +
      '<rect x="24" y="14" width="94" height="124" rx="8" fill="#fff" stroke="' + INK + '" stroke-width="5"/>' +
      '<text x="33" y="39" font-size="16" font-weight="900" fill="#E5383B" font-family="sans-serif">KA Geo</text>' +
      '<circle cx="101" cy="33" r="8" fill="#BFE3F5" stroke="' + INK + '" stroke-width="2"/><path d="M96 31q4-4 7 0q2 4 5 2M95 36q4 2 7-1" fill="none" stroke="#3E9B45" stroke-width="2" stroke-linecap="round"/>' +
      '<path d="M34 112h74M34 121h74M34 130h48" stroke="#B9CCF5" stroke-width="3" stroke-linecap="round"/>' +
      BOSS[mood]() + '</g></svg>';
  }

  // ---- Sprüche ----
  var LINES = {
    ok: [
      'Richtig! Da bebt die Erde vor Begeisterung.',
      'Volltreffer. Ich bin kurz davor, vor Freude auszubrechen.',
      'Korrekt. Das hat tektonisch gesehen Gewicht.',
      'Stark. Dein Wissen liegt offenbar nicht nur an der Oberfläche.',
      'Sauber. So stabil steht sonst nur ein Hochhaus in Tokio.',
      'Ja! Das saß tiefer als der Marianengraben.',
      'Richtig. Wegener wäre stolz – und der wurde selten gelobt.',
      'Bombe. Also eine vulkanische. Die gute Sorte.',
      'Stimmt. Ich notiere: Platte verschiebt sich Richtung Note 1.',
      'Korrekt. Du bist heute konvergent mit der Musterlösung.',
      'Richtig! Bei dir fließt das Wissen wie dünnflüssige Lava.',
      'Yes. Das war Magnitude 9 auf meiner nach oben offenen Lob-Skala.',
      'Genau. Ich hätte es nicht heißer servieren können.',
      'Richtig. Außen Kruste, innen ein glühender Kern aus Wissen.',
      'Passt wie Südamerika an Afrika.',
      'Korrekt. Wenn das so weitergeht, kann ich in die Ruhephase gehen.'
    ],
    bad: [
      'Autsch. Das war das Epizentrum des Irrtums.',
      'Nope. Diese Antwort wurde soeben subduziert.',
      'Falsch. Ich breche gleich aus – aber nur ein bisschen.',
      'Hm. Dein Wissen driftet noch. Ein paar Zentimeter pro Jahr reichen bis zur KA aber nicht.',
      'Daneben. Kein Drama – lieber hier beben als in der KA.',
      'Leider nein. Ab damit ins Fehler-Training, da wird es metamorph umgewandelt.',
      'Falsch abgebogen. Selbst die San-Andreas-Verwerfung liegt gerader.',
      'Uff. Das war eher Asche als Lava.',
      'Nein. Aber hübsch geraten – fast wie eine Erdbebenvorhersage.',
      'Knapp vorbei ist auch verschoben.',
      'Das war nix. Zum Glück sieht es nur ein kleiner Vulkan.',
      'Falsch. Ich tu so, als hätte ich Asche im Auge gehabt.',
      'Nö. Diese Antwort hält keinem Erdbeben stand.',
      'Da hat sich was verhakt. Spannung abbauen, nochmal lesen.',
      'Leider daneben. Das lagert sich aber noch ab – versprochen.'
    ],
    close: [
      'Fast perfekt. Den Tippfehler schenke ich dir.',
      'Zählt. An der Rechtschreibung schleifen wir noch – wie Wasser am Stein.'
    ],
    combo3: ['Drei in Folge! Da baut sich Druck auf.', 'Dreierserie. In meiner Magmakammer brodelt es.'],
    combo5: ['Fünf am Stück! Das ist kein Zufall mehr, das ist Tektonik.', 'Fünferserie. Du bist nicht aufzuhalten – wie eine Platte in Bewegung.'],
    combo10: ['ZEHN in Folge. Weltweit schlagen die Seismographen aus.'],
    done: [
      'Lektion geschafft. Ich puste dir einen Rauchring.',
      'Erledigt. Schicht für Schicht – so wächst auch ein Vulkan.',
      'Durch! Das hat sich abgelagert und verfestigt.'
    ],
    perfect: [
      'Null Fehler. Ich sag es ungern, aber: Respekt.',
      'Fehlerfrei! Bist du heimlich ein Atlas?',
      'Perfekt. Kein einziger Riss im Fundament.'
    ],
    fail: [
      'Alle Herzen weg. Ich mag dich trotzdem. Nochmal?',
      'Herzen leer. Auch ein Vulkan braucht mal eine Ruhephase.',
      'Eingestürzt. Kurz schütteln, Spickzettel lesen, erdbebensicher zurückkommen.'
    ],
    review0: [
      'Keine offenen Fehler. Entweder bist du genial oder du hast noch nichts gemacht.'
    ],
    reviewDone: [
      'Fehler ausgebügelt. Unter Druck wird aus Kalk eben Marmor.',
      'Wieder ein Riss gekittet. So macht man das.'
    ],
    quit: [
      'Aufgeben? Selbst Kontinente kommen irgendwann an – man muss nur dranbleiben.',
      'Wirklich abbrechen? Ich war gerade so schön aktiv.'
    ],
    hello: [
      'Ich bin Magmus, dein Hausvulkan. Du lernst, ich liefere die Hitze. Und die Sprüche.'
    ],
    idle: [
      'Na, bereit? Die Platten verschieben sich von allein. Dein Wissen leider nicht.',
      'Fünf Minuten reichen. Okay, zehn. Aber fang an.',
      'Ich bin ein aktiver Vulkan. Und du? Auch mal aktiv werden?',
      'Unter meiner Kruste brodelt es. Bei dir hoffentlich auch.',
      'Ich hab die Magmakammer vorgeheizt. Du bringst die Antworten mit.'
    ],
    poke: [
      'Hey! Nicht anstupsen, ich bin druckempfindlich.',
      'Vorsicht, ich bin ein Schichtvulkan. Wir sind die explosiven.',
      'Noch einmal und es gibt Ascheregen.',
      'Fun Fact: Die Platten wandern etwa so schnell, wie deine Fingernägel wachsen.',
      'Fun Fact: Der Mount Everest wächst jedes Jahr ein paar Millimeter. Ich leider nicht.',
      'Fun Fact: Auf Island kannst du in einer Spalte zwischen zwei Platten schnorcheln.',
      'Fun Fact: Die tiefste Bohrung der Welt kratzt mit rund 12 km nur an der Kruste.',
      'Fun Fact: „Tsunami“ ist Japanisch und heißt „Hafenwelle“.',
      'Das kitzelt am Krater.',
      'Stupsen bringt keine XP. Lernen schon.'
    ],
    kaTomorrow: [
      'Morgen ist KA. Keine Panik – Panik ist auch nur ein kleines Beben.',
      'Morgen wird geschrieben. Heute wird trainiert. Ich halte die Glut warm.'
    ],
    kaToday: [
      'Heute ist KA. Kurz aufwärmen, dann zeigst du dem Blatt Papier, wer hier ausbricht.'
    ],
    kaSoon: [
      'Die KA rückt näher – schneller als jede Platte. Jeden Tag ein paar Einheiten und du bist durch.',
      'Noch ein paar Tage bis zur KA. Ich hab einen Plan. Er besteht aus dir und acht Spickzetteln.'
    ],
    kaOver: [
      'KA geschafft? Dann gönn dir eine Ruhephase. Ich mach das seit Jahrhunderten so.',
      'Die KA ist durch. Ich bleibe aktiv – falls du nochmal üben willst.'
    ],
    streakWait: [
      'Dein Streak wartet. Ich auch. Unter Druck.',
      'Heute schon gelernt? Nein. Mein Seismograph merkt alles.'
    ],
    night: [
      'Es ist spät. Eine Runde noch, dann Schlaf – nachts verfestigt sich das Wissen.',
      'Nachtschicht? Ich glühe sowieso im Dunkeln. Du solltest aber bald schlafen.'
    ],
    bossIntro: [
      'Da ist sie: die Klassenarbeit. Sieht gefährlich aus, besteht aber nur aus Papier. Und Papier brennt.'
    ],
    bossWin: [
      'Besiegt! Von der KA ist nur noch Asche übrig.',
      'Boss am Boden. Am Tag der KA machst du das einfach nochmal.'
    ],
    bossMid: [
      'Bestanden, aber da geht mehr. Schau dir unten deine Schwachstellen an.'
    ],
    bossLose: [
      'Der Boss lacht noch. Nicht lange – ab ins Fehler-Training.',
      'Das war die Generalprobe. Die darf wackeln.'
    ],
    blitzGood: ['Blitzschnell. Schneller als eine Erdbebenwelle.', 'Neuer Rekord? Ich hab kurz geblinzelt und alles verpasst.'],
    blitzMeh: ['Solide. Aber ich hab schon Gletscher schneller fließen sehen.', 'Nicht schlecht. Nochmal – diesmal mit mehr Schub aus dem Mantel.'],
    levelUp: ['Level-up! Du bist eine Schicht aufgestiegen.', 'Aufgestiegen. Wie Magma – nur ohne Kollateralschäden.'],
    sheet: [
      'Spicken erlaubt. Hier jedenfalls.',
      'Kurz und knackig. Lies es – ich frag dich gleich ab.'
    ],
    explainOk: ['Sauber formuliert. Operatoren beherrschst du also auch.', 'Das gibt volle Punktzahl. Sage ich. Als Vulkan.'],
    explainBad: ['Da fehlen noch Punkte. Lies die Musterlösung laut – das hilft wirklich.', 'Noch dünn wie ozeanische Kruste. Merk dir die Stichpunkte, dann klappt es.'],
    matOk: ['Material geknackt. Genau so liest man Tabellen und Karten.', 'Sauber ausgewertet. Erst lesen, dann denken – du kannst das.'],
    matBad: ['Schau nochmal genau ins Material – die Antwort steht fast immer drin.', 'Erst Überschrift, Einheit und Legende lesen. Dann antworten.'],
    drillDone: ['Drill geschafft. Diese Zahlen kriegt kein Erdbeben mehr aus deinem Kopf.', 'Sitzt. Tiefer verankert als jedes Fundament.'],
    drillMeh: ['Da wackelt noch was. Zahlen sind wie Gestein: Sie brauchen Druck und Wiederholung.', 'Noch nicht bombenfest. Gleich nochmal – ich zähle mit.'],
    opsDone: ['Operatoren sitzen. Jetzt weißt du, was die Aufgabe wirklich von dir will.', 'Stark. Wer den Operator versteht, verschenkt keine Punkte.'],
    opsSheet: ['Lies erst das Verb in der Aufgabe. Es verrät dir, wie viel du schreiben musst.']
  };

  var last = {};
  function say(kind) {
    var pool = LINES[kind] || LINES.idle;
    if (pool.length === 1) return pool[0];
    var i;
    do { i = Math.floor(Math.random() * pool.length); } while (i === last[kind]);
    last[kind] = i;
    return pool[i];
  }

  window.Magmus = { svg: svg, boss: boss, say: say, moods: Object.keys(FACES) };
})();
