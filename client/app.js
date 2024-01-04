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
