/* HLA IMTX — independent custom code, without third-party dependencies. */
(() => {
  'use strict';

  // Prevent duplicate initialization if the embed is accidentally added twice.
  if (window.HLAIMTX) return;

  const app = { version: '0.1.0', ready: false };
  window.HLAIMTX = app;

  function init() {
    // Future animations will be initialized here, with element-existence guards.
    app.ready = true;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
