// Menu Icon
const menuIcon = document.getElementById("menu-icon");
const mobileMenu = document.getElementById("mobile-menu");

menuIcon.addEventListener("click", function () {
    mobileMenu.classList.toggle("show");
});

// Slider (manual only)
let current = 0;
const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");

function showSlide(index) {
    if (index >= slides.length) index = 0;
    if (index < 0) index = slides.length - 1;

    slides.forEach(slide => slide.classList.remove("active"));
    dots.forEach(dot => dot.classList.remove("active"));

    slides[index].classList.add("active");
    dots[index].classList.add("active");
    current = index;
}

// Dots
dots.forEach(dot => {
    dot.addEventListener("click", function () {
        showSlide(parseInt(this.getAttribute("data-index")));
    });
});

// Arrows
prevBtn.addEventListener("click", function () {
    showSlide(current - 1);
});

nextBtn.addEventListener("click", function () {
    showSlide(current + 1);
});

// Cart counter
let cartCount = 0;
const cartDisplay = document.getElementById("cart-count");

// Newsletter
document.getElementById("subscribe-btn").addEventListener("click", function () {
    const email = document.getElementById("email").value;
    const msg = document.getElementById("message");

    if (email === "") {
        msg.innerText = "Please enter your email";
    } else if (email.includes("@")) {
        msg.innerText = "Thank you for subscribing!";
        document.getElementById("email").value = "";
    } else {
        msg.innerText = "Please enter a valid email";
    }
});