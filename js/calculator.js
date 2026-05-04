/* ── Calculator Core Functions ── */

// Global state
let returnRate = 37.0;

/**
 * Main calculation function
 */
function calculate() {
  const { gross, returned, net } = getCalc();

  // Nutrition calculation
  const itemValue = parseFloat(document.getElementById('nutItemVal').value) || 0;
  const shopPrice = parseFloat(document.getElementById('nutShopPrice').value) || 0;
  const nutritionFee = (itemValue * 0.1125 / 100) * shopPrice;
  const totalCost = net + nutritionFee;

  // Update display
  document.getElementById('r-gross').textContent    = fmt(gross);
  document.getElementById('r-returned').textContent = fmt(returned);
  document.getElementById('r-net').textContent      = fmt(totalCost);

  document.getElementById('b-gross').textContent    = fmt(gross)    + ' silver';
  document.getElementById('b-rate').textContent     = returnRate.toFixed(1) + '%';
  document.getElementById('b-returned').textContent = '+' + fmt(returned) + ' silver';
  document.getElementById('b-nutrition').textContent = fmt(nutritionFee) + ' silver';
  document.getElementById('b-net').textContent      = fmt(totalCost) + ' silver';

  updateScale(totalCost);
  calcProfits();
}

/**
 * Calculate profits with market fees
 */
function calcProfits() {
  const sp  = parseFloat(document.getElementById('sellPrice').value) || 0;
  const sq  = parseFloat(document.getElementById('sellQty').value)   || 1;
  const accountType = document.getElementById('accountType').value;
  const { net } = getCalc();

  // Market fees calculation
  const setupFeeRate = 0.025; // 2.5%
  const salesTaxRate = accountType === 'premium' ? 0.04 : 0.08; // 4% or 8%
  
  const revenue = sp * sq;
  const setupFee = revenue * setupFeeRate;
  const salesTax = revenue * salesTaxRate;
  const totalMarketFees = setupFee + salesTax;
  
  const profitPerItem = sp - net;
  const totalProfit = profitPerItem * sq;
  const netProfitAfterFees = totalProfit - totalMarketFees;
  const totalCost = net * sq;
  const margin = sp > 0 ? (profitPerItem / sp * 100) : 0;

  // Update display
  document.getElementById('pf-item').textContent    = formatSilver(profitPerItem);
  document.getElementById('pf-total').textContent   = formatSilver(totalProfit);
  document.getElementById('pf-revenue').textContent = formatSilver(revenue);
  document.getElementById('pf-cost').textContent    = formatSilver(totalCost);
  document.getElementById('pf-margin').textContent  = margin.toFixed(1) + '%';

  // Market fees display
  document.getElementById('pf-setup-fee').textContent = formatSilver(setupFee);
  document.getElementById('pf-sales-tax').textContent = formatSilver(salesTax);
  document.getElementById('pf-net-profit').textContent = formatSilver(netProfitAfterFees);

  // Color coding
  const color = profitPerItem > 0 ? 'var(--green-pale)' : profitPerItem < 0 ? 'var(--red)' : 'var(--text)';
  document.getElementById('pf-item').style.color  = color;
  document.getElementById('pf-total').style.color = color;
  
  const netColor = netProfitAfterFees > 0 ? 'var(--green-pale)' : netProfitAfterFees < 0 ? 'var(--red)' : 'var(--text)';
  document.getElementById('pf-net-profit').style.color = netColor;
}

/**
 * Calculate nutrition costs
 */
function calcNutrition() {
  const iv = parseFloat(document.getElementById('nutItemVal').value)   || 0;
  const sp = parseFloat(document.getElementById('nutShopPrice').value) || 0;
  const nc = iv * 0.1125;
  const fee = (nc / 100) * sp;
  document.getElementById('nut-result').textContent = nc.toFixed(3);
  document.getElementById('nut-fee').textContent    = fee.toFixed(3) + ' silver';
}

/**
 * Update scaling examples
 */
function updateScale(perItemCost) {
  const quantities = [100, 500, 1000, 5000];
  quantities.forEach(qty => {
    document.getElementById(`sc-${qty}`).textContent = formatSilver(perItemCost * qty);
  });
  updateCustomQty();
}

/**
 * Update custom quantity calculation
 */
function updateCustomQty() {
  const qty = parseFloat(document.getElementById('customQty').value) || 1;
  const { net } = getCalc();
  document.getElementById('customResult').textContent = formatSilver(net * qty);
}

/**
 * Handle slider input
 */
function onSlider(v) {
  returnRate = parseFloat(v);
  document.getElementById('returnInput').value = returnRate.toFixed(1);
  calculate();
}

/**
 * Handle manual input
 */
function onManualInput(v) {
  returnRate = clamp(parseFloat(v) || 0, 0, 100);
  document.getElementById('returnSlider').value = returnRate;
  calculate();
}
