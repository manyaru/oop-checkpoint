// Product class
class Product {
    constructor(id, name, price) {
        this.id = id;
        this.name = name;
        this.price = price;
    }
}

// ShoppingCartItem class
class ShoppingCartItem {
    constructor(product, quantity) {
        this.product = product;
        this.quantity = quantity;
    }

    getTotalPrice() {
        return this.product.price * this.quantity;
    }
}

// ShoppingCart class
class ShoppingCart {
    constructor() {
        this.items = [];
    }

    addItem(product, quantity = 1) {
        const existingItem = this.items.find(item => item.product.id === product.id);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.items.push(new ShoppingCartItem(product, quantity));
        }
        this.displayCartItems();
    }

    removeItem(productId) {
        this.items = this.items.filter(item => item.product.id !== productId);
        this.displayCartItems();
    }

    getTotalItems() {
        return this.items.reduce((total, item) => total + item.quantity, 0);
    }

    getTotalCost() {
        return this.items.reduce((total, item) => total + item.getTotalPrice(), 0);
    }

    displayCartItems() {
        const cartContainer = document.querySelector('tbody');
        cartContainer.innerHTML = '';
        this.items.forEach(item => {
            const itemContainer = document.createElement('tr');
            itemContainer.innerHTML = `
                <td><input class="uk-checkbox" type="checkbox"></td>
                <td><img class="uk-preserve-width uk-border-circle" src=${item.product.image} width="40" alt=""></td>
                <td class="uk-table-link">
                    <h3 class="item-name">${item.product.name}</h3>
                </td>
                <td class="uk-text-truncate item-price"><h3>ksh${item.product.price}</h3></td>
                <td><input type='number' class='num' value='${item.quantity}' min='1'></td>
                <td class="uk-text-truncate total-price"><h3>ksh${item.getTotalPrice()}</h3></td>
                <td><button class="uk-button uk-button-danger" type="button" data-id="${item.product.id}">Remove</button></td>
            `;
            cartContainer.append(itemContainer);

            itemContainer.querySelector('.num').addEventListener('change', (event) => {
                const newQuantity = parseInt(event.target.value);
                item.quantity = newQuantity;
                itemContainer.querySelector('.total-price h3').innerText = `ksh${item.getTotalPrice()}`;
                document.querySelector('.grand-total h3').innerText = `ksh${this.getTotalCost()}`;
            });

            itemContainer.querySelector('.uk-button-danger').addEventListener('click', (event) => {
                const productId = parseInt(event.target.getAttribute('data-id'));
                this.removeItem(productId);
            });
        });

        document.querySelector('.grand-total h3').innerText = `ksh${this.getTotalCost()}`;
    }
}

// Initialize products
const products = [
    new Product(1, 'Chocolate Cake', 600),
    new Product(2, 'Green Shoe', 700),
    new Product(3, 'Hamburger', 250),
    new Product(4, 'Pink Shoe', 500),
    new Product(5, 'T Shirt', 300),
    new Product(6, 'Strawberry Cake', 600),
];

// Initialize shopping cart
const shoppingCart = new ShoppingCart();

// Add event listeners to add-to-cart buttons
document.querySelectorAll('.btn-primary').forEach((button, index) => {
    button.addEventListener('click', () => {
        shoppingCart.addItem(products[index]);
    });
});

// Display the cart initially
shoppingCart.displayCartItems();
