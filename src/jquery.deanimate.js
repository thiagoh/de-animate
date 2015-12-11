/*
 * de-animate
 * https://github.com/thiagoh/de-animate
 *
 * Copyright (c) 2015 Thiago Andrade
 * Licensed under the MIT license.
 */

(function($) {


    // Function from David Walsh: http://davidwalsh.name/css-animation-callback licensed with http://opensource.org/licenses/MIT
    var getAnimationEvent = function() {
        var t,
            el = document.createElement("fakeelement"),
            transitions = {
                'WebkitTransition': 'webkitAnimationEnd',
                'MozTransition': 'mozAnimationEnd',
                'MSTransition': 'MSAnimationEnd',
                'OTransition': 'oanimationend',
                'transition': 'animationend'
            };

        for (t in transitions) {
            if (el.style[t] !== undefined) {
                return transitions[t];
            }
        }
    };

    var whichAnimationEvent = getAnimationEvent();

    var _animate = function(animateIn, $el, callback) {
            $el.data('deanimate:animatedIn', animateIn);

            var animation = $el.data("animation");
            if (startsWith(animation, 'flip')) {

                var classAnimationIn,
                    classAnimationOut;

                if (animation.indexOf('In') >= 0) {
                    classAnimationIn = animation;
                    classAnimationOut = animation.replace('In', 'Out');
                } else if (animation.indexOf('Out') >= 0) {
                    classAnimationOut = animation;
                    classAnimationIn = animation.replace('Out', 'In');
                } else {
                    if (console) {
                        console.warn('No such in out animations');
                    }
                }

                var frontclass = $el.data("front");
                var backclass = $el.data("back");

                if (animateIn) {

                    console.log(whichAnimationEvent);

                    $el.find(frontclass)
                        .addClass(classAnimationOut)
                        .removeClass(classAnimationIn)
                        .one(whichAnimationEvent, function() {

                        });
                    $el.find(backclass)
                        .addClass(classAnimationIn)
                        .removeClass(classAnimationOut);


                } else {

                    $el.find(backclass)
                        .addClass(classAnimationOut)
                        .removeClass(classAnimationIn)
                        .one(whichAnimationEvent, function() {});
                    $el.find(frontclass)
                        .removeClass(classAnimationOut)
                        .addClass(classAnimationIn);
                }
            }

            if (animateIn) {

                //Providing a nicely wrapped up callback because transform is essentially async
                $el.one(whichAnimationEvent, function() {
                    $(this).trigger('deanimate:animated-in');
                    $(this).trigger('deanimate:animated');
                    if (callback !== undefined) {
                        callback.call(this);
                    }
                });

            } else {

                //Providing a nicely wrapped up callback because transform is essentially async
                $el.one(whichAnimationEvent, function() {
                    $(this).trigger('deanimate:animated-out');
                    $(this).trigger('deanimate:animated');
                    if (callback !== undefined) {
                        callback.call(this);
                    }
                });
            }
        },
        startsWith = function(source, str) {
            return source.slice(0, str.length) === str;
        };

    //https://github.com/nnattawat/flip
    $.fn.deAnimate = function(options, callback) {
        if (typeof options === 'function') {
            //This allows deAnimate to be called for setup with only a callback (default settings)
            callback = options;
        }

        return this.each(function() {

            var $el = $(this);

            if (!$el.data("deanimate:initiated")) { //Init animated DOM
                $el.data("deanimate:initiated", true);

                var settings = $.extend($.deAnimate.options, options);

                var animation = settings.animation;
                var divs = $el;
                $el.data("animation", animation);

                if (startsWith(animation, 'flip')) {

                    var frontclass = $el.find('.deanimate-front').length > 0 ? '.deanimate-front' :
                        $el.find('.front').length > 0 ? '.front' : ':first-child';

                    var backclass = $el.find('.deanimate-back').length > 0 ? '.deanimate-back' :
                        $el.find('.back').length > 0 ? '.back' : ':nth-child(2)';

                    $el.data("front", frontclass);
                    $el.data("back", backclass);

                    divs = $el.find(frontclass).add(backclass);
                }

                if (!divs.hasClass('animated')) {
                    divs.addClass('animated');
                }

                if (settings.trigger.toLowerCase() === "click") {
                    $el.on($.fn.tap ? "tap" : "click", function(event) {
                        if (!event) {
                            event = window.event;
                        }
                        if ($el.find($(event.target).closest('button, a, input[type="submit"]')).length) {
                            return;
                        }

                        if ($el.data('deanimate:animatedIn')) {
                            _animate(false, $el, callback);
                        } else {
                            _animate(true, $el, callback);
                        }
                    });
                } else if (settings.trigger.toLowerCase() === "hover") {
                    var performAnimation = function() {
                        $el.unbind('mouseleave', performDeanimation);

                        _animate(true, $el, callback);

                        setTimeout(function() {
                            $el.bind('mouseleave', performDeanimation);
                            if (!$el.is(":hover")) {
                                _animate(false, $el, callback);
                            }
                        }, (settings.speed + 150));
                    };

                    var performDeanimation = function() {
                        _animate(false, $el, callback);
                    };

                    $el.mouseenter(performAnimation);
                    $el.mouseleave(performDeanimation);
                }
            }

            return this;
        });
    };

    // Static method.
    $.deAnimate = function(options) {
        // Override default options with passed-in options.
        options = $.extend({}, $.deAnimate.options, options);
        // Return something awesome.
        return 'awesome' + options.punctuation;
    };

    // Static method default options.
    $.deAnimate.options = {
        axis: "y",
        reverse: false,
        trigger: "click",
        speed: 500,
        forceHeight: false,
        forceWidth: false,
        autoSize: true,
        front: 'auto',
        back: 'auto'
    };

    // Custom selector.
    $.expr[':'].deAnimate = function(elem) {
        // Is this element awesome?
        return $(elem).text().indexOf('awesome') !== -1;
    };

}(jQuery));