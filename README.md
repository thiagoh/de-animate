
[![](https://img.shields.io/travis/thiagoh/de-animate.svg)]((https://github.com/thiagoh/de-animate/releases/latest))
[![view on npm](http://img.shields.io/npm/v/de-animate.svg)](https://www.npmjs.org/package/de-animate)
[![view on github](https://img.shields.io/node/v/de-animate.svg)](https://github.com/thiagoh/de-animate)
[![npm](https://img.shields.io/npm/l/de-animate.svg?style=flat-square)](https://www.npmjs.org/package/de-animate)
[![npm module downloads](https://img.shields.io/npm/dt/de-animate.svg)](https://www.npmjs.org/package/de-animate)

<a name="module_de-animate"></a>
# De-animate

A jQuery lightweight plugin for Animation. Checkout our [page](http://thiagoh.github.io/de-animate/)

## Getting Started
Download the [production version][min] or the [development version][max].

[min]: https://cdn.rawgit.com/thiagoh/de-animate/0.2.3/dist/jquery.de-animate.min.js
[max]: https://cdn.rawgit.com/thiagoh/de-animate/0.2.3/dist/jquery.de-animate.js

In your web page:

```html
<script src="https://code.jquery.com/jquery-1.12.0.min.js"></script>
<script src="https://cdn.rawgit.com/thiagoh/de-animate/master/dist/jquery.de-animate.min.js"></script>
<div id="card-1" class="card animated">
  <div class="back">
      Back of Panel content Flipped X
  </div>
  <div class="front">
      Front of Panel content Flipped X
  </div>
</div>
<script>
$(function() {
    $('#card-1').deAnimate({
        trigger: 'click',
        classIn: 'flipInX',
        parallel: false
    });
});
</script>
```

## Examples

![alt img](https://raw.githubusercontent.com/thiagoh/de-animate/master/demo/de-animate.gif)

To see more examples of how to use DeAnimate please check the [demo directory](https://github.com/thiagoh/de-animate/tree/master/demo) or in our [page](http://thiagoh.github.io/de-animate/)

## Building
Developers can easily build DeAnimate using NPM.

### NPM

For the developers interested in building DeAnimate:
```
npm install
```

### Bower

For developers not interested in building the DeAnimate library... use bower to install and use the DeAnimate distribution files.

Change to your project's root directory.
```
# To get the latest stable version, use Bower from the command line.
bower install de-animate
```

## Release History
* 0.2.2 beta release
