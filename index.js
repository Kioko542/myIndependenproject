document.addEventListener('DOMContentLoaded', function () {
  const toggleButton = document.getElementById('toggle-button');
  const mobileMenu = document.getElementById('mobile-menu');

  toggleButton.addEventListener('click', () => {
      mobileMenu.classList.toggle('active');
  });

  const categoriesContainer = document.querySelector('.categories');
  const productsContainer = document.querySelector('.products');
  const cartItemsContainer = document.getElementById('cart-items');

  let cart = [];

  // Fetch product categories from the Fake Store API
  fetch('https://fakestoreapi.com/products/categories')
      .then(response => response.json())
      .then(data => {
          displayCategories(data);
      })
      .catch(error => {
          console.error('Failed to fetch product categories:', error);
      });

  // Fetch products from the Fake Store API based on the selected category
  function fetchProducts(category) {
      fetch(`https://fakestoreapi.com/products/category/${category}`)
          .then(response => response.json())
          .then(data => {
              displayProducts(data);
          })
          .catch(error => {
              console.error('Failed to fetch products:', error);
          });
  }

  // Display product categories
  function displayCategories(categories) {
      categoriesContainer.innerHTML = '';
      categories.forEach(category => {
          const categoryButton = document.createElement('button');
          categoryButton.innerText = category;
          categoryButton.addEventListener('click', () => {
              fetchProducts(category);
          });
          categoriesContainer.appendChild(categoryButton);
      });
  }

  // Display products in the products container
  function displayProducts(products) {
      productsContainer.innerHTML = '';
      products.forEach(product => {
          const productCard = document.createElement('div');
          productCard.classList.add('product-card');
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
              <button onclick="addToCart(${product.id})">Add to Cart</button>
          `;
          productsContainer.appendChild(productCard);
      });
  }

  // Add a product to the cart
  function addToCart(productId) {
      const productCard = productsContainer.querySelector(`.product-card[data-id="${productId}"]`);
      const title = productCard.querySelector('h3').innerText;
      const price = parseFloat(productCard.querySelector('p').innerText.split('$')[1]);
      const quantity = parseInt(productCard.querySelector('.quantity').value);
      const color = productCard.querySelector('.color').value;

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

  // Update the cart display
  function updateCartDisplay() {
      cartItemsContainer.innerHTML = '';
      cart.forEach(item => {
          const cartItem = document.createElement('li');
          cartItem.innerHTML = `
              <p>${item.title} (Color: ${item.color}) - Quantity: ${item.quantity}</p>
              <p>Total Price: $${item.price * item.quantity}</p>
          `;
          cartItemsContainer.appendChild(cartItem);
      });
  }
});
