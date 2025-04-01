const cartIcon = document.querySelector("#cart-icon");
const cart = document.querySelector(".cart");
const cartClose = document.querySelector("#card-close");  // Fixed ID selector
const cartContent = document.querySelector(".cart-content");
const cartItemCountBadge = document.querySelector(".cart-item-count");

// Open and close cart
cartIcon.addEventListener("click", () => cart.classList.add("active"));
cartClose.addEventListener("click", () => cart.classList.remove("active"));

// Add-to-cart functionality
const addCartButtons = document.querySelectorAll(".add-cart");  // Correct selector
let cartItemCount = 0;

addCartButtons.forEach(button => {
    button.addEventListener("click", event => {
        const productBox = event.target.closest(".product-box");
        addToCart(productBox);
    });
});

const addToCart = productBox => {
    const productImgSrc = productBox.querySelector("img").src;
    const productTitle = productBox.querySelector(".product-title").textContent;
    const productPrice = productBox.querySelector(".price").textContent;

    // Check for existing items
    const existingItem = [...cartContent.querySelectorAll(".cart-box")]
        .find(item => item.querySelector(".cart-product-title").textContent === productTitle);

    if (existingItem) {
        alert("This item is already in the cart.");
        return;
    }

    // Create cart box
    const cartBox = document.createElement("div");
    cartBox.classList.add("cart-box");
    cartBox.innerHTML = `
        <img src="${productImgSrc}" class="cart-img">
        <div class="cart-detail">
            <h2 class="cart-product-title">${productTitle}</h2>
            <span class="cart-price">${productPrice}</span>
            <div class="cart-quantity">
                <button class="decrement">-</button>
                <span class="number">1</span>
                <button class="increment">+</button>
            </div>
        </div>
        <i class="ri-delete-bin-line cart-remove"></i>
    `;

    cartContent.appendChild(cartBox);

    // Update cart count and price
    cartItemCount++;
    updateCartCount();
    updateTotalPrice();

    // Remove item from cart
    cartBox.querySelector(".cart-remove").addEventListener("click", () => {
        cartBox.remove();
        cartItemCount--;
        updateCartCount();
        updateTotalPrice();
    });

    // Quantity control
    const quantityElement = cartBox.querySelector(".number");
    cartBox.querySelector(".decrement").addEventListener("click", () => {
        let quantity = parseInt(quantityElement.textContent);
        if (quantity > 1) {
            quantity--;
            quantityElement.textContent = quantity;
            updateTotalPrice();
        }
    });

    cartBox.querySelector(".increment").addEventListener("click", () => {
        let quantity = parseInt(quantityElement.textContent);
        quantity++;
        quantityElement.textContent = quantity;
        updateTotalPrice();
    });
};

// Update cart count
const updateCartCount = () => {
    if (cartItemCount > 0) {
        cartItemCountBadge.style.visibility = "visible";
        cartItemCountBadge.textContent = cartItemCount;
    } else {
        cartItemCountBadge.style.visibility = "hidden";
        cartItemCountBadge.textContent = "";
    }
};

// Update total price
const updateTotalPrice = () => {
    let total = 0;
    document.querySelectorAll(".cart-box").forEach(cartBox => {
        const price = parseFloat(cartBox.querySelector(".cart-price").textContent.replace("$", ""));
        const quantity = parseInt(cartBox.querySelector(".number").textContent);
        total += price * quantity;
    });
    document.querySelector(".total-price").textContent = `$${total.toFixed(2)}`;
};



// Buy Now button
document.querySelector(".btn-buy").addEventListener("click", () => {


    if (cartContent.children.length === 0) {
        alert("Your cart is empty. Please add items to your cart before buying.");
        return;
    }

    cartContent.innerHTML = "";
    cartItemCount = 0;
    updateCartCount();
    updateTotalPrice();
    // alert("");

    prompt("address");
    prompt("city");
    prompt("pincode");
    prompt("landmark");
    alert("Thank you for filling Address Your Order Delivered Soon");

});






