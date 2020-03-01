const store = {
  tip: 0,
  mealCount: 0,
};

const generateForm = () => {
  return `
  <div class="meal-price">
      <label for="meal-price">Base Meal Price: $</label>
      <input type="number" name="price" placeholder="9.99" id="meal-price" required/>
  </div>
  <div class="tax-rate">
      <label for="tax-rate">Tax Rate: %</label>
      <input type="number" name="tax_rate" id="tax-rate" required/>
  </div>
  <div class="tip-percentage">
      <label for="tip-percentage">Tip Percentage: %</label>
      <input type="number" name="tip-percentage" id="tip-percentage" required>
  </div>
  <div class="buttons">
      <button type="submit" name="submit" id="submit">Submit</button>
      <button type="submit" name="cancel" id="cancel">Cancel</button>
  </div>  
  `;
};

const generateDefault = () => {
  return `
    <div class="subtotal">
        <h4 class="title">Subtotal</h4>
        <h4 class="number">0.00</h4>
    </div> 
    <div class="tip">
        <h4 class="title">Tip</h4>
        <h4 class="number">0.00</h4>
    </div>
    <div class="total">
        <h4 class="title">Total</h4>
        <h4 class="number">0.00</h4>
    </div>
  `;
};

const generateInfo = () => {
  return `
    <div class="tip-total">
        <h4 class="title">Tip Total:</h4>
        <h4 class="number">0.00</h4>
    </div>
    <div class="meal-count">
        <h4 class="title">Meal Count:</h4>
        <h4 class="number">0</h4>
    </div>
    <div class="avg-tip-per-meal">
        <h4 class="title">Average Tip Per Meal:</h4>
        <h4 class="number">0.00</h4>
    </div>
  `;
};

const generateCharges = (mealPrice, taxRate, tipPercentage) => {
  let subtotal = (parseInt(mealPrice) + (parseInt(mealPrice) * (taxRate/100))).toFixed(2);
  let tip = (parseInt(mealPrice) * (tipPercentage/100)).toFixed(2);
  let total = parseInt(subtotal) + parseInt(tip);
  
  store.tip += parseFloat(tip);
  store.mealCount++;
  
  return `
  <div class="subtotal">
    <h4 class="title">Subtotal</h4>
    <h4 class="number">${subtotal}</h4>
  </div> 
  <div class="tip">
    <h4 class="title">Tip</h4>
    <h4 class="number">${tip}</h4>
  </div>
  <div class="total">
    <h4 class="title">Total</h4>
    <h4 class="number">${total}</h4>
  </div>
  `;
};

const generateDetails = () => {
  let avg = store.tip/store.mealCount;
  let avgTip = avg.toFixed(2);

  let tip = store.tip.toFixed(2);

  return `
  <div class="tip-total">
    <h4 class="title">Tip Total:</h4>
    <h4 class="number">${tip}</h4>
  </div>
  <div class="meal-count">
    <h4 class="title">Meal Count:</h4>
    <h4 class="number">${store.mealCount}</h4>
  </div>
  <div class="avg-tip-per-meal">
    <h4 class="title">Average Tip Per Meal:</h4>
    <h4 class="number">${avgTip}</h4>
  </div>
  `;
};

const handleSubmitButton = () => {
  $('form').on('click', '#submit', e => {
    e.preventDefault();

    let mealPrice = $('#meal-price').val();
    let taxRate = $('#tax-rate').val();
    let tipPercentage = $('#tip-percentage').val();

    $('.charge-details').html(generateCharges(mealPrice, taxRate, tipPercentage));
    $('.earning-details').html(generateDetails);
  });
};

const handleCancelButton = () => {
  $('form').on('click', '#cancel', e => {
    e.preventDefault();

    $('.charge-details').html(generateDefault());
    $('.meal-details').html(generateForm());
  });
};

const handleResetButton = () => {
  $('body').on('click', '#reset', e => {
    e.preventDefault();

    store.tip = 0;
    store.mealCount = 0;

    $('.charge-details').html(generateDefault());
    $('.meal-details').html(generateForm());
    $('.earning-details').html(generateInfo());
  });
};

const renderEventListeners = () => {
  handleSubmitButton();
  handleCancelButton();
  handleResetButton();
};

$(renderEventListeners);