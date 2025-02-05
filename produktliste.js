// Get the category from the URL
const urlParams = new URLSearchParams(window.location.search);
const myCategory = urlParams.get("category");


const productList = document.querySelector(".container");
const categoryTitle = document.querySelector(".category-title");


if (myCategory) {
    categoryTitle.textContent = `Categories / ${myCategory}`;
}


fetch(`https://kea-alt-del.dk/t7/api/products?category=${myCategory}`)
    .then(response => response.json())
    .then(data => {
        console.log("Fetched data:", data); 
        showProductList(data);
    })
    .catch(error => console.error("Error fetching data:", error));


function showProductList(products) {
    if (products.length === 0) {
        productList.innerHTML = "<p>No products found for this category.</p>";
        return;
    }

   
    const markup = products.map(product => `
        <article class="smallProduct ${product.discount ? "onSale" : ""} ${product.soldout ? "soldout" : ""}">
        
            <img src="https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp" 
                 alt="${product.productdisplayname}">
            <h3>${product.productdisplayname}</h3>
            <p class="subtle">${product.articletype} | ${product.brandname}</p>
            <p class="price">${product.price} kr</p>
            
            ${product.discount ? `
                <div class="discounted">
                  <p class="discount">${product.discount}% OFF</p>
                </div>
                    <p class="now">NOW: ${Math.floor(product.price - (product.price * product.discount) / 100)} kr</p>
                  ` 
            : ""}
            
            ${product.soldout ? `<div class="soldout-label">Sold Out</div>` 
            : `<a class="buy" href="produkt.html?produktId=${product.id}">Read more</a>`}
        </article>
    `).join(""); 
    productList.innerHTML = markup;
}
