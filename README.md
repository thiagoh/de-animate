# DeAnimate

A jQuery lightweight plugin for Animation

## Getting Started
Download the [production version][min] or the [development version][max].

[min]: https://raw.github.com/thiagoh/de-animate/master/dist/de-animate.min.js
[max]: https://raw.github.com/thiagoh/de-animate/master/dist/de-animate.js

In your web page:

```html
<script src="jquery.js"></script>
<script src="dist/de-animate.min.js"></script>

<div id="myElement" class="animated">
    <div class="back panel panel-default">
        <div class="panel-heading">
            <h3 class="panel-title">Back of Panel flipInX</h3>
        </div>
        <div class="panel-body">
            Back of Panel content Flipped X
        </div>
    </div>
    <div class="front panel panel-default">
        <div class="panel-heading">
            <h3 class="panel-title">Front of Panel flipInX</h3>
        </div>
        <div class="panel-body">
            Front of Panel content Flipped X
        </div>
    </div>
</div>

<script>
jQuery(function($) {
    $('#myElement').deAnimate({
        trigger: 'click',
        classIn: 'rotateIn'
    });
});
</script>
```

## API

```js
    $('#myElement').deAnimate({
        // 'click' or 'hover'
        trigger:    string, 

        // your animation name. 'flipInX', 'rotateIn', etc.
        classIn:    string, 

        // optional. default true. The animations of in and ou will 
        // run in parallel or not
        parallel:   boolean, 

        // optional. default 500. Animation's speed in ms. 
        speed:      number, 

        // front element selector. default 'auto'. If you choose 'auto', 
        // the plugin will search for the first element with the classes 
        // 'de-animate-front' or 'front' or the first child of the element
        front:      'auto', 

        // front element selector. default 'auto'. If you choose 'auto', 
        // the plugin will search for the first element with the classes 
        // 'de-animate-back' or 'back' or the second child of the element
        back:       'auto' // front element selector. default 'auto'.
    });
```

### Important!

If you'll use a composed class animation (like Animate.css ones), you **must** add the class `animated` to the element you want to animate.

## Examples

You can always check our [demos](https://github.com/thiagoh/de-animate/tree/master/demo), but for the most hurry ones here we go with some examples:

```js
        
    // to flip the 'card-1' element around the X axis when click on it, you can use
    $('#card-1').deAnimate({
        trigger: 'click',
        classIn: 'flipInX',
        parallel:false // optional
    });
        
    // to flip the 'card-2' element around Y axis when click on it, you can use
    $('#card-2').deAnimate({
        trigger: 'click',
        classIn: 'flipInY',
        parallel:false // optional
    });
    
    // to rotate the 'card-3' element when click on it, you can use
    $('#card-3').deAnimate({
        trigger: 'click',
        classIn: 'rotateIn',
        classOut: 'rotateOut'
    });
```

You can use any animation existant on your css included files. Some of our demos include <a href="https://daneden.github.io/animate.css/" target="_blank">Animate.css</a> but you can create your animations as well. The `widget.html` demo don't include any external animation css files, only our `animations.css` in order to demonstrate how you can create your animations and use with the plugin.

### Animate.css help
Animate.css has a lot of animations and you can check all of them at [animate.css github page](https://github.com/daneden/animate.css) but here a some of them:

* `bounce`
* `flash`
* `pulse`
* `rubberBand`
* `shake`
* `headShake`
* `swing`
* `tada`
* `wobble`
* `jello`
* `bounceIn`
* `fadeIn`
* `fadeOut`
* `flipInX`
* `flipInY`
* `flipOutX`
* `flipOutY`
* `lightSpeedIn`
* `lightSpeedOut`
* `rotateIn`
* `rotateOut`
* `hinge`
* `rollIn`
* `rollOut`
* `zoomIn`
* `zoomOut`
* `slideInUp`
* `slideOutUp`

## Release History
* 0.1.0 First release (beta)
