/**
 * Navedi Mall - Shop / Catalog Page Logic
 * Advanced filtering (category, brand, price, rating, in-stock), sorting, search, pagination.
 */

'use strict';

document.addEventListener('DOMContentLoaded', function() {
  if (!window.ProductDB) return;

  // URL Query Parameters
  const urlParams = new URLSearchParams(window.location.search);
  const initialCategory = urlParams.get('category') || 'all';
  const initialBrand = urlParams.get('brand') || 'all';
  const initialTag = urlParams.get('tag') || '';
  const initialQuery = urlParams.get('q') || '';
  const initialSort = urlParams.get('sort') || 'default';

  // Filter State
  const state = {
    category: initialCategory,
    brand: initialBrand,
    tag: initialTag,
    minPrice: 0,
    maxPrice: 300,
    minRating: 0,
    inStockOnly: false,
    sortBy: initialSort,
    query: initialQuery,
    page: 1,
    perPage: 9
  };

  // DOM Elements
  const productsGrid = document.getElementById('shop-product-grid');
  const productCountEl = document.getElementById('shop-product-count');
  const sortSelect = document.getElementById('shop-sort-select');
  const activeFiltersBar = document.getElementById('active-filters-bar');
  const paginationContainer = document.getElementById('shop-pagination');
  const searchInput = document.getElementById('shop-search-input');
  const minPriceInput = document.getElementById('filter-min-price');
  const maxPriceInput = document.getElementById('filter-max-price');
  const applyPriceBtn = document.getElementById('btn-apply-price');
  const clearFiltersBtn = document.getElementById('btn-clear-all-filters');
  const mobileFilterBtn = document.getElementById('btn-mobile-filter-open');
  const mobileFilterCloseBtn = document.getElementById('btn-mobile-filter-close');
  const shopSidebar = document.getElementById('shop-sidebar');
  const overlay = document.querySelector('[data-overlay]');

  // Initialize UI with initial query params
  if (sortSelect) sortSelect.value = state.sortBy;
  if (searchInput && state.query) searchInput.value = state.query;

  // Build Category Filters
  const categoryFilterList = document.getElementById('category-filter-list');
  if (categoryFilterList) {
    const categories = window.ProductDB.getCategories();
    let catHtml = `
      <label class="filter-item-label">
        <input type="radio" name="filter-category" value="all" ${state.category === 'all' ? 'checked' : ''}>
        <span>All Categories</span>
        <span class="filter-item-count">${window.ProductDB.getAll().length}</span>
      </label>
    `;
    categories.forEach(cat => {
      catHtml += `
        <label class="filter-item-label">
          <input type="radio" name="filter-category" value="${cat.name}" ${state.category.toLowerCase() === cat.name.toLowerCase() ? 'checked' : ''}>
          <span>${cat.name}</span>
          <span class="filter-item-count">${cat.count}</span>
        </label>
      `;
    });
    categoryFilterList.innerHTML = catHtml;

    categoryFilterList.addEventListener('change', function(e) {
      if (e.target.name === 'filter-category') {
        state.category = e.target.value;
        state.page = 1;
        renderShop();
      }
    });
  }

  // Build Brand Filters
  const brandFilterList = document.getElementById('brand-filter-list');
  if (brandFilterList) {
    const brands = window.ProductDB.getBrands();
    let brandHtml = `
      <label class="filter-item-label">
        <input type="radio" name="filter-brand" value="all" ${state.brand === 'all' ? 'checked' : ''}>
        <span>All Brands</span>
      </label>
    `;
    brands.forEach(b => {
      brandHtml += `
        <label class="filter-item-label">
          <input type="radio" name="filter-brand" value="${b.name}" ${state.brand.toLowerCase() === b.name.toLowerCase() ? 'checked' : ''}>
          <span>${b.name}</span>
          <span class="filter-item-count">${b.count}</span>
        </label>
      `;
    });
    brandFilterList.innerHTML = brandHtml;

    brandFilterList.addEventListener('change', function(e) {
      if (e.target.name === 'filter-brand') {
        state.brand = e.target.value;
        state.page = 1;
        renderShop();
      }
    });
  }

  // Price Filter
  if (applyPriceBtn) {
    applyPriceBtn.addEventListener('click', function() {
      state.minPrice = parseFloat(minPriceInput.value) || 0;
      state.maxPrice = parseFloat(maxPriceInput.value) || 1000;
      state.page = 1;
      renderShop();
    });
  }

  // Rating Filter
  const ratingFilterList = document.getElementById('rating-filter-list');
  if (ratingFilterList) {
    ratingFilterList.addEventListener('change', function(e) {
      if (e.target.name === 'filter-rating') {
        state.minRating = parseFloat(e.target.value) || 0;
        state.page = 1;
        renderShop();
      }
    });
  }

  // In-stock Filter
  const inStockCheckbox = document.getElementById('filter-in-stock');
  if (inStockCheckbox) {
    inStockCheckbox.addEventListener('change', function() {
      state.inStockOnly = this.checked;
      state.page = 1;
      renderShop();
    });
  }

  // Sort Select
  if (sortSelect) {
    sortSelect.addEventListener('change', function() {
      state.sortBy = this.value;
      state.page = 1;
      renderShop();
    });
  }

  // Search Input inside Shop
  if (searchInput) {
    searchInput.addEventListener('input', function() {
      state.query = this.value;
      state.page = 1;
      renderShop();
    });
  }

  // Clear All Filters
  if (clearFiltersBtn) {
    clearFiltersBtn.addEventListener('click', function() {
      state.category = 'all';
      state.brand = 'all';
      state.tag = '';
      state.minPrice = 0;
      state.maxPrice = 300;
      state.minRating = 0;
      state.inStockOnly = false;
      state.query = '';
      state.page = 1;

      // Reset form controls
      if (searchInput) searchInput.value = '';
      if (minPriceInput) minPriceInput.value = '0';
      if (maxPriceInput) maxPriceInput.value = '300';
      if (inStockCheckbox) inStockCheckbox.checked = false;
      
      const allCatRadio = document.querySelector('input[name="filter-category"][value="all"]');
      if (allCatRadio) allCatRadio.checked = true;

      const allBrandRadio = document.querySelector('input[name="filter-brand"][value="all"]');
      if (allBrandRadio) allBrandRadio.checked = true;

      const allRatingRadio = document.querySelector('input[name="filter-rating"][value="0"]');
      if (allRatingRadio) allRatingRadio.checked = true;

      renderShop();
    });
  }

  // Mobile Filter Drawer
  if (mobileFilterBtn && shopSidebar) {
    mobileFilterBtn.addEventListener('click', function() {
      shopSidebar.classList.add('active');
      if (overlay) overlay.classList.add('active');
    });
  }

  if (mobileFilterCloseBtn && shopSidebar) {
    mobileFilterCloseBtn.addEventListener('click', function() {
      shopSidebar.classList.remove('active');
      if (overlay) overlay.classList.remove('active');
    });
  }

  // Render Function
  function renderShop() {
    let filtered = window.ProductDB.filterAndSort({
      category: state.category,
      brand: state.brand,
      minPrice: state.minPrice,
      maxPrice: state.maxPrice,
      minRating: state.minRating,
      inStockOnly: state.inStockOnly,
      sortBy: state.sortBy,
      query: state.query
    });

    if (state.tag) {
      filtered = filtered.filter(p => p.tags.includes(state.tag));
    }

    const totalCount = filtered.length;

    // Update product count text
    if (productCountEl) {
      productCountEl.innerHTML = `Showing <strong>${totalCount}</strong> products`;
    }

    // Render Active Filter Chips
    if (activeFiltersBar) {
      let chipsHtml = '';
      if (state.category !== 'all') {
        chipsHtml += `<span class="filter-chip">Category: ${state.category} <button class="filter-chip-remove" data-remove="category">&times;</button></span>`;
      }
      if (state.brand !== 'all') {
        chipsHtml += `<span class="filter-chip">Brand: ${state.brand} <button class="filter-chip-remove" data-remove="brand">&times;</button></span>`;
      }
      if (state.minPrice > 0 || state.maxPrice < 300) {
        chipsHtml += `<span class="filter-chip">Price: $${state.minPrice} - $${state.maxPrice} <button class="filter-chip-remove" data-remove="price">&times;</button></span>`;
      }
      if (state.minRating > 0) {
        chipsHtml += `<span class="filter-chip">Rating: ${state.minRating}+ Stars <button class="filter-chip-remove" data-remove="rating">&times;</button></span>`;
      }
      if (state.inStockOnly) {
        chipsHtml += `<span class="filter-chip">In Stock Only <button class="filter-chip-remove" data-remove="stock">&times;</button></span>`;
      }
      if (state.query) {
        chipsHtml += `<span class="filter-chip">Search: "${state.query}" <button class="filter-chip-remove" data-remove="query">&times;</button></span>`;
      }
      if (state.tag) {
        chipsHtml += `<span class="filter-chip">Offer: ${state.tag} <button class="filter-chip-remove" data-remove="tag">&times;</button></span>`;
      }

      activeFiltersBar.innerHTML = chipsHtml;

      // Handle chip removal
      activeFiltersBar.querySelectorAll('.filter-chip-remove').forEach(btn => {
        btn.addEventListener('click', function() {
          const type = this.dataset.remove;
          if (type === 'category') {
            state.category = 'all';
            const r = document.querySelector('input[name="filter-category"][value="all"]');
            if (r) r.checked = true;
          } else if (type === 'brand') {
            state.brand = 'all';
            const r = document.querySelector('input[name="filter-brand"][value="all"]');
            if (r) r.checked = true;
          } else if (type === 'price') {
            state.minPrice = 0;
            state.maxPrice = 300;
            if (minPriceInput) minPriceInput.value = '0';
            if (maxPriceInput) maxPriceInput.value = '300';
          } else if (type === 'rating') {
            state.minRating = 0;
            const r = document.querySelector('input[name="filter-rating"][value="0"]');
            if (r) r.checked = true;
          } else if (type === 'stock') {
            state.inStockOnly = false;
            if (inStockCheckbox) inStockCheckbox.checked = false;
          } else if (type === 'query') {
            state.query = '';
            if (searchInput) searchInput.value = '';
          } else if (type === 'tag') {
            state.tag = '';
          }
          state.page = 1;
          renderShop();
        });
      });
    }

    // Pagination calculations
    const totalPages = Math.ceil(totalCount / state.perPage) || 1;
    if (state.page > totalPages) state.page = 1;
    const startIndex = (state.page - 1) * state.perPage;
    const pageProducts = filtered.slice(startIndex, startIndex + state.perPage);

    // Render Product Cards
    if (productsGrid) {
      if (totalCount === 0) {
        productsGrid.innerHTML = `
          <div class="empty-state-box" style="grid-column: 1 / -1;">
            <div class="empty-state-icon">
              <ion-icon name="search-outline"></ion-icon>
            </div>
            <h3 class="empty-state-title">No products match your criteria</h3>
            <p class="empty-state-desc">Try clearing filters, searching with different terms, or expanding your price range.</p>
            <button class="btn-primary-action" id="empty-clear-filters">Reset All Filters</button>
          </div>
        `;
        const resetBtn = document.getElementById('empty-clear-filters');
        if (resetBtn && clearFiltersBtn) {
          resetBtn.addEventListener('click', () => clearFiltersBtn.click());
        }
      } else {
        productsGrid.innerHTML = pageProducts.map(p => window.renderProductCard(p)).join('');
      }
    }

    // Render Pagination Controls
    if (paginationContainer) {
      if (totalPages <= 1) {
        paginationContainer.innerHTML = '';
      } else {
        let pagHtml = `
          <button class="page-btn" ${state.page === 1 ? 'disabled' : ''} data-page="${state.page - 1}">
            <ion-icon name="chevron-back-outline"></ion-icon>
          </button>
        `;
        for (let i = 1; i <= totalPages; i++) {
          pagHtml += `
            <button class="page-btn ${state.page === i ? 'active' : ''}" data-page="${i}">${i}</button>
          `;
        }
        pagHtml += `
          <button class="page-btn ${state.page === totalPages ? 'disabled' : ''} data-page="${state.page + 1}">
            <ion-icon name="chevron-forward-outline"></ion-icon>
          </button>
        `;
        paginationContainer.innerHTML = pagHtml;

        paginationContainer.querySelectorAll('.page-btn').forEach(btn => {
          btn.addEventListener('click', function() {
            if (!this.disabled && this.dataset.page) {
              state.page = parseInt(this.dataset.page, 10);
              renderShop();
              window.scrollTo({ top: 250, behavior: 'smooth' });
            }
          });
        });
      }
    }
  }

  // Initial Render
  renderShop();
});
