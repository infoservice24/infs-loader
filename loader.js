;(function ($) {

    /**
     * Private params for loader
     * @type {{element: (*|HTMLElement), counter: number}}
     */
    var loader = {
        element: $('#loader'),
        counter: 0
    };

    /**
     * Method increase loader counter and exec action
     * @private
     */
    var _ajaxStart = function() {
        loader.counter++;
        _ajaxAction();
    };

    /**
     * Method decrease loader counter and exec action
     * @private
     */
    var _ajaxStop = function() {
        loader.counter--;
        _ajaxAction();
    };

    /**
     * Method show/hide loader with counter check
     * @private
     */
    var _ajaxAction = function() {
        var counter = loader.counter;

        counter > 0 ? Gevent.publish('loader:showed') : false;
        counter === 0 ? Gevent.publish('loader:hided') : false;
    };

    /**
     * Subscribe on global events
     */
    Gevent
        .subscribe('ajax:started', _ajaxStart)
        .subscribe('ajax:stopped', _ajaxStop)

        .subscribe('loader:showed', function() {
            loader.element.show();
        })
        .subscribe('loader:hided', function() {
            loader.element.hide();
        })

})(jQuery);