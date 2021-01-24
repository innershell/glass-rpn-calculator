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
 * Tests if the value is NOT a number.
 * @param {*} value - The value to test.
 */
function isNumber(value) {
  if (isNaN(value)) return false;
  return true;
}