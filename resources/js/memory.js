/**
 * Check if the value is a memory register.
 * @param {*} value - The value to test.
 */
function isMemory(value) {
  return /M[1-6]/g.test(value);
}

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

/**
 * Store a value to the memory.
 */
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

/**
 * Erases a specific memory register.
 * @param {*} event - The event that triggered this function.
 */
function keyClearMemory(event) {
  const register = event.target.value; // Extract the specific memory register.
  memory[register] = null;
  keyRightShift();
}