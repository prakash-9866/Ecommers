// script3.js

// Select all Add to Cart buttons and cart count
const addToCartButtons = document.querySelectorAll(".add-to-cart");
const cartCount = document.getElementById("cart-count");

// Load cart from localStorage (if available)
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Update cart count in navbar
function updateCartCount() {
  cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
}

// Add to cart function
function addToCart(name, price, image) {
  // Check if product already exists in cart
  const existing = cart.find((item) => item.name === name);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ name, price, image, quantity: 1 });
  }

  // Save to localStorage
  localStorage.setItem("cart", JSON.stringify(cart));

  // Update count
  updateCartCount();

  alert(`${name} added to cart!`);
}

// Event listeners for "Add to Cart" buttons
addToCartButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const productCard = btn.closest(".product-card");
    const name = productCard.querySelector("h3").textContent;
    const price = parseInt(productCard.querySelector("p").textContent.replace("₹", ""));
    const image = productCard.querySelector("img").src;

    addToCart(name, price, image);
  });
});

// Initialize cart count on page load
updateCartCount();
