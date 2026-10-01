// Shows one language at a time: ?lang=tr|en, then the last choice, then the
// browser language. Runs in <head> so the page never flashes both.
(function () {
  var root = document.documentElement;
  root.classList.add('js');
  var saved = null;
  try { saved = localStorage.getItem('lokma.lang'); } catch (e) {}
  var param = new URLSearchParams(location.search).get('lang');
  var browser = (navigator.language || 'en').toLowerCase().indexOf('tr') === 0 ? 'tr' : 'en';
  var lang = param === 'tr' || param === 'en' ? param : saved === 'tr' || saved === 'en' ? saved : browser;

  function apply() {
    root.classList.remove('show-tr', 'show-en');
    root.classList.add('show-' + lang);
    root.lang = lang;
    var buttons = document.querySelectorAll('.lang button');
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].setAttribute('aria-pressed', String(buttons[i].getAttribute('data-set') === lang));
    }
  }
  apply();
  document.addEventListener('DOMContentLoaded', function () {
    apply();
    var buttons = document.querySelectorAll('.lang button');
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener('click', function () {
        lang = this.getAttribute('data-set');
        try { localStorage.setItem('lokma.lang', lang); } catch (e) {}
        apply();
      });
    }
  });
})();
