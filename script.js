const store = document.getElementsByClassName("body-store")[0];
const cart = document.getElementsByClassName("cart-store")[0];
const buttonCart = document.querySelector(".button-cart");

buttonCart.addEventListener("click", () => {
  cart.classList.toggle("hidden");
});

fetch("https://fakestoreapi.com/products")
  .then((res) => res.json())
  .then((json) => {
    console.log(json);
    loadGoods(json);
  });

function loadGoods(objects) {
  let i = 0;

  createTable();

  while (i < 9) {
    const element = {
      id: objects[i].id,
      title: objects[i].title,
      description: objects[i].description,
      price: objects[i].price,
      image: objects[i].image,
      counter: 0,
    };

    let title = document.createElement("h3");
    let description = document.createElement("p");
    let price = document.createElement("p");
    let image = document.createElement("img");
    let card = document.createElement("div");
    let cardText = document.createElement("div");
    let cardTop = document.createElement("div");
    let takeBtn = document.createElement("button");

    card.className = "card";
    title.className = "card-tittle";
    description.className = "card-description";
    price.className = "card-price";
    image.className = "card-image";
    cardText.className = "card-text-content";
    cardTop.className = "card-top";
    takeBtn.className = "buy-btn";

    title.textContent = element.title;
    description.textContent = element.description;
    price.textContent = `$${element.price}`;
    image.src = element.image;

    takeBtn.textContent = "Buy";
    takeBtn.addEventListener("click", handleClick.bind(null, element));

    cardTop.appendChild(image);
    cardText.appendChild(title);
    cardText.appendChild(price);
    cardText.appendChild(takeBtn);
    cardText.appendChild(description);
    card.appendChild(cardTop);
    card.appendChild(cardText);
    store.appendChild(card);

    i++;
  }
}

function handleClick(element) {
  // check if element exsist then counter of this element in table are going to increase or create a new row
  let rows = Array.from(document.querySelectorAll(".row"));
  if (rows.length == 0) {
    createRow(element);
    countTotal();
  } else {
    for (let i = 0; i < rows.length; i++) {
      let td = rows[i].getElementsByTagName("td");
      if (element.id == td[0].textContent) {
        td[2].textContent = ++element.counter;
        countTotal();
        break;
      } else if (element.id != td[0].textContent && i == rows.length - 1) {
        createRow(element);
        countTotal();
      }
    }
  }
}

function createRow(dataRowInTable) {
  const bodyt = document.querySelector(".body-table");
  const tr = document.createElement("tr");
  tr.className = "row";
  const td1 = document.createElement("td");
  td1.className = "id";
  const tdLess = document.createElement("td");
  tdLess.className = "td-button-less";
  const buttonLess = document.createElement("button");
  buttonLess.textContent = "less";
  buttonLess.className = "button-less";
  const td2 = document.createElement("td");
  td2.className = "title";
  const td3 = document.createElement("td");
  td3.className = "number";
  const td4 = document.createElement("td");
  td4.className = "price";
  td1.textContent = dataRowInTable.id;
  td2.textContent = dataRowInTable.title;
  td3.textContent = ++dataRowInTable.counter;
  td4.textContent = `${dataRowInTable.price}$`;
  buttonLess.addEventListener("click", makeLess.bind(null, dataRowInTable));
  tdLess.appendChild(buttonLess);
  tr.appendChild(td1);
  tr.appendChild(td2);
  tr.appendChild(td3);
  tr.appendChild(td4);
  tr.appendChild(tdLess);
  bodyt.appendChild(tr);
}

function createTable() {
  const table = document.createElement("table");
  table.className = "cart-table";
  const tbody = document.createElement("tbody");
  tbody.className = "body-table";
  table.appendChild(tbody);
  cart.appendChild(table);
}

function makeLess(dataRowInTable) {
  const table = document.querySelector(".cart-table");
  const rows = Array.from(document.querySelectorAll(".row"));

  for (let index = 0; index < rows.length; index++) {
    const tdn = rows[index].getElementsByTagName("td");
    if (tdn[2].textContent == 1 && tdn[0].textContent == dataRowInTable.id) {
      table.deleteRow(index);
      --dataRowInTable.counter;
      break;
    } else if (tdn[0].textContent == dataRowInTable.id) {
      tdn[2].textContent = --dataRowInTable.counter;
      break;
    }
  }
  countTotal();
}

function countTotal() {
  const rows = Array.from(document.querySelectorAll(".row"));
  let totalPrice = 0;
  for (let i = 0; i < rows.length; i++) {
    const element = rows[i].getElementsByTagName("td");
    let onePrice = parseFloat(element[3].textContent);
    totalPrice = totalPrice + onePrice * parseFloat(element[2].textContent);
  }
  const totalValue = cart.querySelector(".total-price span");
  totalValue.textContent = `${totalPrice.toFixed(2)}$`;
}
