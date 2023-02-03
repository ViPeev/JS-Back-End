const { version } = require("react/cjs/react.production.min");

document.querySelector(".load").addEventListener("click", loadProducts);
document.querySelector("form").addEventListener("submit", createProduct);
let ul = document.querySelector("ul");
ul.addEventListener("click", deleteItem);

async function loadProducts() {
  let req = await fetch("http://localhost:3000/data");
  let data = await req.json();
  ul.replaceChildren();
  data.forEach(createRow);
}

function createRow(item) {
  let li = document.createElement("li");
  li.textContent = `${item.name} - ${item.price}`;
    
  createAction(li,'[Details]','details');
  createAction(li,'[Delete]','delete');
  ul.appendChild(li);
}

function createAction(li,label,className){
    const btn = document.createElement('a');
    btn.textContent = label;
    btn.class = className;
    btn.href = 'javascript:void(0)';
    li.appendChild(btn);
}

async function createProduct(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData);
  const res = await fetch("http://localhost:3000/data", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const item = await res.json();
  createRow(item);
}

async function deleteItem(event) {
  if (event.target.tagName == "A") {
    event.preventDefault();
    const id = event.target.parentNode.id;
    await fetch("http://localhost:3000/data/" + id, {
      method: "delete",
    });
    event.target.parentNode.remove();
  }
}