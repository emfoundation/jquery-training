var makeTabs = function ($container) {
    var $tabs = $container.find('.tab');

    var state = {
        tabs: [false, false, false]
    };
    
    $tabs.on('click', function () {
        var id = $(this).data('tab');

        $container.find('.tab-content, .tab')
            .removeClass('is-active')
            .not('.tab')
                .filter('#tab' + id)
                    .addClass('is-active')
                .end()
            .end()
        .filter(`[data-tab=${id}]`)
            .addClass('is-active');

        // only make the ajax request if the content hasn't been cached yet
        if (!state.tabs[id]) {
            $.ajax(`tabs/tab${id+1}.html`)
                .done(function (data) {
                    var $currentTab = $container.find('#tab' + id);
                    $currentTab.html(data);
                    // make sure not to get the content twice
                    state.tabs[id] = true;
                })
                .fail(function (error) {
                    console.log(error.responseText);
                })
        }
    });
    // make sure the active tab is fetched on page load
    $tabs.filter('.is-active').trigger('click');
};

makeTabs($('#tab-container'));

var moduleDispatcher = {
  slider: makeSlider
}

// this won't work properly yet, will be fixed next session
moduleDispatcher['slider']($('#slider-container'));