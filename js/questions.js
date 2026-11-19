/* GeoLerner – Aufgabentypen
   Jeder Typ baut seine Oberfläche in `host` und gibt ein Objekt mit check() zurück.
   check() liefert { ok, right, note } – oder { pending:true }, wenn noch ein Schritt folgt.
   api: ready(bool) · label(text) · submit() · tap() · sfx(name) · instant */
(function () {
  'use strict';

  var el = U.el, $$ = U.$$, shuffle = U.shuffle;

  var HINT = {
    mc: 'Eine Antwort stimmt', multi: 'Mehrere Antworten stimmen', tf: 'Richtig oder falsch?',
    match: 'Paare finden', cloze: 'Lückentext', order: 'Reihenfolge', sort: 'Einsortieren',
    type: 'Fachbegriff eintippen', num: 'Zahl eintippen', label: 'Skizze beschriften', tap: 'Skizze antippen',
    material: 'Material auswerten', explain: 'KA-Aufgabe'
  };

  function title(q) {
    switch (q.t) {
      case 'tf': return '„' + q.q + '“';
      case 'match': return q.q || 'Finde die passenden Paare.';
      case 'cloze': return q.q || 'Fülle die Lücken.';
      case 'label': return q.q || 'Was ist hier markiert?';
      case 'material': return q.q || 'Werte das Material aus.';
      default: return q.q;
    }
  }
  function hint(q) { return q.t === 'explain' && q.op ? 'KA-Aufgabe · Operator: ' + q.op : HINT[q.t]; }

  function fig(host, o) {
    var f = el('div', 'fig', Diagrams.render(o.d, o));
    host.appendChild(f);
    return f;
  }
  // Skizze (q.fig) oder Material (q.mat) über der Aufgabe
  function media(q, host) {
    if (q.mat) host.appendChild(el('div', 'mat-box', Mat.render(q.mat)));
    if (q.fig) fig(host, q.fig);
  }

  // ---- Auswahl (Grundlage für mc, tf, label) ----
  function choice(host, api, options, answer, doShuffle, cls) {
    var idx = options.map(function (_, i) { return i; });
    if (doShuffle) idx = shuffle(idx);
    var sel = -1, locked = false;
    var box = el('div', 'opts ' + (cls || ''));
    idx.forEach(function (oi, k) {
      var b = el('button', 'opt', '<span class="key">' + (k + 1) + '</span><span class="txt">' + options[oi] + '</span>');
      b.type = 'button';
      b.dataset.i = oi;
      b.addEventListener('click', function () {
        if (locked) return;
        sel = oi;
        $$('.opt', box).forEach(function (x) { x.classList.toggle('sel', x === b); });
        api.tap();
        api.ready(true);
        if (api.instant) api.submit();
      });
      box.appendChild(b);
    });
    host.appendChild(box);
    return {
      check: function () {
        locked = true;
        $$('.opt', box).forEach(function (b) {
          var i = +b.dataset.i;
          b.disabled = true;
          if (i === answer) b.classList.add('good');
          else if (i === sel) b.classList.add('bad');
        });
        return { ok: sel === answer, right: options[answer] };
      },
      key: function (n) { var b = $$('.opt', box)[n - 1]; if (b && !locked) b.click(); }
    };
  }

  var QT = {};

  QT.mc = function (q, host, api) {
    media(q, host);
    return choice(host, api, q.o, q.a, true);
  };

  QT.tf = function (q, host, api) {
    media(q, host);
    return choice(host, api, ['Richtig', 'Falsch'], q.a ? 0 : 1, false, 'opts-tf');
  };

  QT.label = function (q, host, api) {
    fig(host, { d: q.d, mark: q.target, layer: q.layer });
    var options = q.o, answer = q.a;
    if (!options) {
      var names = Diagrams.names(q.d), right = names[q.target], skip = q.not || [];
      var others = shuffle(Object.keys(names).filter(function (k) {
        return k !== q.target && names[k] !== right && skip.indexOf(k) < 0;
      })).slice(0, 3).map(function (k) { return names[k]; });
      options = [right].concat(others);
      answer = 0;
    }
    return choice(host, api, options, answer, true);
  };

  QT.multi = function (q, host, api) {
    media(q, host);
    var idx = shuffle(q.o.map(function (_, i) { return i; }));
    var sel = {}, locked = false;
    var box = el('div', 'opts opts-multi');
    function count() { return Object.keys(sel).length; }
    idx.forEach(function (oi) {
      var b = el('button', 'opt', '<span class="key box"></span><span class="txt">' + q.o[oi] + '</span>');
      b.type = 'button';
      b.dataset.i = oi;
      b.addEventListener('click', function () {
        if (locked) return;
        if (sel[oi]) delete sel[oi]; else sel[oi] = true;
        b.classList.toggle('sel', !!sel[oi]);
        api.tap();
        api.ready(count() > 0);
      });
      box.appendChild(b);
    });
    host.appendChild(box);
    return {
      check: function () {
        locked = true;
        var ok = true;
        $$('.opt', box).forEach(function (b) {
          var i = +b.dataset.i, should = q.a.indexOf(i) >= 0, did = !!sel[i];
          b.disabled = true;
          if (should) b.classList.add('good');
          if (did && !should) { b.classList.add('bad'); ok = false; }
          if (should && !did) { b.classList.add('missed'); ok = false; }
        });
        return { ok: ok, right: q.a.map(function (i) { return q.o[i]; }).join(' · ') };
      },
      key: function (n) { var b = $$('.opt', box)[n - 1]; if (b && !locked) b.click(); }
    };
  };

  QT.match = function (q, host, api) {
    var L = shuffle(q.pairs.map(function (p, i) { return { i: i, txt: p[0] }; }));
    var R = shuffle(q.pairs.map(function (p, i) { return { i: i, txt: p[1] }; }));
    var selL = null, selR = null, wrong = 0, done = 0, busy = false;
    var box = el('div', 'match'), cl = el('div', 'col'), cr = el('div', 'col');

    function judge() {
      var a = selL, b = selR;
      selL = selR = null;
      if (a.dataset.i === b.dataset.i) {
        [a, b].forEach(function (x) { x.classList.remove('sel'); x.classList.add('done', 'good'); x.disabled = true; });
        done++;
        api.sfx('ok');
        if (done === q.pairs.length) setTimeout(function () { api.submit(); }, 380);
      } else {
        busy = true;
        wrong++;
        [a, b].forEach(function (x) { x.classList.remove('sel'); x.classList.add('bad'); });
        api.sfx('bad');
        setTimeout(function () { [a, b].forEach(function (x) { x.classList.remove('bad'); }); busy = false; }, 520);
      }
    }
    function mk(it, left) {
      var b = el('button', 'opt mopt', '<span class="txt">' + it.txt + '</span>');
      b.type = 'button';
      b.dataset.i = it.i;
      b.addEventListener('click', function () {
        if (busy || b.classList.contains('done')) return;
        api.tap();
        $$('.mopt', left ? cl : cr).forEach(function (x) { x.classList.remove('sel'); });
        b.classList.add('sel');
        if (left) selL = b; else selR = b;
        if (selL && selR) judge();
      });
      return b;
    }
    L.forEach(function (it) { cl.appendChild(mk(it, true)); });
    R.forEach(function (it) { cr.appendChild(mk(it, false)); });
    box.appendChild(cl); box.appendChild(cr);
    host.appendChild(box);
    return {
      auto: true,
      check: function () {
        var ok = wrong <= 1;
        return {
          ok: ok,
          right: ok ? '' : q.pairs.map(function (p) { return p[0] + ' → ' + p[1]; }).join('<br>'),
          note: wrong ? wrong + (wrong === 1 ? ' Fehlversuch' : ' Fehlversuche') + (ok ? ' – einer ist geschenkt.' : '.') : ''
        };
      }
    };
  };

  QT.cloze = function (q, host, api) {
    var n = q.blanks.length, filled = [], locked = false, i;
    for (i = 0; i < n; i++) filled.push(null);
    var txt = el('div', 'cloze', q.text.replace(/\{(\d)\}/g, function (m, k) {
      return '<button type="button" class="blank" data-i="' + k + '">&nbsp;</button>';
    }));
    var bank = el('div', 'bank');
    function update() { api.ready(filled.every(Boolean)); }
    shuffle(q.blanks.concat(q.extra || [])).forEach(function (w) {
      var c = el('button', 'chip');
      c.type = 'button';
      c.textContent = w;
      c.addEventListener('click', function () {
        if (locked || c.classList.contains('used')) return;
        var k = filled.indexOf(null);
        if (k < 0) return;
        filled[k] = c;
        c.classList.add('used');
        var bl = txt.querySelector('.blank[data-i="' + k + '"]');
        bl.textContent = w;
        bl.classList.add('full');
        api.tap();
        update();
      });
      bank.appendChild(c);
    });
    txt.addEventListener('click', function (e) {
      var bl = e.target.closest('.blank');
      if (!bl || locked) return;
      var k = +bl.dataset.i;
      if (!filled[k]) return;
      filled[k].classList.remove('used');
      filled[k] = null;
      bl.innerHTML = '&nbsp;';
      bl.classList.remove('full');
      update();
    });
    host.appendChild(txt); host.appendChild(bank);
    return {
      check: function () {
        locked = true;
        var good = [], ok = true, k;
        for (k = 0; k < n; k++) good[k] = !!filled[k] && filled[k].textContent === q.blanks[k];
        // Lücken, deren Reihenfolge egal ist (z. B. zwei Produkte einer Gleichung)
        (q.any || []).forEach(function (grp) {
          var want = grp.map(function (g) { return q.blanks[g]; }).sort().join('|');
          var got = grp.map(function (g) { return filled[g] ? filled[g].textContent : ''; }).sort().join('|');
          if (want === got) grp.forEach(function (g) { good[g] = true; });
        });
        $$('.blank', txt).forEach(function (bl) {
          var g = good[+bl.dataset.i];
          bl.classList.add(g ? 'good' : 'bad');
          if (!g) ok = false;
        });
        return { ok: ok, right: q.text.replace(/\{(\d)\}/g, function (m, k2) { return '<b>' + q.blanks[k2] + '</b>'; }) };
      }
    };
  };

  QT.order = function (q, host, api) {
    var items = shuffle(q.items.map(function (t, i) { return { i: i, t: t }; }));
    if (items.every(function (x, k) { return x.i === k; })) items.push(items.shift());
    var picked = [], locked = false;
    var ans = el('ol', 'order-ans'), bank = el('div', 'bank bank-col');

    function redraw() {
      ans.innerHTML = '';
      picked.forEach(function (it, k) {
        var li = el('li');
        var b = el('button', 'chip wide placed', '<span class="num">' + (k + 1) + '</span><span class="txt">' + it.t + '</span>');
        b.type = 'button';
        b.addEventListener('click', function () {
          if (locked) return;
          picked.splice(picked.indexOf(it), 1);
          redraw();
        });
        li.appendChild(b);
        ans.appendChild(li);
      });
      for (var k = picked.length; k < items.length; k++) {
        ans.appendChild(el('li', 'slot', '<span class="num">' + (k + 1) + '</span>'));
      }
      bank.innerHTML = '';
      items.forEach(function (it) {
        if (picked.indexOf(it) >= 0) return;
        var c = el('button', 'chip wide', '<span class="txt">' + it.t + '</span>');
        c.type = 'button';
        c.addEventListener('click', function () {
          if (locked) return;
          picked.push(it);
          api.tap();
          redraw();
        });
        bank.appendChild(c);
      });
      api.ready(picked.length === items.length);
    }
    host.appendChild(ans); host.appendChild(bank);
    redraw();
    return {
      check: function () {
        locked = true;
        var ok = true;
        $$('.placed', ans).forEach(function (b, k) {
          var g = picked[k].i === k;
          b.classList.add(g ? 'good' : 'bad');
          b.disabled = true;
          if (!g) ok = false;
        });
        return { ok: ok, right: q.items.map(function (t, k) { return (k + 1) + '. ' + t; }).join('<br>') };
      }
    };
  };

  QT.sort = function (q, host, api) {
    var items = shuffle(q.items.map(function (it) { return { t: it[0], b: it[1] }; }));
    var k = 0, wrong = 0, busy = false, log = [];
    var dots = el('div', 'dots'), card = el('div', 'sort-card'), btns = el('div', 'sort-btns n' + q.buckets.length);
    items.forEach(function () { dots.appendChild(el('i')); });

    function show() {
      if (k >= items.length) {
        card.innerHTML = '<small>Fertig sortiert</small>';
        $$('.sort-b', btns).forEach(function (b) { b.disabled = true; });
        api.submit();
        return;
      }
      card.innerHTML = '<small>' + (k + 1) + ' von ' + items.length + '</small><strong>' + items[k].t + '</strong>';
    }
    q.buckets.forEach(function (name, bi) {
      var b = el('button', 'opt sort-b', '<span class="txt">' + name + '</span>');
      b.type = 'button';
      b.addEventListener('click', function () {
        if (busy || k >= items.length) return;
        busy = true;
        var it = items[k], good = it.b === bi;
        if (!good) wrong++;
        log.push({ it: it, good: good });
        dots.children[k].className = good ? 'g' : 'b';
        card.classList.add(good ? 'good' : 'bad');
        b.classList.add(good ? 'good' : 'bad');
        if (!good) btns.children[it.b].classList.add('good');
        api.sfx(good ? 'ok' : 'bad');
        setTimeout(function () {
          card.classList.remove('good', 'bad');
          $$('.sort-b', btns).forEach(function (x) { x.classList.remove('good', 'bad'); });
          k++;
          busy = false;
          show();
        }, good ? 380 : 950);
      });
      btns.appendChild(b);
    });
    host.appendChild(dots); host.appendChild(card); host.appendChild(btns);
    show();
    var tol = items.length >= 6 ? 1 : 0;
    return {
      auto: true,
      check: function () {
        var bad = log.filter(function (l) { return !l.good; });
        return {
          ok: wrong <= tol,
          right: wrong > tol ? bad.map(function (l) { return l.it.t + ' → <b>' + q.buckets[l.it.b] + '</b>'; }).join('<br>') : '',
          note: bad.length && wrong <= tol ? 'Ein Ausrutscher: ' + bad[0].it.t + ' gehört zu „' + q.buckets[bad[0].it.b] + '“.' : ''
        };
      },
      key: function (n) { var b = $$('.sort-b', btns)[n - 1]; if (b) b.click(); }
    };
  };

  QT.type = function (q, host, api) {
    media(q, host);
    var inp = el('input', 'type-in');
    inp.type = 'text';
    inp.placeholder = 'Antwort eintippen …';
    inp.setAttribute('autocomplete', 'off');
    inp.setAttribute('autocapitalize', 'off');
    inp.setAttribute('autocorrect', 'off');
    inp.setAttribute('spellcheck', 'false');
    inp.setAttribute('enterkeyhint', 'done');
    inp.addEventListener('input', function () { api.ready(inp.value.trim().length > 0); });
    host.appendChild(inp);
    if (!(window.matchMedia && window.matchMedia('(pointer: coarse)').matches)) {
      setTimeout(function () { inp.focus({ preventScroll: true }); }, 60);
    }
    return {
      check: function () {
        inp.disabled = true;
        var v = U.norm(inp.value), ok = false, note = '';
        q.accept.forEach(function (a) { if (U.norm(a) === v) ok = true; });
        if (!ok) {
          q.accept.forEach(function (a) {
            var n = U.norm(a), tol = n.length >= 9 ? 2 : n.length >= 5 ? 1 : 0;
            if (!ok && tol && U.lev(v, n) <= tol) {
              ok = true;
              note = 'Fast perfekt. Richtig geschrieben: <b>' + q.accept[0] + '</b>';
            }
          });
        }
        inp.classList.add(ok ? 'good' : 'bad');
        return { ok: ok, right: q.accept[0], note: note, close: !!note };
      }
    };
  };

  QT.tap = function (q, host, api) {
    var targets = [].concat(q.target), sel = null, locked = false;
    var f = fig(host, { d: q.d, tap: true, hide: q.hide, layer: q.layer });
    var names = Diagrams.names(q.d);
    f.addEventListener('click', function (e) {
      if (locked) return;
      var p = e.target.closest ? e.target.closest('.part') : null;
      if (!p) return;
      sel = p.getAttribute('data-part');
      var svg = f.firstElementChild;
      svg.classList.add('has-sel');
      $$('.part', svg).forEach(function (x) { x.classList.toggle('sel', x.getAttribute('data-part') === sel); });
      api.tap();
      api.ready(true);
      if (api.instant) api.submit();
    });
    return {
      check: function () {
        locked = true;
        var ok = targets.indexOf(sel) >= 0;
        var marks = [{ part: targets[0], text: '✓', cls: 'good' }];
        if (!ok) marks.push({ part: sel, text: '✗', cls: 'bad' });
        f.innerHTML = Diagrams.render(q.d, { marks: marks, layer: q.layer });
        return {
          ok: ok,
          right: ok ? '' : 'Du hast „' + names[sel] + '“ erwischt. Gesucht war: <b>' + names[targets[0]] + '</b> (grün markiert).'
        };
      }
    };
  };

  QT.explain = function (q, host, api) {
    var phase = 0, ticks = {};
    media(q, host);
    var tipTxt = GEO.opTip ? GEO.opTip(q.op) : '';
    if (tipTxt) host.appendChild(el('p', 'op-tip', '<b>„' + q.op + '“ heißt:</b> ' + tipTxt));
    var ta = el('textarea', 'ex-in');
    ta.rows = 4;
    ta.placeholder = 'Schreib deine Antwort in Stichpunkten – oder sag sie laut auf.';
    var sol = el('div', 'ex-sol');
    sol.hidden = true;
    host.appendChild(ta); host.appendChild(sol);
    api.ready(true);
    api.label('Lösung aufdecken');
    return {
      twoStep: true,
      check: function () {
        if (phase === 0) {
          phase = 1;
          ta.readOnly = true;
          sol.hidden = false;
          sol.innerHTML = '<div class="model"><b>Musterlösung</b><p>' + q.model + '</p></div>' +
            '<p class="ex-ask">Welche Punkte hattest du? Ehrlich ankreuzen – ich merke es sowieso.</p>';
          var list = el('div', 'opts opts-multi');
          q.points.forEach(function (p, i) {
            var b = el('button', 'opt', '<span class="key box"></span><span class="txt">' + p + '</span>');
            b.type = 'button';
            b.addEventListener('click', function () {
              if (phase !== 1) return;
              if (ticks[i]) delete ticks[i]; else ticks[i] = true;
              b.classList.toggle('sel', !!ticks[i]);
              api.tap();
            });
            list.appendChild(b);
          });
          sol.appendChild(list);
          api.label('Auswerten');
          if (sol.scrollIntoView) sol.scrollIntoView({ behavior: 'smooth', block: 'start' });
          return { pending: true };
        }
        phase = 2;
        var n = Object.keys(ticks).length, m = q.points.length, frac = n / m;
        $$('.opt', sol).forEach(function (b) { b.disabled = true; });
        return {
          ok: frac >= 0.6, frac: frac, self: true, right: '',
          note: 'Du hattest ' + n + ' von ' + m + ' Punkten.' + (q.tip ? '<br><i>Tipp: ' + q.tip + '</i>' : '')
        };
      }
    };
  };

  // ---- Zahl eintippen ----
  QT.num = function (q, host, api) {
    media(q, host);
    var wrap = el('div', 'num-wrap');
    var inp = el('input', 'type-in num-in');
    inp.type = 'text';
    inp.placeholder = 'Zahl eintippen …';
    inp.setAttribute('inputmode', 'decimal');
    inp.setAttribute('autocomplete', 'off');
    inp.setAttribute('enterkeyhint', 'done');
    inp.addEventListener('input', function () { api.ready(!isNaN(U.num(inp.value))); });
    wrap.appendChild(inp);
    if (q.unit) wrap.appendChild(el('span', 'num-unit', q.unit));
    host.appendChild(wrap);
    if (!(window.matchMedia && window.matchMedia('(pointer: coarse)').matches)) {
      setTimeout(function () { inp.focus({ preventScroll: true }); }, 60);
    }
    function fits(v, a) { return Math.abs(v - a) <= (q.tol || 0) + 1e-9; }
    return {
      check: function () {
        inp.disabled = true;
        var v = U.num(inp.value), ok = !isNaN(v) && (fits(v, q.a) || (q.alt || []).some(function (a) { return fits(v, a); }));
        inp.classList.add(ok ? 'good' : 'bad');
        var unit = q.unit ? ' ' + q.unit : '';
        return { ok: ok, right: U.de(q.a) + unit + ((q.alt || []).length ? ' (auch ' + q.alt.map(function (a) { return U.de(a) + unit; }).join(', ') + ')' : '') };
      }
    };
  };

  // ---- Material auswerten: ein Material, mehrere Teilaufgaben ----
  QT.material = function (q, host, api) {
    host.appendChild(el('div', 'mat-box', Mat.render(q.mat)));
    var slot = el('div', 'mat-parts');
    host.appendChild(slot);
    var n = q.parts.length, k = 0, state = 'ask', results = [], cur = null;
    var sub = { instant: false, ready: api.ready, label: function () {}, submit: api.submit, tap: api.tap, sfx: api.sfx };
    function show() {
      var p = q.parts[k];
      slot.innerHTML = '';
      var card = el('div', 'mat-part',
        '<div class="mat-part-h"><span class="mat-step">Teil ' + 'abcdef'.charAt(k) + ') · ' + (k + 1) + ' von ' + n + '</span>' +
        '<span class="q-hint">' + HINT[p.t] + '</span></div><h3 class="mat-q' + (p.t === 'tf' ? ' quote' : '') + '">' + title(p) + '</h3>');
      var area = el('div', 'qarea q-' + p.t);
      card.appendChild(area);
      slot.appendChild(card);
      cur = { ctl: QT[p.t](p, area, sub), card: card, p: p };
      api.label('Prüfen');
      api.ready(false);
      state = 'ask';
      if (k > 0 && card.scrollIntoView) card.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    show();
    return {
      twoStep: true,
      check: function () {
        if (state === 'ask') {
          var r = cur.ctl.check();
          results.push(!!r.ok);
          api.sfx(r.ok ? 'ok' : 'bad');
          var box = el('div', 'part-fb ' + (r.ok ? 'ok' : 'bad'),
            '<b>' + (r.ok ? '✓ Richtig' : '✗ Leider falsch') + '</b>' +
            (!r.ok && r.right ? '<p>Richtig wäre: <strong>' + r.right + '</strong></p>' : '') +
            (r.note ? '<p>' + r.note + '</p>' : '') + (cur.p.w ? '<p>' + cur.p.w + '</p>' : ''));
          cur.card.appendChild(box);
          state = 'between';
          api.label(k + 1 < n ? 'Nächste Teilaufgabe' : 'Auswerten');
          api.ready(true);
          if (box.scrollIntoView) box.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          return { pending: true };
        }
        k++;
        if (k < n) { show(); return { pending: true }; }
        var good = results.filter(Boolean).length, bad = n - good;
        return {
          ok: bad === 0 || (n >= 3 && bad <= 1), frac: good / n, right: '', mat: true,
          note: good + ' von ' + n + ' Teilaufgaben richtig.'
        };
      },
      key: function (d) { if (state === 'ask' && cur.ctl.key) cur.ctl.key(d); }
    };
  };

  window.QT = { make: function (q, host, api) { return QT[q.t](q, host, api); }, title: title, hint: hint, types: Object.keys(QT) };
})();
