/* GeoLerner – Skizzen als SVG
   Jede Struktur ist eine Gruppe <g class="part" data-part="…">, damit man sie
   markieren, antippen und beschriften kann. */
(function () {
  'use strict';

  var INK = '#24212B';
  var C = {
    mantel: '#F5A65B', mantelD: '#DE8A3E', oz: '#7C89A3', ozD: '#667189', kont: '#CDA77E', kontD: '#B58E66',
    wasser: '#9AD3F2', wasserD: '#4F9BD0', land: '#BFDD92', land2: '#D4E9B0', magma: '#FF5A36', glow: '#FFC145',
    fels: '#8F7F73', felsD: '#75675D', asche: '#BDB6C8', boden: '#D9B98F'
  };

  // ------------------------------------------------------------ Helfer
  function r1(v) { return Math.round(v * 10) / 10; }
  function P(id, inner) { return '<g class="part" data-part="' + id + '">' + inner + '</g>'; }
  function pts(a) { return a.map(function (p) { return r1(p[0]) + ',' + r1(p[1]); }).join(' '); }
  function poly(a, fill, stroke, sw, more) {
    return '<polygon points="' + pts(a) + '" fill="' + fill + '"' +
      (stroke === 0 ? '' : ' stroke="' + (stroke || INK) + '" stroke-width="' + (sw || 2) + '" stroke-linejoin="round"') + (more || '') + '/>';
  }
  function path(d, fill, stroke, sw, more) {
    return '<path d="' + d + '" fill="' + (fill || 'none') + '"' +
      (stroke === 0 ? '' : ' stroke="' + (stroke || INK) + '" stroke-width="' + (sw || 2) + '" stroke-linecap="round" stroke-linejoin="round"') + (more || '') + '/>';
  }
  function T(x, y, s, o) {
    o = o || {};
    return '<text x="' + x + '" y="' + y + '" text-anchor="' + (o.a || 'middle') + '" font-family="sans-serif" font-weight="' + (o.w || 700) +
      '" font-size="' + (o.s || 12) + '" fill="' + (o.f || INK) + '" pointer-events="none">' + s + '</text>';
  }
  function arrow(x1, y1, x2, y2, col, w, head) {
    col = col || INK; w = w || 4; head = head || w * 2.6;
    var a = Math.atan2(y2 - y1, x2 - x1), bx = x2 - Math.cos(a) * head, by = y2 - Math.sin(a) * head;
    var nx = -Math.sin(a) * head * 0.62, ny = Math.cos(a) * head * 0.62;
    return '<line x1="' + r1(x1) + '" y1="' + r1(y1) + '" x2="' + r1(bx) + '" y2="' + r1(by) + '" stroke="' + col + '" stroke-width="' + w + '" stroke-linecap="round"/>' +
      '<polygon points="' + pts([[x2, y2], [bx + nx, by + ny], [bx - nx, by - ny]]) + '" fill="' + col + '" stroke="' + col + '" stroke-width="1" stroke-linejoin="round"/>';
  }
  function star(cx, cy, r, fill, stroke) {
    var p = [], i, a, rr;
    for (i = 0; i < 16; i++) { a = Math.PI * i / 8; rr = i % 2 ? r * 0.48 : r; p.push([cx + Math.cos(a) * rr, cy + Math.sin(a) * rr]); }
    return poly(p, fill || '#FFE14D', stroke || '#D92F3E', 1.8);
  }
  function hitC(cx, cy, r) { return '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="#000" fill-opacity="0" pointer-events="all"/>'; }
  function hitR(x, y, w, h) { return '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" fill="#000" fill-opacity="0" pointer-events="all"/>'; }
  function hitL(d, w) { return '<path d="' + d + '" fill="none" stroke="#000" stroke-opacity="0" stroke-width="' + w + '" pointer-events="stroke"/>'; }
  function circ(cx, cy, r, fill, stroke, sw) {
    return '<circle cx="' + r1(cx) + '" cy="' + r1(cy) + '" r="' + r + '" fill="' + fill + '"' + (stroke === 0 ? '' : ' stroke="' + (stroke || INK) + '" stroke-width="' + (sw || 2) + '"') + '/>';
  }
  function rnd(seed) { var s = seed; return function () { s = (s * 9301 + 49297) % 233280; return s / 233280; }; }

  // ------------------------------------------------------ Schalenaufbau
  function ring(cx, cy, ro, ri, fill) {
    var d = 'M' + (cx - ro) + ' ' + cy + 'a' + ro + ' ' + ro + ' 0 1 0 ' + (2 * ro) + ' 0a' + ro + ' ' + ro + ' 0 1 0 ' + (-2 * ro) + ' 0Z';
    if (ri > 0) d += 'M' + (cx - ri) + ' ' + cy + 'a' + ri + ' ' + ri + ' 0 1 0 ' + (2 * ri) + ' 0a' + ri + ' ' + ri + ' 0 1 0 ' + (-2 * ri) + ' 0Z';
    return '<path d="' + d + '" fill="' + fill + '" fill-rule="evenodd" stroke="' + INK + '" stroke-width="2"/>';
  }
  function schalen() {
    var cx = 150, cy = 150, s = '';
    s += P('omantel', ring(cx, cy, 131, 108, '#F6A04D'));
    s += P('umantel', ring(cx, cy, 108, 72, '#E8632B'));
    s += P('akern', ring(cx, cy, 72, 36, '#FFC93C'));
    s += P('ikern', ring(cx, cy, 36, 0, '#FFF3B0'));
    s += P('kruste', ring(cx, cy, 140, 131, '#8A6A4B') +
      '<circle cx="' + cx + '" cy="' + cy + '" r="137" fill="none" stroke="#000" stroke-opacity="0" stroke-width="20" pointer-events="stroke"/>');
    // linke Hälfte: die Erde von außen (nur Schmuck)
    s += '<g pointer-events="none"><path d="M150 10A140 140 0 0 0 150 290Z" fill="#6DB9E8" stroke="' + INK + '" stroke-width="2"/>' +
      '<path d="M108 52q18-10 30 2q4 14-8 22q-6 12-18 8q-14-4-12-18q2-10 8-14z" fill="#8CCB6B"/>' +
      '<path d="M52 118q14-12 30-6q16 8 12 26q-2 18 10 30q6 16-8 24q-14 4-20-12q-4-16-16-24q-14-12-8-38z" fill="#8CCB6B"/>' +
      '<path d="M112 212q14-6 24 4q4 14-6 24q-12 8-20-4q-6-14 2-24z" fill="#8CCB6B"/>' +
      '<path d="M150 10V290" stroke="' + INK + '" stroke-width="3"/></g>';
    return s;
  }

  // ---------------------------------------------------- Gesteinskreislauf
  function box(id, cx, cy, fill, lines, hide) {
    var w = 136, h = 50, s = '<rect x="' + (cx - w / 2) + '" y="' + (cy - h / 2) + '" width="' + w + '" height="' + h + '" rx="12" fill="' + fill +
      '" stroke="' + INK + '" stroke-width="2.5"/>';
    if (!hide) {
      if (lines.length === 1) s += T(cx, cy + 5, lines[0], { s: 14, w: 800 });
      else s += T(cx, cy - 3, lines[0], { s: 13.5, w: 800 }) + T(cx, cy + 13, lines[1], { s: lines[2] || 13.5, w: lines[2] ? 600 : 800 });
    }
    return P(id, s);
  }
  function proc(id, x1, y1, x2, y2, labels, hide) {
    var s = arrow(x1, y1, x2, y2, '#5B5567', 5) + hitL('M' + x1 + ' ' + y1 + 'L' + x2 + ' ' + y2, 26);
    labels.forEach(function (l) {
      s += hide ? '' : T(l[0], l[1], l[2], { a: l[3] || 'middle', s: 11.5, w: 700, f: '#3B3547' });
      s += hitR(l[3] === 'end' ? l[0] - 96 : l[3] === 'start' ? l[0] : l[0] - 60, l[1] - 12, l[3] ? 96 : 120, 15);
    });
    return P(id, s);
  }
  function kreislauf(o) {
    var h = o._hide, s = '';
    s += '<g pointer-events="none"><path d="M10 106H226" stroke="#B9B2C4" stroke-width="1.5" stroke-dasharray="5 6"/>' +
      T(150, 100, 'an der Erdoberfläche', { s: 10, w: 600, f: '#8E869A' }) + T(150, 120, 'im Erdinneren', { s: 10, w: 600, f: '#8E869A' }) + '</g>';
    s += proc('erstarrung', 92, 242, 92, 96, [[104, 176, 'Abkühlung und', 'start'], [104, 190, 'Erstarrung', 'start']], h.erstarrung);
    s += proc('verwitterung', 164, 66, 236, 66, [[200, 16, 'Verwitterung, Abtragung,'], [200, 30, 'Transport, Ablagerung']], h.verwitterung);
    s += proc('diagenese', 308, 95, 308, 146, [[296, 124, 'Verfestigung', 'end']], h.diagenese);
    s += proc('metamorphose', 308, 202, 308, 244, [[296, 220, 'Metamorphose', 'end'], [296, 234, '(Druck, Hitze)', 'end']], h.metamorphose);
    s += proc('aufschmelzung', 236, 272, 166, 272, [[201, 293, 'Aufschmelzung']], h.aufschmelzung);
    s += box('magmatit', 92, 66, '#C9C3D6', ['Magmatisches', 'Gestein'], h.magmatit);
    s += box('sediment', 308, 66, '#F0DFAE', ['Sedimente', '(Sand, Kies, Ton)', 11.5], h.sediment);
    s += box('sedimentit', 308, 174, '#DDB877', ['Sedimentgestein'], h.sedimentit);
    s += box('metamorphit', 308, 272, '#9DB3CB', ['Metamorphes', 'Gestein'], h.metamorphit);
    s += box('magma', 92, 272, '#FF8A5C', ['Magma'], h.magma);
    return s;
  }

  // ------------------------------------------------- Blockbild: divergent
  function divergent() {
    var s = '';
    s += P('mantel', poly([[20, 104], [320, 104], [320, 230], [20, 230]], C.mantel) + poly([[320, 152], [380, 102], [380, 180], [320, 230]], C.mantelD) +
      path('M150 208Q118 176 62 180', 'none', '#A8501A', 3.5) + poly([[62, 180], [74, 174], [73, 187]], '#A8501A', '#A8501A', 1) +
      path('M190 208Q222 176 278 180', 'none', '#A8501A', 3.5) + poly([[278, 180], [266, 174], [267, 187]], '#A8501A', '#A8501A', 1));
    s += P('magma', path('M167 100L173 100L181 124Q196 160 205 230L135 230Q144 160 159 124Z', C.magma, '#B5301A', 2) +
      path('M170 222Q166 170 170 122', 'none', C.glow, 5) + arrow(170, 200, 170, 150, '#fff', 3.5, 10));
    s += P('platten',
      poly([[20, 104], [146, 104], [162, 92], [168, 100], [160, 124], [122, 148], [20, 152]], C.oz) +
      poly([[320, 104], [194, 104], [178, 92], [172, 100], [180, 124], [218, 148], [320, 152]], C.oz) +
      poly([[320, 104], [380, 54], [380, 102], [320, 152]], C.ozD) +
      poly([[20, 104], [146, 104], [206, 54], [80, 54]], C.wasser) + poly([[194, 104], [320, 104], [380, 54], [254, 54]], C.wasser) +
      arrow(142, 79, 84, 79, INK, 6, 15) + arrow(232, 79, 290, 79, INK, 6, 15));
    s += P('ruecken', poly([[146, 104], [162, 92], [222, 42], [206, 54]], '#C5E6F7') + poly([[178, 92], [194, 104], [254, 54], [238, 42]], '#7FBFE6') +
      poly([[162, 92], [178, 92], [238, 42], [222, 42]], C.magma, '#B5301A', 1.5));
    return s;
  }

  // ------------------------------------------------ Blockbild: konvergent
  function konvergent() {
    var s = '';
    s += P('mantel', poly([[20, 100], [320, 100], [320, 230], [20, 230]], C.mantel) + poly([[320, 150], [380, 100], [380, 180], [320, 230]], C.mantelD));
    s += '<g pointer-events="none">' + poly([[20, 100], [128, 100], [128, 108], [20, 108]], C.wasser, INK, 1.5) +
      poly([[20, 100], [146, 100], [206, 50], [80, 50]], C.wasser) + '</g>';
    s += P('ozplatte', poly([[20, 108], [128, 108], [150, 120], [281, 230], [247, 230], [140, 140], [118, 130], [20, 130]], C.oz) +
      arrow(36, 119, 100, 119, '#fff', 4.5, 12) + arrow(196, 172, 228, 199, '#fff', 4, 11));
    s += P('kontplatte', poly([[150, 120], [160, 100], [320, 100], [320, 150], [186, 150]], C.kont) +
      poly([[320, 100], [380, 50], [380, 100], [320, 150]], C.kontD) + poly([[160, 100], [320, 100], [380, 50], [220, 50]], C.land) +
      arrow(312, 142, 262, 142, INK, 4.5, 12));
    s += P('rinne', poly([[128, 100], [160, 100], [150, 120], [128, 108]], C.wasserD, INK, 1.5) + poly([[146, 100], [160, 100], [220, 50], [206, 50]], C.wasserD, INK, 1.5));
    s += P('magma', path('M240 188Q256 172 262 152Q266 140 272 134', 'none', C.magma, 7) +
      '<ellipse cx="272" cy="126" rx="17" ry="9" fill="' + C.magma + '" stroke="#B5301A" stroke-width="2"/>' +
      path('M273 118L276 100', 'none', C.magma, 5) + circ(238, 192, 6, C.magma, '#B5301A', 1.5) + hitC(256, 160, 20));
    s += P('gebirge', poly([[189, 87], [211, 87], [200, 67]], '#A8937F', INK, 1.5) + poly([[205, 74], [225, 74], [215, 56]], '#A8937F', INK, 1.5) +
      poly([[221, 62], [239, 62], [230, 46]], '#A8937F', INK, 1.5) + path('M196 74l4-7l4 7M211 63l4-7l4 7M227 52l3-6l3 6', '#fff', 0));
    s += P('vulkan', poly([[254, 94], [298, 94], [276, 56]], C.fels, INK, 2) + poly([[270, 66], [282, 66], [276, 56]], C.magma, '#B5301A', 1.5) +
      circ(279, 44, 7, C.asche, INK, 1.5) + circ(289, 34, 9, C.asche, INK, 1.5) + circ(303, 28, 6, C.asche, INK, 1.5));
    s += P('beben', star(171, 138, 9) + star(196, 159, 9) + star(222, 181, 9));
    return s;
  }

  // ----------------------------------------------- Blockbild: konservativ
  function konservativ() {
    var s = '';
    s += P('mantel', poly([[20, 150], [320, 150], [320, 230], [20, 230]], C.mantel) + poly([[320, 150], [380, 100], [380, 180], [320, 230]], C.mantelD));
    s += P('platten', poly([[20, 100], [170, 100], [170, 150], [20, 150]], C.kont) + poly([[170, 100], [320, 100], [320, 150], [170, 150]], '#C19A72') +
      poly([[320, 100], [380, 50], [380, 100], [320, 150]], C.kontD) +
      poly([[20, 100], [170, 100], [230, 50], [80, 50]], C.land) + poly([[170, 100], [320, 100], [380, 50], [230, 50]], C.land2) +
      arrow(92, 96, 122, 71, INK, 6, 15) + arrow(302, 56, 272, 81, INK, 6, 15));
    s += P('versatz', path('M56 70H206', 'none', '#2D7FF9', 5) + path('M188 85H338', 'none', '#2D7FF9', 5) + hitL('M56 70H206M188 85H338', 16));
    s += P('stoerung', path('M170 150V100L230 50', 'none', '#D92F3E', 3.5) + hitL('M170 150V100L230 50', 18));
    s += P('herd', '<circle cx="170" cy="130" r="13" fill="none" stroke="#D92F3E" stroke-width="2" stroke-dasharray="4 4"/>' +
      '<circle cx="170" cy="130" r="23" fill="none" stroke="#D92F3E" stroke-width="1.6" stroke-dasharray="4 5" opacity=".7"/>' + star(170, 130, 9) + hitC(170, 132, 15));
    s += P('epi', circ(170, 100, 6.5, '#fff', '#D92F3E', 3) + hitC(170, 98, 12));
    return s;
  }

  // ------------------------------------------------- Weltkarte der Platten
  var MW = 400 / 360;
  function LL(p) { return [(p[0] + 180) * MW, (80 - p[1]) * MW]; }
  function geo(a) { return a.map(LL); }
  var M = [[-30, 39], [-40, 30], [-45, 22], [-45, 15], [-38, 8], [-30, 2], [-18, -1], [-13, -12], [-13, -30], [-15, -45], [0, -55]];
  var N = [[-30, 39], [-33, 52], [-25, 62], [-17, 66], [-5, 72], [5, 80]];
  var PLATES = {
    eurasien: { c: '#F4A9A8', p: [N.concat([[180, 80], [180, 51], [165, 55], [155, 48], [144, 40], [141, 34], [135, 33], [130, 30], [123, 24], [124, 17], [127, 10], [128, 3],
      [131, -5], [125, -10], [115, -11], [105, -9], [97, -1], [93, 8], [92, 15], [93, 22], [95, 27], [88, 27], [80, 30], [72, 35], [67, 28], [62, 24], [57, 26],
      [50, 30], [44, 37], [36, 36], [30, 34], [20, 35], [10, 37], [-5, 36]])] },
    nordam: { c: '#F6C58F', p: [[[-180, 80], [5, 80], [-5, 72], [-17, 66], [-25, 62], [-33, 52], [-30, 39], [-40, 30], [-45, 22], [-45, 15], [-60, 15], [-65, 19],
      [-78, 19], [-88, 17], [-92, 15], [-95, 15], [-105, 19], [-110, 23], [-120, 34], [-125, 40], [-128, 48], [-135, 55], [-140, 59], [-150, 57], [-165, 53], [-180, 51]]] },
    suedam: { c: '#B7E2A0', p: [[[-45, 15], [-38, 8], [-30, 2], [-18, -1], [-13, -12], [-13, -30], [-15, -45], [0, -55], [-30, -58], [-65, -57], [-76, -46], [-73, -35],
      [-71, -20], [-79, -10], [-81, -5], [-80, 2], [-78, 8], [-75, 11], [-62, 11], [-60, 15]]] },
    afrika: { c: '#F8DF86', p: [[[-30, 39], [-5, 36], [10, 37], [20, 35], [30, 34], [36, 36], [35, 28], [43, 12], [52, 13], [58, 10], [66, 3], [68, -10], [70, -25],
      [55, -35], [30, -50], [0, -55], [-15, -45], [-13, -30], [-13, -12], [-18, -1], [-30, 2], [-38, 8], [-45, 15], [-45, 22], [-40, 30]]] },
    indoaus: { c: '#CDB9F3', p: [[[62, 24], [67, 28], [72, 35], [80, 30], [88, 27], [95, 27], [93, 22], [92, 15], [93, 8], [97, -1], [105, -9], [115, -11], [125, -10],
      [131, -5], [128, 3], [134, 7], [140, -1], [150, -3], [160, -8], [170, -12], [180, -15], [180, -36], [178, -38], [170, -44], [160, -55], [140, -52], [120, -50],
      [100, -47], [80, -40], [70, -25], [68, -10], [66, 3], [58, 10], [60, 18]]] },
    antarktis: { c: '#E4E9EF', p: [[[-180, -80], [-180, -65], [-160, -63], [-130, -55], [-115, -45], [-110, -35], [-95, -38], [-76, -46], [-65, -57], [-30, -58], [0, -55],
      [30, -50], [55, -35], [70, -25], [80, -40], [100, -47], [120, -50], [140, -52], [160, -55], [165, -62], [180, -65], [180, -80]]] },
    pazifik: { c: '#9DD4F1', p: [
      [[-180, 51], [-165, 53], [-150, 57], [-140, 59], [-135, 55], [-128, 48], [-125, 40], [-120, 34], [-110, 23], [-105, 19], [-105, 10], [-102, 2], [-110, -10],
        [-113, -25], [-110, -35], [-115, -45], [-130, -55], [-160, -63], [-180, -65]],
      [[144, 40], [155, 48], [165, 55], [180, 51], [180, -15], [170, -12], [160, -8], [150, -3], [140, -1], [134, 7], [147, 13], [146, 20], [143, 26], [141, 34]],
      [[180, -36], [178, -38], [170, -44], [160, -55], [165, -62], [180, -65]]] },
    nazca: { c: '#7FD6C2', p: [[[-76, -46], [-73, -35], [-71, -20], [-79, -10], [-81, -5], [-80, 2], [-90, 2], [-102, 2], [-110, -10], [-113, -25], [-110, -35], [-95, -38]]] },
    cocos: { c: '#F2B6D8', p: [[[-80, 2], [-78, 8], [-88, 12], [-92, 15], [-95, 15], [-105, 19], [-105, 10], [-102, 2], [-90, 2]]] },
    karibik: { c: '#E5B98F', p: [[[-60, 15], [-62, 11], [-75, 11], [-78, 8], [-88, 12], [-92, 15], [-88, 17], [-78, 19], [-65, 19]]] },
    arabien: { c: '#E9C7A0', p: [[[36, 36], [44, 37], [50, 30], [57, 26], [62, 24], [60, 18], [58, 10], [52, 13], [43, 12], [35, 28]]] },
    philippinen: { c: '#F2B6D8', p: [[[135, 33], [141, 34], [143, 26], [146, 20], [147, 13], [134, 7], [128, 3], [127, 10], [124, 17], [123, 24], [130, 30]]] }
  };
  var LAND = [
    [[-168, 66], [-156, 71], [-130, 70], [-110, 68], [-95, 72], [-82, 70], [-78, 62], [-65, 60], [-56, 52], [-66, 45], [-70, 42], [-76, 35], [-81, 31], [-80, 25],
      [-84, 30], [-90, 29], [-97, 27], [-97, 20], [-91, 19], [-87, 21], [-88, 16], [-83, 10], [-78, 8], [-85, 11], [-92, 15], [-105, 20], [-110, 24], [-115, 30],
      [-121, 35], [-124, 42], [-124, 48], [-132, 55], [-140, 60], [-150, 60], [-160, 58], [-165, 62]],
    [[-45, 60], [-52, 66], [-55, 72], [-65, 77], [-60, 80], [-20, 80], [-20, 72], [-30, 68], [-40, 65]],
    [[-77, 8], [-72, 12], [-62, 10], [-52, 5], [-50, 0], [-35, -6], [-39, -15], [-41, -22], [-48, -27], [-57, -36], [-63, -41], [-66, -46], [-69, -53], [-72, -53],
      [-75, -47], [-73, -37], [-71, -30], [-70, -18], [-76, -14], [-81, -5], [-80, 1]],
    [[-9, 37], [-9, 43], [-1, 44], [-5, 48], [2, 51], [8, 54], [8, 57], [5, 59], [5, 62], [14, 68], [25, 71], [40, 67], [45, 68], [60, 70], [70, 73], [80, 74],
      [105, 77], [113, 74], [140, 73], [160, 70], [180, 69], [180, 65], [178, 62], [170, 60], [163, 58], [162, 55], [156, 51], [156, 57], [143, 59], [135, 54],
      [141, 48], [131, 43], [129, 36], [126, 34], [126, 38], [121, 39], [118, 38], [122, 30], [119, 25], [110, 21], [108, 16], [109, 12], [105, 9], [100, 13],
      [101, 7], [104, 1], [98, 8], [97, 17], [92, 22], [88, 22], [80, 15], [80, 10], [77, 8], [73, 17], [72, 21], [67, 24], [61, 25], [57, 26], [51, 28], [48, 30],
      [51, 24], [56, 26], [59, 22], [52, 17], [45, 13], [43, 13], [39, 21], [35, 28], [33, 31], [35, 36], [28, 37], [27, 40], [24, 38], [22, 37], [20, 40],
      [14, 45], [13, 44], [18, 40], [16, 38], [12, 42], [9, 44], [4, 43], [0, 39], [-5, 36]],
    [[-6, 35], [10, 37], [11, 33], [20, 32], [32, 31], [35, 28], [37, 21], [43, 12], [51, 12], [48, 5], [41, -2], [39, -8], [40, -15], [35, -24], [32, -29],
      [26, -34], [18, -34], [15, -27], [12, -17], [13, -8], [9, -1], [9, 4], [4, 6], [-8, 4], [-13, 8], [-17, 15], [-17, 21], [-13, 28], [-10, 30]],
    [[49, -12], [50, -16], [47, -25], [44, -23], [44, -17]],
    [[114, -22], [122, -17], [129, -15], [131, -12], [136, -12], [136, -15], [141, -17], [142, -11], [146, -19], [153, -25], [153, -30], [150, -37], [145, -39],
      [140, -38], [136, -35], [131, -31], [124, -33], [116, -35], [114, -30]],
    [[131, -1], [141, -3], [147, -6], [150, -10], [143, -9], [138, -8], [132, -4]],
    [[130, 32], [131, 34], [136, 36], [140, 38], [141, 41], [142, 45], [145, 43], [141, 36], [136, 34]],
    [[95, 5], [104, -5], [106, -6], [100, 0]], [[109, 1], [117, 7], [119, 1], [116, -4], [110, -3]], [[106, -6], [114, -8], [115, -7], [107, -5]],
    [[121, 18], [124, 13], [126, 7], [122, 7], [120, 14]],
    [[-5, 50], [1, 51], [0, 54], [-2, 58], [-6, 57], [-4, 54]], [[-24, 65], [-14, 66], [-14, 64], [-22, 63]],
    [[173, -35], [178, -38], [174, -41], [170, -46], [167, -46], [172, -41]],
    [[-180, -78], [-150, -76], [-130, -74], [-100, -72], [-75, -72], [-62, -65], [-57, -63], [-60, -68], [-60, -75], [-35, -78], [-20, -73], [0, -70], [30, -69],
      [55, -66], [80, -67], [110, -66], [140, -66], [165, -70], [170, -77], [180, -78], [180, -80], [-180, -80]]
  ];
  var BELTS = {
    ring: [
      [[-73, -42], [-71, -25], [-79, -10], [-80, 2], [-88, 12], [-98, 16], [-108, 21], [-118, 33], [-124, 41], [-130, 50], [-142, 59], [-155, 57], [-170, 52], [-179, 51]],
      [[179, 51], [162, 54], [153, 47], [143, 39], [140, 34], [131, 31], [124, 23], [125, 13], [127, 5], [135, -3], [148, -5], [160, -9], [168, -16], [178, -20],
        [179, -30], [176, -39], [168, -45]]],
    alpid: [[[-5, 36], [8, 37], [15, 39], [22, 37], [28, 36], [36, 37], [44, 38], [50, 31], [57, 27], [63, 26], [68, 30], [72, 35], [80, 30], [88, 27], [95, 27],
      [93, 20], [93, 10], [97, 0], [105, -8], [115, -10], [125, -9]]],
    ruecken: [[[5, 79], [-5, 72], [-17, 66], [-25, 62], [-33, 52], [-30, 39], [-40, 30], [-45, 22], [-45, 15], [-38, 8], [-30, 2], [-18, -1], [-13, -12], [-13, -30],
      [-15, -45], [0, -55], [30, -50], [55, -35], [70, -25], [68, -10], [66, 3], [58, 10]], [[70, -25], [80, -40], [100, -47], [120, -50], [140, -52], [160, -57]],
      [[-105, 10], [-102, 2], [-110, -10], [-113, -25], [-110, -35], [-115, -45], [-130, -55], [-160, -63]]]
  };
  function sample(lines, step, jit, seed) {
    var out = [], r = rnd(seed);
    lines.forEach(function (ln) {
      for (var i = 0; i < ln.length - 1; i++) {
        var a = ln[i], b = ln[i + 1], d = Math.sqrt(Math.pow(b[0] - a[0], 2) + Math.pow(b[1] - a[1], 2)), n = Math.max(1, Math.round(d / step));
        for (var k = 0; k < n; k++) {
          var t = k / n;
          out.push([a[0] + (b[0] - a[0]) * t + (r() - 0.5) * jit, a[1] + (b[1] - a[1]) * t + (r() - 0.5) * jit]);
        }
      }
    });
    return out;
  }
  var SPOTS = {
    A: [-19, 65], B: [-69, -23], C: [-121, 36], D: [85, 29], E: [142, 38], F: [36, -2], G: [-155, 20]
  };
  var MOVES = [[-150, 5, -22, 9], [162, 22, -18, 8], [-92, -20, 16, 1], [-56, -14, -15, 2], [-100, 46, -15, -5], [18, 2, 9, 9], [70, 56, 14, -2], [112, -30, 6, 14]];
  function platten(o) {
    var s = '', order = ['antarktis', 'pazifik', 'nordam', 'suedam', 'afrika', 'eurasien', 'indoaus', 'nazca', 'cocos', 'karibik', 'arabien', 'philippinen'];
    order.forEach(function (id) {
      var pl = PLATES[id];
      s += P(id, pl.p.map(function (pp) { return poly(geo(pp), pl.c, '#4A4458', 1.1); }).join(''));
    });
    s += '<g pointer-events="none">' + LAND.map(function (l) { return poly(geo(l), '#3D3A33', 0, 0, ' fill-opacity=".3"'); }).join('');
    if (o.layer === 'beben') {
      sample(BELTS.ring, 4.2, 5, 7).concat(sample(BELTS.alpid, 4.5, 5, 11)).forEach(function (p) { var q = LL(p); s += circ(q[0], q[1], 2.1, '#E3242B', '#7A0F14', 0.6); });
      sample(BELTS.ruecken, 9, 3, 5).forEach(function (p) { var q = LL(p); s += circ(q[0], q[1], 1.4, '#E3242B', 0); });
      [[10, 50], [-90, 36], [105, 35], [135, -25], [25, -28], [-50, -10]].forEach(function (p) { var q = LL(p); s += circ(q[0], q[1], 1.4, '#E3242B', 0); });
    }
    if (o.layer === 'vulkane') {
      sample(BELTS.ring, 7.5, 3, 3).concat([[-19, 65], [-155, 20], [15, 38], [14, 41], [37, -3], [30, -2], [55, -21], [-17, 28], [-25, 38], [112, -8], [100, 0], [38, 13],
        [-15, -37], [25, 36], [-62, 15]]).forEach(function (p) {
        var q = LL(p);
        s += poly([[q[0], q[1] - 3.6], [q[0] + 3.2, q[1] + 2.4], [q[0] - 3.2, q[1] + 2.4]], '#E3242B', '#7A0F14', 0.7);
      });
    }
    if (o.arrows) {
      MOVES.forEach(function (m) { var a = LL([m[0], m[1]]), b = LL([m[0] + m[2], m[1] + m[3]]); s += arrow(a[0], a[1], b[0], b[1], INK, 2.6, 7); });
    }
    (o.spots || []).forEach(function (k) {
      var q = LL(SPOTS[k]);
      s += circ(q[0], q[1], 8, '#fff', INK, 2) + T(r1(q[0]), r1(q[1] + 3.8), k, { s: 10.5, w: 900 });
    });
    s += '<rect x="0" y="0" width="400" height="177.8" fill="none" stroke="' + INK + '" stroke-width="1.5"/></g>';
    return s;
  }

  // -------------------------------------------------------------- Vulkan
  function vulkan() {
    var s = '<g pointer-events="none"><rect x="0" y="220" width="400" height="100" fill="' + C.boden + '"/>' +
      path('M0 246Q100 238 200 246T400 246M0 300Q100 292 200 300T400 300', 'none', '#B99A6E', 2) + path('M0 220H400', 'none', INK, 2.5) + '</g>';
    s += P('kammer', '<ellipse cx="200" cy="282" rx="96" ry="26" fill="' + C.magma + '" stroke="#B5301A" stroke-width="3"/>' +
      '<ellipse cx="186" cy="276" rx="52" ry="10" fill="' + C.glow + '" opacity=".75"/>');
    s += P('schichten', path('M40 220Q130 200 186 72L196 80H204L214 72Q270 200 360 220Z', C.fels, INK, 2.5) +
      path('M76 220Q148 196 191 104M112 220Q164 196 194 136M324 220Q252 196 209 104M288 220Q236 196 206 136', 'none', '#D5CBC0', 5) +
      path('M94 220Q156 196 192 120M306 220Q244 196 208 120', 'none', C.felsD, 4));
    s += P('schlot', path('M193 262L196 80H204L207 262Z', C.magma, '#B5301A', 1.5) + hitR(188, 96, 24, 164));
    s += P('neben', path('M202 196L266 152', 'none', C.magma, 6) + poly([[246, 144], [284, 172], [272, 132]], C.fels, INK, 2) +
      poly([[266, 142], [276, 146], [272, 132]], C.magma, '#B5301A', 1.2) + hitC(266, 152, 16));
    s += P('lava', path('M189 76Q160 132 134 160Q126 168 114 170', 'none', '#B5301A', 12) + path('M189 76Q160 132 134 160Q126 168 114 170', 'none', C.magma, 8));
    s += P('krater', '<ellipse cx="200" cy="76" rx="15" ry="6" fill="' + C.glow + '" stroke="' + INK + '" stroke-width="2"/>' + hitC(200, 74, 13));
    s += P('asche', circ(200, 44, 18, C.asche) + circ(180, 32, 15, C.asche) + circ(222, 30, 16, C.asche) + circ(204, 16, 14, C.asche) + circ(238, 14, 10, C.asche) +
      circ(200, 34, 15, C.asche, 0) + circ(168, 58, 3, INK, 0) + circ(236, 54, 3.5, INK, 0) + circ(156, 40, 2.5, INK, 0) + circ(250, 36, 2.5, INK, 0));
    return s;
  }
  function schild() {
    var s = '<g pointer-events="none"><rect x="0" y="150" width="400" height="60" fill="' + C.boden + '"/>' + path('M0 150H400', 'none', INK, 2.5) + '</g>';
    s += P('kammer', '<ellipse cx="200" cy="184" rx="84" ry="16" fill="' + C.magma + '" stroke="#B5301A" stroke-width="3"/>');
    s += P('flanke', path('M20 150Q200 62 380 150Z', C.fels, INK, 2.5) + path('M70 150Q200 92 330 150M120 150Q200 116 280 150', 'none', C.felsD, 3));
    s += P('schlot', path('M196 176L198 106H202L204 176Z', C.magma, '#B5301A', 1.5) + hitR(190, 110, 20, 62));
    s += P('lava', path('M199 106Q120 116 46 144', 'none', C.magma, 6) + path('M201 106Q280 116 354 144', 'none', C.magma, 6) +
      path('M200 106Q196 92 190 98M200 106Q204 90 210 98', 'none', C.magma, 3.5) + circ(200, 86, 3, C.glow, '#B5301A', 1.2));
    return s;
  }

  // ------------------------------------------------------------- Tsunami
  function tsunami() {
    var top = 'M0 80Q28 80 44 76Q64 67 86 76Q102 83 120 80Q137 77 154 80Q172 83 190 80Q207 77 224 80Q238 84 249 77Q259 67 268 78Q276 87 284 72Q292 54 300 70Q305 80 309 58Q316 32 334 44Q326 50 328 62L330 74';
    var s = '<g pointer-events="none">' + path(top + 'L322 80L300 110L250 150L150 186H60V200H0Z', C.wasser, INK, 2) +
      poly([[322, 80], [345, 66], [400, 60], [400, 230], [322, 230]], C.land, INK, 2) +
      poly([[352, 62], [352, 48], [362, 40], [372, 48], [372, 62]], '#F7EBDD', INK, 1.5) + poly([[348, 49], [362, 38], [376, 49]], '#D9534A', INK, 1.5) +
      path('M388 60V44', 'none', '#7A5C3A', 2.5) + path('M388 44q-8-6-12 0M388 44q8-6 12 0M388 44q-2-9-9-8M388 44q2-9 9-8', 'none', '#3E9B45', 2.5) + '</g>';
    s += P('boden', poly([[150, 186], [250, 150], [300, 110], [322, 80], [322, 230], [150, 230]], C.kont, INK, 2));
    s += P('herd', poly([[0, 200], [60, 200], [50, 230], [0, 230]], C.kontD, INK, 2) + poly([[60, 186], [150, 186], [150, 230], [50, 230], [60, 200]], C.kont, INK, 2) +
      path('M60 186L48 230', 'none', '#D92F3E', 3.5) + arrow(92, 222, 92, 196, '#fff', 4, 11) + arrow(126, 222, 126, 196, '#fff', 4, 11) + star(57, 204, 10));
    s += P('saeule', '<rect x="62" y="80" width="68" height="104" fill="#fff" fill-opacity=".28" stroke="#fff" stroke-width="2" stroke-dasharray="5 5"/>' +
      arrow(84, 168, 84, 104, '#fff', 4, 11) + arrow(108, 168, 108, 104, '#fff', 4, 11));
    s += P('hochsee', hitR(134, 58, 112, 72) + path('M120 80Q137 77 154 80Q172 83 190 80Q207 77 224 80Q238 84 249 77', 'none', '#1D5FA8', 3.5) +
      arrow(142, 104, 236, 104, '#1D5FA8', 4.5, 13));
    s += P('kueste', hitR(250, 28, 86, 60) + path('M249 77Q259 67 268 78Q276 87 284 72Q292 54 300 70Q305 80 309 58Q316 32 334 44', 'none', '#D92F3E', 3.5) +
      arrow(262, 98, 288, 98, '#D92F3E', 4.5, 11));
    return s;
  }

  // -------------------------------------------------------------- Erdbeben
  function beben() {
    var s = '<g pointer-events="none"><rect x="0" y="90" width="400" height="160" fill="#E2C79E"/>' +
      path('M0 136H146M0 196H198', 'none', '#C4A677', 10) + path('M160 146H400M212 206H400', 'none', '#C4A677', 10) + path('M0 90H400', 'none', INK, 2.5) +
      poly([[40, 90], [40, 70], [52, 60], [64, 70], [64, 90]], '#F7EBDD', INK, 1.5) + poly([[36, 71], [52, 58], [68, 71]], '#D9534A', INK, 1.5) +
      poly([[306, 90], [306, 54], [334, 54], [334, 90]], '#F7EBDD', INK, 1.5) + path('M313 63h5M323 63h5M313 74h5M323 74h5', 'none', '#6DB9E8', 3) +
      path('M258 90V74', 'none', '#7A5C3A', 3) + circ(258, 66, 10, '#8CCB6B', INK, 1.5) + '</g>';
    s += P('bruch', path('M110 90L250 250', 'none', '#7A2B16', 4) + hitL('M110 90L250 250', 20) + arrow(142, 150, 128, 134, '#7A2B16', 3, 8) + arrow(222, 196, 236, 212, '#7A2B16', 3, 8));
    s += P('wellen', [22, 42, 64, 88].map(function (r) {
      return '<circle cx="197" cy="190" r="' + r + '" fill="none" stroke="#D92F3E" stroke-width="2.2" stroke-dasharray="6 5" opacity="' + (1 - r / 140) + '"/>';
    }).join('') + '<circle cx="197" cy="190" r="76" fill="none" stroke="#000" stroke-opacity="0" stroke-width="26" pointer-events="stroke"/>');
    s += '<g pointer-events="none">' + path('M197 178V98', 'none', INK, 1.8, ' stroke-dasharray="4 4"') + '</g>';
    s += P('hypo', star(197, 190, 12) + hitC(197, 190, 16));
    s += P('epi', circ(197, 90, 7.5, '#fff', '#D92F3E', 3.5) + circ(197, 90, 2.5, '#D92F3E', 0) + hitC(197, 88, 14));
    return s;
  }

  // ------------------------------------------------- Erdbebensicheres Haus
  function haus() {
    var s = '<g pointer-events="none"><rect x="0" y="240" width="400" height="60" fill="' + C.boden + '"/>' + path('M0 240H400', 'none', INK, 2.5) +
      path('M20 262q10-9 20 0t20 0t20 0t20 0M300 266q10-9 20 0t20 0t20 0', 'none', '#D92F3E', 2.5) + '</g>';
    s += P('fundament', '<rect x="122" y="240" width="156" height="12" fill="#8E869A" stroke="' + INK + '" stroke-width="2"/>' +
      [136, 194, 252].map(function (x) { return '<rect x="' + x + '" y="252" width="12" height="42" fill="#8E869A" stroke="' + INK + '" stroke-width="2"/>'; }).join(''));
    s += P('lager', [134, 176, 210, 252].map(function (x) {
      return '<rect x="' + x + '" y="226" width="16" height="14" rx="3" fill="' + C.glow + '" stroke="' + INK + '" stroke-width="2"/>' +
        '<path d="M' + x + ' 231h16M' + x + ' 235.5h16" stroke="' + INK + '" stroke-width="1.5"/>';
    }).join('') + hitR(126, 222, 150, 20));
    var floors = [50, 94, 138, 182, 226], cols = [130, 176.7, 223.3, 270], fr = '<rect x="130" y="50" width="140" height="176" fill="#EAF4FB" stroke="' + INK + '" stroke-width="4"/>';
    floors.slice(1, 4).forEach(function (y) { fr += '<path d="M130 ' + y + 'H270" stroke="' + INK + '" stroke-width="3"/>'; });
    cols.slice(1, 3).forEach(function (x) { fr += '<path d="M' + x + ' 50V226" stroke="' + INK + '" stroke-width="3"/>'; });
    s += P('skelett', fr);
    var st = '';
    for (var f = 0; f < 4; f++) {
      [[130, 176.7], [223.3, 270]].forEach(function (b) {
        st += 'M' + b[0] + ' ' + floors[f] + 'L' + b[1] + ' ' + floors[f + 1] + 'M' + b[1] + ' ' + floors[f] + 'L' + b[0] + ' ' + floors[f + 1];
      });
    }
    s += P('streben', path(st, 'none', '#D92F3E', 2.6) + hitR(132, 52, 43, 172) + hitR(225, 52, 43, 172));
    s += P('pendel', path('M200 52V70', 'none', INK, 2.5) + circ(200, 80, 11, C.glow, INK, 2.5) + hitC(200, 76, 18));
    return s;
  }

  // ---------------------------------------- Wegener: Südamerika und Afrika
  var AF = [[-6, 35], [10, 37], [11, 33], [20, 32], [32, 31], [35, 28], [37, 21], [43, 12], [51, 12], [48, 5], [41, -2], [39, -8], [40, -15], [35, -24], [32, -29],
    [26, -34], [18, -34], [15, -27], [12, -17], [13, -8], [9, -1], [9, 4], [4, 6], [-8, 4], [-13, 8], [-17, 15], [-17, 21], [-13, 28], [-10, 30]];
  var SAm = [[-77, 8], [-72, 12], [-62, 10], [-52, 5], [-50, 0], [-35, -6], [-39, -15], [-41, -22], [-48, -27], [-57, -36], [-63, -41], [-66, -46], [-69, -53], [-72, -53],
    [-75, -47], [-73, -37], [-71, -30], [-70, -18], [-76, -14], [-81, -5], [-80, 1]];
  function afXY(p) { return [204 + (p[0] - 10) * 2.6, 18 + (37 - p[1]) * 2.73]; }
  var ROT = -34 * Math.PI / 180;
  function saXY(p) {
    var x = (p[0] + 35) * 2.6, y = (-6 - p[1]) * 2.73;
    return [192 + x * Math.cos(ROT) - y * Math.sin(ROT), 124 + x * Math.sin(ROT) + y * Math.cos(ROT)];
  }
  function blob(c, rx, ry, fill, stroke, rot) {
    return '<ellipse cx="' + r1(c[0]) + '" cy="' + r1(c[1]) + '" rx="' + rx + '" ry="' + ry + '" fill="' + fill + '" stroke="' + stroke + '" stroke-width="2"' +
      (rot ? ' transform="rotate(' + rot + ' ' + r1(c[0]) + ' ' + r1(c[1]) + ')"' : '') + '/>';
  }
  function pangaea() {
    var s = '<g pointer-events="none">' + poly(AF.map(afXY), '#E9D9A6', INK, 2) + poly(SAm.map(saXY), '#CFE3B0', INK, 2) +
      T(266, 84, 'Afrika', { s: 13, w: 800, f: '#6B5B2E' }) + T(140, 160, 'Süd-', { s: 13, w: 800, f: '#3F6B2E' }) + T(140, 175, 'amerika', { s: 13, w: 800, f: '#3F6B2E' }) + '</g>';
    var afC = [[-8, 4], [4, 6], [9, 4], [9, -1], [13, -8], [12, -17], [15, -27], [18, -34]].map(afXY);
    var saC = [[-52, 5], [-50, 0], [-35, -6], [-39, -15], [-41, -22], [-48, -27], [-57, -36]].map(saXY);
    function ln(a) { return 'M' + a.map(function (p) { return r1(p[0]) + ' ' + r1(p[1]); }).join('L'); }
    s += P('kueste', path(ln(afC), 'none', '#2D7FF9', 5) + path(ln(saC), 'none', '#2D7FF9', 5) + hitL(ln(afC) + ln(saC), 16));
    var g1 = afXY([-1, 8]), g2 = saXY([-41, -5]);
    function hatch(c, rot) {
      var x = r1(c[0]), y = r1(c[1]);
      return '<g transform="rotate(' + rot + ' ' + x + ' ' + y + ')"><rect x="' + (x - 22) + '" y="' + (y - 11) + '" width="44" height="22" rx="5" fill="#C9B6F2" stroke="#6A4FC8" stroke-width="2"/>' +
        '<path d="M' + (x - 14) + ' ' + (y + 8) + 'l8-16M' + (x - 4) + ' ' + (y + 8) + 'l8-16M' + (x + 6) + ' ' + (y + 8) + 'l8-16" stroke="#6A4FC8" stroke-width="2.2" stroke-linecap="round"/></g>';
    }
    s += P('gestein', hatch(g1, -8) + hatch(g2, -8));
    var f1 = afXY([19, -21]), f2 = saXY([-50, -24]);
    function bone(c) {
      var x = r1(c[0]), y = r1(c[1]);
      return '<path d="M' + (x - 9) + ' ' + y + 'h18M' + (x - 9) + ' ' + (y - 4) + 'v8M' + (x + 9) + ' ' + (y - 4) + 'v8" stroke="#0E6B4B" stroke-width="2.6" stroke-linecap="round" fill="none"/>';
    }
    s += P('fossil', blob(f1, 22, 15, '#8BE0B9', '#14936A') + bone(f1) + blob(f2, 22, 15, '#8BE0B9', '#14936A') + bone(f2));
    var e1 = afXY([24, -31]), e2 = saXY([-63, -40]);
    function ice(c) {
      var x = r1(c[0]), y = r1(c[1]);
      return '<path d="M' + (x - 8) + ' ' + (y - 4) + 'h16M' + (x - 8) + ' ' + y + 'h16M' + (x - 8) + ' ' + (y + 4) + 'h16" stroke="#1D5FA8" stroke-width="2" stroke-linecap="round"/>';
    }
    s += P('eis', blob(e1, 17, 11, '#D6EEFB', '#1D5FA8') + ice(e1) + blob(e2, 17, 11, '#D6EEFB', '#1D5FA8') + ice(e2));
    return s;
  }

  // ------------------------------------------------------- Beschriftungen
  var D = {
    schalen: {
      title: 'Schalenaufbau der Erde (Querschnitt)', vb: '0 0 350 300', draw: schalen,
      order: ['kruste', 'omantel', 'umantel', 'akern', 'ikern'],
      parts: {
        kruste: { n: 'Erdkruste', pin: [262, 22], at: [218, 33] },
        omantel: { n: 'oberer Erdmantel', pin: [302, 62], at: [248, 81] },
        umantel: { n: 'unterer Erdmantel', pin: [322, 128], at: [239, 137] },
        akern: { n: 'äußerer Erdkern', pin: [318, 198], at: [199, 173] },
        ikern: { n: 'innerer Erdkern', pin: [288, 258], at: [160, 164] }
      }
    },
    kreislauf: {
      title: 'Gesteinskreislauf', vb: '0 0 400 306', draw: kreislauf,
      order: ['magma', 'magmatit', 'sediment', 'sedimentit', 'metamorphit'],
      groups: {
        gesteine: ['magma', 'magmatit', 'sediment', 'sedimentit', 'metamorphit'],
        prozesse: ['erstarrung', 'verwitterung', 'diagenese', 'metamorphose', 'aufschmelzung']
      },
      parts: {
        magma: { n: 'Magma', pin: [92, 272], mk: [28, 250] },
        magmatit: { n: 'magmatisches Gestein', pin: [92, 66], mk: [28, 44] },
        sediment: { n: 'Sedimente (Lockermaterial)', pin: [308, 66], mk: [372, 44] },
        sedimentit: { n: 'Sedimentgestein', pin: [308, 174], mk: [372, 152] },
        metamorphit: { n: 'metamorphes Gestein', pin: [308, 272], mk: [372, 250] },
        erstarrung: { n: 'Abkühlung und Erstarrung', pin: [126, 180], at: [97, 180] },
        verwitterung: { n: 'Verwitterung, Abtragung, Transport, Ablagerung', pin: [200, 28], at: [200, 61] },
        diagenese: { n: 'Verfestigung', pin: [270, 120], at: [303, 120] },
        metamorphose: { n: 'Metamorphose (Druck und Hitze)', pin: [270, 224], at: [303, 224] },
        aufschmelzung: { n: 'Aufschmelzung', pin: [201, 244], at: [201, 267] }
      }
    },
    divergent: {
      title: 'Divergierende Plattengrenze (Blockbild)', vb: '0 0 400 240', draw: divergent,
      order: ['platten', 'ruecken', 'magma', 'mantel'],
      parts: {
        platten: { n: 'ozeanische Platten (driften auseinander)', pin: [62, 128] },
        ruecken: { n: 'Mittelozeanischer Rücken', pin: [272, 22], at: [226, 56] },
        magma: { n: 'aufsteigendes Magma', pin: [236, 206], at: [186, 196] },
        mantel: { n: 'Asthenosphäre (Fließzone im Erdmantel)', pin: [52, 206] }
      }
    },
    konvergent: {
      title: 'Konvergierende Plattengrenze: Subduktion (Blockbild)', vb: '0 0 400 240', draw: konvergent,
      order: ['ozplatte', 'kontplatte', 'rinne', 'gebirge', 'vulkan', 'magma', 'beben', 'mantel'],
      parts: {
        ozplatte: { n: 'ozeanische Platte (taucht ab)', pin: [70, 158], at: [70, 124] },
        kontplatte: { n: 'kontinentale Platte', pin: [350, 76] },
        rinne: { n: 'Tiefseerinne', pin: [124, 30], at: [152, 100] },
        gebirge: { n: 'Faltengebirge', pin: [178, 26], at: [212, 62] },
        vulkan: { n: 'Vulkan', pin: [338, 26], at: [286, 70] },
        magma: { n: 'aufsteigendes Magma', pin: [316, 196], at: [258, 166] },
        beben: { n: 'Erdbebenherde', pin: [150, 204], at: [192, 163] },
        mantel: { n: 'Erdmantel (Asthenosphäre)', pin: [52, 204] }
      }
    },
    konservativ: {
      title: 'Konservative Plattengrenze: Transformstörung (Blockbild)', vb: '0 0 400 240', draw: konservativ,
      order: ['platten', 'stoerung', 'versatz', 'epi', 'herd', 'mantel'],
      parts: {
        platten: { n: 'Platten (gleiten aneinander vorbei)', pin: [62, 128] },
        stoerung: { n: 'Transformstörung (Verwerfung)', pin: [262, 22], at: [224, 56] },
        versatz: { n: 'versetzter Flusslauf', pin: [34, 40], at: [72, 68] },
        epi: { n: 'Epizentrum', pin: [140, 26], at: [168, 94] },
        herd: { n: 'Erdbebenherd (Hypozentrum)', pin: [112, 196], at: [163, 136] },
        mantel: { n: 'Erdmantel (Asthenosphäre)', pin: [262, 198] }
      }
    },
    platten: {
      title: 'Die großen Lithosphärenplatten (vereinfacht)', vb: '0 0 400 178', draw: platten,
      order: ['eurasien', 'afrika', 'nordam', 'suedam', 'pazifik', 'indoaus', 'antarktis', 'nazca'],
      parts: {
        eurasien: { n: 'Eurasische Platte', pin: [290, 32] },
        afrika: { n: 'Afrikanische Platte', pin: [222, 88] },
        nordam: { n: 'Nordamerikanische Platte', pin: [90, 38] },
        suedam: { n: 'Südamerikanische Platte', pin: [150, 112] },
        pazifik: { n: 'Pazifische Platte', pin: [34, 86] },
        indoaus: { n: 'Indisch-Australische Platte', pin: [322, 122] },
        antarktis: { n: 'Antarktische Platte', pin: [236, 164] },
        nazca: { n: 'Nazca-Platte', pin: [98, 108] },
        cocos: { n: 'Cocos-Platte', pin: [92, 76] },
        karibik: { n: 'Karibische Platte', pin: [118, 72] },
        arabien: { n: 'Arabische Platte', pin: [254, 64] },
        philippinen: { n: 'Philippinische Platte', pin: [352, 70] }
      }
    },
    vulkan: {
      title: 'Schichtvulkan im Querschnitt', vb: '0 0 400 320', draw: vulkan,
      order: ['kammer', 'schlot', 'krater', 'neben', 'lava', 'asche', 'schichten'],
      parts: {
        kammer: { n: 'Magmakammer', pin: [350, 282], at: [296, 282] },
        schlot: { n: 'Schlot', pin: [326, 104], at: [206, 150] },
        krater: { n: 'Krater', pin: [128, 46], at: [190, 74] },
        neben: { n: 'Nebenkrater', pin: [340, 168], at: [278, 152] },
        lava: { n: 'Lavastrom', pin: [70, 128], at: [140, 152] },
        asche: { n: 'Aschewolke', pin: [300, 22], at: [246, 18] },
        schichten: { n: 'Schichten aus Lava und Asche', pin: [58, 186], at: [120, 204] }
      }
    },
    schild: {
      title: 'Schildvulkan im Querschnitt', vb: '0 0 400 210', draw: schild,
      order: ['flanke', 'lava', 'schlot', 'kammer'],
      parts: {
        flanke: { n: 'flache Hänge', pin: [318, 82], at: [298, 124] },
        lava: { n: 'dünnflüssige Lava', pin: [78, 92], at: [112, 124] },
        schlot: { n: 'Schlot', pin: [246, 52], at: [203, 132] },
        kammer: { n: 'Magmakammer', pin: [340, 186], at: [286, 186] }
      }
    },
    tsunami: {
      title: 'Entstehung eines Tsunamis', vb: '0 0 400 232', draw: tsunami,
      order: ['herd', 'saeule', 'hochsee', 'boden', 'kueste'],
      parts: {
        herd: { n: 'Seebeben: Der Meeresboden hebt sich ruckartig', pin: [26, 150], at: [56, 198] },
        saeule: { n: 'Die Wassersäule wird angehoben', pin: [96, 36], at: [96, 96] },
        hochsee: { n: 'Offenes Meer: Wellen flach, lang und sehr schnell', pin: [186, 36], at: [186, 78] },
        boden: { n: 'Der Meeresboden steigt an, das Wasser wird flacher', pin: [226, 208], at: [258, 152] },
        kueste: { n: 'Küste: Wellen werden langsamer und türmen sich auf', pin: [268, 22], at: [296, 58] }
      }
    },
    beben: {
      title: 'Erdbeben: Herd, Epizentrum und Wellen', vb: '0 0 400 250', draw: beben,
      order: ['hypo', 'epi', 'wellen', 'bruch'],
      parts: {
        hypo: { n: 'Hypozentrum (Erdbebenherd)', pin: [318, 226], at: [206, 194] },
        epi: { n: 'Epizentrum', pin: [226, 34], at: [200, 84] },
        wellen: { n: 'Erdbebenwellen', pin: [356, 150], at: [280, 162] },
        bruch: { n: 'Verwerfung (Bruchfläche)', pin: [58, 168], at: [140, 124] }
      }
    },
    haus: {
      title: 'Erdbebensicheres Hochhaus', vb: '0 0 400 300', draw: haus,
      order: ['pendel', 'streben', 'skelett', 'lager', 'fundament'],
      parts: {
        pendel: { n: 'Schwingungsdämpfer (Pendel)', pin: [200, 20], at: [200, 68] },
        streben: { n: 'Diagonalverstrebungen', pin: [66, 112], at: [150, 116] },
        skelett: { n: 'biegsames Stahlskelett', pin: [334, 140], at: [270, 140] },
        lager: { n: 'Lager aus Gummi oder Federn (Basisisolierung)', pin: [66, 214], at: [138, 233] },
        fundament: { n: 'tiefes Fundament', pin: [334, 272], at: [262, 272] }
      }
    },
    pangaea: {
      title: 'Wegeners Belege: Südamerika und Afrika', vb: '40 0 320 296', draw: pangaea,
      order: ['kueste', 'gestein', 'fossil', 'eis'],
      parts: {
        kueste: { n: 'Küstenlinien passen zusammen', pin: [266, 146], at: [214, 152] },
        gestein: { n: 'gleiche Gesteine und Gebirgszüge', pin: [122, 92], at: [154, 99] },
        fossil: { n: 'gleiche Fossilien (z. B. Mesosaurus)', pin: [282, 190], at: [250, 178] },
        eis: { n: 'gleiche Gletscherspuren', pin: [292, 238], at: [258, 207] }
      }
    }
  };

  function pinSvg(p, txt, cls) {
    var x = p.pin[0], y = p.pin[1], s = '<g class="pin ' + (cls || '') + '">';
    if (p.at) {
      s += '<line x1="' + x + '" y1="' + y + '" x2="' + p.at[0] + '" y2="' + p.at[1] + '" class="pin-line"/>' +
        '<circle cx="' + p.at[0] + '" cy="' + p.at[1] + '" r="3.2" class="pin-dot"/>';
    }
    var r = cls === 'num' ? 11.5 : 14;
    s += '<circle cx="' + x + '" cy="' + y + '" r="' + (r + 5) + '" class="pin-ring"/><circle cx="' + x + '" cy="' + y + '" r="' + r + '" class="pin-b"/>' +
      '<text x="' + x + '" y="' + y + '" class="pin-t" text-anchor="middle" dy=".36em">' + txt + '</text></g>';
    return s;
  }

  /* o.mark   – Struktur hervorheben und mit „?“ versehen (ihr Name wird ausgeblendet)
     o.marks  – [{part, text, cls}] mehrere Marken (für die Auflösung)
     o.legend – alle Strukturen nummerieren
     o.tap    – Strukturen antippbar machen
     o.hide   – Namen ausblenden: Liste von Strukturen oder Name einer Gruppe (Gesteinskreislauf)
     o.layer, o.arrows, o.spots – Zusätze für die Weltkarte */
  function render(name, o) {
    o = o || {};
    var d = D[name];
    if (!d) return '';
    var hide = {}, list = o.hide || [];
    if (typeof list === 'string') list = (d.groups && d.groups[list]) || [];
    list.forEach(function (k) { hide[k] = true; });
    if (o.mark) hide[o.mark] = true;
    var oo = {};
    Object.keys(o).forEach(function (k) { oo[k] = o[k]; });
    oo._hide = hide;
    var body = d.draw(oo), extra = '', cls = 'dg dg-' + name;
    var marks = o.marks ? o.marks.slice() : [];
    if (o.mark) marks.push({ part: o.mark, text: '?', cls: '' });
    if (marks.length) {
      cls += ' dg-mark';
      marks.forEach(function (m) {
        body = body.split('data-part="' + m.part + '"').join('data-part="' + m.part + '" data-on="' + (m.cls || '1') + '"');
        var pp = d.parts[m.part];
        // Auflösung (✓/✗): Marke neben den Namen setzen, wenn die Skizze dafür eine Stelle vorsieht
        if (pp) extra += pinSvg(m.cls && pp.mk ? { pin: pp.mk } : pp, m.text, m.cls);
      });
    }
    if (o.legend) {
      cls += ' dg-legend';
      d.order.forEach(function (id, i) { extra += pinSvg(d.parts[id], i + 1, 'num'); });
    }
    if (o.tap) cls += ' dg-tap';
    return '<svg class="' + cls + '" viewBox="' + d.vb + '" role="img" aria-label="Skizze: ' + d.title + '">' + body + extra + '</svg>';
  }

  function names(name) {
    var out = {}, d = D[name];
    Object.keys(d.parts).forEach(function (k) { out[k] = d.parts[k].n; });
    return out;
  }
  function legend(name) {
    var d = D[name];
    return d.order.map(function (id) { return d.parts[id].n; });
  }

  window.Diagrams = {
    render: render, names: names, legend: legend, all: Object.keys(D),
    has: function (n) { return !!D[n]; }, title: function (n) { return D[n].title; },
    spots: Object.keys(SPOTS)
  };
})();
