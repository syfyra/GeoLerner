/* GeoLerner – Namensraum, KA-Termin und kleine Helfer */
(function () {
  'use strict';

  window.GEO = {
    // Termin der Klassenarbeit (Jahr-Monat-Tag)
    KA: { date: '2026-11-20', title: 'Klassenarbeit Geographie' },
    units: [],
    unit: function (u) { this.units.push(u); },
    // Zusätzliche Fragen-Töpfe für die Arena (Zahlen-Drill, Operatoren-Trainer)
    pools: {},
    pool: function (id, p) { p.id = id; this.pools[id] = p; }
  };

  function lev(a, b) {
    if (a === b) return 0;
    var m = a.length, n = b.length, i, j;
    if (!m) return n;
    if (!n) return m;
    var prev = [], cur = [];
    for (j = 0; j <= n; j++) prev[j] = j;
    for (i = 1; i <= m; i++) {
      cur = [i];
      for (j = 1; j <= n; j++) {
        cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1,
          prev[j - 1] + (a.charCodeAt(i - 1) === b.charCodeAt(j - 1) ? 0 : 1));
      }
      prev = cur;
    }
    return prev[n];
  }

  window.U = {
    $: function (sel, root) { return (root || document).querySelector(sel); },
    $$: function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); },
    el: function (tag, cls, html) {
      var e = document.createElement(tag);
      if (cls) e.className = cls;
      if (html != null) e.innerHTML = html;
      return e;
    },
    shuffle: function (arr) {
      var a = arr.slice();
      for (var i = a.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var t = a[i]; a[i] = a[j]; a[j] = t;
      }
      return a;
    },
    pick: function (arr) { return arr[Math.floor(Math.random() * arr.length)]; },
    // Vergleichsform für getippte Antworten: Umlaute, Artikel, Satzzeichen egal
    norm: function (s) {
      return String(s).toLowerCase().trim()
        .replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss')
        .replace(/^(der|die|das|den|dem|ein|eine|einen)\s+/, '')
        .replace(/[^a-z0-9]/g, '');
    },
    // Getippte Zahl lesen: „5.100“, „5 100 km“, „3,6“ und „ca. 6000 °C“ funktionieren alle
    num: function (s) {
      var m = String(s).replace(/[\s  ’']/g, '').match(/-?\d[\d.,]*/);
      if (!m) return NaN;
      var t = m[0].replace(/[.,]+$/, '');
      if (t.indexOf(',') >= 0) t = t.replace(/\./g, '').replace(',', '.');
      else if (/^-?\d{1,3}(\.\d{3})+$/.test(t)) t = t.replace(/\./g, '');
      return parseFloat(t);
    },
    // Zahl deutsch schreiben: 5100 · 220.000 · 3,6
    de: function (n) {
      if (typeof n !== 'number' || !isFinite(n)) return String(n);
      var neg = n < 0, p = String(Math.abs(n)).split('.'), i = p[0];
      if (i.length > 4) i = i.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
      return (neg ? '−' : '') + i + (p[1] ? ',' + p[1] : '');
    },
    lev: lev,
    esc: function (s) {
      return String(s).replace(/[&<>"]/g, function (c) {
        return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
      });
    },
    clamp: function (v, a, b) { return Math.max(a, Math.min(b, v)); }
  };
})();
