var makeSlider = require('./components/slider');
var makeAlert = require('./components/alert')

module.exports = (function () {
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
})();