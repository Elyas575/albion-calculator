/* ── UI Management Functions ── */

/**
 * Render material rows
 */
function renderMaterials() {
  const container = document.getElementById('matList');
  container.innerHTML = '';
  const initialData = [
    { name: '', qty: 1, cost: 0 },
    { name: '', qty: 1, cost: 0 },
    { name: '', qty: 1, cost: 0 }
  ];
  initialData.forEach(mat => addMaterial(mat));
}

/**
 * Add new material row
 */
function addMaterial(data = null) {
  const container = document.getElementById('matList');
  const row = document.createElement('div');
  row.className = 'material-row';
  
  const mat = data || { name: '', qty: 1, cost: 0 };
  
  row.innerHTML = `
    <input type="text" placeholder="Material name" value="${mat.name}" oninput="calculate()">
    <input type="number" placeholder="Qty" min="0" step="1" value="${mat.qty}" oninput="calculate()">
    <input type="text" placeholder="Cost / unit" value="${mat.cost}" oninput="calculate()">
    <button class="remove-btn" onclick="this.parentElement.remove(); calculate()">×</button>
  `;
  
  container.appendChild(row);
  calculate();
}

/**
 * Tab switching
 */
const TAB_NAMES = ['materials', 'scale', 'profit', 'guide'];

function switchTab(name) {
  // Update tab buttons
  document.querySelectorAll('.tab-btn').forEach((btn, i) => {
    btn.classList.toggle('active', TAB_NAMES[i] === name);
  });
  
  // Update panels
  document.querySelectorAll('.panel').forEach(p => {
    p.classList.toggle('active', p.id === 'panel-' + name);
  });
  
  // Trigger specific tab actions
  if (name === 'scale') {
    const { net } = getCalc();
    updateScale(net);
  }
  if (name === 'profit') calcProfits();
}

/**
 * Initialize the application
 */
function initApp() {
  renderMaterials();
  calcNutrition();
  calculate();
}

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', initApp);
