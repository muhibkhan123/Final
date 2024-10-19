// Sample items data (you can load this dynamically from a database with PHP)
const items = [
    { id: 1, name: 'Classic Burger Juicy beef patty, fresh lettuce, tomato, and our secret sauce.', price: 9, img: 'https://img.freepik.com/premium-photo/air-floating-big-burger-with-meat-patty-cheese-tomatoes-lettuce_1305425-124.jpg?w=740' },
    { id: 2, name: 'Cheese Burger Delicious beef patty topped with melted cheese and crispy bacon.', price: 10, img: 'https://img.freepik.com/premium-photo/floating-hamburger-with-meat-cheese-tomatoes-lettuce-splash-sauce-isolated-dark-backgroun_1049834-1572.jpg?w=740' },
    { id: 3, name: 'Veggie Burger Grilled veggie patty with avocado, lettuce, and tomato.', price: 8, img: 'https://img.freepik.com/premium-photo/hamburger-with-lot-cheese-vegetables_1271802-10309.jpg?w=740' },
    { id: 4, name: 'BBQ Bacon Burger Smoky BBQ sauce with crispy bacon and cheddar cheese.', price: 11, img: 'https://img.freepik.com/premium-photo/tasty-burger-isolated-dark-background-fresh-hamburger-fastfood-with-beef-cheese_1280668-704.jpg?w=740' },
	{ id: 5, name: 'Spicy Chicken Burger Crispy chicken with spicy mayo and pickles.', price: 10, img: 'https://img.freepik.com/premium-photo/floating-melted-cheese-splashing-burger-featuring-layers-premium-beef-clean-black-background_1272259-363.jpg?w=740' },
	{ id: 5, name: 'Mushroom Swiss Burger Juicy beef patty topped with sautéed mushrooms and Swiss cheese.', price: 11, img: 'https://img.freepik.com/premium-photo/cheeseburger-with-tomatoes-pickles-with-wooden-stick-top-fries_1209608-8165.jpg?w=740' },
	
];

// Special offer items data
const specialOffers = [
    { id: 5, name: 'Family Combo Deal Get 4 burgers and 2 sides for only ', price: 8, img: 'https://img.freepik.com/premium-photo/air-floating-big-burger-with-meat-patty-cheese-tomatoes-lettuce_1305425-124.jpg?w=740' },
    { id: 6, name: 'Student Discount Show your student ID and get 15% off your order!', price: 9, img: 'https://img.freepik.com/premium-photo/floating-hamburger-with-meat-cheese-tomatoes-lettuce-splash-sauce-isolated-dark-backgroun_1049834-1572.jpg?w=740' },
    { id: 7, name: 'Happy Hour Join us from 3 PM to 5 PM for 25% off all burgers!', price: 5, img: 'https://img.freepik.com/premium-photo/hamburger-with-lot-cheese-vegetables_1271802-10309.jpg?w=740' },
    { id: 8, name: 'Kids Eat Free! With every adult meal, one kid eats free.', price: 10, img: 'https://img.freepik.com/premium-photo/tasty-burger-isolated-dark-background-fresh-hamburger-fastfood-with-beef-cheese_1280668-704.jpg?w=740' },
    { id: 9, name: 'Free Side with Purchase! Order any burger and get a free side of fries.', price: 9, img: 'https://img.freepik.com/premium-photo/floating-melted-cheese-splashing-burger-featuring-layers-premium-beef-clean-black-background_1272259-363.jpg?w=740' }
];

// Array to hold items added to the bill
let billItems = [];

// Load items on page load
document.addEventListener('DOMContentLoaded', function() {
    const itemList = document.querySelector('.items');
    const specialOfferList = document.querySelector('.special-offers');

    // Dynamically create item cards for regular items
    items.forEach(item => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <img src="${item.img}" alt="${item.name}">
            <h3>${item.name}</h3>
            <p>$${item.price}</p>
            <button onclick="addToBill(${item.id}, 'item')">Add to Bill</button>
        `;
        itemList.appendChild(card);
    });

    // Dynamically create item cards for special offer items
    specialOffers.forEach(item => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <img src="${item.img}" alt="${item.name}">
            <h3>${item.name}</h3>
            <p>$${item.price}</p>
            <button onclick="addToBill(${item.id}, 'special')">Add to Bill</button>
        `;
        specialOfferList.appendChild(card);
    });
});

// Function to add item to the bill
function addToBill(itemId, type) {
    let item;
    if (type === 'item') {
        item = items.find(i => i.id === itemId);
    } else {
        item = specialOffers.find(i => i.id === itemId);
    }
    billItems.push(item);
    updateBill();
}

// Function to update the bill summary
function updateBill() {
    const billItemsContainer = document.querySelector('.bill-items');
    billItemsContainer.innerHTML = ''; // Clear previous bill items

    let total = 0;

    billItems.forEach((item, index) => {
        total += item.price;
        const billItem = document.createElement('div');
        billItem.classList.add('bill-item');
        billItem.innerHTML = `
            <span>${item.name}</span>
            <span>$${item.price}</span>
            <button class="delete-btn" onclick="removeFromBill(${index})">Delete</button>
        `;
        billItemsContainer.appendChild(billItem);
    });

    const totalItem = document.createElement('div');
    totalItem.classList.add('bill-item');
    totalItem.innerHTML = `<strong>Total:</strong> <strong>$${total}</strong>`;
    billItemsContainer.appendChild(totalItem);
}

// Function to remove item from bill
function removeFromBill(index) {
    billItems.splice(index, 1); // Remove the item from billItems array
    updateBill(); // Update the bill summary
}

// Modal functionality
const modal = document.getElementById("checkout-modal");
const closeModalBtn = document.querySelector(".close-btn");

// Handle checkout button click
document.getElementById("checkout-btn").addEventListener("click", function() {
    if (billItems.length === 0) {
        alert("No items in the bill!");
        return;
    }

    // Show the checkout modal
    modal.style.display = "flex";
    const checkoutBillContainer = document.getElementById("checkout-bill");
    checkoutBillContainer.innerHTML = ''; // Clear previous modal data

    // Create the table headers for the bill
    let tableHeader = `
        <tr>
            <th>Item Name</th>
            <th>Price</th>
            <th>Action</th>
        </tr>
    `;
    checkoutBillContainer.innerHTML = tableHeader;

    let total = 0;

    // Display all items in the table
    billItems.forEach((item, index) => {
        total += item.price;
        const tableRow = document.createElement('tr');
        tableRow.innerHTML = `
            <td>${item.name}</td>
            <td>$${item.price}</td>
            <td><button class="delete-btn" onclick="removeFromBill(${index}, true)">Delete</button></td>
        `;
        checkoutBillContainer.appendChild(tableRow);
    });

    // Add total row to the table
    const totalRow = document.createElement('tr');
    totalRow.innerHTML = `
        <td><strong>Total</strong></td>
        <td><strong>$${total}</strong></td>
        <td></td>
    `;
    checkoutBillContainer.appendChild(totalRow);
});

// Close modal when the close button is clicked
closeModalBtn.addEventListener("click", function() {
    modal.style.display = "none";
});

// Close modal when clicking outside the modal content
window.addEventListener("click", function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
});

// Extend the removeFromBill function to support both modal and bill summary
function removeFromBill(index, fromModal = false) {
    billItems.splice(index, 1); // Remove the item from billItems array

    if (fromModal) {
        document.getElementById("checkout-btn").click(); // Refresh modal if called from modal
    } else {
        updateBill(); // Update the bill summary
    }
}
