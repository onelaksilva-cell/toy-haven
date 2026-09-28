document.addEventListener("DOMContentLoaded", function () {

    // Cart count
    const cart = JSON.parse(localStorage.getItem("toyHavenCart") || "[]");
    const total = cart.reduce((sum, item) => sum + (item.qty || 1), 0);
    const cartEl = document.getElementById("cartCount");
    if (cartEl) cartEl.textContent = total;

    // Mobile menu toggle
    const menuIcon = document.getElementById("menu-icon");
    const mobileMenu = document.getElementById("mobile-menu");

    if (menuIcon && mobileMenu) {
        menuIcon.addEventListener("click", function () {
            mobileMenu.classList.toggle("show");
        });
    }

    // FAQ Accordion
    document.querySelectorAll(".faq-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const item = btn.parentElement;

            // Close other open FAQs
            document.querySelectorAll(".faq-item").forEach(other => {
                if (other !== item) {
                    other.classList.remove("active");
                }
            });

            item.classList.toggle("active");
        });
    });

    // Feedback form
    const form = document.getElementById("feedbackForm");
    if (form) {
        form.addEventListener("submit", function (e) {
            e.preventDefault();
            const name = document.getElementById("name").value.trim();
            alert(`Thank you for your feedback, ${name}!\nWe will get back to you soon.`);
            form.reset();
        });
    }
});