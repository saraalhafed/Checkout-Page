"use strict";
const form = document.querySelector("form");
const cart = [];  // each card is opject
//add a product with addeventlistener of submit
form.addEventListener("submit", addProduct);
//dunction of addproduct
/* function addProduct(e) {
  e.preventDefault();
  const nameProduct = document.querySelector("#add-name");
  const priceElement = document.querySelector("#add-price");
  const quantityElement = document.querySelector("#add-quantity");
  const imageElement = document.querySelector("#add-image");
  const productPanel = document.querySelector("#product-panel"); */
  //create a card element
  /* const productCard = document.createElement("div");
   productCard.style.maxWidth = "390px";
  productCard.className = "card d-flex flex-row m-3 shadow";
  const productPrice = priceElement.value * 0.7; */
  //Adding inner html inside the card
  /* productCard.innerHTML = `  <img
  src="${imageElement.value}"
  class="img-fluid w-50"
/>
<div class="product details w-100 my-1">
  <h6>${nameProduct.value}</h6>
  <h3 class="text-warning">
    $ ${productPrice.toFixed(2)}<small
      class="text-decoration-line-through fs-6 text-dark"
      >${priceElement.value}</small
    >
  </h3>
  <div
    class="d-flex bg-white border border-2 justify-content-center p-2 m-1"
  >
    <button class="btn btn-secondary btn-sm">-</button>
    <input
      type="text"
      class="form-control border-0 bg-white quantity"
      style="width: 50px"
      readonly
      value="${quantityElement.value}"
    />
    <button class="btn btn-secondary btn-sm">+</button>
  </div>
  <div class="d-grid m-1">
    <button class="btn btn-danger">
      <i class="fa-solid fa-trash p-1"></i>Remove
    </button>
  </div>
  <p class="m-1">
    product total:<span id="product-total" class="fs-6 fw-bold"
      >$${productPrice.toFixed(2) * quantityElement.value}</span
    >
  </p>
</div>`; */
  //append child is only working with nodes only
  /* productPanel.appendChild(productCard); */
  //append takes strings and nodes
 /*  form.reset();
}
 */
//decrease quantity
//increase quantity
//remove the product
//calculate total
