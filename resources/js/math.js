
/**
 * Cpatures keyboard events as arguments.
 * @param {event} element 
 */
function keyboardNumber(element) {
  argument.textContent += element.key;
}


/**
 * Captures numbers as arguments.
 */
function keyNumber(element) {
  argument.textContent += element.target.textContent;
}


// Primary
function keySin() {
  if (prepareStack() >= 1) {
    const arg_01 = popStack();
    pushStack(Math.sin(arg_01 * Math.PI / 180));
  } else {
    statusbar.textContent = 'SIN Error: Too Few Arguments';
  }
}


// Purple
function keyAsin() {
  if (prepareStack() >= 1) {
    const arg_01 = popStack();
    pushStack(Math.asin(arg_01) / Math.PI * 180);
  } else {
    statusbar.textContent = 'ASIN Error: Too Few Arguments';
  }
  keyLeftShift(); // Left-shift completed.
}


// Green
function keyReset() {
  stack = [];
  undoStack = [];
  redoStack = [];
  memory = [];
}


// Primary
function keyCos() {
  if (prepareStack() >= 1) {
    const arg_01 = popStack();
    pushStack(Math.cos(arg_01 * Math.PI / 180));
  } else {
    statusbar.textContent = 'COS Error: Too Few Arguments';
  }
}


// Purple
function keyAcos() {
  if (prepareStack() >= 1) {
    const arg_01 = popStack();
    pushStack(Math.acos(arg_01) / Math.PI * 180);
  } else {
    statusbar.textContent = 'ACOS Error: Too Few Arguments';
  }
  keyLeftShift(); // Left-shift completed.
}


// Green
function keyUndo() {
  if (undoStack.length == 0) {
    stack.length = 0;
  } else {
    redoStack.unshift(stack.slice());
    stack = undoStack.shift().slice();
  }
  keyRightShift(); // Right-shift completed.  
}


// Primary
function keyTan() {
  if (prepareStack() >= 1) {
    const arg_01 = popStack();
    pushStack(Math.tan(arg_01 * Math.PI / 180));
  } else {
    statusbar.textContent = 'TAN Error: Too Few Arguments';
  }
}


// Purple
function keyAtan() {
  if (prepareStack() >= 1) {
    const arg_01 = popStack();
    pushStack(Math.atan(arg_01) / Math.PI * 180);
  } else {
    statusbar.textContent = 'ATAN Error: Too Few Arguments';
  }
  keyLeftShift(); // Left-shift completed.
}


// Green
function keyRedo() {
  redoStack.length == 0 ? stack.length = 0 : stack = redoStack.shift();
  keyRightShift(); // Right-shift completed.
}


// Primary
function keySqrt() {
  if (prepareStack() >= 1) {
    const arg_01 = popStack();
    pushStack(Math.sqrt(arg_01));
  } else {
    statusbar.textContent = 'SQRT Error: Too Few Arguments';
  }
}


// Purple
function keySquare() {
  if (prepareStack() >= 1) {
    const arg_01 = popStack();
    pushStack(Math.pow(arg_01, 2));
  } else {
    statusbar.textContent = 'SQ Error: Too Few Arguments';
  }
  keyLeftShift(); // Left-shift completed.
}


// Green
function keyXroot() {
  if (prepareStack() >= 2) {
    const arg_01 = popStack();
    const arg_02 = popStack();
    pushStack(Math.pow(arg_02, 1 / arg_01));
  } else {
    statusbar.textContent = 'XROOT Error: Too Few Arguments';
  }
  keyRightShift(); // Right-shift completed.
}


// Primary
function keyPow() {
  if (prepareStack() >= 2) {
    const arg_01 = popStack();
    const arg_02 = popStack();
    pushStack(Math.pow(arg_02, arg_01));
  } else {
    statusbar.textContent = '^ Error: Too Few Arguments';
  }
}


// Purple
function keyAlog() {
  if (prepareStack() >= 1) {
    const arg_01 = popStack();
    pushStack(Math.pow(10, arg_01));
  } else {
    statusbar.textContent = 'ALOG Error: Too Few Arguments';
  }
  keyLeftShift(); // Left-shift completed.
}


// Green
function keyLog10() {
  if (prepareStack() >= 1) {
    const arg_01 = popStack();
    pushStack(Math.log10(arg_01));
  } else {
    statusbar.textContent = 'LOG Error: Too Few Arguments';
  }
  keyRightShift(); // Right-shift completed.
}


// Primary
function keyInv() {
  if (prepareStack() >= 1) {
    const arg_01 = popStack();
    pushStack(1 / arg_01);
  } else {
    statusbar.textContent = 'INV Error: Too Few Arguments';
  }
}


// Purple
function keyExp() {
  if (prepareStack() >= 1) {
    const arg_01 = popStack();
    pushStack(Math.exp(arg_01));
  } else {
    statusbar.textContent = 'EXP Error: Too Few Arguments';
  }
  keyLeftShift(); // Left-shift completed.
}


// Green
function keyLog() {
  if (prepareStack() >= 1) {
    const arg_01 = popStack();
    pushStack(Math.log(arg_01));
  } else {
    statusbar.textContent = 'LN Error: Too Few Arguments';
  }
  keyRightShift(); // Right-shift completed.
}


/**
 * Divides the first two numbers on the stack and places the result on the stack.
 */
function keyDivide() {
  if (prepareStack() >= 2) {
    const arg_01 = popStack();
    const arg_02 = popStack();
    pushStack(arg_02 / arg_01);
  } else {
    statusbar.textContent = '/ Error: Too Few Arguments';
  }
}


/**
 * Multiplies the first two numbers on the stack and places the result on the stack.
 */
function keyMultiply() {
  if (prepareStack() >= 2) {
    const arg_01 = popStack();
    const arg_02 = popStack();
    pushStack(arg_02 * arg_01);
  } else {
    statusbar.textContent = '* Error: Too Few Arguments';
  }
}


/**
 * Subtracts the first two numbers on the stack and places the result on the stack.
 */
function keySubtract() {
  if (prepareStack() >= 2) {
    const arg_01 = popStack();
    const arg_02 = popStack();
    pushStack(arg_02 - arg_01);
  } else {
    statusbar.textContent = '- Error: Too Few Arguments';
  }
}


/**
 * Adds the first two numbers on the stack and places the result on the stack.
 */
function keyAdd() {
  if (prepareStack() >= 2) {
    const arg_01 = popStack();
    const arg_02 = popStack();
    pushStack(arg_02 + arg_01);
  } else {
    statusbar.textContent = '+ Error: Too Few Arguments';
  }
}


function keyEEX() {
  if (argument.textContent) {
    const EEX = argument.textContent.match(/E/g);
    EEX === null ? argument.textContent += 'E' : null; // Max one 'E' argument.
  } else {
    argument.textContent = '1E';
  }
}


/**
 * Insert a Pi value.
 */
function keyPi() {
  prepareStack();
  pushStack('3.14159265358979323846');
  keyLeftShift();
}


/**
 * Negatives a number.
 */
function keyNegative() {
  if (argument.textContent) {
    argument.textContent = '-1' * argument.textContent;
  } else if (stack.length > 0) {
    undo_stack = stack;
    const arg_01 = popStack();
    pushStack('-1' * arg_01);
  } else {
    statusbar.textContent = 'NEG Error: Too Few Arguments';
  }
}