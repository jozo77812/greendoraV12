// Filtrovanie produktov podľa kategórie
document.querySelectorAll('.filter-btn').forEach(button => {
    button.addEventListener('click', () => {
        const filter = button.getAttribute('data-filter');
        const products = document.querySelectorAll('.product');

        products.forEach(product => {
            if (filter === 'all' || product.classList.contains(filter)) {
                product.style.display = 'block';
            } else {
                product.style.display = 'none';
            }
        });
    });
});

// Wishlist funkcia
const wishlist = [];

document.querySelectorAll('.wishlist-btn').forEach(button => {
    button.addEventListener('click', (event) => {
        const productName = event.target.closest('.product').querySelector('p').innerText;
        if (!wishlist.includes(productName)) {
            wishlist.push(productName);
            alert(`${productName} bol pridaný do wishlistu.`);
        } else {
            alert(`${productName} už je vo wishliste.`);
        }
    });
});

document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        alert('Produkt bol pridaný do košíka.');
    });
});
