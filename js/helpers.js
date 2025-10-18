//localStorage a kayit yapma
const saveToLocal = (key, data) => {
  //verileri anahtar deger iliskisi ile kaydet
  localStorage.setItem(key, JSON.stringify(data));
};

//localStorage dan almak
const getFromLocale = (key) => {
  //gelen veriyi al ve JSON"a cevir
  return JSON.parse(localStorage.getItem(key)) || [];
};

//toplam urun miktarini hesaplayan fonksiyon
const calculateTotalQuantity = (cart) => {
  //reduce fonksiyonu ile
  const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);

  return totalQuantity;
};

const calculateTotalPrice = (cart) => {
  const cartItemsAmount = cart.reduce(
    (total, product) => total + product.quantity * product.price,
    0
  );

  let totalAmount;

  if (cartItemsAmount < 500) {
    totalAmount = cartItemsAmount + 100;
  } else {
    totalAmount = cartItemsAmount;
  }
  console.log('totalAmount:', totalAmount);
  return totalAmount;
};

export {
  saveToLocal,
  getFromLocale,
  calculateTotalQuantity,
  calculateTotalPrice,
};
