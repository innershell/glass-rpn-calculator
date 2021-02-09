/**
 * Check the argument for syntax (decimals, exponential format).
 * @param {*} value - The value to test.
 * @returns {boolean} True if the syntax is valid; False otherwise.
 */
function isValidSyntax(value) {
  // Checking single decimals.
  if (value === '.') return false;

  // Checking too many decimals.
  if (value.match(/\./g) != null && value.match(/\./g).length > 1) return false;

  // Checking exponents.
  if (value.match(/E/g) != null && value.split("E")[1] === '')  return false;

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