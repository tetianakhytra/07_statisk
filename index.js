let listContainer = document.querySelector(".kategory");

fetch("https://kea-alt-del.dk/t7/api/categories")
  .then((response) => response.json())
  .then(showCategori)
  .catch((error) => console.error("Error fetching categories:", error));

function showCategori(data) {
  console.log("mine data er:", data);

  const markup = data
    .map(
      (element) => `
        <div class="kategory_item"> 
          <a href="produkt_liste.html?category=${element.category}">${element.category}</a>
        </div>`
    )
    .join("");

    
    listContainer.innerHTML = markup;
 
}
