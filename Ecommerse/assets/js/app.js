/**
 * Navedi Mall - Global Application Logic
 * Shared header, mobile menu, search, newsletter, and UI utilities.
 */

'use strict';

// -------------------------------------------------------------
// Universal Product Card Renderer
// -------------------------------------------------------------
window.renderProductCard = function(product) {
  if (!product) return '';
  const isWishlisted = window.NavediStore ? window.NavediStore.isInWishlist(product.id) : false;
  const defaultImg = product.images && product.images[0] ? product.images[0] : './assets/images/products/1.jpg';
  const hoverImg = product.images && product.images[1] ? product.images[1] : defaultImg;
  
  let badgeHtml = '';
  if (product.discount && product.discount > 0) {
    badgeHtml = `<p class="showcase-badge angle pink">${product.discount}% OFF</p>`;
  } else if (product.tags && product.tags.includes('new')) {
    badgeHtml = `<p class="showcase-badge angle black">NEW</p>`;
  } else if (product.tags && product.tags.includes('bestseller')) {
    badgeHtml = `<p class="showcase-badge angle">HOT</p>`;
  }

  // Star rating generator
  const fullStars = Math.floor(product.rating || 5);
  const hasHalf = (product.rating || 5) % 1 >= 0.5;
  let starsHtml = '';
  for (let i = 0; i < 5; i++) {
    if (i < fullStars) {
      starsHtml += '<ion-icon name="star"></ion-icon>';
    } else if (i === fullStars && hasHalf) {
      starsHtml += '<ion-icon name="star-half-outline"></ion-icon>';
    } else {
      starsHtml += '<ion-icon name="star-outline"></ion-icon>';
    }
  }

  return `
    <div class="showcase" data-product-id="${product.id}">
      <div class="showcase-banner">
        <a href="product.html?id=${product.id}" class="showcase-img-link">
          <img src="${defaultImg}" alt="${product.name}" width="300" class="product-img default" loading="lazy">
          <img src="${hoverImg}" alt="${product.name}" width="300" class="product-img hover" loading="lazy">
        </a>

        ${badgeHtml}

        <div class="showcase-actions">
          <button class="btn-action ${isWishlisted ? 'active' : ''}" data-action="wishlist" title="${isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}" aria-label="Wishlist">
            <ion-icon name="${isWishlisted ? 'heart' : 'heart-outline'}"></ion-icon>
          </button>

          <a href="product.html?id=${product.id}" class="btn-action" title="Quick View" aria-label="View Details">
            <ion-icon name="eye-outline"></ion-icon>
          </a>

          <button class="btn-action" data-action="quick-cart" title="Add to Cart" aria-label="Add to Cart">
            <ion-icon name="bag-add-outline"></ion-icon>
          </button>
        </div>
      </div>

      <div class="showcase-content">
        <a href="shop.html?category=${encodeURIComponent(product.category)}" class="showcase-category">${product.category}</a>

        <h3>
          <a href="product.html?id=${product.id}" class="showcase-title" title="${product.name}">${product.name}</a>
        </h3>

        <div class="showcase-rating" title="${product.rating} out of 5 stars (${product.reviewsCount} reviews)">
          ${starsHtml}
          <span class="rating-text">(${product.reviewsCount})</span>
        </div>

        <div class="price-box">
          <p class="price">$${product.price.toFixed(2)}</p>
          ${product.originalPrice ? `<del>$${product.originalPrice.toFixed(2)}</del>` : ''}
        </div>
      </div>
    </div>
  `;
};

// -------------------------------------------------------------
// Global Event Delegation for Product Actions
// -------------------------------------------------------------
document.addEventListener('click', function(e) {
  // Wishlist Action Button
  const wishlistBtn = e.target.closest('[data-action="wishlist"]');
  if (wishlistBtn) {
    e.preventDefault();
    e.stopPropagation();
    const card = wishlistBtn.closest('[data-product-id]');
    const productId = card ? card.dataset.productId : wishlistBtn.dataset.productId;
    if (productId && window.NavediStore) {
      const isNowIn = window.NavediStore.toggleWishlist(productId);
      const icon = wishlistBtn.querySelector('ion-icon');
      if (icon) {
        icon.setAttribute('name', isNowIn ? 'heart' : 'heart-outline');
      }
      wishlistBtn.classList.toggle('active', isNowIn);
      wishlistBtn.title = isNowIn ? 'Remove from Wishlist' : 'Add to Wishlist';
    }
    return;
  }

  // Quick Cart Action Button
  const cartBtn = e.target.closest('[data-action="quick-cart"]');
  if (cartBtn) {
    e.preventDefault();
    e.stopPropagation();
    const card = cartBtn.closest('[data-product-id]');
    const productId = card ? card.dataset.productId : cartBtn.dataset.productId;
    if (productId && window.ProductDB && window.NavediStore) {
      const prod = window.ProductDB.getById(productId);
      if (prod) {
        window.NavediStore.addToCart(prod, 1);
      }
    }
    return;
  }
});

// -------------------------------------------------------------
// DOM Ready Global Initialization
// -------------------------------------------------------------
document.addEventListener('DOMContentLoaded', function() {
  // Header User Action Buttons routing
  const actionBtns = document.querySelectorAll('.header-user-actions .action-btn');
  if (actionBtns.length >= 3) {
    // 0: Profile -> account.html
    actionBtns[0].addEventListener('click', () => window.location.href = 'account.html');
    actionBtns[0].setAttribute('title', 'My Account');
    
    // 1: Wishlist -> wishlist.html
    actionBtns[1].addEventListener('click', () => window.location.href = 'wishlist.html');
    actionBtns[1].setAttribute('title', 'My Wishlist');
    
    // 2: Cart -> cart.html
    actionBtns[2].addEventListener('click', () => window.location.href = 'cart.html');
    actionBtns[2].setAttribute('title', 'Shopping Cart');
  }

  // Header Search Input & Button
  const searchContainers = document.querySelectorAll('.header-search-container');
  searchContainers.forEach(container => {
    const input = container.querySelector('input[name="search"], .search-field');
    const btn = container.querySelector('.search-btn');

    const executeSearch = () => {
      const query = input ? input.value.trim() : '';
      if (query) {
        window.location.href = `search.html?q=${encodeURIComponent(query)}`;
      }
    };

    if (btn) {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        executeSearch();
      });
    }

    if (input) {
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          executeSearch();
        }
      });
    }
  });

  // Mobile Bottom Navigation Bar Links
  const mobileNavBtns = document.querySelectorAll('.mobile-bottom-navigation .action-btn');
  mobileNavBtns.forEach(btn => {
    const icon = btn.querySelector('ion-icon');
    if (!icon) return;
    const name = icon.getAttribute('name');
    if (name === 'home-outline') {
      btn.addEventListener('click', () => window.location.href = 'index.html');
    } else if (name === 'bag-handle-outline') {
      btn.addEventListener('click', () => window.location.href = 'cart.html');
    } else if (name === 'heart-outline') {
      btn.addEventListener('click', () => window.location.href = 'wishlist.html');
    } else if (name === 'grid-outline') {
      btn.addEventListener('click', () => window.location.href = 'shop.html');
    }
  });

  // Newsletter Forms
  const newsletterForms = document.querySelectorAll('.newsletter form, footer form');
  newsletterForms.forEach(form => {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      const emailInput = form.querySelector('input[type="email"]');
      const email = emailInput ? emailInput.value.trim() : '';
      if (email && email.includes('@')) {
        if (window.NavediStore) {
          window.NavediStore.showToast('Subscription Confirmed!', `Thank you for subscribing! Check your inbox for promo code SAVE10.`, 'success');
        }
        form.reset();
        // If inside modal, close modal
        const modal = form.closest('.modal');
        if (modal) {
          modal.classList.add('closed');
        }
      }
    });
  });

  // Mobile Drawer Toggle
  const mobileMenuOpenBtns = document.querySelectorAll('[data-mobile-menu-open-btn]');
  const mobileMenus = document.querySelectorAll('[data-mobile-menu]');
  const mobileMenuCloseBtns = document.querySelectorAll('[data-mobile-menu-close-btn]');
  const overlay = document.querySelector('[data-overlay]');

  const closeAllMobileMenus = () => {
    mobileMenus.forEach(menu => menu.classList.remove('active'));
    if (overlay) overlay.classList.remove('active');
  };

  mobileMenuOpenBtns.forEach((btn, idx) => {
    btn.addEventListener('click', () => {
      const targetMenu = mobileMenus[idx] || mobileMenus[0];
      if (targetMenu) {
        targetMenu.classList.add('active');
        if (overlay) overlay.classList.add('active');
      }
    });
  });

  mobileMenuCloseBtns.forEach(btn => {
    btn.addEventListener('click', closeAllMobileMenus);
  });

  if (overlay) {
    overlay.addEventListener('click', closeAllMobileMenus);
  }

  // Accordion Toggles
  const accordionBtns = document.querySelectorAll('[data-accordion-btn]');
  accordionBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const panel = this.nextElementSibling;
      if (panel && (panel.classList.contains('submenu-category-list') || panel.classList.contains('sidebar-submenu-category-list'))) {
        panel.classList.toggle('active');
        this.classList.toggle('active');
      }
    });
  });

  // Home Featured Products Grid
  const homeGrid = document.getElementById('home-featured-grid');
  if (homeGrid && window.ProductDB) {
    const featured = window.ProductDB.getAll().slice(0, 12);
    homeGrid.innerHTML = featured.map(p => window.renderProductCard(p)).join('');
  }

  // Automatic Link Enrichment for any static showcases on index.html
  if (window.ProductDB) {
    const allProducts = window.ProductDB.getAll();
    const staticShowcases = document.querySelectorAll('.showcase');
    staticShowcases.forEach(sc => {
      if (sc.dataset.productId) return;
      const titleEl = sc.querySelector('.showcase-title');
      const title = titleEl ? titleEl.textContent.trim().toLowerCase() : '';
      if (title) {
        // Find best match in DB
        let match = allProducts.find(p => p.name.toLowerCase() === title);
        if (!match) {
          match = allProducts.find(p => p.name.toLowerCase().includes(title) || title.includes(p.name.toLowerCase().slice(0, 10)));
        }
        if (!match) {
          // Fallback to random product or default
          match = allProducts[Math.floor(Math.random() * allProducts.length)];
        }
        if (match) {
          sc.dataset.productId = match.id;
          const links = sc.querySelectorAll('a');
          links.forEach(a => {
            const href = a.getAttribute('href');
            if (!href || href === '#' || href === 'javascript:void(0)') {
              if (a.classList.contains('showcase-category')) {
                a.href = `shop.html?category=${encodeURIComponent(match.category)}`;
              } else {
                a.href = `product.html?id=${match.id}`;
              }
            }
          });
          const heartBtn = sc.querySelector('[data-action="wishlist"]');
          if (heartBtn) heartBtn.dataset.productId = match.id;
          const cartBtn = sc.querySelector('[data-action="quick-cart"]');
          if (cartBtn) cartBtn.dataset.productId = match.id;
        }
      }
    });
  }

  // Initial header badge update
  if (window.NavediStore) {
    window.NavediStore.updateHeaderBadges();
  }
});
