/**
 * Navedi Mall - My Orders Page Logic
 * Renders order history, tracking modal with live timeline, and order cancellation.
 */

'use strict';

document.addEventListener('DOMContentLoaded', function() {
  if (!window.NavediStore) return;

  const ordersContainer = document.getElementById('orders-list-container');
  const ordersEmptyState = document.getElementById('orders-empty-state');
  const trackingModal = document.getElementById('order-tracking-modal');
  const trackingModalOverlay = document.getElementById('tracking-modal-overlay');
  const trackingModalClose = document.getElementById('btn-close-tracking-modal');

  function renderOrders() {
    const orders = window.NavediStore.getOrders();

    if (!orders || orders.length === 0) {
      if (ordersContainer) ordersContainer.style.display = 'none';
      if (ordersEmptyState) ordersEmptyState.style.display = 'block';
      return;
    }

    if (ordersContainer) ordersContainer.style.display = 'block';
    if (ordersEmptyState) ordersEmptyState.style.display = 'none';

    ordersContainer.innerHTML = orders.map(order => {
      const dateFormatted = new Date(order.createdAt).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });

      const canCancel = order.status.toLowerCase() === 'processing';
      const statusClass = order.status.toLowerCase();

      return `
        <div class="order-card-item" data-order-id="${order.orderId}">
          <div class="order-card-header">
            <div>
              <span style="font-size: 12px; color: #64748B;">Order Number</span>
              <h4 style="font-size: 16px; font-weight: 700; color: #0F172A; margin: 2px 0 0 0;">#${order.orderId}</h4>
              <span style="font-size: 12px; color: #94A3B8;">Placed on ${dateFormatted}</span>
            </div>

            <div style="display: flex; align-items: center; gap: 12px;">
              <span class="badge-order-status ${statusClass}">${order.status}</span>
              <div style="text-align: right;">
                <span style="font-size: 12px; color: #64748B;">Total Amount</span>
                <div style="font-size: 16px; font-weight: 800; color: #0F172A;">$${order.totals.total.toFixed(2)}</div>
              </div>
            </div>
          </div>

          <div class="order-card-body" style="padding: 12px 0;">
            <div style="display: flex; flex-direction: column; gap: 10px;">
              ${order.items.map(item => `
                <div style="display: flex; align-items: center; gap: 14px;">
                  <img src="${item.image}" alt="${item.name}" style="width: 52px; height: 52px; object-fit: cover; border-radius: 8px; border: 1px solid #E2E8F0;">
                  <div style="flex: 1; min-width: 0;">
                    <h5 style="font-size: 14px; font-weight: 600; color: #0F172A; margin: 0 0 2px 0;">${item.name}</h5>
                    <span style="font-size: 12px; color: #64748B;">Qty: ${item.quantity} | ${item.size || 'Standard'} | ${item.color || 'Default'}</span>
                  </div>
                  <div style="font-size: 14px; font-weight: 600; color: #0F172A;">
                    $${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <div class="order-card-footer" style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; padding-top: 14px; border-top: 1px solid #F1F5F9;">
            <div style="font-size: 12px; color: #64748B;">
              <span>Ship to: <strong>${order.shippingAddress.fullName}</strong> (${order.shippingAddress.city}, ${order.shippingAddress.state})</span>
            </div>

            <div style="display: flex; align-items: center; gap: 10px;">
              ${canCancel ? `
                <button class="btn-cancel-order" data-order-id="${order.orderId}" style="padding: 7px 14px; background: #FEF2F2; color: #EF4444; border: 1px solid #FCA5A5; border-radius: 6px; font-size: 13px; font-weight: 600; cursor: pointer;">
                  Cancel Order
                </button>
              ` : ''}

              <button class="btn-primary-action btn-track-order" data-order-id="${order.orderId}" style="padding: 7px 16px; font-size: 13px;">
                <ion-icon name="location-outline"></ion-icon> Track Package
              </button>
            </div>
          </div>
        </div>
      `;
    }).join('');

    // Attach Track Order button handlers
    ordersContainer.querySelectorAll('.btn-track-order').forEach(btn => {
      btn.addEventListener('click', function() {
        const orderId = this.dataset.orderId;
        openTrackingModal(orderId);
      });
    });

    // Attach Cancel Order button handlers
    ordersContainer.querySelectorAll('.btn-cancel-order').forEach(btn => {
      btn.addEventListener('click', function() {
        const orderId = this.dataset.orderId;
        if (confirm(`Are you sure you want to cancel order #${orderId}?`)) {
          const res = window.NavediStore.cancelOrder(orderId);
          if (res.success) {
            renderOrders();
          }
        }
      });
    });
  }

  // Open Tracking Modal
  function openTrackingModal(orderId) {
    const order = window.NavediStore.getOrderById(orderId);
    if (!order || !trackingModal) return;

    const modalOrderId = document.getElementById('modal-tracking-order-id');
    const modalTrackingNo = document.getElementById('modal-tracking-number');
    const modalEstDelivery = document.getElementById('modal-tracking-est-date');
    const stepperContainer = document.getElementById('modal-tracking-stepper');

    if (modalOrderId) modalOrderId.textContent = `#${order.orderId}`;
    if (modalTrackingNo) modalTrackingNo.textContent = order.trackingNumber || 'TRK-US-1029384';
    if (modalEstDelivery) modalEstDelivery.textContent = order.estimatedDelivery || '3-5 Business Days';

    if (stepperContainer && order.timeline) {
      stepperContainer.innerHTML = order.timeline.map((step, idx) => {
        let stateClass = step.done ? 'completed' : '';
        if (step.done && idx === order.timeline.filter(s => s.done).length - 1) {
          stateClass = 'completed current';
        }
        return `
          <div class="stepper-item ${stateClass}">
            <div class="stepper-dot"></div>
            <div class="stepper-label">${step.status}</div>
            <div class="stepper-time">${step.timestamp}</div>
          </div>
        `;
      }).join('');
    }

    trackingModal.style.display = 'block';
  }

  // Close Tracking Modal
  const closeTracking = () => {
    if (trackingModal) trackingModal.style.display = 'none';
  };

  if (trackingModalOverlay) trackingModalOverlay.addEventListener('click', closeTracking);
  if (trackingModalClose) trackingModalClose.addEventListener('click', closeTracking);

  // Initial Render
  renderOrders();
});
