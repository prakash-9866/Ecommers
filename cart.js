// cart.js

const cartItemsContainer = document.getElementById("cart-items");
const totalPriceElement = document.getElementById("total-price");
const cartCount = document.getElementById("cart-count");

// Load cart from localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Update navbar count
function updateCartCount() {
  cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
}

// Render cart items
function renderCart() {
  cartItemsContainer.innerHTML = "";

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
    totalPriceElement.textContent = "0";
    updateCartCount();
    return;
  }

  let total = 0;
  cart.forEach((item, index) => {
    total += item.price * item.quantity;

    const div = document.createElement("div");
    div.classList.add("cart-item");
    div.innerHTML = `
      <img src="${item.image}" width="80" height="80" />
      <div>
        <h3>${item.name}</h3>
        <p>₹${item.price} × ${item.quantity}</p>
        <button class="remove" data-index="${index}">Remove</button>
      </div>
    `;
    cartItemsContainer.appendChild(div);
  });

  totalPriceElement.textContent = total;

  // Add event for remove buttons
  document.querySelectorAll(".remove").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const index = e.target.dataset.index;
      cart.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(cart));
      renderCart();
      updateCartCount();
    });
  });

  updateCartCount();
}

// Initialize cart display
renderCart();
