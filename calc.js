var stack = []; // The stack register.
var undo_stack = [] // The stack to undo an action.
var memory = {}; // The memory store register.
var statusbar = document.querySelector('.calculator__statusbar');
var argument = document.querySelector('.calculator__argument');
var rightShift = false;
var leftShift = false;
const keys = document.getElementById('keys_wrapper');

// Initialive the application.
setBackgroundImage(); // Load user preferred image.
toggleButtons(true, false, false); // Initialize the primary keys;

// Event: Change background image.
statusbar.addEventListener('click', e => {
  setBackgroundImage(true);
});

// Event: Mouse clicks.
keys.addEventListener('click', e => {
  action(e);
});

// Event: Touchscreen clicks
keys.addEventListener('touchend', e => {
  action(e);
  e.stopPropagation();
  e.preventDefault();
});

// Event: Keyboard inputs.
document.addEventListener('keydown', e => {
  action(e);
})

updateStack();

function action(e) {
  // Keyboard inputs.
  if (/[0-9]/.test(e.key)) keyNumber(e.key);
  if (/\./.test(e.key)) keyNumber('.');
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
  if (e.target.matches('button')) {
    const key = e.target;
    const action = key.dataset.action;
    statusbar.textContent = ''; // Reset the statusbar.
    
    // Memory keys    
    if (action === 'memory') keyMemory(e.target.value); // Primary
    if (action === 'clear-memory') keyClearMemory(e.target.value);  // Green
    if (action === 'store') keyStoreMemory(); // Primary

    // Scientific math functions.
    if (action === 'sin') keyMathSin(); // Primary
    if (action === 'asin') keyMathAsin(); // Purple
    if (action === 'redo') keyMathRedo(); // Green

    if (action === 'cos') keyMathCos(); // Primary
    if (action === 'acos') keyMathAcos(); // Purple
    if (action === 'undo') keyUndo(); // Green

    if (action === 'tan') keyMathTan(); // Primary
    if (action === 'atan') keyMathAtan(); // Purple

    if (action === 'sqrt') keyMathSqrt(); // Primary
    if (action === 'sq') keyMathSquare(); // Purple
    if (action === 'xroot') keyMathXroot(); // Green

    if (action === 'pow') keyMathPow(); // Primary
    if (action === 'alog') keyMathAlog(); // Purple
    if (action === 'log') keyMathLog10(); // Green

    if (action === 'inv') keyMathInv();
    if (action === 'exp') keyMathExp(); // Purple
    if (action === 'ln') keyMathLog(); // Green
    
    // Algebraic math functions.
    if (action === 'divide') keyDivide();
    if (action === 'multiply') keyMultiply();
    if (action === 'subtract') keySubtract();
    if (action === 'add') keyAdd();      
    if (action === 'enter') keyEnter();
    if (action == 'negative') keyNegative();
    if (action == 'eex') keyEEX();
    
    // Number keys pressed.
    if (!action) keyNumber(key.textContent); 

    // Stack operations.
    if (action === 'delete') keyDelete();
    if (action === 'drop') keyDrop();
    if (action === 'on') keyCancel();
    if (action === 'space') keySpace();
    if (action === 'left-shift') keyLeftShift();
    if (action === 'right-shift') keyRightShift();
  }

  updateStack(); // Update the stack after every operation.
  document.activeElement.blur(); // Remove focus from the active button.
}

/*****************************************************************************\
 * CALCULATOR FUNCTIONS                                                      *|
\*****************************************************************************/


/* MEMORY FUNCTIONS ---------------------------------------------------------*/

function keyMemory(memoryRegister) {
  const register = memoryRegister;
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

function keyStoreMemory() {
  prepareStack();
  const arg_01 = popStack();
  const arg_02 = popStack();
  memory[arg_01] = arg_02;
}

function keyClearMemory(memoryRegister) {
  const register = memoryRegister;
  memory[register] = null;
  keyRightShift();
}

/* SCIENTIFIC MATH FUNCTIONS ------------------------------------------------*/

// Primary
function keyMathSin() {
  if (prepareStack() >= 1) {
    undo_stack = stack.slice();
    const arg_01 = popStack();
    pushStack(Math.sin(arg_01 * Math.PI / 180));
  } else {
    statusbar.textContent = 'SIN Error: Too Few Arguments';
  }
}

// Purple
function keyMathAsin() {
  if (prepareStack() >= 1) {
    undo_stack = stack.slice();
    const arg_01 = popStack();
    pushStack(Math.asin(arg_01) / Math.PI * 180);
  } else {
    statusbar.textContent = 'ASIN Error: Too Few Arguments';
  }
  keyLeftShift(); // Left-shift completed.
}

// Primary
function keyMathCos() {
  if (prepareStack() >= 1) {
    undo_stack = stack.slice();
    const arg_01 = popStack();
    pushStack(Math.cos(arg_01 * Math.PI / 180));
  } else {
    statusbar.textContent = 'COS Error: Too Few Arguments';
  }
}

// Green
function keyRedo() {
  console.log('Redo stack unimplemented');
  keyRightShift(); // Right-shift completed.
}

// Purple
function keyMathAcos() {
  if (prepareStack() >= 1) {
    undo_stack = stack.slice();
    const arg_01 = popStack();
    pushStack(Math.acos(arg_01) / Math.PI * 180);
  } else {
    statusbar.textContent = 'ACOS Error: Too Few Arguments';
  }
  keyLeftShift(); // Left-shift completed.
}

// Green
function keyUndo() {
  const redo_stack = stack.slice();
  stack = undo_stack.slice();
  undo_stack = redo_stack.slice();
  keyRightShift(); // Right-shift completed.
}

// Primary
function keyMathTan() {
  if (prepareStack() >= 1) {
    undo_stack = stack.slice();
    const arg_01 = popStack();
    pushStack(Math.tan(arg_01 * Math.PI / 180));
  } else {
    statusbar.textContent = 'TAN Error: Too Few Arguments';
  }
}

// Purple
function keyMathAtan() {
  if (prepareStack() >= 1) {
    undo_stack = stack.slice();
    const arg_01 = popStack();
    pushStack(Math.atan(arg_01) / Math.PI * 180);
  } else {
    statusbar.textContent = 'ATAN Error: Too Few Arguments';
  }
  keyLeftShift(); // Left-shift completed.
}

// Primary
function keyMathSqrt() {
  if (prepareStack() >= 1) {
    undo_stack = stack.slice();
    const arg_01 = popStack();
    pushStack(Math.sqrt(arg_01));
  } else {
    statusbar.textContent = 'SQRT Error: Too Few Arguments';
  }
}

// Purple
function keyMathSquare() {
  if (prepareStack() >= 1) {
    undo_stack = stack.slice();
    const arg_01 = popStack();
    pushStack(Math.pow(arg_01, 2));
  } else {
    statusbar.textContent = 'SQ Error: Too Few Arguments';
  }
  keyLeftShift(); // Left-shift completed.
}

// Green
function keyMathXroot() {
  if (prepareStack() >= 2) {
    undo_stack = stack.slice();
    const arg_01 = popStack();
    const arg_02 = popStack();
    pushStack(Math.pow(arg_02, 1 / arg_01));
  } else {
    statusbar.textContent = 'XROOT Error: Too Few Arguments';
  }
  keyRightShift(); // Right-shift completed.
}

// Primary
function keyMathPow() {
  if (prepareStack() >= 2) {
    undo_stack = stack.slice();
    const arg_01 = popStack();
    const arg_02 = popStack();
    pushStack(Math.pow(arg_02, arg_01));
  } else {
    statusbar.textContent = '^ Error: Too Few Arguments';
  }
}

// Purple
function keyMathAlog() {
  if (prepareStack() >= 1) {
    undo_stack = stack.slice();
    const arg_01 = popStack();
    pushStack(Math.pow(10, arg_01));
  } else {
    statusbar.textContent = 'ALOG Error: Too Few Arguments';
  }
  keyLeftShift(); // Left-shift completed.
}

// Green
function keyMathLog10() {
  if (prepareStack() >= 1) {
    undo_stack = stack.slice();
    const arg_01 = popStack();
    pushStack(Math.log10(arg_01));
  } else {
    statusbar.textContent = 'LOG Error: Too Few Arguments';
  }
  keyRightShift(); // Right-shift completed.
}

// Primary
function keyMathInv() {
  if (prepareStack() >= 1) {
    undo_stack = stack.slice();
    const arg_01 = popStack();
    pushStack(1 / arg_01);
  } else {
    statusbar.textContent = 'INV Error: Too Few Arguments';
  }
}

// Purple
function keyMathExp() {
  if (prepareStack() >= 1) {
    undo_stack = stack.slice();
    const arg_01 = popStack();
    pushStack(Math.exp(arg_01));
  } else {
    statusbar.textContent = 'EXP Error: Too Few Arguments';
  }
  keyLeftShift(); // Left-shift completed.
}

// Green
function keyMathLog() {
  if (prepareStack() >= 1) {
    undo_stack = stack.slice();
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
    undo_stack = stack.slice();
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
    undo_stack = stack.slice();
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
    undo_stack = stack.slice();
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
    undo_stack = stack.slice();
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
function keyNumber(value) {
  argument.textContent += value;
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
}

/**
 * Backspaces an argument or drops the first item from the stack.
 */
function keyDrop() {
  if (argument.textContent) {
    undo_stack = stack.slice();
    argument.textContent = argument.textContent.substring(0,argument.textContent.length-1);
  } else {
    popStack();
  }
}

/**
 * Clears the stack.
 */
function keyDelete() {
  undo_stack = stack.slice();
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
  // Checking decimals.
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
  return /M:[1-6]/g.test(value);
}

/**
 * Push a single argument to the stack.
 * @param {*} arg_01 - The value to push to the stack.
 */
function pushStack(arg_01) {
  if (isMemory(arg_01)) {
    stack.unshift(arg_01);
  } else {
    stack.unshift(Number(arg_01).toLocaleString());
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
 * Syncs the display with the stack register.
 */
function updateStack() {
  // Change this to an iterator later.
  document.getElementById('stack_00').textContent = stack[0];
  document.getElementById('stack_01').textContent = stack[1];
  document.getElementById('stack_02').textContent = stack[2];
  document.getElementById('stack_03').textContent = stack[3];
  document.getElementById('stack_04').textContent = stack[4];
  document.getElementById('stack_05').textContent = stack[5];
  document.getElementById('stack_06').textContent = stack[6];
  document.getElementById('stack_07').textContent = stack[7];
  document.getElementById('stack_08').textContent = stack[8];
  document.getElementById('stack_09').textContent = stack[9];
  document.getElementById('stack_10').textContent = stack[10];
};

/**
 * Changes the background image based on user preference.
 * @param {boolean} change - Whether to just set the background or change it.
 */
function setBackgroundImage(change = false) {
  let image = localStorage.getItem('BG_IMAGE');

  image === null ? image = 1 : null;  // No default image saved.
  isNaN(image) ? image = 1 : null;  // No default image saved.
  change ? image++ : null;          // User asked to change image.
  image > 11 ? image = 1 : null;     // Rotate image back to start.

  document.body.style.backgroundImage = `url('bg${image}.jpg')`;
  localStorage.setItem('BG_IMAGE', `${image}`);
}