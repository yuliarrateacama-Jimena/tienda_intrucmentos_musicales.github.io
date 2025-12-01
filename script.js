// Sonido
let soundEnabled = false;
const soundToggle = document.getElementById('soundToggle');
const clickSound = new Audio('./material/music/audio2.mp3'); // o audio2.mp3

soundToggle.onclick = () => {
  soundEnabled = !soundEnabled;
  soundToggle.textContent = soundEnabled ? '🔊' : '🔇';
  playSound();
};

function playSound() {
  if (soundEnabled) {
    clickSound.currentTime = 0;
    clickSound.play();
  }
}

// Resaltar página actual
document.querySelectorAll('.nav-links a').forEach(link => {
  if (link.href === window.location.href) {
    link.classList.add('active');
  }
});


// === CARRITO ===
const cartIcon = document.getElementById('cartIcon');
const cartSidebar = document.getElementById('cartSidebar');
const closeCart = document.getElementById('closeCart');
const cartItems = document.getElementById('cartItems');
const cartCount = document.getElementById('cartCount');
const cartTotal = document.getElementById('cartTotal');

let cart = JSON.parse(localStorage.getItem('melodox_cart')) || [];
updateCart();

cartIcon.onclick = () => {
  cartSidebar.classList.toggle('open');
  playSound();
};

closeCart.onclick = () => {
  cartSidebar.classList.remove('open');
  playSound();
};

// Añadir al carrito 
window.addToCart = (name, price, icon) => {
  cart.push({ name, price, icon });
  localStorage.setItem('melodox_cart', JSON.stringify(cart));
  updateCart();
  playSound();
  alert(`${name} agregado al carrito`);
};

function removeFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem('melodox_cart', JSON.stringify(cart));
  updateCart();
  playSound();
}

function updateCart() {
  cartItems.innerHTML = '';
  let total = 0;
  cart.forEach((item, i) => {
    total += item.price;
    const div = document.createElement('div');
    div.className = 'cart-item';
    div.innerHTML = `
      <div><span style="font-size:1.5rem;">${item.icon}</span> ${item.name}</div>
      <div style="display:flex; align-items:center; gap:0.5rem;">
        <span>S/ ${item.price}</span>
        <button class="remove-item" onclick="removeFromCart(${i})">×</button>
      </div>
    `;
    cartItems.appendChild(div);
  });
  cartCount.textContent = cart.length;
  cartTotal.textContent = total;
}
// === MODAL LOGIN ===
const authBtn = document.getElementById('authBtn');
const authModal = document.getElementById('authModal');
const closeModal = document.getElementById('closeModal');
const loginSubmit = document.getElementById('loginSubmit');
const registerSubmit = document.getElementById('registerSubmit');
const authError = document.getElementById('authError');
const authSuccess = document.getElementById('authSuccess');

// Usuarios (almacenados en localStorage)
let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [
  { username: 'admin', email: 'admin@example.com', password: 'admin123', role: 'admin' },
  { username: 'user', email: 'user@example.com', password: 'user123', role: 'user' }
];

function guardarUsuarios() {
  localStorage.setItem('usuarios', JSON.stringify(usuarios));
}

// Abrir modal
authBtn.onclick = () => {
  authModal.style.display = 'flex';
  
};

// Cerrar modal
closeModal.onclick = () => {
  authModal.style.display = 'none';
};
window.onclick = (e) => {
  if (e.target === authModal) authModal.style.display = 'none';
};

// Tabs (cambiar entre login y registro)
document.querySelectorAll('.tab').forEach(tab => {
  tab.onclick = () => {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const target = tab.getAttribute('data-tab');
    document.getElementById('loginForm').style.display = target === 'login' ? 'block' : 'none';
    document.getElementById('registerForm').style.display = target === 'register' ? 'block' : 'none';
    // playSound();
  };
});

// Evento de login
loginSubmit.onclick = (e) => {
  e.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const user = usuarios.find(u => u.username === username && u.password === password);
  if (user) {
    localStorage.setItem('session', JSON.stringify({ username: user.username, role: user.role }));
    authModal.style.display = 'none';
    if (user.role === 'admin') {
      window.location.href = 'admin.html';  // Redirige a la página de gestión
    } else {
      alert('Bienvenido, usuario normal.');  // Queda en la página actual
      window.location.reload();  // Recarga para actualizar el botón a "Logout"
    }
  } else {
    authError.textContent = 'Usuario o contraseña incorrectos.';
  }
};

// Evento de registro (solo rol 'user')
registerSubmit.onclick = (e) => {
  e.preventDefault();
  const username = document.getElementById('regUsername').value;
  const email = document.getElementById('regEmail').value;
  const password = document.getElementById('regPassword').value;
  if (usuarios.find(u => u.username === username || u.email === email)) {
    authError.textContent = 'Usuario o email ya existe.';
    return;
  }
  usuarios.push({ username, email, password, role: 'user' });
  guardarUsuarios();
  authSuccess.textContent = 'Registro exitoso. Inicia sesión.';
};

// Verificar sesión al cargar la página
const session = JSON.parse(localStorage.getItem('session'));

if (session && session.role) {

  authBtn.textContent = 'Logout';
  authBtn.onclick = () => {
    localStorage.removeItem('session');
    window.location.href = 'index.html?logout=1'; // evita redirección inmediata
  };

  // SI ESTA CERRANDO SESIÓN (logout=1) NO REDIRIGIR
  const urlParams = new URLSearchParams(window.location.search);
  if (!urlParams.has('logout')) {

      // Redirigir al admin SOLO si está logueado y no está ya en admin.html
      if (session.role === 'admin' && !window.location.pathname.includes('admin.html')) {
          window.location.href = 'admin.html';
      }
  }

} else {
  authBtn.textContent = 'Login';
}
 
///////////


// 

// =====Tabs
document.querySelectorAll('.tab').forEach(tab => {
  tab.onclick = () => {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const target = tab.getAttribute('data-tab');
    document.getElementById('loginForm').style.display = target === 'login' ? 'block' : 'none';
    document.getElementById('registerForm').style.display = target === 'register' ? 'block' : 'none';
    playSound();
  };
});

// Carrusel de imágenes
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-slide');
if (slides.length > 0) {
  setInterval(() => {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
  }, 4000);
}

// Filtros de productos
function filterProducts() {
  const search = document.getElementById('searchInput')?.value.toLowerCase() || '';
  const category = document.getElementById('categoryFilter')?.value || '';
  const maxPrice = document.getElementById('priceFilter')?.value || Infinity;

  document.querySelectorAll('.product-card').forEach(card => {
    const name = card.getAttribute('data-name').toLowerCase();
    const cat = card.getAttribute('data-category');
    const price = parseInt(card.getAttribute('data-price'));

    const matchesSearch = name.includes(search);
    const matchesCategory = !category || cat === category;
    const matchesPrice = price <= maxPrice;

    card.style.display = (matchesSearch && matchesCategory && matchesPrice) ? 'block' : 'none';
  });
}

// ofertas.html
window.addToCart = (name, price, icon) => {
  cart.push({ name, price, icon });
  localStorage.setItem('melodox_cart', JSON.stringify(cart));
  updateCart();
  playSound();
  alert(`✅ ${name} agregado al carrito por S/ ${price}`);
};
//COMPROBAR COMPRA
function goToCheckout() {
  document.getElementById('cartSidebar').style.display = 'none';
  window.location.href = 'checkout.html';
}

function nextStep(step) {
  document.querySelectorAll('.step-content').forEach(el => el.style.display = 'none');
  document.getElementById('step' + step).style.display = 'block';
  document.querySelectorAll('.step').forEach(s => s.classList.remove('active'));
  document.querySelector(`.step[data-step="${step}"]`).classList.add('active');
}


