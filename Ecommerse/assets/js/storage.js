/**
 * Navedi Mall - LocalStorage State & Ecommerce Store Management
 * Handles Cart, Wishlist, Demo Orders, Simulated User Session, and Notifications.
 */

'use strict';

const STORAGE_KEYS = {
  CART: 'navedi_cart_v1',
  WISHLIST: 'navedi_wishlist_v1',
  ORDERS: 'navedi_orders_v1',
  USER: 'navedi_user_v1',
  ADDRESSES: 'navedi_addresses_v1',
  APPLIED_COUPON: 'navedi_coupon_v1',
  CURRENCY: 'navedi_currency_v1'
};

const DEMO_COUPONS = {
  'SAVE10': { code: 'SAVE10', type: 'percent', value: 10, description: '10% off your entire order' },
  'WELCOME20': { code: 'WELCOME20', type: 'percent', value: 20, description: '20% welcome discount' },
  'FREESHIP': { code: 'FREESHIP', type: 'shipping', value: 0, description: 'Free standard shipping' },
  'SUMMER50': { code: 'SUMMER50', type: 'fixed', value: 50, minSpend: 200, description: '$50 off on orders over $200' }
};

window.NavediStore = {
  // -------------------------------------------------------------
  // Cart Management
  // -------------------------------------------------------------
  getCart() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.CART);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error('Error reading cart from localStorage', e);
      return [];
    }
  },

  saveCart(cart) {
    try {
      localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
      this.updateHeaderBadges();
      window.dispatchEvent(new CustomEvent('navedi:cart-updated', { detail: { cart } }));
    } catch (e) {
      console.error('Error saving cart to localStorage', e);
    }
  },

  addToCart(product, quantity = 1, size = null, color = null) {
    if (!product) return false;
    const cart = this.getCart();
    
    // Selected size/color fallback to product defaults
    const chosenSize = size || (product.sizes && product.sizes.length ? product.sizes[0] : 'Standard');
    const chosenColor = color || (product.colors && product.colors.length ? product.colors[0].name : 'Default');

    // Check if duplicate item exists
    const existingIndex = cart.findIndex(item => 
      item.id === product.id && 
      item.size === chosenSize && 
      item.color === chosenColor
    );

    if (existingIndex > -1) {
      cart[existingIndex].quantity += Number(quantity);
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice || product.price,
        image: (product.images && product.images[0]) || './assets/images/products/1.jpg',
        category: product.category,
        brand: product.brand,
        size: chosenSize,
        color: chosenColor,
        quantity: Math.max(1, Number(quantity))
      });
    }

    this.saveCart(cart);
    this.showToast('Added to Cart', `"${product.name}" (${quantity}x) has been added to your shopping cart.`, 'success', (product.images && product.images[0]));
    return true;
  },

  updateCartQuantity(index, newQty) {
    const cart = this.getCart();
    const qty = parseInt(newQty, 10);
    if (index >= 0 && index < cart.length) {
      if (qty <= 0) {
        return this.removeFromCart(index);
      } else {
        cart[index].quantity = qty;
        this.saveCart(cart);
        return true;
      }
    }
    return false;
  },

  removeFromCart(index) {
    const cart = this.getCart();
    if (index >= 0 && index < cart.length) {
      const removed = cart.splice(index, 1)[0];
      this.saveCart(cart);
      this.showToast('Item Removed', `"${removed.name}" was removed from your cart.`, 'info');
      return true;
    }
    return false;
  },

  clearCart() {
    this.saveCart([]);
    this.removeCoupon();
  },

  getCartCount() {
    const cart = this.getCart();
    return cart.reduce((total, item) => total + (item.quantity || 1), 0);
  },

  getCartTotals(couponCode = null) {
    const cart = this.getCart();
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    // Determine active coupon
    const code = couponCode || this.getAppliedCoupon();
    let discount = 0;
    let couponInfo = null;
    let freeShippingCoupon = false;

    if (code && DEMO_COUPONS[code.toUpperCase()]) {
      const c = DEMO_COUPONS[code.toUpperCase()];
      if (!c.minSpend || subtotal >= c.minSpend) {
        couponInfo = c;
        if (c.type === 'percent') {
          discount = (subtotal * c.value) / 100;
        } else if (c.type === 'fixed') {
          discount = Math.min(subtotal, c.value);
        } else if (c.type === 'shipping') {
          freeShippingCoupon = true;
        }
      }
    }

    // Shipping rule: orders over $55 get Free Shipping, else $9.99
    let shipping = 0;
    if (subtotal > 0) {
      if (subtotal >= 55 || freeShippingCoupon) {
        shipping = 0;
      } else {
        shipping = 9.99;
      }
    }

    // Estimated tax: 5% on discounted subtotal
    const taxableAmount = Math.max(0, subtotal - discount);
    const tax = taxableAmount > 0 ? (taxableAmount * 0.05) : 0;
    const total = Math.max(0, taxableAmount + shipping + tax);

    return {
      subtotal: parseFloat(subtotal.toFixed(2)),
      discount: parseFloat(discount.toFixed(2)),
      shipping: parseFloat(shipping.toFixed(2)),
      tax: parseFloat(tax.toFixed(2)),
      total: parseFloat(total.toFixed(2)),
      coupon: couponInfo,
      freeShippingThreshold: 55,
      freeShippingQualified: subtotal >= 55 || freeShippingCoupon,
      amountNeededForFreeShipping: Math.max(0, 55 - subtotal)
    };
  },

  // -------------------------------------------------------------
  // Coupon Management
  // -------------------------------------------------------------
  getAppliedCoupon() {
    return localStorage.getItem(STORAGE_KEYS.APPLIED_COUPON) || null;
  },

  applyCoupon(rawCode) {
    if (!rawCode) return { success: false, message: 'Please enter a coupon code.' };
    const code = rawCode.trim().toUpperCase();
    const coupon = DEMO_COUPONS[code];

    if (!coupon) {
      return { success: false, message: `Invalid coupon "${code}". Try "SAVE10", "WELCOME20", or "FREESHIP".` };
    }

    const { subtotal } = this.getCartTotals();
    if (coupon.minSpend && subtotal < coupon.minSpend) {
      return { success: false, message: `Coupon "${code}" requires a minimum spend of $${coupon.minSpend}. (Current: $${subtotal.toFixed(2)})` };
    }

    localStorage.setItem(STORAGE_KEYS.APPLIED_COUPON, code);
    this.showToast('Coupon Applied!', `${coupon.description}`, 'success');
    return { success: true, message: `Coupon "${code}" successfully applied! ${coupon.description}`, coupon };
  },

  removeCoupon() {
    localStorage.removeItem(STORAGE_KEYS.APPLIED_COUPON);
  },

  // -------------------------------------------------------------
  // Wishlist Management
  // -------------------------------------------------------------
  getWishlist() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.WISHLIST);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error('Error reading wishlist', e);
      return [];
    }
  },

  saveWishlist(list) {
    try {
      localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(list));
      this.updateHeaderBadges();
      window.dispatchEvent(new CustomEvent('navedi:wishlist-updated', { detail: { wishlist: list } }));
    } catch (e) {
      console.error('Error saving wishlist', e);
    }
  },

  isInWishlist(productId) {
    const list = this.getWishlist();
    const numId = Number(productId);
    return list.some(item => (typeof item === 'object' ? item.id === numId : item === numId));
  },

  toggleWishlist(productOrId) {
    let product;
    if (typeof productOrId === 'object' && productOrId !== null) {
      product = productOrId;
    } else if (window.ProductDB) {
      product = window.ProductDB.getById(productOrId);
    }

    if (!product) return false;

    const list = this.getWishlist();
    const index = list.findIndex(item => (typeof item === 'object' ? item.id === product.id : item === product.id));

    if (index > -1) {
      list.splice(index, 1);
      this.saveWishlist(list);
      this.showToast('Removed from Wishlist', `"${product.name}" was removed from your wishlist.`, 'info');
      return false; // now removed
    } else {
      list.push({
        id: product.id,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice || product.price,
        image: (product.images && product.images[0]) || './assets/images/products/1.jpg',
        category: product.category,
        brand: product.brand,
        inStock: product.inStock
      });
      this.saveWishlist(list);
      this.showToast('Added to Wishlist', `"${product.name}" has been saved to your wishlist.`, 'success', (product.images && product.images[0]));
      return true; // now added
    }
  },

  removeFromWishlist(productId) {
    const list = this.getWishlist();
    const numId = Number(productId);
    const updated = list.filter(item => (typeof item === 'object' ? item.id !== numId : item !== numId));
    this.saveWishlist(updated);
    this.showToast('Removed from Wishlist', 'Item removed from your wishlist.', 'info');
    return true;
  },

  clearWishlist() {
    this.saveWishlist([]);
  },

  getWishlistCount() {
    return this.getWishlist().length;
  },

  // -------------------------------------------------------------
  // Demo Orders Management
  // -------------------------------------------------------------
  getOrders() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.ORDERS);
      if (data) return JSON.parse(data);
      
      // Initialize with sample order if none exists
      const initialOrders = [
        {
          orderId: 'NM-84920',
          createdAt: new Date(Date.now() - 3 * 86400000).toISOString(),
          status: 'Delivered',
          items: [
            {
              id: 101,
              name: "Mens Winter Leather Jacket",
              price: 48.00,
              image: "./assets/images/products/jacket-3.jpg",
              quantity: 1,
              size: "L",
              color: "Coffee Brown"
            },
            {
              id: 106,
              name: "Mens Leather Reversible Belt",
              price: 24.00,
              image: "./assets/images/products/belt.jpg",
              quantity: 1,
              size: "36-38",
              color: "Black / Brown"
            }
          ],
          totals: {
            subtotal: 72.00,
            discount: 7.20,
            shipping: 0.00,
            tax: 3.24,
            total: 68.04
          },
          shippingAddress: {
            fullName: "Alex Morgan",
            email: "alex.morgan@example.com",
            phone: "+1 (555) 234-5678",
            street: "742 Evergreen Terrace, Suite 4",
            city: "Springfield",
            state: "Oregon",
            zipCode: "97477",
            country: "United States"
          },
          paymentMethod: "Demo Credit Card (•••• 4242)",
          shippingMethod: "Standard Shipping (Free)",
          estimatedDelivery: "Delivered 3 days ago",
          trackingNumber: "TRK-98327491-US",
          timeline: [
            { status: 'Order Placed', timestamp: '3 days ago', done: true },
            { status: 'Payment Confirmed', timestamp: '3 days ago', done: true },
            { status: 'Shipped from Warehouse', timestamp: '2 days ago', done: true },
            { status: 'Out for Delivery', timestamp: 'Yesterday', done: true },
            { status: 'Delivered', timestamp: 'Yesterday at 4:30 PM', done: true }
          ]
        }
      ];
      localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(initialOrders));
      return initialOrders;
    } catch (e) {
      console.error('Error reading orders', e);
      return [];
    }
  },

  addOrder(orderData) {
    try {
      const orders = this.getOrders();
      const newOrder = {
        orderId: 'NM-' + Math.floor(10000 + Math.random() * 90000),
        createdAt: new Date().toISOString(),
        status: 'Processing',
        trackingNumber: 'TRK-' + Math.floor(10000000 + Math.random() * 90000000) + '-US',
        estimatedDelivery: '3 - 5 Business Days',
        timeline: [
          { status: 'Order Placed', timestamp: 'Just now', done: true },
          { status: 'Payment Confirmed', timestamp: 'Simulated Demo Payment Complete', done: true },
          { status: 'Processing at Hub', timestamp: 'Expected tomorrow', done: false },
          { status: 'Shipped', timestamp: 'Expected in 2 days', done: false },
          { status: 'Delivered', timestamp: 'Expected in 3-5 days', done: false }
        ],
        ...orderData
      };

      orders.unshift(newOrder);
      localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
      this.clearCart();
      return newOrder;
    } catch (e) {
      console.error('Error saving new order', e);
      return null;
    }
  },

  getOrderById(orderId) {
    const orders = this.getOrders();
    return orders.find(o => o.orderId === orderId) || null;
  },

  cancelOrder(orderId) {
    const orders = this.getOrders();
    const orderIndex = orders.findIndex(o => o.orderId === orderId);
    if (orderIndex === -1) return { success: false, message: 'Order not found.' };

    const order = orders[orderIndex];
    if (order.status.toLowerCase() === 'delivered') {
      return { success: false, message: 'Delivered orders cannot be cancelled.' };
    }
    if (order.status.toLowerCase() === 'cancelled') {
      return { success: false, message: 'Order is already cancelled.' };
    }

    order.status = 'Cancelled';
    order.timeline.push({ status: 'Cancelled by customer', timestamp: 'Just now', done: true });
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
    this.showToast('Order Cancelled', `Order #${orderId} was cancelled successfully.`, 'info');
    return { success: true, message: `Order #${orderId} has been successfully cancelled.` };
  },

  // -------------------------------------------------------------
  // Simulated User Session
  // -------------------------------------------------------------
  getUser() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.USER);
      if (data) return JSON.parse(data);
      
      const defaultUser = {
        name: "Alex Morgan",
        email: "alex.morgan@example.com",
        phone: "+1 (555) 234-5678",
        avatar: "./assets/images/testimonial-1.jpg",
        isLoggedIn: true,
        memberSince: "May 2024"
      };
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(defaultUser));
      return defaultUser;
    } catch (e) {
      return null;
    }
  },

  setUser(userData) {
    try {
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(userData));
    } catch (e) {
      console.error('Error saving user data', e);
    }
  },

  loginUser(email, password, name = null) {
    const user = {
      name: name || (email.split('@')[0].replace('.', ' ').replace(/\b\w/g, l => l.toUpperCase())),
      email: email,
      phone: "+1 (555) 019-2834",
      avatar: "./assets/images/testimonial-1.jpg",
      isLoggedIn: true,
      memberSince: "Today"
    };
    this.setUser(user);
    this.showToast('Welcome Back!', `Signed in as ${user.name}`, 'success');
    return user;
  },

  logoutUser() {
    const user = this.getUser() || {};
    user.isLoggedIn = false;
    this.setUser(user);
    this.showToast('Signed Out', 'You have been signed out of your demo session.', 'info');
  },

  // -------------------------------------------------------------
  // Saved Addresses
  // -------------------------------------------------------------
  getSavedAddresses() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.ADDRESSES);
      if (data) return JSON.parse(data);
      const defaultAddresses = [
        {
          id: 'addr-1',
          isDefault: true,
          label: "Home",
          fullName: "Alex Morgan",
          phone: "+1 (555) 234-5678",
          street: "742 Evergreen Terrace, Apt 4B",
          city: "Springfield",
          state: "Oregon",
          zipCode: "97477",
          country: "United States"
        },
        {
          id: 'addr-2',
          isDefault: false,
          label: "Office",
          fullName: "Alex Morgan",
          phone: "+1 (555) 890-1234",
          street: "100 Innovation Blvd, Floor 12",
          city: "Portland",
          state: "Oregon",
          zipCode: "97201",
          country: "United States"
        }
      ];
      localStorage.setItem(STORAGE_KEYS.ADDRESSES, JSON.stringify(defaultAddresses));
      return defaultAddresses;
    } catch (e) {
      return [];
    }
  },

  saveAddress(address) {
    const list = this.getSavedAddresses();
    if (!address.id) {
      address.id = 'addr-' + Date.now();
    }
    const idx = list.findIndex(a => a.id === address.id);
    if (idx > -1) {
      list[idx] = address;
    } else {
      list.push(address);
    }
    localStorage.setItem(STORAGE_KEYS.ADDRESSES, JSON.stringify(list));
    this.showToast('Address Saved', 'Address updated successfully.', 'success');
    return address;
  },

  // -------------------------------------------------------------
  // Helper Utilities
  // -------------------------------------------------------------
  formatCurrency(amount) {
    const num = Number(amount) || 0;
    return '$' + num.toFixed(2);
  },

  updateHeaderBadges() {
    const cartCount = this.getCartCount();
    const wishlistCount = this.getWishlistCount();

    // Find all bag/cart count badges
    document.querySelectorAll('.action-btn[data-action="cart"] .count, .action-btn ion-icon[name="bag-handle-outline"] + .count, [data-cart-count]').forEach(el => {
      el.textContent = cartCount;
      el.style.display = cartCount > 0 ? 'flex' : 'none';
    });

    // Find all wishlist count badges
    document.querySelectorAll('.action-btn[data-action="wishlist"] .count, .action-btn ion-icon[name="heart-outline"] + .count, [data-wishlist-count]').forEach(el => {
      el.textContent = wishlistCount;
      el.style.display = wishlistCount > 0 ? 'flex' : 'none';
    });
  },

  showToast(title, message, type = 'success', imageUrl = null) {
    let container = document.getElementById('navedi-toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'navedi-toast-container';
      container.className = 'navedi-toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `navedi-toast toast-${type}`;

    let iconName = 'checkmark-circle-outline';
    if (type === 'error') iconName = 'alert-circle-outline';
    if (type === 'info') iconName = 'information-circle-outline';

    toast.innerHTML = `
      <div class="toast-indicator"></div>
      ${imageUrl ? `<img src="${imageUrl}" alt="product" class="toast-img">` : `
        <div class="toast-icon-box">
          <ion-icon name="${iconName}"></ion-icon>
        </div>
      `}
      <div class="toast-body">
        <h4 class="toast-heading">${title}</h4>
        <p class="toast-text">${message}</p>
      </div>
      <button class="toast-dismiss" aria-label="Dismiss notification">
        <ion-icon name="close-outline"></ion-icon>
      </button>
    `;

    container.appendChild(toast);

    // Auto dismiss
    const dismiss = () => {
      toast.classList.add('toast-fade-out');
      setTimeout(() => {
        if (toast.parentNode) toast.parentNode.removeChild(toast);
      }, 300);
    };

    toast.querySelector('.toast-dismiss').addEventListener('click', dismiss);
    setTimeout(dismiss, 4500);
  }
};

// Initialize header badge update when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.NavediStore.updateHeaderBadges();
});
