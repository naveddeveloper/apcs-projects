/**
 * Navedi Mall - Wishlist Page Logic
 * Renders saved items, move-to-cart functionality, removals, and empty state.
 */

'use strict';

document.addEventListener('DOMContentLoaded', function() {
  if (!window.NavediStore) return;

  const wishlistGrid = document.getElementById('wishlist-product-grid');
  const wishlistEmptyState = document.getElementById('wishlist-empty-state');
  const wishlistCountEl = document.getElementById('wishlist-total-count');
  const clearWishlistBtn = document.getElementById('btn-clear-wishlist');

  function renderWishlist() {
    const list = window.NavediStore.getWishlist();
    const count = list.length;

    if (wishlistCountEl) {
      wishlistCountEl.textContent = count;
    }

    if (!list || count === 0) {
      if (wishlistGrid) wishlistGrid.style.display = 'none';
      if (wishlistEmptyState) wishlistEmptyState.style.display = 'block';
      if (clearWishlistBtn) clearWishlistBtn.style.display = 'none';
      return;
    }

    if (wishlistGrid) wishlistGrid.style.display = 'grid';
    if (wishlistEmptyState) wishlistEmptyState.style.display = 'none';
    if (clearWishlistBtn) clearWishlistBtn.style.display = 'inline-flex';

    wishlistGrid.innerHTML = list.map(item => {
      const prodId = typeof item === 'object' ? item.id : item;
      const prod = window.ProductDB ? window.ProductDB.getById(prodId) : item;
      const img = prod && prod.images ? prod.images[0] : (item.image || './assets/images/products/1.jpg');
      const name = prod ? prod.name : item.name;
      const price = prod ? prod.price : item.price;
      const category = prod ? prod.category : (item.category || 'Product');
      const inStock = prod ? prod.inStock : true;

      return `
        <div class="showcase" data-product-id="${prodId}">
          <div class="showcase-banner">
            <a href="product.html?id=${prodId}">
              <img src="${img}" alt="${name}" width="300" class="product-img default">
            </a>

            <div class="showcase-actions">
              <button class="btn-action" data-wishlist-remove="${prodId}" title="Remove from Wishlist" aria-label="Remove">
                <ion-icon name="trash-outline"></ion-icon>
              </button>
            </div>
          </div>

          <div class="showcase-content">
            <a href="shop.html?category=${encodeURIComponent(category)}" class="showcase-category">${category}</a>

            <h3>
              <a href="product.html?id=${prodId}" class="showcase-title">${name}</a>
            </h3>

            <div style="margin: 6px 0;">
              ${inStock 
                ? '<span style="font-size: 12px; color: #10B981; font-weight: 600;"><ion-icon name="checkmark-circle"></ion-icon> In Stock</span>' 
                : '<span style="font-size: 12px; color: #EF4444; font-weight: 600;"><ion-icon name="close-circle"></ion-icon> Out of Stock</span>'}
            </div>

            <div class="price-box" style="margin-bottom: 12px;">
              <p class="price">$${Number(price).toFixed(2)}</p>
            </div>

            <button class="btn-primary-action btn-move-cart" data-move-id="${prodId}" style="width: 100%; justify-content: center; font-size: 13px; padding: 8px 14px;">
              <ion-icon name="bag-handle-outline"></ion-icon> Move to Cart
            </button>
          </div>
        </div>
      `;
    }).join('');

    // Attach Action Handlers
    wishlistGrid.querySelectorAll('[data-wishlist-remove]').forEach(btn => {
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        const id = this.dataset.wishlistRemove;
        window.NavediStore.removeFromWishlist(id);
        renderWishlist();
      });
    });

    wishlistGrid.querySelectorAll('.btn-move-cart').forEach(btn => {
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        const id = this.dataset.moveId;
        const prod = window.ProductDB ? window.ProductDB.getById(id) : null;
        if (prod) {
          window.NavediStore.addToCart(prod, 1);
          window.NavediStore.removeFromWishlist(id);
          renderWishlist();
        }
      });
    });
  }

  if (clearWishlistBtn) {
    clearWishlistBtn.addEventListener('click', () => {
      if (confirm('Clear your entire wishlist?')) {
        window.NavediStore.clearWishlist();
        renderWishlist();
      }
    });
  }

  // Initial Render
  renderWishlist();

  // Listen for changes
  window.addEventListener('navedi:wishlist-updated', renderWishlist);
});
