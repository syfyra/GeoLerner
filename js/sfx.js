/* GeoLerner – Töne (im Browser erzeugt, keine Dateien) und Konfetti */
(function () {
  'use strict';

  var ctx = null;

  function ac() {
    if (!ctx) {
      var AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return null;
      ctx = new AC();
    }
    if (ctx.state === 'suspended') ctx.resume();
    return ctx;
  }

  function tone(c, freq, at, dur, type, vol) {
    var o = c.createOscillator(), g = c.createGain();
    var t = c.currentTime + at;
    o.type = type || 'sine';
    o.frequency.setValueAtTime(freq, t);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(vol || 0.14, t + 0.012);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g); g.connect(c.destination);
    o.start(t); o.stop(t + dur + 0.03);
  }

  var SOUNDS = {
    tap: function (c) { tone(c, 520, 0, 0.05, 'triangle', 0.05); },
    ok: function (c) { tone(c, 660, 0, 0.1); tone(c, 990, 0.09, 0.16); },
    bad: function (c) { tone(c, 210, 0, 0.16, 'sawtooth', 0.07); tone(c, 150, 0.12, 0.24, 'sawtooth', 0.07); },
    combo: function (c) { tone(c, 784, 0, 0.08); tone(c, 1047, 0.07, 0.08); tone(c, 1319, 0.14, 0.16); },
    win: function (c) { [523, 659, 784, 1047, 1319].forEach(function (f, i) { tone(c, f, i * 0.1, 0.22, 'triangle', 0.13); }); },
    lose: function (c) { [392, 330, 262, 196].forEach(function (f, i) { tone(c, f, i * 0.14, 0.26, 'triangle', 0.11); }); },
    hit: function (c) { tone(c, 140, 0, 0.12, 'square', 0.08); tone(c, 90, 0.05, 0.16, 'square', 0.08); },
    tick: function (c) { tone(c, 1200, 0, 0.03, 'square', 0.03); },
    level: function (c) { [392, 523, 659, 784, 1047].forEach(function (f, i) { tone(c, f, i * 0.08, 0.3, 'sine', 0.13); }); }
  };

  function play(name) {
    if (!window.Store || !Store.s.settings.sound) return;
    try {
      var c = ac();
      if (c && SOUNDS[name]) SOUNDS[name](c);
    } catch (e) { /* Ton ist nie wichtig genug, um zu stören */ }
  }

  // ---- Konfetti ----
  var COLORS = ['#FF6A3D', '#FFC145', '#3CCB8C', '#2D7FF9', '#E5383B', '#B9806A'];

  function confetti(amount) {
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    var cv = document.createElement('canvas');
    cv.className = 'confetti';
    var W = cv.width = window.innerWidth, H = cv.height = window.innerHeight;
    document.body.appendChild(cv);
    var g = cv.getContext('2d');
    var parts = [], n = amount || 130;
    for (var i = 0; i < n; i++) {
      parts.push({
        x: W / 2 + (Math.random() - 0.5) * W * 0.4,
        y: H * 0.35 + (Math.random() - 0.5) * 60,
        vx: (Math.random() - 0.5) * 13,
        vy: -Math.random() * 13 - 3,
        s: Math.random() * 7 + 5,
        r: Math.random() * 6,
        vr: (Math.random() - 0.5) * 0.4,
        c: COLORS[i % COLORS.length],
        round: Math.random() < 0.35
      });
    }
    var t0 = performance.now();
    (function frame(now) {
      var age = now - t0;
      g.clearRect(0, 0, W, H);
      parts.forEach(function (p) {
        p.vy += 0.33; p.vx *= 0.99;
        p.x += p.vx; p.y += p.vy; p.r += p.vr;
        g.save();
        g.translate(p.x, p.y); g.rotate(p.r);
        g.globalAlpha = Math.max(0, 1 - age / 2600);
        g.fillStyle = p.c;
        if (p.round) { g.beginPath(); g.arc(0, 0, p.s / 2, 0, 6.3); g.fill(); }
        else g.fillRect(-p.s / 2, -p.s / 3, p.s, p.s * 0.66);
        g.restore();
      });
      if (age < 2600) requestAnimationFrame(frame);
      else cv.remove();
    })(t0);
  }

  window.Sfx = { play: play, confetti: confetti };
})();
