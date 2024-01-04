const menuDiv = document.getElementById("menu-div");
const basketDiv = document.getElementById("basket-div");

async function getBasket() {
  const response = await fetch("http://localhost:8080/order");
  const items = await response.json();
  console.log(items);

  let totalPrice = 0;

  items.forEach(function (item) {
    const basketItem = document.createElement("div");
    basketDiv.appendChild(basketItem);

    const basketName = document.createElement("span");
    const basketPrice = document.createElement("span");
    const totalSpan = document.createElement("span");

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "❌";
    deleteBtn.classList.add("deleteBtn");

    deleteBtn.addEventListener("click", function () {
      // Handle the delete button click
      deleteBasketItem(item.id); // Assuming there is an 'id' property in your item
    });

    totalPrice += item.price;

    basketName.textContent = item.name;
    basketPrice.textContent = item.price;

    basketItem.classList.add("basketItem");
    basketName.classList.add("basketName");
    basketPrice.classList.add("basketPrice");

    basketItem.appendChild(basketName);
    basketItem.appendChild(basketPrice);
    basketItem.appendChild(deleteBtn);
  });

  const totalSpan = document.createElement("span");
  totalSpan.textContent = "Total Price: " + totalPrice;

  // Append totalSpan to the bottom of basketDiv
  basketDiv.appendChild(totalSpan);

  console.log("Total Price:", totalPrice);
}

async function deleteBasketItem(itemId) {
  // Send a DELETE request to the server to delete the item
  await fetch(`http://localhost:8080/order/${itemId}`, {
    method: "DELETE",
  });

  // Clear the basketDiv and reload the basket
  basketDiv.innerHTML = "";
  getBasket();
}

if (basketDiv) {
  getBasket();
}

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
    const orderBtn = document.createElement("button");

    itemName.textContent = item.name;
    itemDescription.textContent = item.description;
    itemPrice.textContent = item.price;
    itemImg.src = item.image;
    orderBtn.textContent = "ADD TO ORDER";

    itemDiv.classList.add("itemDiv");
    itemImg.classList.add("itemImg");
    itemName.classList.add("itemName");
    itemDescription.classList.add("itemDescription");
    itemPrice.classList.add("itemPrice");
    nameDescriptionDiv.classList.add("nameDescriptionDiv");
    orderBtn.classList.add("orderBtn");

    nameDescriptionDiv.appendChild(itemName);
    nameDescriptionDiv.appendChild(itemDescription);

    itemDiv.appendChild(nameDescriptionDiv);
    itemDiv.appendChild(itemImg);
    itemDiv.appendChild(itemPrice);
    itemDiv.appendChild(orderBtn);
  });
  orderBtnListener();
}

// getMenu();

if (menuDiv) {
  getMenu();
}

// function orderBtnListener() {
//   const btns = document.querySelectorAll(".orderBtn");
//   btns.forEach((btn) => {
//     btn.addEventListener("click", function () {
//       const itemName = this.parentNode.querySelector(".itemName").textContent;
//       const itemPrice = this.parentNode.querySelector(".itemPrice").textContent;

//       fetch("http://localhost:8080/order", {
//         method: "POST",
//         headers: {
//           "Content-type": "application/json",
//         },
//         body: JSON.stringify({
//           name: itemName,
//           price: parseFloat(itemPrice),
//         }),
//       })
//         .then((response) => response.json())
//         .then((data) => console.log(data))
//         .catch((error) => console.error("Error:", error));
//     });
//   });
// }
// const productPrices = {
//   fishQuantity: 12.99,
//   pieQuantity: 10.99,
//   bangersQuantity: 9.99,
//   platterQuantity: 8.99,
//   puddingQuantity: 5.99,
//   teaQuantity: 2.99,
//   pimmsQuantity: 7.99,
//   lemonadeQuantity: 3.99,
// };

// // Function to calculate the total
// function calculateTotal() {
//   let total = 0;
//   const quantities = document.querySelectorAll(".quantity");

//   quantities.forEach((quantity) => {
//     const productId = parseInt(quantity.id.replace("quantity", ""));
//     const price = productPrices[productId];
//     const quantityValue = parseInt(quantity.value);
//     total += price * quantityValue;
//   });

//   return total;
// }

// // Func to update num of items & total
// function updateCart() {
//   const total = calculateTotal();
//   document.getElementById("total").textContent = total;
// }

// // Func to place order
// function placeOrder() {
//   const total = calculateTotal();
//   alert(`Your total is £${total}. Order placed! Your driver is on the way!`);
// }

// // Event list 4 quant change
// const quantities = document.querySelectorAll(".quantity");
// quantities.forEach((quantity) => {
//   quantity.addEventListener("change", updateCart);
// });

// // Initial updt of the basket
// updateCart();

// // Function to calculate the total
// function calculateTotal() {
//   let total = 0;
//   const quantities = document.querySelectorAll(".quantity");

//   quantities.forEach((quantity) => {
//     const productId = parseInt(quantity.id.replace("quantity", ""));
//     const price = productPrices[productId];
//     const quantityValue = parseInt(quantity.value);
//     total += price * quantityValue;
//   });

//   return total;
// }

// // Func to update num of items & total
// function updateCart() {
//   const total = calculateTotal();
//   document.getElementById("total").textContent = total;
// }

// // Func to place order
// function placeOrder() {
//   const total = calculateTotal();
//   alert(`Your total is £${total}. Order placed! Your driver is on the way!`);
// }

// // Initial updt of the basket
// updateCart();

function orderBtnListener() {
  const btns = document.querySelectorAll(".orderBtn");
  btns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const itemNameElement = this.parentNode.querySelector(".itemName");
      const itemName = itemNameElement ? itemNameElement.textContent : ""; // Ensure itemName is not undefined

      // if (!itemName.trim()) {
      //   console.error("Item name is empty or undefined");
      //   return;
      // }

      const itemPrice = this.parentNode.querySelector(".itemPrice").textContent;

      fetch("http://localhost:8080/order", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          name: itemName,
          price: parseFloat(itemPrice),
        }),
      })
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((error) => console.error("Error:", error));
    });
  });
}
