import fetchProducts from './api.js';
import { addToCart } from './cart.js';
import { getFromLocale } from './helpers.js';
import {
  renderCartItems,
  renderCartQuantity,
  renderCartTotal,
  renderNotFound,
  renderProduct,
  uiElements,
} from './ui.js';

//ekran yuklendiginde html kismi
document.addEventListener('DOMContentLoaded', async () => {
  //menuBtn ile ac kapa
  uiElements.menuBtn.addEventListener('click', () => {
    //uielement icerisindeki nav elemanina class ekle cikar
    uiElements.nav.classList.toggle('open');
  });

  //localstorage dan sepete eklenen urunleri al
  let cart = getFromLocale('cart');

  //Header daki toplam iconu guncelle
  renderCartQuantity(cart);

const products = await fetchProducts();
console.log('products ', products);



    //alinan urunleri render et
    renderProduct(products, (e) => {
      addToCart(e, products);
    });
  } else {
    if (cart.length > 0) {
      console.log('alan 3');
      //sepetteki urun miktari 0 dan fazla ise sepet alanini calistir
      renderCartItems(cart);

      //urun toplam maliyeti yaz
      renderCartTotal(cart);
    } else {
      //urun yoksa, yok goster
      renderNotFound();
    }
  }
});
