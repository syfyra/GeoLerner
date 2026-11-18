/* GeoLerner – Speicherstand (nur im Browser, localStorage) */
(function () {
  'use strict';

  var KEY = 'geolerner.v1';
  var LV = [0, 30, 80, 150, 240, 350, 480, 640, 830, 1050, 1300, 1600];
  var TITLES = ['Sandkorn', 'Kieselstein', 'Sedimentschicht', 'Gesteinsbrocken', 'Basaltsäule', 'Faltengebirge',
    'Plattenschieber', 'Kontinentaldrifter', 'Seismo-Profi', 'Vulkanologe', 'Geo-Ass', 'Wegeners Erbe'];
  var DAILY_GOAL = 40;

  function fresh() {
    return {
      v: 1,
      xp: 0,
      streak: { count: 0, last: null, best: 0 },
      daily: { date: null, xp: 0 },
      lessons: {},          // id -> { stars, plays }
      mistakes: {},         // Frage-id -> wie oft noch richtig beantworten
      stats: { answered: 0, correct: 0, bestCombo: 0, sessions: 0 },
      blitzHigh: 0,
      boss: { best: null, tries: 0 },
      drills: {},           // Modus -> { best, plays }
      badges: {},           // id -> Datum
      sheets: {},           // Einheit-id -> gelesen
      settings: { sound: true, theme: 'auto' },
      seenIntro: false
    };
  }

  function merge(base, saved) {
    Object.keys(saved || {}).forEach(function (k) {
      var b = base[k], s = saved[k];
      if (b && typeof b === 'object' && !Array.isArray(b) && s && typeof s === 'object') {
        Object.keys(s).forEach(function (kk) { b[kk] = s[kk]; });
      } else if (s !== undefined) {
        base[k] = s;
      }
    });
    return base;
  }

  function pad(n) { return (n < 10 ? '0' : '') + n; }
  function ymd(d) { return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()); }
  function parse(s) { var p = s.split('-'); return new Date(+p[0], +p[1] - 1, +p[2]); }
  function dayDiff(a, b) { return Math.round((parse(b) - parse(a)) / 86400000); }

  var Store = {
    s: fresh(),
    LV: LV,
    DAILY_GOAL: DAILY_GOAL,

    load: function () {
      try {
        var raw = localStorage.getItem(KEY);
        this.s = merge(fresh(), raw ? JSON.parse(raw) : {});
      } catch (e) {
        this.s = fresh();
      }
      if (this.s.daily.date !== this.today()) this.s.daily = { date: this.today(), xp: 0 };
      return this.s;
    },
    save: function () {
      try { localStorage.setItem(KEY, JSON.stringify(this.s)); } catch (e) { /* privater Modus o. Ä. */ }
    },
    reset: function () {
      var keep = this.s.settings;
      this.s = fresh();
      this.s.settings = keep;
      this.save();
    },

    today: function () { return ymd(new Date()); },
    dayDiff: dayDiff,

    // ---- Level ----
    levelIndex: function (xp) {
      var l = 0;
      for (var i = 0; i < LV.length; i++) if (xp >= LV[i]) l = i;
      return l;
    },
    level: function () {
      var xp = this.s.xp, l = this.levelIndex(xp);
      var from = LV[l], to = l + 1 < LV.length ? LV[l + 1] : LV[l] + 400;
      return { n: l + 1, title: TITLES[l], into: xp - from, span: to - from, pct: Math.min(100, Math.round((xp - from) / (to - from) * 100)) };
    },

    // ---- Streak ----
    streak: function () {
      var st = this.s.streak;
      if (!st.last) return 0;
      return dayDiff(st.last, this.today()) <= 1 ? st.count : 0;
    },
    doneToday: function () { return this.s.streak.last === this.today(); },
    touchStreak: function () {
      var t = this.today(), st = this.s.streak;
      if (st.last === t) return false;
      var d = st.last ? dayDiff(st.last, t) : 99;
      st.count = d === 1 ? st.count + 1 : 1;
      st.last = t;
      st.best = Math.max(st.best || 0, st.count);
      return true;
    },

    // ---- XP ----
    addXP: function (n) {
      var before = this.levelIndex(this.s.xp);
      if (this.s.daily.date !== this.today()) this.s.daily = { date: this.today(), xp: 0 };
      var newDay = false;
      if (n > 0) {
        this.s.xp += n;
        this.s.daily.xp += n;
        newDay = this.touchStreak();
      }
      this.save();
      return { levelUp: this.levelIndex(this.s.xp) > before, newDay: newDay };
    },

    // ---- Lektionen ----
    lesson: function (id) { return this.s.lessons[id] || null; },
    lessonDone: function (id, stars) {
      var l = this.s.lessons[id] || { stars: 0, plays: 0 };
      l.stars = Math.max(l.stars, stars);
      l.plays++;
      this.s.lessons[id] = l;
      this.save();
    },

    // ---- Fehler-Training ----
    addMistake: function (id) { this.s.mistakes[id] = 2; },
    solveMistake: function (id) {
      if (!(id in this.s.mistakes)) return;
      this.s.mistakes[id]--;
      if (this.s.mistakes[id] <= 0) delete this.s.mistakes[id];
    },
    mistakeIds: function () { return Object.keys(this.s.mistakes); },
    dropMistake: function (id) { delete this.s.mistakes[id]; },
    drillDone: function (kind, pct) {
      var d = this.s.drills[kind] || { best: 0, plays: 0 };
      d.best = Math.max(d.best, pct);
      d.plays++;
      this.s.drills[kind] = d;
    },

    stat: function (ok) {
      this.s.stats.answered++;
      if (ok) this.s.stats.correct++;
    },
    badge: function (id) {
      if (this.s.badges[id]) return false;
      this.s.badges[id] = this.today();
      return true;
    }
  };

  window.Store = Store;
})();
