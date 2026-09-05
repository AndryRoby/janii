/*
 * sell.js
 *
 * Paper Sell shared bits for this page: a privacy-safe "someone clicked the
 * main CTA" beacon to the owner, the mobile sticky download bar (shows after
 * the hero, closable, remembered for the tab via sessionStorage), and the
 * "I would buy a licence" interest button in the Price section.
 *
 * This page's CSP (see the meta tag in index.html) has no 'unsafe-inline' in
 * script-src, so this logic lives in its own small file instead of inline
 * <script> blocks.
 */
(function () {
  'use strict';

  var SLUG = 'janii';

  function pingOwner(evt, plan) {
    try {
      var url = 'https://homelab.tailbf8f27.ts.net/subscribe/api/ping?e=' + encodeURIComponent(evt) + '&t=' + SLUG + (plan ? '&p=' + encodeURIComponent(plan) : '');
      if (navigator.sendBeacon) { navigator.sendBeacon(url); }
      else if (window.fetch) { fetch(url, { keepalive: true, mode: 'no-cors' }).catch(function () {}); }
    } catch (e) {}
  }

  document.querySelectorAll('[data-umami-event="buy_click"],[data-umami-event="trial_click"],[data-umami-event="download_click"],[data-umami-event="bundle_click"]').forEach(function (el) {
    el.addEventListener('click', function () {
      pingOwner(el.getAttribute('data-umami-event'), el.getAttribute('data-umami-event-plan') || '');
    });
  });

  // "I would buy a licence" interest button (Price section).
  var licenceBtn = document.getElementById('license-btn');
  var licenceThanks = document.getElementById('license-thanks');
  if (licenceBtn && licenceThanks) {
    licenceBtn.addEventListener('click', function () {
      licenceBtn.hidden = true;
      licenceThanks.hidden = false;
    });
  }

  // Sticky mobile CTA bar: shows after the hero, closable, remembered per tab.
  var bar = document.getElementById('sticky-cta');
  if (bar) {
    var KEY = 'arling_sticky_closed_' + SLUG;
    var closeBtn = document.getElementById('sticky-cta-close');
    var hero = document.querySelector('.hero');
    var isClosed = function () { try { return sessionStorage.getItem(KEY) === '1'; } catch (e) { return false; } };
    var onScroll = function () {
      if (isClosed()) { bar.hidden = true; return; }
      var pastHero = !hero || hero.getBoundingClientRect().bottom <= 0;
      bar.hidden = !pastHero;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    if (closeBtn) {
      closeBtn.addEventListener('click', function () {
        try { sessionStorage.setItem(KEY, '1'); } catch (e) {}
        bar.hidden = true;
      });
    }
  }
})();
