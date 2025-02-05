let produktContainer = document.querySelector(".produkt_container");

const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("produktId");

if (productId) {
  fetch(`https://kea-alt-del.dk/t7/api/products/${productId}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      const discountHTML = data.discount > 0 
        ? `<div class="discount">-${data.discount}%</div>` 
        : "";

      // Calculate final price after discount
      let finalPrice = data.price;
      if (data.discount > 0) {
        finalPrice = (data.price * (1 - data.discount / 100)).toFixed(2);
      }

      produktContainer.innerHTML = `
        <div class="produkt_img">
          <img src="https://kea-alt-del.dk/t7/images/webp/640/${productId}.webp" alt="${data.productdisplayname}">
        </div>

        <div class="produkt_info">
          <h2>Produkt information</h2>
        
          <p><strong>Brand name:</strong> ${data.brandname}</p>
          <p><strong>Model name:</strong> ${data.productdisplayname}</p>
          <p><strong>Gender:</strong> ${data.gender}</p>
          <p><strong>Season:</strong> ${data.season}</p>

          ${
            data.discount > 0 
              ? `<p><strong>Original Price:</strong> <span style="text-decoration: line-through; color: red;">${data.price} kr</span></p>
                 <p><strong>Discounted Price:</strong> <span class="now">${finalPrice} kr</span></p>`
              : `<p><strong>Price:</strong> ${data.price} kr</p>`
          }
        </div>

        <div>
          <label for="size">Choose a size</label>
          <select id="size">
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
          </select>

          <button class="add_to_basket">Add to basket</button>
        </div>
      `;
    })
    .catch((error) => console.error("Error fetching product:", error));
} else {
  produktContainer.innerHTML = "<p>Product not found.</p>";
}
