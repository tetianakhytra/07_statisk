const category = "Apparel"; 
let listContainer = document.querySelector(".container");

fetch(`https://kea-alt-del.dk/t7/api/products?limit=100`)
  .then((response) => response.json())
  .then(showLProductList);

function showLProductList(data) {
  console.log(data);

  const markup = data
    .map((product) => `
      <div class="card">
        <h2>${product.productdisplayname}</h2>
        <img src="https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp" alt="clothes">   
        <p class="produkt_pris">${product.price} kr</p>  
        <a href="produkt.html">KØB</a>
      </div>`)
    .join("");
    listContainer.innerHTML = markup;

}
