"use strict";
const form = document.querySelector("form");
/* let cart = []; we need an array to hold all the data , each product is an object*/
let cart;
//local storage is a property in the window that you can use to store data inside
const bringfromStorage = function () {
    //things in storage are in a json language
    //searching for the cart and getting it from the cart
    cart = JSON.parse(localStorage.getItem("cart")) || [];
  };

//add a product with addeventlistener of submit
form.addEventListener("submit", addProduct);

document.addEventListener(("click"),clickHandler);
function clickHandler(e) {
    if (e.target.className.includes("btn-danger")) deleteProduct(e.target); //remove
    if (e.target.className.includes("increase")) increaseQuantity(e.target);
    if (e.target.className.includes("decrease")) decreaseQuantity(e.target);
  }



//dunction of addproduct
function addProduct(e) {
  e.preventDefault();
  const nameProduct = document.querySelector("#add-name");
  const priceElement = document.querySelector("#add-price");
  const quantityElement = document.querySelector("#add-quantity");
  const imageElement = document.querySelector("#add-image");

  //create a card element
  /* const productCard = document.createElement("div");
  productCard.className = "card d-flex flex-row m-3 shadow";
  productCard.style.maxWidth = "390px"; */
  const productPrice = priceElement.value * 0.7;
  //create a product object that has all its keys in order to access them easily
  //throught the product itself inside the array of the cart
  const product = {
    //creating a random id for each product
    id: Date.now(), // to creat a random adate , to have differant id 
    name: nameProduct.value,
    originalPrice: priceElement.value,
    salePrice: productPrice.toFixed(2),
    image: imageElement.value,
    qty: quantityElement.value,
    totalPrice: Number(quantityElement.value) * Number(productPrice),
  };
  //putting this product in our array

  cart.unshift(product);
  //Adding inner html inside the card
 
  //we are setting the cart array with the products each time the use inputs a product
  localStorage.setItem("cart", JSON.stringify(cart));

 //invoking display cart to display the Dom
  displayCart();
  calculateTotal();
  form.reset();
}
function displayCart() {
    const productPanel = document.querySelector("#product-panel");
    productPanel.innerHTML = "";
    //loop over the cart to display each product on the Dom
    const html = cart
      .map(
        (product) =>
          ` <div class="card d-flex flex-row m-3 shadow bg-light"
        style="max-width: 390px;" id=${product.id}> <img
    src="${product.image}"
    class="img-fluid w-50"
  />
  <div class="product details w-100 my-1">
    <h6>${product.name}</h6>
    <h3 class="text-warning">
      $ ${product.salePrice}<small
        class="text-decoration-line-through fs-6 text-dark"
        >${product.originalPrice}</small
      >
    </h3>
    <div
      class="d-flex bg-white border border-2 justify-content-center p-2 m-1"
    >
      <button class="btn btn-secondary btn-sm decrease">-</button>
      <input
        type="text"
        class="form-control border-0 bg-white quantity"
        style="width: 50px"
        readonly
        value="${product.qty}"
      />
      <button class="btn btn-secondary btn-sm increase">+</button>
    </div>
    <div class="d-grid m-1">
      <button class="btn btn-danger">
        <i class="fa-solid fa-trash p-1"></i>Remove
      </button>
    </div>
    <p class="m-1">
      product total:<span id="product-total" class="fs-6 fw-bold"
        >$${Number(product.totalPrice.toFixed(2) )}</span
      >
    </p>
  </div></div>`
      )
      .join("");
    //append child is only working with nodes only
    productPanel.innerHTML = html;
    //append takes strings and nodes
    
  }
    

//decrease quantity
//increase quantity
//remove the product

function decreaseQuantity(el) {
    //id of the product
    const parentId = Number(el.parentElement.parentElement.parentElement.id);
    //finding the product of this id
    const product = cart.find((item) => item.id == parentId);
    //decrease its quantity
    product.qty = Number(product.qty) - 1;
    if (product.qty === 0) {
      const answer = confirm("do you want to remove this product?");
      if (answer) {
        deleteProduct(el);
        return;
      } else {
        product.qty = 1;
      }
      //true or false
    }
    //if true
    //calculate the totalprice of it
    product.totalPrice = Number(product.qty) * Number(product.salePrice);
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
    calculateTotal();
  }
   
  //increase quantity
  function increaseQuantity(el) {
    const parentId = Number(el.parentElement.parentElement.parentElement.id);
    const product = cart.find((item) => item.id == parentId);
    //increase its quantity
    product.qty = Number(product.qty) + 1;
    //calculate the totalprice of it
    product.totalPrice = Number(product.qty) * Number(product.salePrice);
    displayCart();
    calculateTotal();
  }

  //remove the product
  function deleteProduct(el) {
    const parentId = Number(el.parentElement.parentElement.parentElement.id);
    cart = cart.filter((prod) => prod.id !== parentId);
    displayCart();
    calculateTotal();
  }
  
//calculate total
function calculateTotal(){
    const shippingElement = document.querySelector(".shipping");
    const taxesElement = document.querySelector(".tax");
    const subtotalElement = document.querySelector(".subtotal");
    const totalElement = document.querySelector(".total");
   /*  const shipping =15; */
   const shipping = cart.length >= 1 ? 15 : 0
    const taxes =0.18 ;
    //calculate the taxes based on the total
    const subtotal = cart.reduce((acc,item)=>acc + Number(item.totalPrice),0)
    const taxAmount =subtotal *taxes;
    const total = taxAmount + shipping + subtotal;
    shippingElement.textContent = subtotal ? shipping :0 ;
    subtotalElement.textContent =subtotal.toFixed(2);
    totalElement.textContent =total.toFixed(2);
    taxesElement.textContent =taxAmount.toFixed(2);

}
 // when i open the window
 window.addEventListener("DOMContentLoaded", () => {
    bringfromStorage();
    displayCart();
    calculateTotal();
  });
  