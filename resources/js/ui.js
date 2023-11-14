if ('addEventListener' in document) {
	document.addEventListener('DOMContentLoaded', function() {
		FastClick.attach(document.body);
	}, false);
}

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