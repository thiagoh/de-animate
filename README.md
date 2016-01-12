# De Animate

A jQuery lightweight plugin for Animation

## Getting Started
Download the [production version][min] or the [development version][max].

[min]: https://cdn.rawgit.com/thiagoh/de-animate/master/dist/jquery.de-animate.min.js
[max]: https://cdn.rawgit.com/thiagoh/de-animate/master/dist/jquery.de-animate.js

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
To see more examples of how to use DeAnimate please check the [demo directory](https://github.com/thiagoh/de-animate/tree/master/demo).

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
