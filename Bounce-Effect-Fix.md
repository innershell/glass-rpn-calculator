# Introduction
Modern browsers provide scroll and bounce effects to let the user know that they have reached the end of a web page (either top or bottom). Unfortunately, this causes problems with Glass RPN Calculator. The whole app fits on a single page without scroll areas or scrollbars so that users can access all the buttons on the screen to use it. But if users are not precise when tapping a button on screen, it can cause very tiny scroll movements (just a few pixels). This small movement will register as a cross and not a button press, which means the user's input is discarded. This is very frustrating when trying to do quick calculations.

# Solution
To prevent scrolling and bouncing effects on iOS Safari, a combination of CSS and JavaScript are needed.

## CSS Fix
```
html, body {
  position: fixed;
  overflow: hidden;
  width: 100%;
  height: 100%;
  -webkit-overflow-scrolling: touch;
}
```

## JavaScript Fix
```
document.addEventListener('touchmove', function(e) {
  e.preventDefault();
}, { passive: false });
```

## Media Query
For a more robust solution that works specifically for iOS devices, use a media query:
```
@supports (-webkit-touch-callout: none) {
  body {
    height: -webkit-fill-available;
    overflow: hidden;
  }
}
```
This CSS targets iOS devices specifically and prevents scrolling while ensuring the body fills the entire viewport
