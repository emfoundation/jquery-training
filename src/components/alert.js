module.exports = function ($container) {
    var $button = $container.find('button');
    var content = $container.find('.js-content').html();
    $button.on('click', function () {
        alert(content);
    })
}