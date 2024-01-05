const menuDiv = document.getElementById("menu-div");
const basketDiv = document.getElementById("basket-div");

async function getBasket() {
  const response = await fetch(
    "https://server-week5-project.onrender.com/order"
  );
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
      deleteBasketItem(item.id);
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

  basketDiv.appendChild(totalSpan);

  console.log("Total Price:", totalPrice);

  const placeOrderBtn = document.createElement("button");
  placeOrderBtn.textContent = "Place Order";
  placeOrderBtn.addEventListener("click", function () {
    alert("YOUR ORDER IS ON IT'S WAY");
  });

  basketDiv.appendChild(placeOrderBtn);
}

async function deleteBasketItem(itemId) {
  await fetch(`https://server-week5-project.onrender.com/order/${itemId}`, {
    method: "DELETE",
  });

  basketDiv.innerHTML = "";
  getBasket();
}

if (basketDiv) {
  getBasket();
}

async function getMenu() {
  const response = await fetch(
    "https://server-week5-project.onrender.com/menu"
  );
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

if (menuDiv) {
  getMenu();
}

function orderBtnListener() {
  const btns = document.querySelectorAll(".orderBtn");
  btns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const itemNameElement = this.parentNode.querySelector(".itemName");
      const itemName = itemNameElement ? itemNameElement.textContent : "";

      const itemPrice = this.parentNode.querySelector(".itemPrice").textContent;

      fetch("https://server-week5-project.onrender.com/order", {
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
