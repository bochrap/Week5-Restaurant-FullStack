const menuDiv = document.getElementById("menu-div");

async function getMenu() {
  const response = await fetch("http://localhost:8080/menu");
  const items = await response.json();
  console.log(items);

  items.forEach(function (item) {
    const itemDiv = document.createElement("div");
    const nameDescriptionDiv = document.createElement("div");
    menuDiv.appendChild(itemDiv);

    const itemImg = document.createElement("img");
    const itemName = document.createElement("h3");
    const itemDescription = document.createElement("p");
    const itemPrice = document.createElement("p");

    itemName.textContent = item.name;
    itemDescription.textContent = item.description;
    itemPrice.textContent = item.price;
    itemImg.src = item.image;

    itemDiv.classList.add("itemDiv");
    itemImg.classList.add("itemImg");
    itemName.classList.add("itemName");
    itemDescription.classList.add("itemDescription");
    itemPrice.classList.add("itemPrice");
    nameDescriptionDiv.classList.add("nameDescriptionDiv");

    nameDescriptionDiv.appendChild(itemName);
    nameDescriptionDiv.appendChild(itemDescription);

    itemDiv.appendChild(nameDescriptionDiv);
    itemDiv.appendChild(itemImg);
    itemDiv.appendChild(itemPrice);
  });
}

getMenu();

const productPrices = {
  fishQuantity: 12.99,
  pieQuantity: 10.99,
  bangersQuantity: 9.99,
  platterQuantity: 8.99,
  puddingQuantity: 5.99,
  teaQuantity: 2.99,
  pimmsQuantity: 7.99,
  lemonadeQuantity: 3.99

};

// Function to calculate the total
function calculateTotal() {
  let total = 0;
  const quantities = document.querySelectorAll('.quantity');

  quantities.forEach(quantity => {
    const productId = parseInt(quantity.id.replace('quantity', ''));
    const price = productPrices[productId];
    const quantityValue = parseInt(quantity.value);
    total += price * quantityValue;
  });

  return total;
}

// Func to update num of items & total
function updateCart() {
  const total = calculateTotal();
  document.getElementById('total').textContent = total;
}

// Func to place order
function placeOrder() {
  const total = calculateTotal();
  alert(`Your total is £${total}. Order placed! Your driver is on the way!`);
}

// Event list 4 quant change
const quantities = document.querySelectorAll('.quantity');
quantities.forEach(quantity => {
  quantity.addEventListener('change', updateCart);
});

// Initial updt of the basket
updateCart();