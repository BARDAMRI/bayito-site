/* The audience pages of the site: accessibility menu, language (the visitor's choice, shared with the home page), and the reveal on scroll. */
(function () {
  var root = document.documentElement;
  var A = {}; try { A = JSON.parse(localStorage.getItem('hf-a11y') || '{}'); } catch (e) {}
  function applyA() { root.classList.toggle('big', !!A.big); root.classList.toggle('hc', !!A.hc); root.classList.toggle('calm', !!A.calm); document.querySelectorAll('[data-a]').forEach(function (b) { b.setAttribute('aria-pressed', A[b.getAttribute('data-a')] ? 'true' : 'false'); }); try { localStorage.setItem('hf-a11y', JSON.stringify(A)); } catch (e) {} }
  document.querySelectorAll('[data-a]').forEach(function (b) { b.addEventListener('click', function () { var k = b.getAttribute('data-a'); A[k] = !A[k]; applyA(); }); });
  var box = document.getElementById('a11y'), tg = document.getElementById('a11y-toggle');
  if (tg) tg.addEventListener('click', function () { var o = box.classList.toggle('open'); tg.setAttribute('aria-expanded', o ? 'true' : 'false'); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && box && box.classList.contains('open')) { box.classList.remove('open'); tg.setAttribute('aria-expanded', 'false'); tg.focus(); } });
  applyA();

  // Language: ?lang=he|en in the address wins (links from the English posts), then the visitor's earlier choice, then the browser's.
  var saved = null; try { saved = localStorage.getItem('hf-lang'); } catch (e) {}
  var asked = (new URLSearchParams(location.search).get('lang') || '').slice(0, 2);
  var LANGS = ['he', 'en', 'ru', 'ar'];
  function setLang(l) {
    if (LANGS.indexOf(l) < 0) l = 'he';
    root.classList.toggle('is-en', l === 'en');
    root.lang = l; root.dir = l === 'he' || l === 'ar' ? 'rtl' : 'ltr';
    var sel = document.getElementById('lang'); if (sel && sel.value !== l) sel.value = l;
    document.querySelectorAll('[data-aria]').forEach(function (e) { try { var m = JSON.parse(e.getAttribute('data-aria')); if (m[l]) e.setAttribute('aria-label', m[l]); } catch (x) {} });
    document.querySelectorAll('video[data-lang]').forEach(function (v) { if (v.getAttribute('data-lang') !== l && !v.paused) v.pause(); });
    try { localStorage.setItem('hf-lang', l); } catch (e) {}
  }
  var nav = (navigator.language || 'he').slice(0, 2);
  setLang(LANGS.indexOf(typeof asked === 'string' ? asked : '') >= 0 ? asked : saved || (LANGS.indexOf(nav) >= 0 ? nav : 'en'));
  var lb = document.getElementById('lang');
  if (lb) lb.addEventListener('change', function () { setLang(lb.value); });

  var io = 'IntersectionObserver' in window ? new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }); }, { threshold: 0.15 }) : null;
  document.querySelectorAll('.reveal').forEach(function (el, i) { el.style.transitionDelay = (i % 3) * 90 + 'ms'; io ? io.observe(el) : el.classList.add('in'); });
})();
