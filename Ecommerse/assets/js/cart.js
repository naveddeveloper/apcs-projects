/**
 * Navedi Mall - Shopping Cart Logic
 * Real-time quantity updates, coupon calculation, free shipping meter, storage sync.
 */

'use strict';

document.addEventListener('DOMContentLoaded', function() {
  if (!window.NavediStore) return;

  const cartItemsTable = document.getElementById('cart-items-tbody');
  const cartLayout = document.getElementById('cart-layout');
  const cartEmptyState = document.getElementById('cart-empty-state');
  const subtotalEl = document.getElementById('cart-subtotal');
  const discountEl = document.getElementById('cart-discount');
  const discountRow = document.getElementById('cart-discount-row');
  const shippingEl = document.getElementById('cart-shipping');
  const taxEl = document.getElementById('cart-tax');
  const totalEl = document.getElementById('cart-total');
  const couponInput = document.getElementById('cart-coupon-input');
  const applyCouponBtn = document.getElementById('btn-apply-coupon');
  const couponMsgEl = document.getElementById('coupon-status-msg');
  const clearCartBtn = document.getElementById('btn-clear-cart');
  const freeShippingBar = document.getElementById('free-shipping-progress');
  const freeShippingText = document.getElementById('free-shipping-text');

  function renderCart() {
    const cart = window.NavediStore.getCart();

    if (!cart || cart.length === 0) {
      if (cartLayout) cartLayout.style.display = 'none';
      if (cartEmptyState) cartEmptyState.style.display = 'block';
      return;
    }

    if (cartLayout) cartLayout.style.display = 'grid';
    if (cartEmptyState) cartEmptyState.style.display = 'none';

    // Render Table Rows
    if (cartItemsTable) {
      cartItemsTable.innerHTML = cart.map((item, index) => {
        const itemTotal = (item.price * item.quantity).toFixed(2);
        return `
          <tr data-index="${index}">
            <td>
              <div class="cart-product-cell">
                <a href="product.html?id=${item.id}">
                  <img src="${item.image}" alt="${item.name}" class="cart-product-img">
                </a>
                <div class="cart-product-info">
                  <h4><a href="product.html?id=${item.id}">${item.name}</a></h4>
                  <div class="cart-product-variant">
                    <span>Size: <strong>${item.size || 'Standard'}</strong></span> | 
                    <span>Color: <strong>${item.color || 'Default'}</strong></span>
                  </div>
                  <div style="font-size: 13px; font-weight: 600; color: #0F172A; margin-top: 4px;">
                    $${item.price.toFixed(2)}
                  </div>
                </div>
              </div>
            </td>
            <td>
              <div class="qty-stepper">
                <button class="qty-btn cart-qty-minus" data-index="${index}" aria-label="Decrease">&minus;</button>
                <input type="number" class="qty-input cart-qty-input" value="${item.quantity}" min="1" max="99" data-index="${index}">
                <button class="qty-btn cart-qty-plus" data-index="${index}" aria-label="Increase">&plus;</button>
              </div>
            </td>
            <td style="font-weight: 700; color: #0F172A; font-size: 15px;">
              $${itemTotal}
            </td>
            <td style="text-align: right;">
              <button class="cart-remove-btn" data-index="${index}" title="Remove Item" aria-label="Remove item">
                <ion-icon name="trash-outline"></ion-icon>
              </button>
            </td>
          </tr>
        `;
      }).join('');
    }

    // Render Summary Numbers
    const totals = window.NavediStore.getCartTotals();

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
      if (totals.shipping === 0) {
        shippingEl.innerHTML = '<span style="color: #10B981; font-weight: 600;">FREE</span>';
      } else {
        shippingEl.textContent = `$${totals.shipping.toFixed(2)}`;
      }
    }

    if (taxEl) taxEl.textContent = `$${totals.tax.toFixed(2)}`;
    if (totalEl) totalEl.textContent = `$${totals.total.toFixed(2)}`;

    // Free Shipping Progress Bar
    if (freeShippingBar && freeShippingText) {
      const percent = Math.min(100, Math.round((totals.subtotal / totals.freeShippingThreshold) * 100));
      freeShippingBar.style.width = `${percent}%`;

      if (totals.freeShippingQualified) {
        freeShippingText.innerHTML = `<ion-icon name="checkmark-circle" style="color: #10B981; font-size: 16px;"></ion-icon> <strong style="color: #10B981;">Congratulations! You get FREE Standard Shipping!</strong>`;
      } else {
        freeShippingText.innerHTML = `<ion-icon name="gift-outline" style="color: var(--secondary, #4F46E5); font-size: 16px;"></ion-icon> Add <strong>$${totals.amountNeededForFreeShipping.toFixed(2)}</strong> more to get <strong>FREE SHIPPING</strong>!`;
      }
    }

    // Show active coupon indicator
    const appliedCode = window.NavediStore.getAppliedCoupon();
    if (couponMsgEl) {
      if (appliedCode) {
        couponMsgEl.innerHTML = `
          <div style="color: #10B981; font-size: 12px; margin-top: 6px; display: flex; align-items: center; justify-content: space-between;">
            <span><ion-icon name="checkmark-circle"></ion-icon> Coupon <strong>${appliedCode}</strong> applied!</span>
            <button id="btn-remove-coupon" style="background:none; border:none; color:#EF4444; font-size:12px; cursor:pointer; text-decoration:underline;">Remove</button>
          </div>
        `;
        const remBtn = document.getElementById('btn-remove-coupon');
        if (remBtn) {
          remBtn.addEventListener('click', () => {
            window.NavediStore.removeCoupon();
            renderCart();
          });
        }
      } else {
        couponMsgEl.innerHTML = '';
      }
    }
  }

  // Event Delegation for Table Controls
  if (cartItemsTable) {
    cartItemsTable.addEventListener('click', function(e) {
      // Decrease quantity
      const minusBtn = e.target.closest('.cart-qty-minus');
      if (minusBtn) {
        const index = parseInt(minusBtn.dataset.index, 10);
        const cart = window.NavediStore.getCart();
        if (cart[index]) {
          window.NavediStore.updateCartQuantity(index, cart[index].quantity - 1);
          renderCart();
        }
        return;
      }

      // Increase quantity
      const plusBtn = e.target.closest('.cart-qty-plus');
      if (plusBtn) {
        const index = parseInt(plusBtn.dataset.index, 10);
        const cart = window.NavediStore.getCart();
        if (cart[index]) {
          window.NavediStore.updateCartQuantity(index, cart[index].quantity + 1);
          renderCart();
        }
        return;
      }

      // Remove item
      const removeBtn = e.target.closest('.cart-remove-btn');
      if (removeBtn) {
        const index = parseInt(removeBtn.dataset.index, 10);
        window.NavediStore.removeFromCart(index);
        renderCart();
        return;
      }
    });

    cartItemsTable.addEventListener('change', function(e) {
      const input = e.target.closest('.cart-qty-input');
      if (input) {
        const index = parseInt(input.dataset.index, 10);
        const val = parseInt(input.value, 10) || 1;
        window.NavediStore.updateCartQuantity(index, val);
        renderCart();
      }
    });
  }

  // Clear Cart
  if (clearCartBtn) {
    clearCartBtn.addEventListener('click', () => {
      if (confirm('Are you sure you want to clear your shopping cart?')) {
        window.NavediStore.clearCart();
        renderCart();
      }
    });
  }

  // Apply Coupon
  if (applyCouponBtn && couponInput) {
    applyCouponBtn.addEventListener('click', () => {
      const code = couponInput.value.trim();
      const res = window.NavediStore.applyCoupon(code);
      if (res.success) {
        couponInput.value = '';
        renderCart();
      } else {
        if (couponMsgEl) {
          couponMsgEl.innerHTML = `<span style="color: #EF4444; font-size: 12px; display: block; margin-top: 6px;">${res.message}</span>`;
        }
      }
    });
  }

  // Initial Render
  renderCart();

  // Listen to external cart updates
  window.addEventListener('navedi:cart-updated', renderCart);
});
