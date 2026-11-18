/* GeoLerner – Material für „Material auswerten“: Tabelle, Balken- und Liniendiagramm, Karte/Skizze, Textquelle
   Mat.render(m) liefert HTML.
     { kind: 'table', title, head: [...], rows: [[...], ...], src }
     { kind: 'bar',   title, unit, data: [['Name', Zahl], ...], src }
     { kind: 'line',  title, x: 'Achsentitel', y: 'Achsentitel', pts: [[x, y], ...], src }
     { kind: 'fig',   title, d: 'platten', o: { spots: ['A'] }, legend: true, src }
     { kind: 'text',  title, text, src } */
(function () {
  'use strict';

  var BARS = ['#FF6A3D', '#2D7FF9', '#3CCB8C', '#FFC145', '#9B7BFF', '#3BB0E8'];

  function head(m, tag) {
    return '<div class="mat-h"><span class="mat-tag">' + (m.tag || tag) + '</span><strong>' + m.title + '</strong></div>';
  }
  function foot(m) { return m.src ? '<small class="mat-src">' + m.src + '</small>' : ''; }
  function cell(v) { return typeof v === 'number' ? U.de(v) : v; }
  // kurze Angaben (Zahlen, einzelne Wörter) nicht umbrechen
  function td(v) { var t = String(cell(v)); return '<td' + (t.length <= 12 ? ' class="nw"' : '') + '>' + t + '</td>'; }

  function table(m) {
    var h = '<div class="mat-scroll"><table class="mat-table"><thead><tr>' +
      m.head.map(function (c) { return '<th>' + c + '</th>'; }).join('') + '</tr></thead><tbody>';
    m.rows.forEach(function (r) {
      h += '<tr>' + r.map(function (c, i) { return i === 0 ? '<th>' + cell(c) + '</th>' : td(c); }).join('') + '</tr>';
    });
    return h + '</tbody></table></div>';
  }

  function bar(m) {
    var longest = Math.max.apply(null, m.data.map(function (d) { return d[0].length; }));
    var rowH = 34, top = 8, W = 400, x0 = U.clamp(Math.round(longest * 7.2 + 14), 70, 190), xMax = 330, H = top + m.data.length * rowH + 6;
    var max = Math.max.apply(null, m.data.map(function (d) { return d[1]; })) || 1;
    var s = '<svg class="chart" viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="Balkendiagramm: ' + U.esc(m.title) + '">';
    s += '<line x1="' + x0 + '" y1="' + top + '" x2="' + x0 + '" y2="' + (H - 6) + '" stroke="currentColor" stroke-width="2"/>';
    m.data.forEach(function (d, i) {
      var y = top + i * rowH + 5, w = Math.max(1.5, d[1] / max * (xMax - x0));
      s += '<text x="' + (x0 - 8) + '" y="' + (y + 16) + '" text-anchor="end" class="ch-l">' + d[0] + '</text>' +
        '<rect x="' + x0 + '" y="' + y + '" width="' + w.toFixed(1) + '" height="23" rx="4" fill="' + BARS[i % BARS.length] + '" stroke="#24212B" stroke-width="1.5"/>' +
        '<text x="' + (x0 + w + 7).toFixed(1) + '" y="' + (y + 16) + '" class="ch-v">' + (d[2] || U.de(d[1])) + '</text>';
    });
    return s + '</svg>' + (m.unit ? '<small class="mat-unit">Angaben in ' + m.unit + '</small>' : '');
  }

  function nice(max) {
    var p = Math.pow(10, Math.floor(Math.log(max) / Math.LN10)), f = max / p;
    var step = (f <= 1 ? 0.2 : f <= 2 ? 0.5 : f <= 5 ? 1 : 2) * p;
    return { step: step, top: Math.ceil(max / step - 1e-9) * step };
  }
  function line(m) {
    var W = 400, H = 250, L = 58, R = 18, T = 14, B = 44;
    var xs = m.pts.map(function (p) { return p[0]; }), ys = m.pts.map(function (p) { return p[1]; });
    var nx = nice(Math.max.apply(null, xs)), ny = nice(Math.max.apply(null, ys));
    function X(v) { return L + v / nx.top * (W - L - R); }
    function Y(v) { return H - B - v / ny.top * (H - T - B); }
    var s = '<svg class="chart" viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="Liniendiagramm: ' + U.esc(m.title) + '">', v;
    for (v = 0; v <= ny.top + 1e-9; v += ny.step) {
      s += '<line x1="' + L + '" y1="' + Y(v).toFixed(1) + '" x2="' + (W - R) + '" y2="' + Y(v).toFixed(1) + '" class="ch-grid"/>' +
        '<text x="' + (L - 7) + '" y="' + (Y(v) + 4).toFixed(1) + '" text-anchor="end" class="ch-t">' + U.de(Math.round(v * 100) / 100) + '</text>';
    }
    for (v = 0; v <= nx.top + 1e-9; v += nx.step) {
      s += '<line x1="' + X(v).toFixed(1) + '" y1="' + (H - B) + '" x2="' + X(v).toFixed(1) + '" y2="' + (H - B + 5) + '" stroke="currentColor" stroke-width="1.5"/>' +
        '<text x="' + X(v).toFixed(1) + '" y="' + (H - B + 18) + '" text-anchor="middle" class="ch-t">' + U.de(Math.round(v * 100) / 100) + '</text>';
    }
    s += '<path d="M' + L + ' ' + T + 'V' + (H - B) + 'H' + (W - R) + '" fill="none" stroke="currentColor" stroke-width="2"/>';
    s += '<polyline points="' + m.pts.map(function (p) { return X(p[0]).toFixed(1) + ',' + Y(p[1]).toFixed(1); }).join(' ') +
      '" fill="none" stroke="#FF6A3D" stroke-width="3.5" stroke-linejoin="round" stroke-linecap="round"/>';
    m.pts.forEach(function (p) {
      s += '<circle cx="' + X(p[0]).toFixed(1) + '" cy="' + Y(p[1]).toFixed(1) + '" r="4.5" fill="#FFC145" stroke="#24212B" stroke-width="1.8"/>';
    });
    s += '<text x="' + ((L + W - R) / 2) + '" y="' + (H - 6) + '" text-anchor="middle" class="ch-a">' + m.x + '</text>' +
      '<text x="14" y="' + ((T + H - B) / 2) + '" text-anchor="middle" class="ch-a" transform="rotate(-90 14 ' + ((T + H - B) / 2) + ')">' + m.y + '</text>';
    return s + '</svg>';
  }

  function figure(m) {
    var o = m.o || {}, oo = {};
    Object.keys(o).forEach(function (k) { oo[k] = o[k]; });
    if (m.legend) oo.legend = true;
    var h = '<div class="fig">' + Diagrams.render(m.d, oo) + '</div>';
    if (m.legend) h += '<ol class="legend">' + Diagrams.legend(m.d).map(function (n) { return '<li>' + n + '</li>'; }).join('') + '</ol>';
    if (m.key) h += '<p class="mat-key">' + m.key + '</p>';
    return h;
  }

  function render(m) {
    var body, tag;
    switch (m.kind) {
      case 'table': body = table(m); tag = 'Tabelle'; break;
      case 'bar': body = bar(m); tag = 'Diagramm'; break;
      case 'line': body = line(m); tag = 'Diagramm'; break;
      case 'fig': body = figure(m); tag = m.d === 'platten' ? 'Karte' : 'Schaubild'; break;
      default: body = '<blockquote class="mat-text">' + m.text + '</blockquote>'; tag = 'Text';
    }
    return '<div class="mat mat-' + m.kind + '">' + head(m, tag) + body + foot(m) + '</div>';
  }

  window.Mat = { render: render, kinds: ['table', 'bar', 'line', 'fig', 'text'] };
})();
