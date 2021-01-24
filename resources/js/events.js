/**
 * Keyboard clicked event handler.
 * @param {event} e - The object that triggered the event.
 */
function keyboardAction(e) {
  /* These are the only functions that can be undone. */
  const undoRegex = /Enter|\/|\*|\-|\+/;

  console.log(e.key);

  // Keyboard inputs.
  if (/[0-9]|\./.test(e.key))   doFunction("keyboardNumber", e, undoRegex);
  if (/Enter/.test(e.key))      doFunction("keyEnter", e, undoRegex);
  if (/\//.test(e.key))         doFunction("keyDivide", e, undoRegex);
  if (/\*/.test(e.key))         doFunction("keyMultiply", e, undoRegex);
  if (/\-/.test(e.key))         doFunction("keySubtract", e, undoRegex);
  if (/\+/.test(e.key))         doFunction("keyAdd", e, undoRegex);
  if (/Backspace/.test(e.key))  doFunction("keyDrop", e, undoRegex);
  if (/ /.test(e.key))          doFunction("keySpace", e, undoRegex);
  if (/Escape/.test(e.key))     doFunction("keyCancel", e, undoRegex);
  if (/Delete/.test(e.key))     doFunction("keyDelete", e, undoRegex);
  if (/Control/.test(e.key))    doFunction("keyRightShift", e, undoRegex);
  if (/Meta/.test(e.key))       doFunction("keyRightShift", e, undoRegex);
  if (/z/.test(e.key))          doFunction("keyUndo", e, undoRegex);
  if (/c/.test(e.key))          doFunction("keyCopy", e, undoRegex);
  // if (/E/.test(e.key))          doFunction("keyEEX", e, undoRegex); // Broken on keyboards.
}

/**
 * Touchscreen touch event handler.
 * @param {event} e - The object that triggered the event.
 */
function touchAction(e) {
  /* These are the only functions that can be undone. */
  const undoRegex = /Sin|Cos|Tan|Sqrt|Pow|Inv|Xroot|Log10|Log|Asin|Acos|Atan|Square|Alog|Exp|Enter|Negative|Delete|Drop|Divide|Multiply|Subtract|Add|Pi/;

  // Touchscreens touch inputs.
  let keyAction = 'NONE';
  if (e.target.matches('button')) {
    const key = e.target;
    keyAction = key.dataset.action;
    statusbar.textContent = ''; // Reset the statusbar.
    doFunction("key"+keyAction, e, undoRegex);
  }
}

/**
 * Call the function to perform the operation.
 * @param {string} functionName - The name of the function.
 * @param {event} eventObject - The event that triggered the function.
 * @param {regex} undoRegex - The functions that can be undone represented as a regular expression.
 */
function doFunction(functionName, event, undoRegex) {
  const tmpUndoStack = stack.slice(); // Copies the current stack.

  toggleStatusInfoBar();

  // Perform the function.
  this[functionName](event);

  // Create an undo history if the function can be undone.
  if (undoRegex.test(event.target.dataset.action) || undoRegex.test(event.key)) {
    if (JSON.stringify(tmpUndoStack) != JSON.stringify(stack)) undoStack.unshift(tmpUndoStack);
    keyAction = 'NONE';
  }

  updateStack(); // Update the stack after every operation.
  toggleStatusInfoBar();
  document.activeElement.blur(); // Remove focus from button to prevent accidental keyboard clicks after a mouse click.
}