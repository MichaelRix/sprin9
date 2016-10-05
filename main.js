_=document.querySelector.bind(document);

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

_.relpos = function(element, mouseEventArgs) {
  return {x: mouseEventArgs.clientX - element.offsetLeft, y: mouseEventArgs.clientY - element.offsetTop};
}

_.ripple_init = function(element) {
  div = document.createElement('div');
  div.registeredEvent = false;
  div.classList.add('ripple-sphere');
  element.appendChild(div);
}

_.ripple = function(eventArgs, fromElement) {
  pos = _.relpos(fromElement, eventArgs);
  div = fromElement.querySelector('.ripple-sphere');
  if (div.classList.contains('effect-end')) {
    div.classList.remove('effect-end');
  }
  if (div.registeredEvent) {
    div.addEventListener('transitionend', (function() {
      if (this.classList.contains('effect-end')) {
        this.classList = ['ripple-sphere'];
      } else {
        this.classList.add('effect-end');
      }
    }).bind(div));
    div.registeredEvent = true;
  }
  div.style.left = pos.x + 'px';
  div.style.top = pos.y + 'px';
  div.classList.add('effect');
};

_.ripple_init(_('#ripple-test'));

_('#ripple-test').onmousedown = function(e) {
  _.ripple(e, _('#ripple-test'));
};
