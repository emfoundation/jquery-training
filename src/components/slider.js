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

    $slider.css('width', (numItems * itemWidth) + '%');
    $items.css('width', (100 / numItems) + '%');

    $container.find('.control').on('click', function () {
        var $this = $(this);
        var goRight = $this.hasClass('right');
        if (goRight) {
        currentIndex = currentIndex < states.length - 1 ?
            currentIndex + 1 : currentIndex;
        } else {
        currentIndex = currentIndex > 0 ?
            currentIndex - 1 : currentIndex;
        }
        $slider.css('left', '-' + states[currentIndex] + '%');
    });
}