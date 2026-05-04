/* ── Main Application Entry Point ── */

// Import all modules (in a real project, this would use ES6 modules)
// For now, we'll rely on the script loading order in HTML

/**
 * Main application bootstrap
 */
function bootstrapApp() {
  // Set up global event listeners
  setupEventListeners();
  
  // Initialize the calculator
  initApp();
}

/**
 * Set up global event listeners
 */
function setupEventListeners() {
  // Auto-calculate on any input change
  document.addEventListener('input', debounce((e) => {
    if (e.target.matches('input[type="number"], input[type="text"]')) {
      calculate();
    }
  }, 300));
  
  // Handle keyboard shortcuts
  document.addEventListener('keydown', (e) => {
    if (e.ctrlKey || e.metaKey) {
      switch(e.key) {
        case 's':
          e.preventDefault();
          // Could implement save functionality
          break;
        case 'r':
          e.preventDefault();
          // Reset calculator
          resetCalculator();
          break;
      }
    }
  });
}

/**
 * Reset calculator to default state
 */
function resetCalculator() {
  // Clear materials
  renderMaterials();
  
  // Reset return rate
  returnRate = 15.3;
  document.getElementById('returnSlider').value = returnRate;
  document.getElementById('returnInput').value = returnRate.toFixed(1);
  
  // Reset profit inputs
  document.getElementById('sellPrice').value = 2000;
  document.getElementById('sellQty').value = 1000;
  document.getElementById('accountType').value = 'premium';
  
  // Reset nutrition
  document.getElementById('nutItemVal').value = 16;
  document.getElementById('nutShopPrice').value = 550;
  
  // Recalculate
  calculate();
}

/**
 * Export calculator data (for future features)
 */
function exportData() {
  const data = {
    materials: [],
    returnRate: returnRate,
    sellPrice: document.getElementById('sellPrice').value,
    sellQty: document.getElementById('sellQty').value,
    accountType: document.getElementById('accountType').value,
    nutrition: {
      itemValue: document.getElementById('nutItemVal').value,
      shopPrice: document.getElementById('nutShopPrice').value
    }
  };
  
  // Collect material data
  document.querySelectorAll('.material-row').forEach(row => {
    const name = row.querySelector('input[type="text"]').value;
    const qty = row.querySelector('input[type="number"]').value;
    const cost = row.querySelector('input[type="text"]').nextElementSibling.value;
    
    if (name && qty && cost) {
      data.materials.push({ name, qty: parseFloat(qty), cost: parseFloat(cost) });
    }
  });
  
  return data;
}

/**
 * Import calculator data (for future features)
 */
function importData(data) {
  // Clear existing materials
  document.getElementById('matList').innerHTML = '';
  
  // Import materials
  data.materials.forEach(mat => {
    addMaterial(mat);
  });
  
  // Import other settings
  returnRate = data.returnRate || 37.0;
  document.getElementById('returnSlider').value = returnRate;
  document.getElementById('returnInput').value = returnRate.toFixed(1);
  
  document.getElementById('sellPrice').value = data.sellPrice || 2000;
  document.getElementById('sellQty').value = data.sellQty || 1000;
  document.getElementById('accountType').value = data.accountType || 'premium';
  
  if (data.nutrition) {
    document.getElementById('nutItemVal').value = data.nutrition.itemValue || 16;
    document.getElementById('nutShopPrice').value = data.nutrition.shopPrice || 500;
  }
  
  calculate();
}

// Start the application when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootstrapApp);
} else {
  bootstrapApp();
}
