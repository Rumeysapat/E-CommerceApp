import { saveToLocal, getFromLocale } from './helpers.js';
import {
  renderCartItems,
  renderCartQuantity,
  renderCartTotal,
  renderNotFound,
} from './ui.js';

//localden sepete eklenen urunleri al "cart" olarak kaydettik ve oyle almamiz lazim
let cart = getFromLocale('cart'); // dizi

//sepete urun ekleyecek fonksiyon
const addToCart = (e, products) => {
  //sepete eklenen urunu tespit et
  console.log('alan 1', e.target.dataset.id);
  const productId = +e.target.dataset.id;
  console.log('alan 2');
  //id ye gore product i bul
  const foundProduct = products.find((product) => product.id === productId);
  //simdi urun var mi diye bak
  const existingProduct = cart.find((item) => item.id === productId);
  if (existingProduct) {
    //eger urun local de varsa
    existingProduct.quantity++;
  } else {
    const cartItem = {
      ...foundProduct,
      quantity: 1,
    };
    cart.push(cartItem);
  }
  //local e kaydet
  saveToLocal('cart', cart);
  e.target.textContent = 'Added';
  setTimeout(() => {
    e.target.textContent = 'Add to Cart';
  }, 1000);
  //karti burda render et, header icindeki icon miktari guncelle
  renderCartQuantity(cart);
};

//sepetten eleman kaldiracak
const removeFromCart = (e) => {
  //kullanicidan silmek icin onay iste
  const reponse = confirm('silmek istedigine emin misin?');

  if (reponse) {
    //tiklanilan urunun id sini al
    const productId = Number(e.target.dataset.id);
    console.log('productId: ', productId);

    //kaldirilan id haric digerlerini cart dizime ekle/guncelle
    cart = cart.filter((item) => item.id !== productId);

    console.log('productId cart: ', cart);

    //urunu local e kaydet
    saveToLocal('cart', cart);

    //sepeteki toplam fiyati guncelle
    renderCartTotal(cart);

    if (cart.length > 0) {
      //ekrani guncelle
      console.log('ekrani guncelle');
      renderCartItems(cart);
    } else {
      //ekrani kart yok diye guncelle
      console.log('ekrani yok');

      renderNotFound();
    }
  }

  //header alanindaki toplam urun miktarini da guncelle
  renderCartQuantity(cart);
};

//sepetteki urun miktari guncellenirse
const onQuantityChange = (e) => {
  //elemanin id sini bul
  const productId = parseInt(e.target.dataset.id); // 1 1 1 1 2

  //guncellenecek elanin guncel degerine eris 6 5 4 5 2
  const newQuantity = parseInt(e.target.value);

  //anlik deger 0 dan buyukse
  if (newQuantity > 0) {
    //once ilgili id li elemani
    const updateItem = cart.find((item) => item.id === productId);

    //urun miktarini guncelle
    updateItem.quantity = newQuantity;

    //local i guncelle
    saveToLocal('cart', cart);

    //sepeti guncelle
    renderCartTotal(cart);

    //header daki toplam eleman sayisini guncelle
    renderCartQuantity(cart);
  } else {
    alert('0 dan buyuk olmali miktar');
    return;
  }
};

export { addToCart, removeFromCart, onQuantityChange };
