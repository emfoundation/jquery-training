(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

module.exports = function () {
    var $container = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : $('#container');

    var $button = $container.find('button');
    var content = $container.find('.js-content').html();
    $button.on('click', function () {
        alert(content + '!!');
    });
};

},{}],2:[function(require,module,exports){
'use strict';

module.exports = function ($container, numPerView) {
    var $items = $container.find('.slider-item');
    var $slider = $container.find('.slider');
    var numItems = $items.length;
    var npv = numPerView || 2;
    var sliceEnd = npv === 1 ? undefined : 1 - npv;
    var itemWidth = 100 / npv;
    var states = $items.map(function (index) {
        return index * itemWidth;
    }).slice(0, sliceEnd).get();
    var currentIndex = 0;

    $items.each(function (index) {
        index = index % 4;
        $(this).addClass('item' + (index + 1));
    });

    $slider.css('width', numItems * itemWidth + '%');
    $items.css('width', 100 / numItems + '%');

    $container.find('.control').on('click', function () {
        var $this = $(this);
        var goRight = $this.hasClass('right');
        if (goRight) {
            currentIndex = currentIndex < states.length - 1 ? currentIndex + 1 : currentIndex;
        } else {
            currentIndex = currentIndex > 0 ? currentIndex - 1 : currentIndex;
        }
        $slider.css('left', '-' + states[currentIndex] + '%');
    });
};

},{}],3:[function(require,module,exports){
'use strict';

var Dispatcher = require('../dispatcher');

var makeTabs = function makeTabs($container) {
    var $tabs = $container.find('.tab');

    var state = {
        tabs: [false, false, false]
    };

    $tabs.on('click', function () {
        var id = $(this).data('tab');

        $container.find('.tab-content, .tab').removeClass('is-active').not('.tab').filter('#tab' + id).addClass('is-active').end().end().filter('[data-tab=' + id + ']').addClass('is-active');

        // only make the ajax request if the content hasn't been cached yet
        if (!state.tabs[id]) {
            $.ajax('tabs/tab' + (id + 1) + '.html').done(function (data) {
                var $currentTab = $container.find('#tab' + id);
                var $component = $currentTab.html(data).find('.component');
                Dispatcher.register($component);
                // make sure not to get the content twice
                state.tabs[id] = true;
            }).fail(function (error) {
                console.log(error.responseText);
            });
        }
    });
    // make sure the active tab is fetched on page load
    $tabs.filter('.is-active').trigger('click');
};

module.exports = makeTabs;

},{"../dispatcher":4}],4:[function(require,module,exports){
'use strict';

var makeSlider = require('./components/slider');
var makeAlert = require('./components/alert');

module.exports = function () {
    var components = {
        slider: makeSlider,
        alert: makeAlert
    };

    function register($component) {
        var componentType = $component.data('type');
        if (componentType) {
            components[componentType]($component);
        }
    }

    return {
        register: register
    };
}();

},{"./components/alert":1,"./components/slider":2}],5:[function(require,module,exports){
'use strict';

var makeTabs = require('./components/tabs');

makeTabs($('#tab-container'));

},{"./components/tabs":3}]},{},[5])

//# sourceMappingURL=bundle.js.map
