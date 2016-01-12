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
                animations = {
                    'WebkitAnimation': 'webkitAnimationEnd',
                    'OAnimation': 'oAnimationEnd',
                    'msAnimation': 'MSAnimationEnd',
                    'animation': 'animationend'
                };

            for (t in animations) {
                if (el.style[t] !== undefined) {
                    return animations[t];
                }
            }
        },
        getTransitionEvent = function() {
            var t,
                el = document.createElement("fakeelement"),
                transitions = {
                    'WebkitTransition': 'webkitTransitionEnd',
                    'OTransition': 'oTransitionEnd',
                    'msTransition': 'MSTransitionEnd',
                    'transition': 'transitionend'
                };

            for (t in transitions) {
                if (el.style[t] !== undefined) {
                    return transitions[t];
                }
            }
        };

    var getAnimationPair = function(clazz) {

        var cin = clazz,
            cout = clazz;

        if (clazz.indexOf('In') >= 0) {
            cin = clazz;
            cout = clazz.replace('In', 'Out');
        } else if (clazz.indexOf('Out') >= 0) {
            cout = clazz;
            cin = clazz.replace('Out', 'In');
        }

        return {
            classIn: cin,
            classOut: cout
        };
    };

    var whichEvent = getAnimationEvent() + ' ' + getTransitionEvent();

    var _animate = function(animateIn, $el, callback) {
            $el.data('deanimate:animatedIn', animateIn);

            var classIn = $el.data("deanimate:classIn"),
                classOut = $el.data("deanimate:classOut"),
                frontclass = $el.data("deanimate:front"),
                backclass = $el.data("deanimate:back"),
                parallel = $el.data("deanimate:parallel");

            if (animateIn) {

                $el.find(frontclass)
                    .addClass(classOut)
                    .removeClass(classIn);

                var outFunction = function() {
                    var eventCount = $el.data("deanimate:eventCount");
                    if (eventCount <= 0) {
                        $el.data("deanimate:eventCount", eventCount++);
                        $el.find(backclass).css('display', '');
                    }

                    $el.find(backclass)
                        .addClass(classIn)
                        .removeClass(classOut);
                };

                if (!parallel) {

                    $el.one(whichEvent, outFunction);

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

                    $el.one(whichEvent, inFunction);

                } else {

                    inFunction();
                }
            }

            if (animateIn) {

                //Providing a nicely wrapped up callback because transform is essentially async
                $el.one(whichEvent, function() {
                    $(this).trigger('deanimate:animatedIn');
                    $(this).trigger('deanimate:animated');
                    if (callback !== undefined) {
                        callback.call(this);
                    }
                });

            } else {

                //Providing a nicely wrapped up callback because transform is essentially async
                $el.one(whichEvent, function() {
                    $(this).trigger('deanimate:animatedOut');
                    $(this).trigger('deanimate:animated');
                    if (callback !== undefined) {
                        callback.call(this);
                    }
                });
            }
        };

    //https://github.com/nnattawat/flip
    $.fn.deAnimate = function(options, callback) {
        if (typeof options === 'function') {
            //This allows deAnimate to be called for setup with only a callback (default settings)
            callback = options;
        }

        var $el = $(this);

        if ($el.length === 1 && $el.data('deanimate:initiated') === true) {

            if (options === 'animatedIn') {
                return typeof $el.data('deanimate:animatedIn') === 'undefined' ? false : $el.data('deanimate:animatedIn');
            } else if (options === 'animatedOut') {
                return typeof $el.data('deanimate:animatedIn') === 'undefined' ? false : !$el.data('deanimate:animatedIn');
            }
        }

        return this.each(function() {

            var $el = $(this);

            if (options === 'toggle') {

                callback = callback || $el.data('deanimate:callback');

                if ($el.data('deanimate:animatedIn')) {
                    _animate(false, $el, callback);
                } else {
                    _animate(true, $el, callback);
                }

            } else if (options === 'destroy') {

                $el.removeData('deanimate:initiated');
                $el.removeData('deanimate:eventCount');
                $el.removeData('deanimate:back');
                $el.removeData('deanimate:front');
                $el.removeData('deanimate:animatedIn');
                $el.removeData('deanimate:classIn');
                $el.removeData('deanimate:classOut');
                $el.removeData('deanimate:callback');
                $el.removeData('deanimate:parallel');
                $el.off('click.deanimate');
                $el.off('tap.deanimate');

            } else if ($el.data('deanimate:initiated') !== true) {

                if (!$el.data("deanimate:initiated")) { //Init animated DOM
                    $el.data("deanimate:initiated", true);

                    var settings = $.extend({}, $.deAnimate.options, options),
                        classIn = settings.classIn || 'flipInY',
                        classOut = settings.classOut,
                        divs = $el,
                        frontSelector,
                        backSelector;

                    if (typeof classOut === 'undefined') {

                        var pair = getAnimationPair(classIn);

                        classIn = pair.classIn;
                        classOut = pair.classOut;
                    }

                    $el.data("deanimate:parallel", settings.parallel);
                    $el.data("deanimate:classIn", classIn);
                    $el.data("deanimate:classOut", classOut);
                    $el.data("deanimate:callback", callback);

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

                    $el.data("deanimate:front", frontSelector);
                    $el.data("deanimate:back", backSelector);

                    divs = $el.find(frontSelector).add(backSelector);

                    $el.data("deanimate:eventCount", 0);
                    $el.find(backSelector).css('display', 'none');

                    divs.addClass('animated');

                    var speedInSec = settings.speed / 1000 || 0.5;
                    divs.css('animation-duration', speedInSec + 's');

                    if (typeof settings.trigger === 'string') {

                        if (settings.trigger.toLowerCase() === "click") {
                            $el.on($.fn.tap ? "tap.deanimate" : "click.deanimate", function(event) {
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
        speed: 500,
        parallel: true,
        front: 'auto',
        back: 'auto'
    };

    // Custom selector.
    $.expr[':'].deAnimate = function(elem) {
        // Is this element awesome?
        return $(elem).text().indexOf('awesome') !== -1;
    };

}(jQuery));