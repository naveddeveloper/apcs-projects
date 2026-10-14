/**
 * Navedi Mall - My Account & Authentication Logic
 * Simulated authentication, profile management, and saved addresses.
 */

'use strict';

document.addEventListener('DOMContentLoaded', function() {
  if (!window.NavediStore) return;

  const authSection = document.getElementById('account-auth-section');
  const dashboardSection = document.getElementById('account-dashboard-section');

  function updateView() {
    const user = window.NavediStore.getUser();

    if (!user || !user.isLoggedIn) {
      if (authSection) authSection.style.display = 'block';
      if (dashboardSection) dashboardSection.style.display = 'none';
    } else {
      if (authSection) authSection.style.display = 'none';
      if (dashboardSection) dashboardSection.style.display = 'grid';
      renderDashboard(user);
    }
  }

  // Auth Tabs (Sign In vs Register)
  const authTabs = document.querySelectorAll('.auth-tab-btn');
  const authForms = document.querySelectorAll('.auth-form-wrap');
  authTabs.forEach(tab => {
    tab.addEventListener('click', function() {
      authTabs.forEach(t => t.classList.remove('active'));
      authForms.forEach(f => f.classList.remove('active'));
      this.classList.add('active');
      const target = document.getElementById(this.dataset.target);
      if (target) target.classList.add('active');
    });
  });

  // Sign In Form
  const signInForm = document.getElementById('account-signin-form');
  if (signInForm) {
    signInForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const email = document.getElementById('signin-email').value.trim();
      const pass = document.getElementById('signin-password').value.trim();
      if (email && pass) {
        window.NavediStore.loginUser(email, pass);
        updateView();
      }
    });
  }

  // Register Form
  const registerForm = document.getElementById('account-register-form');
  if (registerForm) {
    registerForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const name = document.getElementById('register-name').value.trim();
      const email = document.getElementById('register-email').value.trim();
      const pass = document.getElementById('register-password').value.trim();
      if (name && email && pass) {
        window.NavediStore.loginUser(email, pass, name);
        updateView();
      }
    });
  }

  // Sign Out
  const signOutBtn = document.getElementById('btn-account-signout');
  if (signOutBtn) {
    signOutBtn.addEventListener('click', () => {
      window.NavediStore.logoutUser();
      updateView();
    });
  }

  // Render Dashboard
  function renderDashboard(user) {
    const nameEl = document.getElementById('dashboard-user-name');
    const emailEl = document.getElementById('dashboard-user-email');
    const phoneEl = document.getElementById('dashboard-user-phone');
    const memberEl = document.getElementById('dashboard-user-since');

    if (nameEl) nameEl.textContent = user.name;
    if (emailEl) emailEl.textContent = user.email;
    if (phoneEl) phoneEl.textContent = user.phone;
    if (memberEl) memberEl.textContent = user.memberSince || '2024';

    // Prefill profile edit inputs
    const editName = document.getElementById('edit-profile-name');
    const editEmail = document.getElementById('edit-profile-email');
    const editPhone = document.getElementById('edit-profile-phone');
    if (editName) editName.value = user.name;
    if (editEmail) editEmail.value = user.email;
    if (editPhone) editPhone.value = user.phone;

    // Render Saved Addresses
    renderAddresses();

    // Render Recent Orders Snapshot
    renderRecentOrders();
  }

  // Profile Edit Form
  const profileForm = document.getElementById('profile-edit-form');
  if (profileForm) {
    profileForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const user = window.NavediStore.getUser() || {};
      user.name = document.getElementById('edit-profile-name').value.trim();
      user.email = document.getElementById('edit-profile-email').value.trim();
      user.phone = document.getElementById('edit-profile-phone').value.trim();
      window.NavediStore.setUser(user);
      window.NavediStore.showToast('Profile Updated', 'Your profile details have been saved.', 'success');
      updateView();
    });
  }

  // Render Addresses
  function renderAddresses() {
    const addressContainer = document.getElementById('saved-addresses-grid');
    if (!addressContainer) return;

    const addresses = window.NavediStore.getSavedAddresses();
    addressContainer.innerHTML = addresses.map(addr => `
      <div style="border: 1px solid ${addr.isDefault ? 'var(--secondary, #4F46E5)' : '#E2E8F0'}; border-radius: 10px; padding: 16px; background: ${addr.isDefault ? '#F8FAFC' : '#FFFFFF'}; position: relative;">
        ${addr.isDefault ? '<span style="position: absolute; top: 12px; right: 12px; background: #EEF2FF; color: var(--secondary, #4F46E5); font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 10px;">Default</span>' : ''}
        <h5 style="font-size: 14px; font-weight: 700; color: #0F172A; margin: 0 0 4px 0;">${addr.label || 'Address'}</h5>
        <div style="font-size: 13px; color: #334155; line-height: 1.5;">
          <strong>${addr.fullName}</strong><br>
          ${addr.street}<br>
          ${addr.city}, ${addr.state} ${addr.zipCode}<br>
          <span style="color: #64748B;">Phone: ${addr.phone}</span>
        </div>
      </div>
    `).join('');
  }

  // Add Address Modal & Form
  const addAddrModal = document.getElementById('add-address-modal');
  const openAddrModalBtn = document.getElementById('btn-open-add-address');
  const closeAddrModalBtn = document.getElementById('btn-close-add-address');
  const addrForm = document.getElementById('new-address-form');

  if (openAddrModalBtn && addAddrModal) {
    openAddrModalBtn.addEventListener('click', () => addAddrModal.style.display = 'block');
  }

  if (closeAddrModalBtn && addAddrModal) {
    closeAddrModalBtn.addEventListener('click', () => addAddrModal.style.display = 'none');
  }

  if (addrForm && addAddrModal) {
    addrForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const label = document.getElementById('new-addr-label').value.trim() || 'Home';
      const fullName = document.getElementById('new-addr-name').value.trim();
      const phone = document.getElementById('new-addr-phone').value.trim();
      const street = document.getElementById('new-addr-street').value.trim();
      const city = document.getElementById('new-addr-city').value.trim();
      const state = document.getElementById('new-addr-state').value.trim();
      const zip = document.getElementById('new-addr-zip').value.trim();
      const isDefault = document.getElementById('new-addr-default').checked;

      if (fullName && street && city && zip) {
        window.NavediStore.saveAddress({
          label, fullName, phone, street, city, state, zipCode: zip, isDefault
        });
        addrForm.reset();
        addAddrModal.style.display = 'none';
        renderAddresses();
      }
    });
  }

  // Render Recent Orders Snapshot
  function renderRecentOrders() {
    const container = document.getElementById('dashboard-recent-orders');
    if (!container) return;

    const orders = window.NavediStore.getOrders();
    if (!orders || orders.length === 0) {
      container.innerHTML = '<p style="font-size: 13px; color: #64748B;">No orders placed yet.</p>';
      return;
    }

    const recent = orders.slice(0, 2);
    container.innerHTML = recent.map(o => `
      <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px; border: 1px solid #E2E8F0; border-radius: 8px; margin-bottom: 10px;">
        <div>
          <strong style="font-size: 14px; color: #0F172A;">#${o.orderId}</strong>
          <div style="font-size: 12px; color: #64748B;">${o.items.length} items &bull; $${o.totals.total.toFixed(2)}</div>
        </div>
        <span class="badge-order-status ${o.status.toLowerCase()}">${o.status}</span>
      </div>
    `).join('');
  }

  // Initial View Setup
  updateView();
});
