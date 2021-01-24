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
  (rightShift) ? toggleShiftButtons(false, true, false) : toggleShiftButtons(true, false, false);
}


/**
 * Show the leve 2 function buttons.
 */
function keyLeftShift() {
  if (rightShift) rightShift = false;
  leftShift = !leftShift;
  (leftShift) ? toggleShiftButtons(false, false, true) : toggleShiftButtons(true, false, false);
}


/**
 * Show or hide button elements on the screen based on their class names.
 * @param {boolean} level0 - Show/hide level 0 elements.
 * @param {boolean} level1 - Show/hide level 1 elements.
 * @param {boolean} level2 - Show/hide level 2 elements.
 */
function toggleShiftButtons(level0, level1, level2) {
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
  
  // Duplicate the first item on the stack without doing anything fancy.
  else {
    stack.unshift(stack[0]);
  }
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
 * Copies the first item on the stack.
 */
function keyCopy() {
  if (stack.length > 0) {
    const copyValue = stack[0].replace(/\,/g, '');
    navigator.permissions.query({name: "clipboard-write"}).then(result => {
      if (result.state == "granted" || result.state == "prompt") {
        navigator.clipboard.writeText(copyValue);
      }
    });
  }
}

/**
 * Clears the stack.
 */
function keyDelete() {
  stack.length = 0;
}


/**
 * Cancels the argument entered.
 */
function keyCancel() {
  argument.textContent = '';
  leftShift = rightShift = false;
  toggleShiftButtons(true, false, false);
}


/**
 * Moves the clicked stack value to the front of the stack.
 * @param {event} e - The event to handle.
 */
function rollStack(e) {
  const stackLevel = e.target.getAttribute('value');
  const arg_01 = stack.splice(stackLevel, 1);
  if (arg_01.length > 0) pushStack(arg_01);
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