// ========== MENU ICON ==========
const menuIcon = document.getElementById("menu-icon");
const mobileMenu = document.getElementById("mobile-menu");

if (menuIcon && mobileMenu) {
    menuIcon.addEventListener("click", function () {
        mobileMenu.classList.toggle("show");
    });
}

function getCart() {
    return JSON.parse(localStorage.getItem("toyHavenCart") || "[]");
}

function updateCartCount() {
    const cart = getCart();
    const count = cart.reduce((sum, item) => sum + item.qty, 0);
    document.querySelectorAll("#cartCount").forEach(el => {
        el.textContent = count;
    });
}

function renderOrder() {
    const cart = getCart();
    const orderItemsEl = document.getElementById("orderItems");

    if (cart.length === 0) {
        orderItemsEl.innerHTML = "<p>Your cart is empty.</p>";
        document.getElementById("subtotal").textContent = "LKR 0";
        document.getElementById("discount").textContent = "LKR 0";
        document.getElementById("delivery").textContent = "LKR 0";
        document.getElementById("total").textContent = "LKR 0";
        return;
    }

    orderItemsEl.innerHTML = cart.map(item => `
        <div class="order-item">
            <div class="name">${item.name}</div>
            <div class="price">LKR ${item.price} &nbsp; Quantity: ${item.qty}</div>
        </div>
    `).join("");

    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    const itemsCount = cart.reduce((sum, item) => sum + item.qty, 0);
    const discount = itemsCount >= 2 ? 50 : 0;
    const delivery = 200;
    const total = subtotal + delivery - discount;

    document.getElementById("subtotal").textContent = "LKR " + subtotal;
    document.getElementById("discount").textContent = "LKR " + discount;
    document.getElementById("delivery").textContent = "LKR " + delivery;
    document.getElementById("total").textContent = "LKR " + total;
}

// Show / hide card details
document.querySelectorAll('input[name="payment"]').forEach(radio => {
    radio.addEventListener("change", function () {
        const cardDetails = document.getElementById("cardDetails");
        if (this.value === "card") {
            cardDetails.style.display = "block";
        } else {
            cardDetails.style.display = "none";
        }
    });
});

// Place Order
document.getElementById("placeOrderBtn").addEventListener("click", function () {
    const name = document.getElementById("fullName").value.trim();
    const email = document.getElementById("email").value.trim();
    const address = document.getElementById("address").value.trim();
    const payment = document.querySelector('input[name="payment"]:checked')?.value;

    if (!name || !email || !address) {
        alert("Please fill in all required fields.");
        return;
    }

    if (!payment) {
        alert("Please select a payment method.");
        return;
    }

    // Use the SAME key as getCart()
    const cart = getCart();

    if (cart.length === 0) {
        alert("Your cart is empty.");
        return;
    }

    // Calculate total the same way as renderOrder()
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    const itemsCount = cart.reduce((sum, item) => sum + item.qty, 0);
    const discount = itemsCount >= 2 ? 50 : 0;
    const delivery = 200;
    const total = subtotal + delivery - discount;

    // Create order object
    const order = {
        orderId: "TH-" + Math.random().toString(36).substr(2, 6).toUpperCase(),
        total: total,
        paymentMethod: payment,          // uses the actual selected method
        items: cart,
        customer: {
            name: name,
            email: email,
            address: address
        }
    };

    // Save the order
    localStorage.setItem("lastOrder", JSON.stringify(order));

    // Clear the correct cart
    localStorage.removeItem("toyHavenCart");

    // Go to thank you page
    window.location.href = "thankyou.html";
});

// Mobile menu + initial load
document.addEventListener("DOMContentLoaded", function () {
    const toggle = document.getElementById("menuToggle");
    const menu = document.getElementById("mobileMenu");
    
    if (toggle && menu) {
        toggle.addEventListener("click", () => menu.classList.toggle("show"));
    }

    updateCartCount();
    renderOrder();
});