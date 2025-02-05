// Get the category from the URL
const urlParams = new URLSearchParams(window.location.search);
const myCategory = urlParams.get("category");


const productList = document.querySelector(".container");
const categoryTitle = document.querySelector(".category-title");

// Set the category title if available
if (myCategory) {
    categoryTitle.textContent = `Category: ${myCategory}`;
}

// Fetch products from API
fetch(`https://kea-alt-del.dk/t7/api/products?category=${myCategory}`)
    .then(response => response.json())
    .then(data => {
        console.log("Fetched data:", data); 
        showProductList(data);
    })
    .catch(error => console.error("Error fetching data:", error));

// Function to generate HTML for each product and display it
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
            <p class="price">DKK <span>${product.price}</span></p>
            
            ${product.discount ? `
                <div class="discounted">
                    <p>NOW DKK <span>${Math.floor(product.price - (product.price * product.discount) / 100)}</span></p>
                    <p><span>${product.discount}% OFF</span></p>
                </div>` 
            : ""}
            
            ${product.soldout ? `<div class="soldout-label">Sold Out</div>` 
            : `<a href="produkt.html?produktId=${product.id}" class="buy-button">KØB</a>`}
        </article>
    `).join(""); 
    productList.innerHTML = markup;
}
