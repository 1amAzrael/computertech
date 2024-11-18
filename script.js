
const addToCartButtons = document.querySelectorAll(".add-to-cart");
const cartItemsContainer = document.querySelector(".cart-items");
const cartTotalDisplay = document.getElementById("cart-total");
const checkoutButton = document.getElementById("checkout-btn");
const checkoutModal = document.getElementById("checkout-success");
const closeModalButton = document.getElementById("close-modal");

let cart = [];


addToCartButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
        
        const productCard = button.closest(".product-card");
        const name = productCard.querySelector(".product-name").textContent;
        const priceText = productCard.querySelector(".product-price").textContent;
        const price = parseFloat(priceText.replace("$", ""));

        
        cart.push({ name, price });
        updateCart();
    });
});


function updateCart() {
    
    cartItemsContainer.innerHTML = "";

    let total = 0;

    
    cart.forEach((item, index) => {
        total += item.price;

        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");

        cartItem.innerHTML = `
            <p>${item.name} - $${item.price.toFixed(2)}</p>
            <button class="remove" data-index="${index}">Remove</button>
        `;

        cartItemsContainer.appendChild(cartItem);
    });

    
    cartTotalDisplay.textContent = total.toFixed(2);

    
    const removeButtons = document.querySelectorAll(".cart-item .remove");
    removeButtons.forEach((button) => {
        button.addEventListener("click", (e) => {
            const index = parseInt(button.getAttribute("data-index"));
            cart.splice(index, 1); 
            updateCart();
        });
    });
}


checkoutButton.addEventListener("click", () => {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    
    checkoutModal.classList.remove("hidden");

    
    cart = [];
    updateCart();
});


closeModalButton.addEventListener("click", () => {
    checkoutModal.classList.add("hidden");
});
