const mycategori = new URLSearchParams(window.location.search).get("category");
const productList = document.querySelector(".container");
const overskrift = document.querySelector("h2");

// Set heading to the category name
if (mycategori) {
  overskrift.textContent = mycategori;

  // Fetch products for the selected category
  fetch(`https://kea-alt-del.dk/t7/api/products?category=${mycategori}`)
    .then((response) => response.json())
    .then(showLProductList)
    .catch((error) => console.error("Error fetching data:", error));
} else {
  console.error("No category found in URL.");
}

function showLProductList(data) {
  console.log(data);

  const markup = data
    .map((product) => `
      <div class="card">
        <h2>${product.productdisplayname}</h2>
        <img src="https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp" alt="clothes">   
        <p class="produkt_pris">${product.price} kr</p>  
        <a href="produkt.html?product=${product.id}">KØB</a>
      </div>`)
    .join("");

  productList.innerHTML = markup;
}

