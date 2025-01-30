let produktContainer = document.querySelector(".produkt_container");
const productId = 1525;

fetch(`https://kea-alt-del.dk/t7/api/products/${productId}`)
  .then((response) => response.json())
  .then((data) => {
    const discount = data.discount || false; // Ensuring discount is defined

    produktContainer.innerHTML = `
      <div class="produkt_img">
        <img src="https://kea-alt-del.dk/t7/images/webp/640/${productId}.webp" alt="clothes">
      </div>

      <div class="produkt_info">
        <h2>Produkt information</h2>
         <p><strong>Brand name:</strong> ${data.brandname}</p>
        <p><strong>Model name:</strong> ${data.productdisplayname}</p>
        <p><strong>Gender:</strong> ${data.gender}</p>
        <p><strong>Season:</strong> ${data.season}</p>
        <p><strong>Pris:</strong> ${data.price} kr</p>
     

      <h2 class="brand">Description</h2>
      <p>Praktisk og stilfuld rygsæk fra Puma, perfekt til både skole, arbejde eller sport. 
      Designet med rummelige lommer og et moderne look. Komfortable skulderstopper sikrer 
      optimal bærekomfort hele dagen.</p> </div>


      <div>
      <label for="size">Choose a size</label>
      <select id="size">
        <option value="S">S</option>
        <option value="M">M</option>
        <option value="L">L</option>
      </select>
      
      <button class="add_to_basket">Add to basket</button> </div>
    `;
  })
  .catch((error) => console.error("Error fetching product:", error));

// Corrected myFetch function
function myFetch() {
  fetch("https://kea-alt-del.dk/t7/api/products/1125")
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.error("Error fetching product:", error));
}
