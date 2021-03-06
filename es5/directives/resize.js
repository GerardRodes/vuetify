function inserted(el, binding) {
  var cb = binding.value;
  var debounce = 200;
  var callOnLoad = true;

  if (typeof binding.value !== 'function') {
    cb = binding.value.value;
    debounce = binding.value.debounce || debounce;
    callOnLoad = binding.value.quiet != null ? false : callOnLoad;
  }

  var debounceTimeout = null;
  var onResize = function onResize() {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(cb, debounce);
  };

  window.addEventListener('resize', onResize, { passive: true });
  el._onResize = onResize;

  callOnLoad && onResize();
}

function unbind(el, binding) {
  window.removeEventListener('resize', el._onResize);
  delete el._onResize;
}

export default {
  name: 'resize',
  inserted: inserted,
  unbind: unbind
};