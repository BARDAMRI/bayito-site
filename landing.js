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
  function setLang(l) {
    root.classList.toggle('is-en', l === 'en');
    root.lang = l; root.dir = l === 'en' ? 'ltr' : 'rtl';
    document.querySelectorAll('video[data-lang]').forEach(function (v) { if (v.getAttribute('data-lang') !== l && !v.paused) v.pause(); });
    try { localStorage.setItem('hf-lang', l); } catch (e) {}
  }
  setLang(asked === 'he' || asked === 'en' ? asked : saved || ((navigator.language || 'he').slice(0, 2) === 'he' ? 'he' : 'en'));
  var lb = document.getElementById('lang');
  if (lb) lb.addEventListener('click', function () { setLang(root.classList.contains('is-en') ? 'he' : 'en'); });

  var io = 'IntersectionObserver' in window ? new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }); }, { threshold: 0.15 }) : null;
  document.querySelectorAll('.reveal').forEach(function (el, i) { el.style.transitionDelay = (i % 3) * 90 + 'ms'; io ? io.observe(el) : el.classList.add('in'); });
})();
