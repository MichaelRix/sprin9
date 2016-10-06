_ = document.querySelector.bind(document);

_.drawerEventHandler = function() {
    drawer = _('#nav-drawer');
    if (drawer.classList.contains('active')) {
        drawer.classList.remove('active');
    } else {
        drawer.classList.add('active');
    }
}

_.drawerInit = function() {
    div = document.createElement('div');
    div.classList = ['nav-drawer-mask'];
    div.addEventListener('click', _.drawerEventHandler);
    _('#nav').appendChild(div);
    _('h1.site-title').addEventListener('click', _.drawerEventHandler);
    _('p.drawer-title').addEventListener('click', _.drawerEventHandler);
}

_.navSearchInit = function() {
    placeholderText = _('#nav-search input').getAttribute('placeholder');
    placeholder = document.createElement('label');
    placeholder.innerHTML = placeholderText;
    placeholder.classList.add('search-placeholder');
    _('#nav-search').appendChild(placeholder);
    _('#nav-search input').removeAttribute('placeholder');
    _('#nav-search input').addEventListener('focus', function() {
        _('#nav-search').classList.add('active');
    });
    _('#nav-search input').addEventListener('blur', function() {
        _('#nav-search').classList.remove('active');
    });
}

// ============================================================

_.relativePos = function(mouseEventArg, element) {
    return {
        x: mouseEventArg.clientX - element.offsetLeft,
        y: mouseEventArg.clientY - element.offsetTop + document.body.scrollTop
    };
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
    div.classList = ['ripple-sphere'];
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

_.rippleInit = function() {
    elements = document.querySelectorAll('.ripple-effect');
    for (i = 0; i < elements.length; i++) {
        _.rippleBind(elements[i]);
    }
}

// ============================================================

_.documentLoad = function() {
    _.drawerInit();
    _.navSearchInit();
    _.rippleInit();
}
document.addEventListener('DOMContentLoaded', _.documentLoad);
