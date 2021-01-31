// Application variables.
var stack = [];      // The main stack.
var undoStack = [];  // The undo stack.
var redoStack = [];  // The redo stack.
var memory = {};     // The memory store register.
var rightShift, leftShift = false;

const statusbar = document.querySelector('.calculator__statusbar');
const infobar = document.querySelector('.calculator__infobar');
const argument = document.querySelector('.calculator__argument');
const keys = document.getElementById('keys_wrapper');
const display = document.querySelector('.calculator__stack');


// Initialize the application.
{
  setBackgroundImage();               // Load user preferred image.
  toggleShiftButtons(true, false, false);  // Initialize the primary keys;

  // Calculator automatically hides after a few seconds.
  setTimeout(function () {
    statusbar.textContent = '';
    statusbar.style.display = 'none';
    infobar.style.display = 'grid';
  }, 2000);

  // Create events listeners.
  statusbar.addEventListener('click', () => setBackgroundImage(true)); // Change background image.
  infobar.addEventListener('click', () => setBackgroundImage(true)); // Change background image.
  document.addEventListener('keydown', e => keyboardAction(e));        // Keyboard inputs.
  keys.addEventListener('click', e => touchAction(e));                 // Mouse clicks.
  display.addEventListener('click', e => rollStack(e));                // Display click.

  // Event: Touchscreen key/button clicks
  keys.addEventListener('touchend', e => {
    action(e);
    e.stopPropagation();
    e.preventDefault();
  });

  updateStack();

  // Service Worker registration with this app.
  window.onload = () => {
    'use strict';

    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('service-worker.js');
    }
  }
}