****************************Operate Of The Code Use In JavaScript*********************************


  const products = [
    { id: 1, name: "Chicken Biryani", desc: "Fragrant basmati rice with tender chicken & whole spices", price: 280, emoji: "🍛", cat: "rice", badge: "Bestseller", rating: 4.9, reviews: 312 },
    { id: 2, name: "Mutton Biryani", desc: "Slow-cooked mutton with saffron-infused basmati", price: 350, emoji: "🍲", cat: "rice", badge: "", rating: 4.8, reviews: 218 },
    { id: 3, name: "Veg Dum Biryani", desc: "Seasonal vegetables layered with aromatic rice", price: 200, emoji: "🥗", cat: "rice", badge: "", rating: 4.7, reviews: 145 },
    { id: 4, name: "Butter Chicken", desc: "Creamy tomato gravy with tender chicken tikka", price: 280, emoji: "🍗", cat: "curry", badge: "Popular", rating: 4.9, reviews: 508 },
    { id: 5, name: "Paneer Butter Masala", desc: "Silky paneer in rich makhani gravy", price: 220, emoji: "🥘", cat: "curry", badge: "", rating: 4.7, reviews: 289 },
    { id: 6, name: "Dal Makhani", desc: "Slow-cooked black lentils simmered overnight", price: 160, emoji: "🫕", cat: "curry", badge: "", rating: 4.8, reviews: 195 },
    { id: 7, name: "Chole Bhature", desc: "Spiced chickpeas with fluffy fried bread", price: 120, emoji: "🍽️", cat: "curry", badge: "", rating: 4.6, reviews: 167 },
    { id: 8, name: "Garlic Naan", desc: "Soft leavened bread from tandoor with garlic butter", price: 60, emoji: "🫓", cat: "bread", badge: "", rating: 4.8, reviews: 421 },
    { id: 9, name: "Butter Roti", desc: "Whole wheat flatbread with a touch of butter", price: 30, emoji: "🥙", cat: "bread", badge: "", rating: 4.6, reviews: 320 },
    { id: 10, name: "Parotta", desc: "Flaky layered flatbread from South India", price: 50, emoji: "🥞", cat: "bread", badge: "South Special", rating: 4.9, reviews: 275 },
    { id: 11, name: "Gulab Jamun", desc: "Soft milk solids dumplings in rose syrup", price: 90, emoji: "🍮", cat: "dessert", badge: "", rating: 4.9, reviews: 388 },
    { id: 12, name: "Rasgulla", desc: "Spongy cottage cheese balls in light sugar syrup", price: 80, emoji: "🧁", cat: "dessert", badge: "", rating: 4.7, reviews: 211 },
    { id: 13, name: "Mango Lassi", desc: "Thick yoghurt blended with fresh Alphonso mango", price: 80, emoji: "🥭", cat: "drinks", badge: "Seasonal", rating: 4.9, reviews: 487 },
    { id: 14, name: "Masala Chai", desc: "Aromatic spiced tea with ginger & cardamom", price: 40, emoji: "☕", cat: "drinks", badge: "", rating: 4.8, reviews: 623 },
    { id: 15, name: "Rose Sharbat", desc: "Chilled rose syrup with basil seeds & milk", price: 60, emoji: "🌹", cat: "drinks", badge: "", rating: 4.6, reviews: 134 },
];

let cart = {};

/* ── PAGE NAVIGATION ── */
function showPage(page) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(page).classList.add('active');
    if (page === 'cart') renderCart();
    window.scrollTo(0, 0);
}

/* ── PRODUCTS ── */
function renderProducts(filter = 'all') {
    const grid = document.getElementById('productGrid');
    const filtered = filter === 'all' ? products : products.filter(p => p.cat === filter);
    grid.innerHTML = filtered.map(p => `
    <div class="product-card">
      <div class="product-image">
        ${p.badge ? `<div class="product-badge">${p.badge}</div>` : ''}
        ${p.emoji}
      </div>
      <div class="product-info">
        <div class="rating">
          <span class="stars">★★★★★</span>
          <span>${p.rating}</span>
          <span class="rating-count">(${p.reviews})</span>
        </div>
        <div class="product-name">${p.name}</div>
        <div class="product-desc">${p.desc}</div>
        <div class="product-footer">
          <div class="product-price">₹${p.price} <span>/ serving</span></div>
          <button class="add-btn" onclick="addToCart(${p.id})">+</button>
        </div>
      </div>
    </div>
  `).join('');
}

function filterProducts(cat, btn) {
    document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderProducts(cat);
}

/* ── CART ── */
function addToCart(id) {
    cart[id] = (cart[id] || 0) + 1;
    updateCartCount();
    const p = products.find(p => p.id === id);
    showToast(`${p.emoji} ${p.name} added to cart!`);
}

function removeFromCart(id) {
    delete cart[id];
    updateCartCount();
    renderCart();
}

function changeQty(id, delta) {
    cart[id] = (cart[id] || 0) + delta;
    if (cart[id] <= 0) delete cart[id];
    updateCartCount();
    renderCart();
}

function updateCartCount() {
    const total = Object.values(cart).reduce((a, b) => a + b, 0);
    document.getElementById('cartCount').textContent = total;
}

function renderCart() {
    const layout = document.getElementById('cartLayout');
    const items = Object.entries(cart);

    if (items.length === 0) {
        layout.innerHTML = `
      <div class="empty-cart">
        <span class="big-emoji">🍽️</span>
        <h3>Your cart is empty!</h3>
        <p>Looks like you haven't added anything yet.</p>
        <button class="btn-primary" onclick="showPage('products')">Browse Menu →</button>
      </div>`;
        return;
    }

    const subtotal = items.reduce((sum, [id, qty]) => {
        const p = products.find(p => p.id == id);
        return sum + p.price * qty;
    }, 0);
    const delivery = 40;
    const total = subtotal + delivery;

    layout.innerHTML = `
    <div class="cart-items-section">
      <h2>Order Items (${items.length})</h2>
      ${items.map(([id, qty]) => {
        const p = products.find(p => p.id == id);
        return `
        <div class="cart-item">
          <div class="cart-item-emoji">${p.emoji}</div>
          <div class="cart-item-info">
            <div class="cart-item-name">${p.name}</div>
            <div class="cart-item-price">₹${p.price} each</div>
          </div>
          <div class="qty-control">
            <button class="qty-btn" onclick="changeQty(${p.id}, -1)">−</button>
            <span style="font-weight:600; min-width:20px; text-align:center">${qty}</span>
            <button class="qty-btn" onclick="changeQty(${p.id}, 1)">+</button>
          </div>
          <div style="font-weight:600; margin:0 1rem; min-width:60px; text-align:right">₹${p.price * qty}</div>
          <button class="remove-btn" onclick="removeFromCart(${p.id})">✕</button>
        </div>`;
    }).join('')}
    </div>
    <div>
      <div class="cart-summary">
        <h3>Order Summary</h3>
        <div class="summary-row"><span>Subtotal</span><span>₹${subtotal}</span></div>
        <div class="summary-row"><span>Delivery</span><span>₹${delivery}</span></div>
        <div class="summary-row"><span>Discount</span><span style="color:#4CAF50">- ₹0</span></div>
        <div class="summary-row total"><span>Total</span><span>₹${total}</span></div>
        <button class="checkout-btn" onclick="checkout()">Proceed to Checkout →</button>
      </div>
    </div>`;
}

function checkout() {
    cart = {};
    updateCartCount();
    showToast('🎉 Order placed successfully!');
    setTimeout(() => showPage('home'), 1000);
}

/* ── AUTH ── */
function switchTab(formId, btn) {
    document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById('login-form').style.display = formId === 'login-form' ? 'block' : 'none';
    document.getElementById('signup-form').style.display = formId === 'signup-form' ? 'block' : 'none';
}

function fakeLogin() {
    showToast('🎉 Welcome to SpiceRoute!');
    setTimeout(() => showPage('home'), 800);
}

/* ── TOAST ── */
function showToast(msg) {
    const t = document.getElementById('toast');
    document.getElementById('toastMsg').textContent = msg;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 3000);
}

/* ── INIT ── */
renderProducts();
