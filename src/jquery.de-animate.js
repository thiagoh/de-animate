/*
 * de-animate
 * https://github.com/thiagoh/de-animate
 *
 * Copyright (c) 2016 Thiago Andrade
 * Licensed under the MIT license.
 */

(function($) {

  // Collection method.
  $.fn.de_animate = function() {
    return this.each(function(i) {
      // Do something awesome to each selected element.
      $(this).html('awesome' + i);
    });
  };

  // Static method.
  $.de_animate = function(options) {
    // Override default options with passed-in options.
    options = $.extend({}, $.de_animate.options, options);
    // Return something awesome.
    return 'awesome' + options.punctuation;
  };

  // Static method default options.
  $.de_animate.options = {
    punctuation: '.'
  };

  // Custom selector.
  $.expr[':'].de_animate = function(elem) {
    // Is this element awesome?
    return $(elem).text().indexOf('awesome') !== -1;
  };

}(jQuery));
