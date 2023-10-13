document.addEventListener('DOMContentLoaded', function() {
  const toggleButton = document.getElementById('toggle-button');
  const mobileMenu = document.getElementById('mobile-menu');

  toggleButton.addEventListener('click', () => {
      mobileMenu.classList.toggle('active');
  });
});



// fetch(' https://api.escuelajs.co/api/v1/products')
//             .then(res=>res.json())
//             .then(json=>console.log(json))