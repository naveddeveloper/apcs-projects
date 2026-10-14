/**
 * Navedi Mall - Checkout Logic
 * Form validation, order preview calculation, demo payment simulation, order creation.
 */

'use strict';

document.addEventListener('DOMContentLoaded', function() {
  if (!window.NavediStore) return;

  const cart = window.NavediStore.getCart();
  if (!cart || cart.length === 0) {
    window.location.href = 'cart.html';
    return;
  }

  // Pre-fill user data
  const user = window.NavediStore.getUser();
  const addresses = window.NavediStore.getSavedAddresses();
  const defaultAddr = addresses.find(a => a.isDefault) || (addresses.length > 0 ? addresses[0] : null);

  const fullNameInput = document.getElementById('checkout-fullname');
  const emailInput = document.getElementById('checkout-email');
  const phoneInput = document.getElementById('checkout-phone');
  const streetInput = document.getElementById('checkout-street');
  const cityInput = document.getElementById('checkout-city');
  const stateInput = document.getElementById('checkout-state');
  const zipInput = document.getElementById('checkout-zip');

  if (user) {
    if (fullNameInput && !fullNameInput.value) fullNameInput.value = user.name || '';
    if (emailInput && !emailInput.value) emailInput.value = user.email || '';
    if (phoneInput && !phoneInput.value) phoneInput.value = user.phone || '';
  }

  if (defaultAddr) {
    if (streetInput && !streetInput.value) streetInput.value = defaultAddr.street || '';
    if (cityInput && !cityInput.value) cityInput.value = defaultAddr.city || '';
    if (stateInput && !stateInput.value) stateInput.value = defaultAddr.state || '';
    if (zipInput && !zipInput.value) zipInput.value = defaultAddr.zipCode || '';
  }

  // Order Review Items
  const reviewItemsContainer = document.getElementById('checkout-review-items');
  if (reviewItemsContainer) {
    reviewItemsContainer.innerHTML = cart.map(item => `
      <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px; padding-bottom: 12px; border-bottom: 1px solid #F1F5F9;">
        <img src="${item.image}" alt="${item.name}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 6px; border: 1px solid #E2E8F0;">
        <div style="flex: 1; min-width: 0;">
          <h5 style="font-size: 13px; font-weight: 600; color: #0F172A; margin: 0 0 2px 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${item.name}</h5>
          <div style="font-size: 12px; color: #64748B;">Qty: ${item.quantity} | ${item.size}</div>
        </div>
        <div style="font-size: 13px; font-weight: 700; color: #0F172A;">
          $${(item.price * item.quantity).toFixed(2)}
        </div>
      </div>
    `).join('');
  }

  // Calculate Totals & Shipping
  let extraShippingCost = 0;
  const shippingRadios = document.querySelectorAll('input[name="shipping-method"]');
  
  function updateSummary() {
    const totals = window.NavediStore.getCartTotals();
    const finalShipping = totals.shipping + extraShippingCost;
    const finalTotal = Math.max(0, totals.subtotal - totals.discount + finalShipping + totals.tax);

    const subtotalEl = document.getElementById('checkout-subtotal');
    const discountEl = document.getElementById('checkout-discount');
    const discountRow = document.getElementById('checkout-discount-row');
    const shippingEl = document.getElementById('checkout-shipping');
    const taxEl = document.getElementById('checkout-tax');
    const totalEl = document.getElementById('checkout-total');

    if (subtotalEl) subtotalEl.textContent = `$${totals.subtotal.toFixed(2)}`;
    
    if (discountRow && discountEl) {
      if (totals.discount > 0) {
        discountRow.style.display = 'flex';
        discountEl.textContent = `-$${totals.discount.toFixed(2)}`;
      } else {
        discountRow.style.display = 'none';
      }
    }

    if (shippingEl) {
      if (finalShipping === 0) {
        shippingEl.innerHTML = '<span style="color: #10B981; font-weight: 600;">FREE</span>';
      } else {
        shippingEl.textContent = `$${finalShipping.toFixed(2)}`;
      }
    }

    if (taxEl) taxEl.textContent = `$${totals.tax.toFixed(2)}`;
    if (totalEl) totalEl.textContent = `$${finalTotal.toFixed(2)}`;
  }

  shippingRadios.forEach(radio => {
    radio.addEventListener('change', function() {
      if (this.value === 'express') {
        extraShippingCost = 15.00;
      } else {
        extraShippingCost = 0;
      }
      updateSummary();
    });
  });

  updateSummary();

  // Payment Option selection visual styling
  const paymentCards = document.querySelectorAll('.payment-option-card');
  paymentCards.forEach(card => {
    card.addEventListener('click', function() {
      paymentCards.forEach(c => c.classList.remove('active'));
      this.classList.add('active');
      const radio = this.querySelector('input[type="radio"]');
      if (radio) radio.checked = true;
    });
  });

  // Checkout Form Submission
  const checkoutForm = document.getElementById('checkout-form');
  const placeOrderBtn = document.getElementById('btn-place-order');

  if (checkoutForm && placeOrderBtn) {
    checkoutForm.addEventListener('submit', function(e) {
      e.preventDefault();

      const fullName = fullNameInput ? fullNameInput.value.trim() : '';
      const email = emailInput ? emailInput.value.trim() : '';
      const phone = phoneInput ? phoneInput.value.trim() : '';
      const street = streetInput ? streetInput.value.trim() : '';
      const city = cityInput ? cityInput.value.trim() : '';
      const state = stateInput ? stateInput.value.trim() : '';
      const zip = zipInput ? zipInput.value.trim() : '';

      if (!fullName || !email || !phone || !street || !city || !state || !zip) {
        window.NavediStore.showToast('Incomplete Address', 'Please complete all required fields.', 'error');
        return;
      }

      // Check payment method
      const selectedPaymentRadio = document.querySelector('input[name="payment-method"]:checked');
      const paymentMethodName = selectedPaymentRadio ? selectedPaymentRadio.dataset.name : 'Simulated Payment';

      const selectedShippingRadio = document.querySelector('input[name="shipping-method"]:checked');
      const shippingMethodName = selectedShippingRadio ? selectedShippingRadio.dataset.name : 'Standard Shipping';

      // Button loading simulation
      placeOrderBtn.disabled = true;
      placeOrderBtn.innerHTML = `
        <div style="display:inline-block; width:18px; height:18px; border:2px solid #FFFFFF; border-top-color:transparent; border-radius:50%; animation:spin 0.6s linear infinite; margin-right:8px;"></div>
        Simulating Demo Transaction...
      `;

      setTimeout(() => {
        const totals = window.NavediStore.getCartTotals();
        const finalShipping = totals.shipping + extraShippingCost;
        const finalTotal = Math.max(0, totals.subtotal - totals.discount + finalShipping + totals.tax);

        const newOrder = window.NavediStore.addOrder({
          items: cart,
          totals: {
            subtotal: totals.subtotal,
            discount: totals.discount,
            shipping: finalShipping,
            tax: totals.tax,
            total: finalTotal
          },
          shippingAddress: {
            fullName,
            email,
            phone,
            street,
            city,
            state,
            zipCode: zip,
            country: "United States"
          },
          paymentMethod: paymentMethodName,
          shippingMethod: shippingMethodName
        });

        if (newOrder) {
          window.location.href = `order-success.html?orderId=${newOrder.orderId}`;
        } else {
          placeOrderBtn.disabled = false;
          placeOrderBtn.innerHTML = 'Place Order (Demo)';
          window.NavediStore.showToast('Checkout Error', 'Unable to complete order. Please try again.', 'error');
        }
      }, 1200);
    });
  }
});
