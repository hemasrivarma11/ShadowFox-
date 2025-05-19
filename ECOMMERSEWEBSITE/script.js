const allProducts = [
  { name: "Handbag",     price: 22249, category: "Accesorries", image: "https://images-eu.ssl-images-amazon.com/images/I/814iogRTu5L.jpg",                          quantity: 0 },
  { name: "Laptop",      price: 65999, category: "Electronics", image: "https://www.laptopradar.co.uk/wp-content/uploads/2022/08/ASUS-TUF-Gaming-FA506IC.jpg", quantity: 0 },
  { name: "Bracelet",    price: 999,   category: "Accesorries", image: "https://images.bonanzastatic.com/afu/images/875d/bf48/3b10_7566254072/Luxury_Slender_Rose_Gold_Plated_Bracelet_with_Sparkling_Pink_Cubic_Zirconia_Stones3.jpg", quantity: 0 },
  { name: "Smartwatch",  price: 50000, category: "Electronics", image: "https://tse1.mm.bing.net/th?id=OIP.xEZaA7smVXY-OhN64Zjy9QHaIZ&pid=Api&P=0&h=180",         quantity: 0 },
  { name: "Ring",        price: 299,   category: "Accesorries", image: "https://i.pinimg.com/736x/58/01/5e/58015eceef78a48252656cff0b45af8b.jpg",                    quantity: 0 },
  { name: "Saree",       price: 2999,  category: "Clothing",    image: "https://i.pinimg.com/originals/28/1b/67/281b67e4918c8f51b62e4bed4ecf9565.jpg",              quantity: 0 },
  { name: "Raincoat",    price: 2500,  category: "Clothing",    image: "https://i5.walmartimages.com/asr/57fad0ad-3247-433a-9ada-ea677c8bbb28_1.a65332fd581b7472b0089b0e92a20032.jpeg",        quantity: 0 },
  { name: "Smartphone",  price: 74999, category: "Electronics", image: "https://images-eu.ssl-images-amazon.com/images/I/814iogRTu5L.jpg",                          quantity: 0 },
  { name: "Mushrooms",   price: 599,   category: "Grocery",     image: "https://tse1.mm.bing.net/th?id=OIP.gExScguFY3MZNwyhsRbmEAHaFj&pid=Api&P=0&h=180",            quantity: 0 },
  { name: "Table lamp",  price: 2249,  category: "Electronics", image: "https://tse4.mm.bing.net/th?id=OIP.m3zjnf3EF3EJ9FkKykMoigHaIJ&pid=Api&P=0&h=180",          quantity: 0 }
];

let filteredProducts = [];

function showProducts(list) {
  const container = document.getElementById("products");
  container.innerHTML = "";
  list.forEach((p, index) => {
    container.innerHTML += `
      <div class="product">
        <img src="${p.image}" alt="${p.name}">
        <h3>${p.name}</h3>
        <p>₹${p.price}</p>
        <p>${p.category}</p>
        <div class="cart-controls">
          <button onclick="decrease(${index})">−</button>
          <span id="qty-${index}">${p.quantity}</span>
          <button onclick="increase(${index})">+</button>
        </div>
      </div>
    `;
  });
  updateCart();
}

function updateCart() {
  const total = filteredProducts.reduce((sum, p) => sum + p.quantity, 0);
  document.getElementById("cart-count").innerText = total;
}
function increase(index) {
  filteredProducts[index].quantity++;
  document.getElementById(`qty-${index}`).innerText = filteredProducts[index].quantity;
  updateCart();
}

function decrease(index) {
  if (filteredProducts[index].quantity > 0) {
    filteredProducts[index].quantity--;
    document.getElementById(`qty-${index}`).innerText = filteredProducts[index].quantity;
    updateCart();
  }
}

function applyChanges() {
  
  const cat = document.getElementById("filter").value;
  filteredProducts = allProducts.filter(p => cat === "all" || p.category === cat);


  const sort = document.getElementById("sort").value;
  filteredProducts.sort((a, b) => sort === "low" ? a.price - b.price : b.price - a.price);

  showProducts(filteredProducts);
}

function checkout() {
  const totalItems = filteredProducts.reduce((sum, p) => sum + p.quantity, 0);
  const msgEl = document.getElementById("checkout-msg");
  if (totalItems > 0) {
    msgEl.innerText = `✅ You purchased ${totalItems} item(s). Thank you!`;
    
    allProducts.forEach(p => p.quantity = 0);
    applyChanges();
  } else {
    msgEl.innerText = "⚠️ Your cart is empty.";
  }
}


document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("filter").value = "all";
  document.getElementById("sort").value   = "low";
  applyChanges();
});
