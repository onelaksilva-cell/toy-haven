

function formatLKR(amount) {
  return "LKR " + Number(amount).toLocaleString("en-LK");
}

function getCartCount() {
  try {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    return cart.reduce((sum, item) => sum + (item.qty || 1), 0);
  } catch {
    return 0;
  }
}

function loadOrder() {
  // Update cart count in header
  document.getElementById("cartCount").textContent = getCartCount();

  const orderData = localStorage.getItem("lastOrder");
  const summaryEl = document.getElementById("orderSummary");
  const itemsList = document.getElementById("itemsList");
  const itemsSection = document.getElementById("itemsSection");

  if (!orderData) {
    // No order found – show placeholder
    summaryEl.innerHTML = `
      <div class="order-row">
        <span class="order-label">ORDER ID</span>
        <span class="order-value">#TH-XXXXXX</span>
      </div>
      <div class="order-row">
        <span class="order-label">TOTAL</span>
        <span class="order-value">LKR 0</span>
      </div>
      <div class="order-row">
        <span class="order-label">PAYMENT METHOD</span>
        <span class="order-value">—</span>
      </div>
    `;
    itemsSection.style.display = "none";
    return;
  }

  const order = JSON.parse(orderData);

  // Order Summary
  summaryEl.innerHTML = `
    <div class="order-row">
      <span class="order-label">ORDER ID</span>
      <span class="order-value">#${order.orderId || "TH-XXXXXX"}</span>
    </div>
    <div class="order-row">
      <span class="order-label">TOTAL</span>
      <span class="order-value">${formatLKR(order.total || 0)}</span>
    </div>
    <div class="order-row">
      <span class="order-label">PAYMENT METHOD</span>
      <span class="order-value">${(order.paymentMethod || "CARD").toUpperCase()}</span>
    </div>
  `;

  // Ordered Items
  if (order.items && order.items.length > 0) {
    itemsList.innerHTML = order.items.map(item => `
      <div class="item">
        <div class="item-img">
          ${item.image 
            ? `<img src="${item.image}" alt="${item.name || 'Product'}" onerror="this.parentElement.textContent='IMG'">` 
            : "IMG"}
        </div>
        <div class="item-info">
          <div class="item-name">${item.name || "Toy Item"}</div>
          <div class="item-meta">Qty: ${item.qty || 1}</div>
        </div>
        <div class="item-price">${formatLKR((item.price || 0) * (item.qty || 1))}</div>
      </div>
    `).join("");
  } else {
    itemsSection.style.display = "none";
  }
}



document.addEventListener("DOMContentLoaded", loadOrder);S