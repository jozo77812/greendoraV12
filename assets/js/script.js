const cart = [];

function addToCart(productName, productPrice) {
    const existingProduct = cart.find((product) => product.name === productName);
    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push({ name: productName, price: productPrice, quantity: 1 });
    }
    console.log(cart); // Debugging log
    updateCartDisplay();
}

function updateCartDisplay() {
    let cartHTML = '';
    let total = 0;
    cart.forEach((item) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        cartHTML += `
            <div class="cart-item">
                <span>${item.name}</span>
                <span>${item.quantity}</span>
                <span>€${itemTotal.toFixed(2)}</span>
            </div>
        `;
    });
    document.getElementById('cart-display').innerHTML = cartHTML;
    document.getElementById('cart-total').innerText = `Total: €${total.toFixed(2)}`;
}
