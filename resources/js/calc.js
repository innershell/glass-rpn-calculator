var stack = [];       // The main stack.
var undoStack = [];  // The undo stack.
var redoStack = [];  // The redo stack.
var memory = {}; // The memory store register.
var statusbar = document.querySelector('.calculator__statusbar');
var argument = document.querySelector('.calculator__argument');
var rightShift, leftShift = false;
const keys = document.getElementById('keys_wrapper');
const display = document.querySelector('.calculator__stack');

// Initialize the application.
setBackgroundImage();               // Load user preferred image.
toggleButtons(true, false, false);  // Initialize the primary keys;

// Create events listeners.
statusbar.addEventListener('click', () => setBackgroundImage(true)); // Change background image.
document.addEventListener('keydown', e => action(e));               // Keyboard inputs.
keys.addEventListener('click', e => action(e));                     // Mouse clicks.
display.addEventListener('click', e => rollStack(e));               // Display click.

// Event: Touchscreen key/button clicks
keys.addEventListener('touchend', e => {
  action(e);
  e.stopPropagation();
  e.preventDefault();
});

updateStack();

/**
 * Moves the clicked stack value to the front of the stack.
 * @param {event} e - The event to handle.
 */
function rollStack(e) {
  const stackLevel = e.target.getAttribute('value');
  const arg_01 = stack.splice(stackLevel, 1);
  if (arg_01.length > 0) pushStack(arg_01);
}

function action(e) {
  /* These are the only functions that can be undone. */
  const undoRegex = /Sin|Cos|Tan|Sqrt|Pow|Inv|Xroot|Log10|Log|Asin|Acos|Atan|Square|Alog|Exp|Enter|Negative|Delete|Drop|Divide|Multiply|Subtract|Add|Pi|Backspace|Delete|\/|\*|\-|\+/;
  const tmpUndoStack = stack.slice(); // Copies the current stack.

  // Keyboard inputs.
  if (/[0-9]/.test(e.key)) keyboardNumber(e.key);
  if (/\./.test(e.key)) keyboardNumber('.');
  if (/Enter/.test(e.key)) keyEnter();
  if (/\//.test(e.key)) keyDivide();
  if (/\*/.test(e.key)) keyMultiply();
  if (/\-/.test(e.key)) keySubtract();
  if (/\+/.test(e.key)) keyAdd();
  if (/Backspace/.test(e.key)) keyDrop();
  if (/ /.test(e.key)) keySpace();
  if (/Escape/.test(e.key)) keyCancel();
  if (/Delete/.test(e.key)) keyDelete();

  // Touchscreens touch inputs.
  let keyAction = 'NONE';
  if (e.target.matches('button')) {
    const key = e.target;
    keyAction = key.dataset.action;
    statusbar.textContent = ''; // Reset the statusbar.
    this["key" + keyAction](e);    // Dynamically call method based on action name.
  }

  if (undoRegex.test(keyAction) || undoRegex.test(e.key)) {
    console.log("keyAction = " + keyAction);
    console.log("Undo Stack = "); console.log(undoStack);
    console.log("Main Stack = "); console.log(stack);
    console.log("Redo Stack = "); console.log(redoStack);
    // console.log(JSON.stringify(tmpUndoStack) != JSON.stringify(stack))
    if (JSON.stringify(tmpUndoStack) != JSON.stringify(stack)) undoStack.unshift(tmpUndoStack);
    keyAction = 'NONE';
}


  updateStack(); // Update the stack after every operation.
  document.activeElement.blur(); // Remove focus from button to prevent accidental keyboard clicks after a mouse click.
}

/*****************************************************************************\
 * CALCULATOR FUNCTIONS                                                      *|
\*****************************************************************************/


/* MEMORY FUNCTIONS ---------------------------------------------------------*/

function keyMemory(event) {
  const register = event.target.value;
  const registerValue = memory[register];

  if (!registerValue) {
    prepareStack();
    argument.textContent = register;
  } else {
    prepareStack();
    argument.textContent = registerValue;
    prepareStack();
  }
}

function keyStore() {
  if (prepareStack() >= 2) {
    if (/M[1-6]/.test(stack[0])) { // Check if the first argument is a memory.
      const arg_01 = popStack();
      const arg_02 = popStack();
      memory[arg_01] = arg_02;
    } else {
      statusbar.textContent = 'STO Error: No Memory Selected';
    }
  } else {
    statusbar.textContent = 'STO Error: Too Few Arguments';
  }
}

function keyClearMemory(event) {
  const register = event.target.value;
  memory[register] = null;
  keyRightShift();
}

/* SCIENTIFIC MATH FUNCTIONS ------------------------------------------------*/

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

  console.log("Undo Stack = "); console.log(undoStack);
  console.log("Main Stack = "); console.log(stack);
  console.log("Redo Stack = "); console.log(redoStack);
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
  console.log("Undo Stack = "); console.log(undoStack);
  console.log("Main Stack = "); console.log(stack);
  console.log("Redo Stack = "); console.log(redoStack);
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

  console.log("Undo Stack = "); console.log(undoStack);
  console.log("Main Stack = "); console.log(stack);
  console.log("Redo Stack = "); console.log(redoStack);
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


/* ALGEBRAIC MATH FUNCTIONS -------------------------------------------------*/

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


/* NUMBER KEYS --------------------------------------------------------------*/

/**
 * Captures numbers as arguments.
 */
function keyNumber(element) {
  argument.textContent += element.target.textContent;
}

function keyboardNumber(value) {
  argument.textContent += value;
}

function keyPi() {
  prepareStack();
  pushStack('3.14159265358979323846');
  keyLeftShift();
}

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


/* STACK MANIPULATION FUNCTIONS ---------------------------------------------*/

/**
 * Adds arguments to the stack.
 */
function keyEnter() {
  // Check if the calculator is completely empty (empty stack and no arguments).
  if (stack.length == 0 && !argument.textContent) {
    statusbar.textContent = 'DUP Error: Too Few Arguments';
  } else

  // Enter the argument to the stack.
  if (argument.textContent) {
    prepareStack();
  } 
  
  // Duplicate the first item on the stack.
  else {
    pushStack(stack[0]);
  }
}

/**
 * Cancels the argument entered.
 */
function keyCancel() {
  argument.textContent = '';
  leftShift = rightShift = false;
  toggleButtons(true, false, false);
}

/**
 * Backspaces an argument or drops the first item from the stack.
 */
function keyDrop() {
  if (argument.textContent) {
    argument.textContent = argument.textContent.substring(0,argument.textContent.length-1);
  } else {
    popStack();
  }
}

/**
 * Clears the stack.
 */
function keyDelete() {
  stack.length = 0;
}

/**
 * Adds a space to the argument.
 */
function keySpace() {
  argument.textContent += ' ';
}

/**
 * Show the level 1 function buttons.
 */
function keyRightShift() {
  if (leftShift) leftShift = false;
  rightShift = !rightShift;
  (rightShift) ? toggleButtons(false, true, false) : toggleButtons(true, false, false);
}

/**
 * Show the leve 2 function buttons.
 */
function keyLeftShift() {
  if (rightShift) rightShift = false;
  leftShift = !leftShift;
  (leftShift) ? toggleButtons(false, false, true) : toggleButtons(true, false, false);
}

/**
 * Show or hide button elements on the screen based on their class names.
 * @param {boolean} level0 - Show/hide level 0 elements.
 * @param {boolean} level1 - Show/hide level 1 elements.
 * @param {boolean} level2 - Show/hide level 2 elements.
 */
function toggleButtons(level0, level1, level2) {
  const elementClassNames = ["key--level-0", "key--level-1", "key--level-2"];

  // Hide all elements first.
  elementClassNames.forEach(function(value){
    hideElementsByClass(value);
  })

  // Toggle each one based in input parameters.
  if (level0) showElementsByClass(elementClassNames[0]);
  if (level1) showElementsByClass(elementClassNames[1]);
  if (level2) showElementsByClass(elementClassNames[2]);
};


/**
 * Hide all elements of a specific class.
 * @param {string} classname - The name of the class to hide.
 */
function hideElementsByClass(classname) {
  const elements = document.getElementsByClassName(classname);

  for (let i=0; i < elements.length; i++) 
    elements[i].style.display = "none";
}

/**
 * Show all elements of a specific class.
 * @param {string} classname - The name of the class to show.
 */
function showElementsByClass(classname) {
  const elements = document.getElementsByClassName(classname);

  for (let i=0; i < elements.length; i++) 
    elements[i].style.display = "unset";
}


/* HELPER METHODS -----------------------------------------------------------*/

/**
 * Check the argument for syntax (decimals, exponential format).
 * @returns {boolean} True if the syntax is valid; False otherwise.
 */
function isValidSyntax() {
  // Checking single decimals.
  if (argument.textContent === '.') return false;

  // Checking too many decimals.
  if (argument.textContent.match(/\./g) != null && argument.textContent.match(/\./g).length > 1) return false;

  // Checking exponents.
  if (argument.textContent.match(/E/g) != null && argument.textContent.split("E")[1] === '')  return false;

  // No syntax issues.
  return true;
}

/**
 * Check if the value is a memory register.
 * @param {*} value - The value to test.
 */
function isMemory(value) {
  return /M[1-6]/g.test(value);
}

/**
 * Push a single argument to the stack.
 * @param {*} arg_01 - The value to push to the stack.
 */
function pushStack(arg_01) {
  if (isMemory(arg_01)) {
    stack.unshift(arg_01);
  } else {
    stack.unshift(Number(arg_01).toLocaleString(undefined, {maximumFractionDigits: 20}));
  }
  updateStack();
}

/**
 * Pops a single argument from the stack.
 * @returns {*} A value from the stack.
 */
function popStack() {
  if (stack.length == 0) {
    statusbar.textContent = 'DROP Error: Too Few Arguments';
    return null;
  }

  const arg_01 = stack.shift().replace(/\,/g,'');
  updateStack();

  if (isMemory(arg_01)) {
    return arg_01;
  }
  return Number(arg_01);
}

/**
 * Prepare the calculator for an operation by:
 * 1. Checking argument syntax.
 * 2. Processing exponential values.
 * 3. Clearing the argument by putting everything on the stack.
 * 
 * @returns {number} The number of elements on the stack.
 */
function prepareStack() {
  if (argument.textContent === '') return stack.length;

  // Split the string by spaces.
  const argArray = argument.textContent.split(" ");

  let i = 0;
  let validSyntax = true;
  while (validSyntax && i < argArray.length) {
    validSyntax = isValidSyntax(argArray[i]);
    i++;
  }

  if (!validSyntax) {
    statusbar.textContent = 'Syntax Error';
  } else {
    i = 0;
    while (i < argArray.length) {

      // Process exponents.
      if (argArray[i].match(/E/g) != null) {
        const arg_01 = argArray[i].split("E")[0];
        const arg_02 = argArray[i].split("E")[1];
        pushStack(arg_01 + "0".repeat(arg_02));
      } 
      
      // Process everything else.
      else {
        pushStack(argArray[i]);
      }

      i++;
    }
    argument.textContent = '';
  }

  return stack.length;
}

/**
 * Syncs the display with the stack register. Note that the HTML stack is
 * displayed in the reverse order than the stack register. So, the display
 * is populated from the stop of the stack working down.
 */
function updateStack() {
  const rows = document.getElementsByClassName('stack_value');
  for (let i=0; i<rows.length; i++) {
    rows[i].textContent = stack[rows.length - 1 - i];
  }
};

/**
 * Changes the background image based on user preference.
 * @param {boolean} change - Whether to just set the background or change it.
 */
function setBackgroundImage(change = false) {
  let image = localStorage.getItem('BG_IMAGE');

  image === null ? image = 1 : null;  // No default image saved.
  isNaN(image) ? image = 1 : null;    // No default image saved.
  change ? image++ : null;            // User asked to change image.
  image > 11 ? image = 1 : null;      // Rotate image back to start.

  document.body.style.backgroundImage = `url('./resources/images/themes/bg${image}.jpg')`;
  localStorage.setItem('BG_IMAGE', `${image}`);
}