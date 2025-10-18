import { onQuantityChange, removeFromCart } from './cart.js';
import { calculateTotalPrice, calculateTotalQuantity } from './helpers.js';

//ui icindeki elementlere eris
const uiElements = {
  menuBtn: document.querySelector('#menu-btn'),
  nav: document.querySelector('nav'),
  productsList: document.querySelector('#products-list'),
  cartItems: document.querySelector('.cart-items'),
  cartQuantity: document.querySelector('#basket-btn'),
  totalAmount: document.querySelector('.cart-total'),
};

//APiden alanin urunler icin birer html render et
const renderProduct = (products, callBackFunction) => {
  //tum elemanlar icin sirasi ile html olustur ve ekle
  console.log('renderProduct, ', products);
  const productsHtml = products
    .map(
      (product) => `  <div class="product">

          <img
            src="${product.image}"
            alt="${product.title}"
          />


          <div class="product-info">
            <h2>${product.title}</h2>

            <p>$${product.price.toFixed(2)}</p>

            <button class="add-to-cart" data-id="${
              product.id
            }"  >Add to cart</button>
          </div>
        </div>`
    )
    .join('');

  //olusturulan html i productList adli div e ekle gorunsun
  uiElements.productsList.innerHTML = productsHtml;

  //addToCart butonu olustu ve eklendi ve simdi ulasabiliriz
  const addToCartButtons = document.querySelectorAll('.add-to-cart');

  //tum butonlara eris ve callback ile ilgili yere click olmasini haber et
  addToCartButtons.forEach((button) => {
    button.addEventListener('click', callBackFunction);
  });
};

//sepetteki urunleri renderlayan
const renderCartItems = (cart) => {
  //cart = sepet, elemanlarini map ile gon yeni bir html icerigi ver
  const cartItemsHtml = cart
    .map(
      (item) => `  <div class="cart-item">

            <img
              src="${item.image}"
              alt="cart-item-image"
            />


            <div class="cart-item-info">
              <h2 class="cart-item-title">${item.title}</h2>

              <input
                type="number"
                min="1"
                value="${item.quantity}"
                class="cart-item-quantity"
                data-id='${item.id}'
              />
            </div>


            <h3 class="cart-item-price">$${item.price}</h3>


            <button class="remove-button" data-id='${item.id}'>Remove</button>
          </div>`
    )
    .join('');

  //olusturulan bu html yi arayuze ekle
  uiElements.cartItems.innerHTML = cartItemsHtml;

  //remove butona tiklanirsa
  const removeButtons = document.querySelectorAll('.remove-button');

  //butonlara gec
  removeButtons.forEach((button) => {
    //her biri eger tiklanirsa
    button.addEventListener('click', (e) => {
      //ekran da ve veri tabaninda kaldir
      removeFromCart(e);
    });
  });

  //azaltma arttirma durumuna erisme
  const quantityInputs = document.querySelectorAll('.cart-item-quantity');

  //tum inpitlari gez
  quantityInputs.forEach((input) => {
    //uzerinde islem yapilmasi
    input.addEventListener('change', (e) => {
      //elemandaki degisimi fonksiyona bildir
      onQuantityChange(e);
    });
  });
};

//sepette urun yoksa uyari ver
const renderNotFound = () => {
  uiElements.cartItems.innerHTML = `
<div class="cookieCard">
  <h1 class="cookieHeading">No items found in cart</h1>
  <p class="cookieDescription">Go to home page to add items to your cart</p>
  <div>
  <a href='../index.html' class="acceptButton">Go to home page</a>
  </div>
</div>
`;
};

//sepetteki sayiya gore icon yanindaki sayiyi guncelle
const renderCartQuantity = (cart) => {
  //toplam sayiyi bul
  const totalQuantity = calculateTotalQuantity(cart);

  console.log('totalQuantity: ', totalQuantity);
  //cdn den aldigimiz basket iconu sayisini guncelle
  uiElements.cartQuantity.setAttribute('data-quantity', totalQuantity);
};

//sepetin toplam fiyatini render et
const renderCartTotal = (cart) => {
  //toplam fiyati getir
  const totalCartAmount = calculateTotalPrice(cart);
  console.log('totalCartAmount: ', totalCartAmount);

  uiElements.totalAmount.innerText = `$ ${totalCartAmount.toFixed(2)}`;
};

export {
  uiElements,
  renderProduct,
  renderCartItems,
  renderNotFound,
  renderCartQuantity,
  renderCartTotal,
};
