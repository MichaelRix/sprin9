_ = document.querySelector.bind(document);

_.drawer = function() {
  drawer = _('#nav-drawer');
  if (drawer.classList.contains('active')) {
    drawer.classList.remove('active');
  } else {
    drawer.classList.add('active');
  }
}
_('h1.site-title').addEventListener('click', _.drawer);
_('p.drawer-title').addEventListener('click', _.drawer);

// ============================================================

phtext = _('#nav-search input').getAttribute('placeholder');
placeholder = document.createElement('label');
placeholder.innerHTML = phtext;
placeholder.classList.add('search-placeholder');
_('#nav-search').appendChild(placeholder);
delete phtext, placeholder;
_('#nav-search input').removeAttribute('placeholder');

_('#nav-search input').addEventListener('focus', function() {
  _('#nav-search').classList.add('active');
});
_('#nav-search input').addEventListener('blur', function() {
  _('#nav-search').classList.remove('active');
});

// ============================================================

_.relativePos = function(mouseEventArg, element) {
  return {x: mouseEventArg.clientX - element.offsetLeft,
    y: mouseEventArg.clientY - element.offsetTop};
}

_.ripple = function(mouseEventArg, element) {
  div = element.querySelector('.ripple-sphere');
  pos = _.relativePos(mouseEventArg, element);
  div.style.left = `${pos.x}px`;
  div.style.top = `${pos.y}px`;
  div.classList.add('effect');
}

_.rippleBind = function(element) {
  div = document.createElement('div');
  div.classList.add('ripple-sphere');
  element.appendChild(div);
  element.addEventListener('mousedown', (function(e) {
    _.ripple(e, this);
  }).bind(element));
  div.addEventListener('transitionend', (function(e) {
    if (e.propertyName == 'opacity') {
      if (!this.classList.contains('effect-end')) {
        this.classList.add('effect-end');
      } else {
        this.classList = ['ripple-sphere'];
      }
    }
  }).bind(div));
}

_.rippleBind(_('#ripple-test'));
_.rippleBind(_('#ripple-test2'));
