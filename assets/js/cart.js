// Inicializácia košíka
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Funkcia na uloženie košíka do localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Pridanie položky do košíka
function addToCart(name, price) {
    const existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ name, price, quantity: 1 });
    }
    saveCart();
    alert(`${name} bol pridaný do košíka.`);
    renderCart();
}

// Zobrazenie košíka na stránke
function renderCart() {
    const cartItemsContainer = document.querySelector('.cart-items');
    const totalPriceElement = document.getElementById('total-price');
    if (!cartItemsContainer || !totalPriceElement) return; // Ak nie sme na stránke košíka, ukonči funkciu

    cartItemsContainer.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('cart-item');
        itemDiv.innerHTML = `
            <h3>${item.name}</h3>
            <p>Cena za kus: ${item.price.toFixed(2)} EUR</p>
            <div class="quantity-controls">
                <button onclick="updateQuantity('${item.name}', -1)">-</button>
                <span>${item.quantity}</span>
                <button onclick="updateQuantity('${item.name}', 1)">+</button>
            </div>
            <p>Medzisúčet: ${(item.price * item.quantity).toFixed(2)} EUR</p>
        `;
        cartItemsContainer.appendChild(itemDiv);
        total += item.price * item.quantity;
    });

    totalPriceElement.textContent = `${total.toFixed(2)} EUR`;
}

// Aktualizácia množstva položky
function updateQuantity(name, change) {
    const item = cart.find(i => i.name === name);
    if (item) {
        item.quantity += change;
        if (item.quantity < 1) {
            cart = cart.filter(i => i.name !== name);
        }
    }
    saveCart();
    renderCart();
}

// Event listener pre tlačidlá "Pridať do košíka"
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', () => {
            const name = button.getAttribute('data-name');
            const price = parseFloat(button.getAttribute('data-price'));
            addToCart(name, price);
        });
    });

    renderCart(); // Renderovanie košíka pri načítaní stránky (ak existuje)
});
