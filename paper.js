/*
 * Paper v2 motion for the Janii site.
 *
 * Sections arrive once (IntersectionObserver adds .in), the h1 sets word by
 * word, the hairline under a section heading draws itself. No library, no
 * external host, no animation loop: requestAnimationFrame is used twice, each
 * time as a single "paint first, then reveal" hop, never as a ticker.
 * prefers-reduced-motion turns all of it off.
 *
 * This lives in its own file, not in an inline <script>, because the page CSP
 * (see the meta tag in index.html) has no 'unsafe-inline' in script-src.
 */
(function () {
  'use strict';

  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduce) {
    document.querySelectorAll('.r, section, .hero').forEach(function (e) { e.classList.add('in'); });
    return;
  }

  // Everything in the first screen arrives right away, without waiting for a scroll.
  var hero = document.getElementById('hero');
  if (hero) {
    requestAnimationFrame(function () {
      hero.classList.add('in');
      hero.querySelectorAll('.r').forEach(function (e) { e.classList.add('in'); });
    });
  }

  // Each section arrives once and is then left alone.
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
    });
  }, { rootMargin: '0px 0px -12% 0px', threshold: 0.1 });
  document.querySelectorAll('section').forEach(function (s) { io.observe(s); });

  // The h1 sets word by word, like a well printed headline.
  var h1 = document.getElementById('h1');
  if (h1) {
    var i = 0;
    Array.prototype.forEach.call(h1.querySelectorAll('.l'), function (line) {
      line.innerHTML = line.textContent.split(' ').map(function (w) {
        var d = (i++ * 0.06).toFixed(2);
        return '<span class="w" style="transition-delay:' + d + 's">' + w + '</span>';
      }).join(' ');
    });
    requestAnimationFrame(function () { h1.classList.add('in'); });
  }
})();
