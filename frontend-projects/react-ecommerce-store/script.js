/* ============================
   SHWAPNO – MAIN SCRIPT
   ============================ */

'use strict';

/* ============================
   PRODUCT DATA
   ============================ */
const PRODUCTS = {
  recommended: [
    { id: 1, name: 'PRAN Mustard Oil', brand: 'PRAN', qty: '1 Liter', price: 180, oldPrice: 220, discount: 18, emoji: '🫒' },
    { id: 2, name: 'Broiler Chicken Whole', brand: 'Fresh', qty: '1 kg', price: 220, oldPrice: 260, discount: 15, emoji: '🍗' },
    { id: 3, name: 'Farm Fresh Eggs', brand: 'ACI', qty: '12 pcs', price: 145, oldPrice: 165, discount: 12, emoji: '🥚' },
    { id: 4, name: 'Arong Full Cream Milk', brand: 'Arong', qty: '500 ml', price: 85, oldPrice: 95, discount: 10, emoji: '🥛' },
    { id: 5, name: 'Lentil Red (Masur Dal)', brand: 'ACI', qty: '1 kg', price: 130, oldPrice: 150, discount: 13, emoji: '🌾' },
    { id: 6, name: 'Soybean Oil Premium', brand: 'Teer', qty: '2 Liter', price: 295, oldPrice: 340, discount: 13, emoji: '🛢️' },
    { id: 7, name: 'Basmati Rice Extra Long', brand: 'Star', qty: '5 kg', price: 560, oldPrice: 620, discount: 10, emoji: '🍚' },
    { id: 8, name: 'Sugar Refined White', brand: 'BSFC', qty: '1 kg', price: 135, oldPrice: 150, discount: 10, emoji: '🧂' },
  ],
  comfort: [
    { id: 9, name: 'Horlicks Original', brand: 'GlaxoSmith', qty: '500g', price: 320, oldPrice: 380, discount: 16, emoji: '🥤' },
    { id: 10, name: 'Pedigree Dog Food', brand: 'Mars', qty: '400g', price: 480, oldPrice: 540, discount: 11, emoji: '🐾' },
    { id: 11, name: 'Parle-G Biscuits', brand: 'Parle', qty: '800g', price: 110, oldPrice: 130, discount: 15, emoji: '🍪' },
    { id: 12, name: 'Maggi Noodles', brand: 'Nestlé', qty: '420g (6pk)', price: 95, oldPrice: 108, discount: 12, emoji: '🍜' },
    { id: 13, name: 'Sprite Can', brand: 'Coca-Cola', qty: '250 ml', price: 35, oldPrice: 40, discount: 12, emoji: '🥤' },
    { id: 14, name: 'Good Noodles Chicken', brand: 'Pran', qty: '5-pack', price: 75, oldPrice: 85, discount: 12, emoji: '🍜' },
  ],
  trending: [
    { id: 15, name: 'Flour (Maida) Premium', brand: 'Fresh', qty: '2 kg', price: 115, oldPrice: 135, discount: 15, emoji: '🌾' },
    { id: 16, name: 'Green Chili', brand: 'Fresh', qty: '250g', price: 38, oldPrice: 45, discount: 16, emoji: '🌶️' },
    { id: 17, name: 'Pepsi 250ml Can', brand: 'PepsiCo', qty: '250 ml', price: 35, oldPrice: 40, discount: 12, emoji: '🥤' },
    { id: 18, name: 'Yellow Sweet Corn', brand: 'ACI', qty: '400g', price: 78, oldPrice: 90, discount: 13, emoji: '🌽' },
    { id: 19, name: 'PRAN Tomato Ketchup', brand: 'PRAN', qty: '340g', price: 110, oldPrice: 130, discount: 15, emoji: '🍅' },
    { id: 20, name: 'Danish Condensed Milk', brand: 'Danish', qty: '400g', price: 145, oldPrice: 160, discount: 9, emoji: '🥛' },
  ],
  groceryWeek: [
    { id: 21, name: 'Rin Detergent Bar', brand: 'Unilever', qty: '250g x4', price: 90, oldPrice: 110, discount: 18, emoji: '🧼' },
    { id: 22, name: 'Wheel Washing Powder', brand: 'Unilever', qty: '1 kg', price: 115, oldPrice: 135, discount: 15, emoji: '🫧' },
    { id: 23, name: 'Safi Sunflower Oil', brand: 'Safi', qty: '1 Liter', price: 165, oldPrice: 195, discount: 15, emoji: '🌻' },
    { id: 24, name: 'Muri (Puffed Rice)', brand: 'Local', qty: '500g', price: 50, oldPrice: 60, discount: 17, emoji: '🍚' },
    { id: 25, name: 'ACI Salt Iodized', brand: 'ACI', qty: '1 kg', price: 35, oldPrice: 40, discount: 12, emoji: '🧂' },
    { id: 26, name: 'Rooppur Hilsa Fish', brand: 'Fresh', qty: '500g', price: 450, oldPrice: 520, discount: 13, emoji: '🐟' },
  ],
  cleaning: [
    { id: 27, name: 'Vim Dishwash Liquid', brand: 'Unilever', qty: '500 ml', price: 145, oldPrice: 168, discount: 14, emoji: '🧴' },
    { id: 28, name: 'Dettol Toilet Cleaner', brand: 'Dettol', qty: '500 ml', price: 185, oldPrice: 215, discount: 14, emoji: '🚽' },
    { id: 29, name: 'Surf Excel Blue', brand: 'Unilever', qty: '500g', price: 120, oldPrice: 145, discount: 17, emoji: '🫧' },
    { id: 30, name: 'Harpic Power Plus', brand: 'Reckitt', qty: '750 ml', price: 210, oldPrice: 245, discount: 14, emoji: '🧹' },
    { id: 31, name: 'Savlon Handwash', brand: 'ACI', qty: '200 ml', price: 95, oldPrice: 110, discount: 14, emoji: '🧴' },
    { id: 32, name: 'Colin Glass Cleaner', brand: 'SC Johnson', qty: '500 ml', price: 155, oldPrice: 180, discount: 14, emoji: '🪟' },
  ],
  snacks: [
    { id: 33, name: 'Kurkure Masala Munch', brand: 'PepsiCo', qty: '90g', price: 30, oldPrice: 35, discount: 14, emoji: '🍿' },
    { id: 34, name: 'PRAN Chanachur Mix', brand: 'PRAN', qty: '200g', price: 50, oldPrice: 60, discount: 17, emoji: '🌰' },
    { id: 35, name: 'Sunfeast Yippee Noodles', brand: 'ITC', qty: '280g', price: 60, oldPrice: 70, discount: 14, emoji: '🍜' },
    { id: 36, name: 'Lays Classic Salted', brand: 'PepsiCo', qty: '52g', price: 25, oldPrice: 30, discount: 17, emoji: '🥔' },
    { id: 37, name: 'PRAN Mango Juice', brand: 'PRAN', qty: '250 ml', price: 25, oldPrice: 30, discount: 17, emoji: '🥭' },
    { id: 38, name: 'Nabisco Crackers', brand: 'Mondelez', qty: '126g', price: 55, oldPrice: 65, discount: 15, emoji: '🍘' },
  ],
  trendingWeek: [
    { id: 39, name: 'Ginger Fresh', brand: 'Fresh', qty: '250g', price: 45, oldPrice: 55, discount: 18, emoji: '🫚' },
    { id: 40, name: 'Garlic Imported', brand: 'Import', qty: '250g', price: 75, oldPrice: 90, discount: 17, emoji: '🧄' },
    { id: 41, name: 'Turmeric Powder', brand: 'ACI', qty: '200g', price: 65, oldPrice: 78, discount: 17, emoji: '🌿' },
    { id: 42, name: 'Onion Big', brand: 'Local', qty: '1 kg', price: 60, oldPrice: 75, discount: 20, emoji: '🧅' },
    { id: 43, name: 'Potato Deshi', brand: 'Local', qty: '1 kg', price: 45, oldPrice: 55, discount: 18, emoji: '🥔' },
    { id: 44, name: 'Coriander Powder', brand: 'ACI', qty: '100g', price: 40, oldPrice: 48, discount: 17, emoji: '🌿' },
  ],
  featured: [
    { id: 45, name: 'Mustard Oil', brand: 'PRAN', qty: '1L', price: 180, oldPrice: 220, discount: 18, emoji: '🫒' },
    { id: 46, name: 'Soybean Oil', brand: 'Teer', qty: '2L', price: 295, oldPrice: 340, discount: 13, emoji: '🛢️' },
    { id: 47, name: 'Tomato Sauce', brand: 'PRAN', qty: '340g', price: 110, oldPrice: 130, discount: 15, emoji: '🍅' },
    { id: 48, name: 'Basmati Rice', brand: 'Star', qty: '5kg', price: 560, oldPrice: 620, discount: 10, emoji: '🍚' },
  ],
  spice: [
    { id: 49, name: 'Red Chili Powder', brand: 'ACI', qty: '200g', price: 70, oldPrice: 85, discount: 18, emoji: '🌶️' },
    { id: 50, name: 'Cumin Seeds', brand: 'Pure Spice', qty: '100g', price: 55, oldPrice: 65, discount: 15, emoji: '🌾' },
    { id: 51, name: 'Garam Masala', brand: 'ACI', qty: '100g', price: 75, oldPrice: 90, discount: 17, emoji: '✨' },
    { id: 52, name: 'Bay Leaves', brand: 'Fresh', qty: '50g', price: 30, oldPrice: 38, discount: 21, emoji: '🍃' },
    { id: 53, name: 'Cardamom Premium', brand: 'Exotic', qty: '50g', price: 120, oldPrice: 145, discount: 17, emoji: '🌿' },
    { id: 54, name: 'Black Pepper', brand: 'ACI', qty: '100g', price: 80, oldPrice: 96, discount: 17, emoji: '⚫' },
  ],
  selfCare: [
    { id: 55, name: 'Dove Shampoo', brand: 'Unilever', qty: '340 ml', price: 280, oldPrice: 325, discount: 14, emoji: '🚿' },
    { id: 56, name: 'Nivea Face Cream', brand: 'Nivea', qty: '100 ml', price: 360, oldPrice: 420, discount: 14, emoji: '🧴' },
    { id: 57, name: 'Lux Beauty Soap', brand: 'Unilever', qty: '100g x3', price: 115, oldPrice: 135, discount: 15, emoji: '🧼' },
    { id: 58, name: 'Dettol Soap', brand: 'Dettol', qty: '75g x3', price: 125, oldPrice: 145, discount: 14, emoji: '🧼' },
  ],
  happyHours: [
    { id: 59, name: 'Pran Juice Mango', brand: 'PRAN', qty: '1L', price: 80, oldPrice: 100, discount: 20, emoji: '🥭' },
    { id: 60, name: 'Sprite 2L Bottle', brand: 'Coca-Cola', qty: '2 Liter', price: 120, oldPrice: 150, discount: 20, emoji: '🍾' },
    { id: 61, name: 'Frooti Mango Drink', brand: 'Parle Agro', qty: '200ml x6', price: 85, oldPrice: 110, discount: 23, emoji: '🧃' },
    { id: 62, name: 'RC Cola 2L', brand: 'RC', qty: '2 Liter', price: 95, oldPrice: 120, discount: 21, emoji: '🥤' },
  ],
  freshVeg: [
    { id: 63, name: 'Fresh Tomato', brand: 'Local Farm', qty: '500g', price: 35, oldPrice: 45, discount: 22, emoji: '🍅' },
    { id: 64, name: 'Cucumber', brand: 'Local Farm', qty: '500g', price: 28, oldPrice: 35, discount: 20, emoji: '🥒' },
    { id: 65, name: 'Broccoli', brand: 'Organic', qty: '500g', price: 85, oldPrice: 100, discount: 15, emoji: '🥦' },
    { id: 66, name: 'Carrot', brand: 'Local Farm', qty: '500g', price: 42, oldPrice: 52, discount: 19, emoji: '🥕' },
    { id: 67, name: 'Spinach', brand: 'Fresh', qty: '250g', price: 25, oldPrice: 32, discount: 22, emoji: '🥬' },
    { id: 68, name: 'Bell Pepper Mix', brand: 'Organic', qty: '250g', price: 65, oldPrice: 80, discount: 19, emoji: '🫑' },
  ],
  diabetic: [
    { id: 69, name: 'Sugarfree Corn Flakes', brand: 'Kellogg\'s', qty: '500g', price: 320, oldPrice: 375, discount: 15, emoji: '🌽' },
    { id: 70, name: 'Brown Rice', brand: 'Arong', qty: '1 kg', price: 145, oldPrice: 170, discount: 15, emoji: '🌾' },
    { id: 71, name: 'Diabetic Atta Flour', brand: 'Bonn', qty: '1 kg', price: 185, oldPrice: 215, discount: 14, emoji: '🫓' },
    { id: 72, name: 'Oats Rolled', brand: 'Quaker', qty: '500g', price: 195, oldPrice: 230, discount: 15, emoji: '🥣' },
  ],
};

/* ============================
   CART STATE
   ============================ */
let cartItems = {};
let wishlistItems = new Set();

/* ============================
   RENDER PRODUCT CARD
   ============================ */
function renderCard(product, container) {
  const inCart = cartItems[product.id] || 0;
  const isWished = wishlistItems.has(product.id);

  const card = document.createElement('div');
  card.className = 'product-card section-fade';
  card.dataset.id = product.id;
  card.innerHTML = `
    <div class="discount-badge">-${product.discount}%</div>
    <div class="img-wrap">
      <span>${product.emoji}</span>
      <button class="wishlist-btn ${isWished ? 'active' : ''}" data-id="${product.id}" aria-label="Wishlist">
        <i class="fa${isWished ? 's' : 'r'} fa-heart"></i>
      </button>
    </div>
    <div class="card-body">
      <div class="product-brand">${product.brand}</div>
      <div class="product-name">${product.name}</div>
      <div class="product-qty">${product.qty}</div>
      <div class="price-row">
        <span class="price-now">৳${product.price}</span>
        <span class="price-old">৳${product.oldPrice}</span>
      </div>
      ${inCart === 0 ? `
        <button class="add-btn" data-id="${product.id}">
          <i class="fa fa-plus"></i> Add
        </button>
      ` : ''}
      <div class="qty-control ${inCart > 0 ? 'visible' : ''}" data-id="${product.id}">
        <button class="qty-dec" data-id="${product.id}">−</button>
        <span class="qty-num" data-id="${product.id}">${inCart}</span>
        <button class="qty-inc" data-id="${product.id}">+</button>
      </div>
    </div>
  `;

  container.appendChild(card);
}

function renderGrid(key, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = '';
  PRODUCTS[key].forEach(p => renderCard(p, container));
  observeSections();
}

/* ============================
   RENDER ALL GRIDS
   ============================ */
function initGrids() {
  renderGrid('recommended', 'recommendedGrid');
  renderGrid('comfort', 'comfortGrid');
  renderGrid('trending', 'trendingGrid');
  renderGrid('groceryWeek', 'groceryWeekGrid');
  renderGrid('cleaning', 'cleaningGrid');
  renderGrid('snacks', 'snacksGrid');
  renderGrid('trendingWeek', 'trendingWeekGrid');
  renderGrid('featured', 'featuredRow');
  renderGrid('spice', 'spiceGrid');
  renderGrid('selfCare', 'selfCareGrid');
  renderGrid('happyHours', 'happyHoursGrid');
  renderGrid('freshVeg', 'freshVegGrid');
  renderGrid('diabetic', 'diabeticGrid');
}

/* ============================
   CART LOGIC (EVENT DELEGATION)
   ============================ */
document.addEventListener('click', (e) => {
  // Add button
  const addBtn = e.target.closest('.add-btn');
  if (addBtn) {
    const id = parseInt(addBtn.dataset.id);
    cartItems[id] = 1;
    updateCard(id);
    updateCartBadge();
    showToast();
    return;
  }

  // Qty increment
  const qtyInc = e.target.closest('.qty-inc');
  if (qtyInc) {
    const id = parseInt(qtyInc.dataset.id);
    cartItems[id] = (cartItems[id] || 0) + 1;
    updateCard(id);
    updateCartBadge();
    return;
  }

  // Qty decrement
  const qtyDec = e.target.closest('.qty-dec');
  if (qtyDec) {
    const id = parseInt(qtyDec.dataset.id);
    cartItems[id] = Math.max(0, (cartItems[id] || 0) - 1);
    if (cartItems[id] === 0) delete cartItems[id];
    updateCard(id);
    updateCartBadge();
    return;
  }

  // Wishlist
  const wBtn = e.target.closest('.wishlist-btn');
  if (wBtn) {
    const id = parseInt(wBtn.dataset.id);
    if (wishlistItems.has(id)) {
      wishlistItems.delete(id);
      wBtn.innerHTML = '<i class="far fa-heart"></i>';
      wBtn.classList.remove('active');
    } else {
      wishlistItems.add(id);
      wBtn.innerHTML = '<i class="fas fa-heart"></i>';
      wBtn.classList.add('active');
      wBtn.style.transform = 'scale(1.3)';
      setTimeout(() => { wBtn.style.transform = ''; }, 250);
    }
    return;
  }
});

function updateCard(id) {
  const count = cartItems[id] || 0;
  document.querySelectorAll(`.product-card[data-id="${id}"]`).forEach(card => {
    const addBtn = card.querySelector('.add-btn');
    const qtyControl = card.querySelector('.qty-control');
    const qtyNum = card.querySelector('.qty-num');
    if (count === 0) {
      if (addBtn) { addBtn.style.display = ''; }
      if (qtyControl) qtyControl.classList.remove('visible');
    } else {
      if (addBtn) { addBtn.style.display = 'none'; }
      if (qtyControl) qtyControl.classList.add('visible');
      if (qtyNum) qtyNum.textContent = count;
    }
  });
}

function updateCartBadge() {
  const total = Object.values(cartItems).reduce((a, b) => a + b, 0);
  const badge = document.getElementById('cartBadge');
  if (badge) {
    badge.textContent = total;
    badge.classList.add('bump');
    setTimeout(() => badge.classList.remove('bump'), 300);
  }
}

/* ============================
   TOAST
   ============================ */
function showToast() {
  const toast = document.getElementById('cartToast');
  if (!toast) return;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2000);
}

/* ============================
   HERO SLIDER
   ============================ */
function initSlider() {
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.dot');
  let current = 0;
  let timer;

  function goTo(n) {
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');
    current = (n + slides.length) % slides.length;
    slides[current].classList.add('active');
    dots[current].classList.add('active');
  }

  function autoPlay() {
    clearInterval(timer);
    timer = setInterval(() => goTo(current + 1), 4000);
  }

  document.getElementById('prevSlide')?.addEventListener('click', () => { goTo(current - 1); autoPlay(); });
  document.getElementById('nextSlide')?.addEventListener('click', () => { goTo(current + 1); autoPlay(); });
  dots.forEach((dot, i) => dot.addEventListener('click', () => { goTo(i); autoPlay(); }));

  autoPlay();
}

/* ============================
   SEARCH SUGGESTIONS
   ============================ */
const ALL_PRODUCT_NAMES = Object.values(PRODUCTS).flat().map(p => p.name);

function initSearch() {
  const input = document.getElementById('searchInput');
  const sugg = document.getElementById('searchSuggestions');
  if (!input || !sugg) return;

  input.addEventListener('input', () => {
    const q = input.value.trim().toLowerCase();
    if (q.length < 2) { sugg.classList.remove('visible'); return; }
    const matches = ALL_PRODUCT_NAMES.filter(n => n.toLowerCase().includes(q)).slice(0, 6);
    if (!matches.length) { sugg.classList.remove('visible'); return; }
    sugg.innerHTML = matches.map(m =>
      `<div class="suggestion-item"><i class="fa fa-search"></i>${m}</div>`
    ).join('');
    sugg.classList.add('visible');
    sugg.querySelectorAll('.suggestion-item').forEach(item => {
      item.addEventListener('click', () => {
        input.value = item.textContent.trim();
        sugg.classList.remove('visible');
      });
    });
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.search-bar')) sugg.classList.remove('visible');
  });
}

/* ============================
   HAMBURGER MENU
   ============================ */
function initHamburger() {
  const btn = document.getElementById('hamburger');
  const nav = document.getElementById('mainNav');
  if (!btn || !nav) return;
  btn.addEventListener('click', () => {
    btn.classList.toggle('open');
    nav.classList.toggle('open');
  });
}

/* ============================
   HEADER SCROLL BEHAVIOR
   ============================ */
function initScrollBehavior() {
  const header = document.getElementById('header');
  const backTop = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
      header?.classList.add('scrolled');
      backTop?.classList.add('visible');
    } else {
      header?.classList.remove('scrolled');
      backTop?.classList.remove('visible');
    }
  }, { passive: true });

  backTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* ============================
   INTERSECTION OBSERVER (section fade-in)
   ============================ */
let observer;
function observeSections() {
  if (observer) observer.disconnect();
  observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, i * 60);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  document.querySelectorAll('.section-fade').forEach(el => observer.observe(el));
}

/* ============================
   SMOOTH ADD ANIMATION
   ============================ */
document.addEventListener('click', (e) => {
  const addBtn = e.target.closest('.add-btn');
  if (addBtn) {
    // Ripple
    const ripple = document.createElement('span');
    ripple.style.cssText = `
      position:absolute; border-radius:50%;
      background:rgba(255,255,255,.5); pointer-events:none;
      width:40px; height:40px; top:50%; left:50%;
      transform:translate(-50%,-50%) scale(0);
      animation: rippleOut .4s ease forwards;
    `;
    addBtn.style.position = 'relative';
    addBtn.style.overflow = 'hidden';
    addBtn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 400);
  }
});

// Add ripple keyframe
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `@keyframes rippleOut { to { transform: translate(-50%,-50%) scale(2.5); opacity:0; } }`;
document.head.appendChild(rippleStyle);

/* ============================
   INIT
   ============================ */
document.addEventListener('DOMContentLoaded', () => {
  initGrids();
  initSlider();
  initSearch();
  initHamburger();
  initScrollBehavior();
  observeSections();

  // Stagger hero section fade-ins
  document.querySelectorAll('.product-section, .promo-banner, .best-deals-banner, .featured-picks-banner')
    .forEach((el, i) => {
      el.classList.add('section-fade');
    });
  observeSections();

  // Mark initial sections visible after a tick
  setTimeout(() => {
    document.querySelectorAll('.section-fade:not(.product-card)').forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight) el.classList.add('visible');
    });
  }, 100);
});
