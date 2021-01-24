
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


/**
 * Intelligently determines whether the status bar shows an error or stats.
 */
function toggleStatusInfoBar() {
  let sum = 0;
  let rows = 0
  for (let i=0; i<stack.length; i++) {
    const stackValue = stack[i].replace(/\,/g,'');
    if (isNumber(Number(stackValue))) {
      sum += Number(stackValue);
      rows++;
    }
  }
  let avg = (rows == 0) ? 0 : (sum/rows).toLocaleString(undefined, {maximumFractionDigits: 2})
  sum = sum.toLocaleString(undefined, {maximumFractionDigits: 20});

  // Refresh the info bar data.
  document.getElementById("infoRedo").textContent = redoStack.length;
  document.getElementById("infoUndo").textContent = undoStack.length;
  document.getElementById("infoAverage").textContent = avg;
  document.getElementById("infoSum").textContent = sum;

  // Display the status bar if there is a message.
  if (statusbar.textContent != '') {
    statusbar.style.display = 'inherit';
    infobar.style.display = 'none';
  }
  
  // Display the info bar.
  else {
    statusbar.style.display = 'none';
    infobar.style.display = 'grid';
  }
}