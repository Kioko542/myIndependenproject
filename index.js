document.addEventListener("DOMContentLoaded", function () {
  const emailInput = document.getElementById("email");
  const subscribeButton = document.getElementById("subscribeButton");
  const categoriesContainer = document.querySelector(".categories");
  const productsContainer = document.querySelector(".products");
  const cartItemsContainer = document.getElementById("cart-items");

  subscribeButton.addEventListener("click", function () {
    const email = emailInput.value.trim();
    emailInput.value = "";
    if (validateEmail(email)) {
      alert(`Subscribed with email: ${email}`);
    } else {
      alert("Please enter a valid email address.");
    }
  });

  function validateEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  }

  let cart = [];

  function fetchAndDisplayProducts(category) {
    fetch(`https://fakestoreapi.com/products/category/${category}`)
      .then((response) => response.json())
      .then((data) => {
        displayProducts(data);
        addAddToCartListeners(); // Add event listeners after products are displayed
      })
      .catch((error) => {
        console.error("Failed to fetch products:", error);
      });
  }

  function displayCategories(categories) {
    categoriesContainer.innerHTML = "";
    categories.forEach((category) => {
      const categoryButton = document.createElement("button");
      categoryButton.innerText = category;
      categoryButton.addEventListener("click", () => {
        fetchAndDisplayProducts(category);
      });
      categoriesContainer.appendChild(categoryButton);
    });
  }

  // Display products in the products container as cards
  function displayProducts(products) {
    productsContainer.innerHTML = "";
    products.forEach((product) => {
      const productCard = document.createElement("div");
      productCard.classList.add("product-card");
      productCard.innerHTML = `
        <img src="${product.image}" alt="${product.title}">
        <h3>${product.title}</h3>
        <p>${product.description}</p>
        <p>Price: $${product.price}</p>
        <label for="quantity">Quantity:</label>
        <select class="quantity">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
        <label for="color">Color:</label>
        <input type="text" class="color" placeholder="Enter color">
        <button class="add-to-cart-button" data-id="${product.id}">Add to Cart</button>
      `;
      productsContainer.appendChild(productCard);
    });
  }

  // Add a product to the cart
  function addToCart(productId) {
    const productCard = productsContainer.querySelector(
      `.product-card[data-id="${productId}`
    );
    const title = productCard.querySelector("h3").innerText;
    const price = parseFloat(
      productCard.querySelector("p").innerText.split("$")[1]
    );
    const quantity = parseInt(productCard.querySelector(".quantity").value);
    const color = productCard.querySelector(".color").value;

    const cartItem = {
      id: productId,
      title,
      price,
      quantity,
      color,
    };

    cart.push(cartItem);
    updateCartDisplay();
  }

  function updateCartDisplay() {
    cartItemsContainer.innerHTML = "";
    cart.forEach((item) => {
      const cartItem = document.createElement("li");
      cartItem.innerHTML = `
        <p>${item.title} (Color: ${item.color}) - Quantity: ${item.quantity}</p>
        <p>Total Price: $${item.price * item.quantity}</p>
      `;
      cartItemsContainer.appendChild(cartItem);
    });
  }

  function addAddToCartListeners() {
    const addToCartButtons = document.querySelectorAll(".add-to-cart-button");
    addToCartButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const productId = button.getAttribute("data-id");
        addToCart(productId);
      });
    });
  }

  fetchAndDisplayProducts("electronics");

  fetch("https://fakestoreapi.com/products/categories")
    .then((response) => response.json())
    .then((data) => {
      displayCategories(data);
    })
    .catch((error) => {
      console.error("Failed to fetch product categories:", error);
    });

    const form = document.getElementById("contact");
        form.addEventListener("submit", function (e) {
            e.preventDefault();
            const name = document.getElementById("name").value;
            const email = document.getElementById("email").value;
            const message = document.getElementById("message").value;
email.value=""
            if (name === "" || email === "" || message === "") {
                alert("Please fill in all fields.");
            } else {
                alert("Thank you for your message, " + name + "!");
                // You can also send the form data to a server using AJAX or fetch here.
                form.reset();
            }
        });
  
});
