const fetchProducts = async () => {
  try {
  const response = await fetch('/db.json');


    const result = await response.json();

    console.log('result', result);

    return result.products;
  } catch (err) {
    alert(err);
    return [];
  }
};

export default fetchProducts;
