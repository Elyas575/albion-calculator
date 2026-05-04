/* ── Utility Functions ── */

/**
 * Format number with commas
 */
function fmt(num) {
  return Math.round(num).toLocaleString();
}

/**
 * Get current calculation values
 */
function getCalc() {
  const rows = document.querySelectorAll('.material-row');
  let gross = 0;
  rows.forEach(row => {
    const qty = parseFloat(row.querySelector('input[type="number"]').value) || 0;
    const cost = parseFloat(row.querySelector('input[type="text"]').nextElementSibling.value) || 0;
    gross += qty * cost;
  });
  const returned = gross * (returnRate / 100);
  const net = gross - returned;
  return { gross, returned, net };
}

/**
 * Format currency with silver suffix
 */
function formatSilver(amount) {
  return fmt(Math.round(amount)) + ' silver';
}

/**
 * Calculate percentage
 */
function calculatePercentage(part, total) {
  return total > 0 ? (part / total * 100) : 0;
}

/**
 * Clamp number between min and max
 */
function clamp(num, min, max) {
  return Math.min(Math.max(num, min), max);
}

/**
 * Debounce function for input events
 */
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
