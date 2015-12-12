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

    var getAnimationPair = function(clazz) {

        var cin, cout;

        if (clazz.indexOf('In') >= 0) {
            cin = clazz;
            cout = clazz.replace('In', 'Out');
        } else if (clazz.indexOf('Out') >= 0) {
            cout = clazz;
            cin = clazz.replace('Out', 'In');
        } else {
            cout = clazz;
            cin = clazz;
        }

        return {
            classIn: cin,
            classOut: cout
        };
    };

    var whichAnimationEvent = getAnimationEvent();

    var _animate = function(animateIn, $el, callback) {
            $el.data('deanimate:animatedIn', animateIn);

            var classIn = $el.data("classIn"),
                classOut = $el.data("classOut");

            if (startsWith(classIn, 'flip') || startsWith(classIn, 'fade') || startsWith(classIn, 'rotate')) {

                var frontclass = $el.data("front");
                var backclass = $el.data("back");
                var parallel = $el.data("parallel");

                if (animateIn) {

                    $el.find(frontclass)
                        .addClass(classOut)
                        .removeClass(classIn);

                    var outFunction = function() {
                        if ($el.data("eventCount") <= 0) {
                            $el.find(backclass).css('display', '');
                        }

                        $el.find(backclass)
                            .addClass(classIn)
                            .removeClass(classOut);
                    };

                    if (!parallel) {

                        $el.one(whichAnimationEvent, outFunction);

                    } else {

                        outFunction();
                    }

                } else {

                    $el.find(backclass)
                        .addClass(classOut)
                        .removeClass(classIn);

                    var inFunction = function() {
                        $el.find(frontclass)
                            .removeClass(classOut)
                            .addClass(classIn);
                    };

                    if (!parallel) {

                        $el.one(whichAnimationEvent, inFunction);

                    } else {

                        inFunction();
                    }
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

                var settings = $.extend({}, $.deAnimate.options, options),
                    classIn = settings.classIn,
                    classOut = settings.classOut,
                    divs = $el,
                    frontSelector,
                    backSelector;

                if (typeof classOut === 'undefined') {

                    var pair = getAnimationPair(classIn);

                    classIn = pair.classIn;
                    classOut = pair.classOut;
                }

                $el.data("parallel", settings.parallel);
                $el.data("classIn", classIn);
                $el.data("classOut", classOut);

                if (settings.front === 'auto') {
                    frontSelector = $el.find('.de-animate-front').length > 0 ? '.de-animate-front' :
                        $el.find('.front').length > 0 ? '.front' : ':first-child';
                } else {
                    frontSelector = settings.front;
                }

                if (settings.back === 'auto') {
                    backSelector = $el.find('.de-animate-back').length > 0 ? '.de-animate-back' :
                        $el.find('.back').length > 0 ? '.back' : ':nth-child(2)';
                } else {
                    backSelector = settings.back;
                }

                $el.data("front", frontSelector);
                $el.data("back", backSelector);

                divs = $el.find(frontSelector).add(backSelector);

                $el.data("eventCount", 0);
                $el.find(backSelector).css('display', 'none');

                divs.addClass('animated');

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
        parallel: true,
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