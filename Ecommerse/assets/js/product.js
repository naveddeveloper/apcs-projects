/**
 * Navedi Mall - Product Detail Page Logic
 * URL query parsing, interactive gallery, variant selection, reviews, related products.
 */

'use strict';

document.addEventListener('DOMContentLoaded', function() {
  if (!window.ProductDB || !window.NavediStore) return;

  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('id') || 101;
  const product = window.ProductDB.getById(productId) || window.ProductDB.getById(101);

  if (!product) {
    window.location.href = 'shop.html';
    return;
  }

  // Update page title
  document.title = `${product.name} | Navedi Mall`;

  // Breadcrumbs
  const breadcrumbCategory = document.getElementById('breadcrumb-category');
  const breadcrumbProduct = document.getElementById('breadcrumb-product-name');
  if (breadcrumbCategory) {
    breadcrumbCategory.textContent = product.category;
    breadcrumbCategory.href = `shop.html?category=${encodeURIComponent(product.category)}`;
  }
  if (breadcrumbProduct) {
    breadcrumbProduct.textContent = product.name;
  }

  // Gallery
  const mainImg = document.getElementById('product-main-img');
  const thumbContainer = document.getElementById('product-thumbnails');
  if (mainImg && product.images && product.images.length) {
    mainImg.src = product.images[0];
    mainImg.alt = product.name;

    if (thumbContainer) {
      thumbContainer.innerHTML = product.images.map((img, idx) => `
        <img src="${img}" alt="${product.name} view ${idx + 1}" class="gallery-thumb ${idx === 0 ? 'active' : ''}" data-index="${idx}">
      `).join('');

      thumbContainer.querySelectorAll('.gallery-thumb').forEach(thumb => {
        thumb.addEventListener('click', function() {
          thumbContainer.querySelectorAll('.gallery-thumb').forEach(t => t.classList.remove('active'));
          this.classList.add('active');
          const idx = parseInt(this.dataset.index, 10);
          mainImg.src = product.images[idx];
        });
      });
    }
  }

  // Meta Information
  const brandEl = document.getElementById('product-brand');
  const titleEl = document.getElementById('product-title');
  const stockEl = document.getElementById('product-stock-badge');
  const ratingStarsEl = document.getElementById('product-rating-stars');
  const reviewsCountEl = document.getElementById('product-reviews-count');
  const priceEl = document.getElementById('product-current-price');
  const originalPriceEl = document.getElementById('product-original-price');
  const discountEl = document.getElementById('product-discount-pill');
  const descEl = document.getElementById('product-description');

  if (brandEl) brandEl.textContent = product.brand;
  if (titleEl) titleEl.textContent = product.name;
  if (stockEl) {
    if (product.inStock) {
      stockEl.className = 'stock-badge in-stock';
      stockEl.innerHTML = `<ion-icon name="checkmark-circle"></ion-icon> In Stock (${product.stockCount} available)`;
    } else {
      stockEl.className = 'stock-badge low-stock';
      stockEl.innerHTML = `<ion-icon name="alert-circle"></ion-icon> Temporarily Out of Stock`;
    }
  }

  if (ratingStarsEl) {
    const fullStars = Math.floor(product.rating || 5);
    const hasHalf = (product.rating || 5) % 1 >= 0.5;
    let sHtml = '';
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) sHtml += '<ion-icon name="star"></ion-icon>';
      else if (i === fullStars && hasHalf) sHtml += '<ion-icon name="star-half-outline"></ion-icon>';
      else sHtml += '<ion-icon name="star-outline"></ion-icon>';
    }
    ratingStarsEl.innerHTML = sHtml;
  }

  if (reviewsCountEl) reviewsCountEl.textContent = `(${product.reviewsCount} customer reviews)`;
  if (priceEl) priceEl.textContent = `$${product.price.toFixed(2)}`;
  if (originalPriceEl) {
    if (product.originalPrice) {
      originalPriceEl.textContent = `$${product.originalPrice.toFixed(2)}`;
      originalPriceEl.style.display = 'inline';
    } else {
      originalPriceEl.style.display = 'none';
    }
  }
  if (discountEl) {
    if (product.discount && product.discount > 0) {
      discountEl.textContent = `${product.discount}% OFF`;
      discountEl.style.display = 'inline-block';
    } else {
      discountEl.style.display = 'none';
    }
  }
  if (descEl) descEl.textContent = product.description;

  // Variants State
  let selectedSize = product.sizes && product.sizes.length ? product.sizes[0] : 'Standard';
  let selectedColor = product.colors && product.colors.length ? product.colors[0].name : 'Default';
  let selectedQuantity = 1;

  // Render Color Swatches
  const colorContainer = document.getElementById('product-color-options');
  const selectedColorLabel = document.getElementById('selected-color-label');
  if (colorContainer && product.colors && product.colors.length) {
    if (selectedColorLabel) selectedColorLabel.textContent = selectedColor;
    colorContainer.innerHTML = product.colors.map((c, idx) => `
      <button class="color-swatch-btn ${idx === 0 ? 'active' : ''}" style="background-color: ${c.hex};" data-color="${c.name}" title="${c.name}"></button>
    `).join('');

    colorContainer.querySelectorAll('.color-swatch-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        colorContainer.querySelectorAll('.color-swatch-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        selectedColor = this.dataset.color;
        if (selectedColorLabel) selectedColorLabel.textContent = selectedColor;
      });
    });
  }

  // Render Size Pills
  const sizeContainer = document.getElementById('product-size-options');
  const selectedSizeLabel = document.getElementById('selected-size-label');
  if (sizeContainer && product.sizes && product.sizes.length) {
    if (selectedSizeLabel) selectedSizeLabel.textContent = selectedSize;
    sizeContainer.innerHTML = product.sizes.map((s, idx) => `
      <button class="size-pill-btn ${idx === 0 ? 'active' : ''}" data-size="${s}">${s}</button>
    `).join('');

    sizeContainer.querySelectorAll('.size-pill-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        sizeContainer.querySelectorAll('.size-pill-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        selectedSize = this.dataset.size;
        if (selectedSizeLabel) selectedSizeLabel.textContent = selectedSize;
      });
    });
  }

  // Quantity Stepper
  const qtyMinus = document.getElementById('qty-minus-btn');
  const qtyPlus = document.getElementById('qty-plus-btn');
  const qtyInput = document.getElementById('qty-input-field');

  if (qtyMinus && qtyPlus && qtyInput) {
    qtyMinus.addEventListener('click', () => {
      let val = parseInt(qtyInput.value, 10) || 1;
      if (val > 1) {
        val--;
        qtyInput.value = val;
        selectedQuantity = val;
      }
    });

    qtyPlus.addEventListener('click', () => {
      let val = parseInt(qtyInput.value, 10) || 1;
      if (val < (product.stockCount || 99)) {
        val++;
        qtyInput.value = val;
        selectedQuantity = val;
      }
    });

    qtyInput.addEventListener('change', () => {
      let val = parseInt(qtyInput.value, 10) || 1;
      val = Math.max(1, Math.min(val, product.stockCount || 99));
      qtyInput.value = val;
      selectedQuantity = val;
    });
  }

  // Add to Cart Button
  const addToCartBtn = document.getElementById('btn-add-cart-detail');
  if (addToCartBtn) {
    addToCartBtn.addEventListener('click', () => {
      window.NavediStore.addToCart(product, selectedQuantity, selectedSize, selectedColor);
    });
  }

  // Buy Now Button
  const buyNowBtn = document.getElementById('btn-buy-now-detail');
  if (buyNowBtn) {
    buyNowBtn.addEventListener('click', () => {
      window.NavediStore.addToCart(product, selectedQuantity, selectedSize, selectedColor);
      window.location.href = 'checkout.html';
    });
  }

  // Wishlist Button
  const wishlistBtn = document.getElementById('btn-wishlist-detail');
  if (wishlistBtn) {
    const isSaved = window.NavediStore.isInWishlist(product.id);
    wishlistBtn.classList.toggle('active', isSaved);
    wishlistBtn.querySelector('ion-icon').setAttribute('name', isSaved ? 'heart' : 'heart-outline');

    wishlistBtn.addEventListener('click', () => {
      const active = window.NavediStore.toggleWishlist(product);
      wishlistBtn.classList.toggle('active', active);
      wishlistBtn.querySelector('ion-icon').setAttribute('name', active ? 'heart' : 'heart-outline');
    });
  }

  // Postal Code Delivery Calculator
  const zipInput = document.getElementById('delivery-zip-input');
  const zipBtn = document.getElementById('btn-check-delivery');
  const zipResult = document.getElementById('delivery-calc-result');

  if (zipBtn && zipInput && zipResult) {
    zipBtn.addEventListener('click', () => {
      const zip = zipInput.value.trim();
      if (!zip || zip.length < 3) {
        zipResult.innerHTML = '<span style="color: #EF4444;">Please enter a valid zip or postal code.</span>';
      } else {
        const dateObj = new Date();
        dateObj.setDate(dateObj.getDate() + 3);
        const estDate = dateObj.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
        zipResult.innerHTML = `
          <div style="color: #10B981; font-weight: 600; margin-top: 6px;">
            <ion-icon name="checkmark-circle"></ion-icon> Delivery available for <strong>${zip}</strong>!
          </div>
          <div style="font-size: 12px; color: #64748B;">Estimated delivery by: <strong>${estDate}</strong> (Free Standard Shipping)</div>
        `;
      }
    });
  }

  // Tabs Switching
  const tabBtns = document.querySelectorAll('.tab-nav-btn');
  const tabPanels = document.querySelectorAll('.tab-content');
  tabBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      tabBtns.forEach(b => b.classList.remove('active'));
      tabPanels.forEach(p => p.classList.remove('active'));
      this.classList.add('active');
      const targetId = this.dataset.tab;
      const targetPanel = document.getElementById(targetId);
      if (targetPanel) targetPanel.classList.add('active');
    });
  });

  // Specifications Tab Content
  const specsTable = document.getElementById('product-specs-table');
  if (specsTable && product.specs) {
    specsTable.innerHTML = Object.entries(product.specs).map(([k, v]) => `
      <tr>
        <td>${k}</td>
        <td>${v}</td>
      </tr>
    `).join('');
  }

  // Description Features List
  const featuresList = document.getElementById('product-features-list');
  if (featuresList && product.features) {
    featuresList.innerHTML = product.features.map(f => `<li>${f}</li>`).join('');
  }

  // Submit Review Form
  const reviewForm = document.getElementById('new-review-form');
  const reviewsContainer = document.getElementById('reviews-list-container');
  if (reviewForm && reviewsContainer) {
    reviewForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const nameInput = document.getElementById('review-author-name');
      const ratingSelect = document.getElementById('review-rating-select');
      const textInput = document.getElementById('review-text-content');

      const author = nameInput.value.trim() || 'Anonymous Shopper';
      const score = parseInt(ratingSelect.value, 10) || 5;
      const text = textInput.value.trim();

      if (text) {
        let stars = '';
        for (let i = 0; i < score; i++) stars += '<ion-icon name="star"></ion-icon>';

        const reviewCard = document.createElement('div');
        reviewCard.className = 'review-item-card';
        reviewCard.style.cssText = 'padding: 16px; border: 1px solid #E2E8F0; border-radius: 10px; margin-bottom: 14px; background: #FAFAFA;';
        reviewCard.innerHTML = `
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
            <div style="display: flex; align-items: center; gap: 8px;">
              <strong style="color: #0F172A; font-size: 14px;">${author}</strong>
              <span style="font-size: 11px; background: #ECFDF5; color: #10B981; padding: 2px 8px; border-radius: 10px; font-weight: 600;">Verified Buyer</span>
            </div>
            <div style="color: #F59E0B; font-size: 14px;">${stars}</div>
          </div>
          <p style="font-size: 13px; color: #475569; line-height: 1.5; margin: 0;">${text}</p>
          <span style="font-size: 11px; color: #94A3B8; display: block; margin-top: 6px;">Reviewed Just Now</span>
        `;

        reviewsContainer.prepend(reviewCard);
        window.NavediStore.showToast('Review Submitted', 'Thank you for sharing your feedback!', 'success');
        reviewForm.reset();
      }
    });
  }

  // Related Products
  const relatedGrid = document.getElementById('related-products-grid');
  if (relatedGrid) {
    const related = window.ProductDB.getRelated(product.id, 4);
    relatedGrid.innerHTML = related.map(p => window.renderProductCard(p)).join('');
  }
});
