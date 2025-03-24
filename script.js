function closePopup() {
    document.querySelector(".popup").style.display = "none";
}

document.addEventListener("DOMContentLoaded", function () {
    let elements = document.querySelectorAll(".animasi-teks");

    function checkScroll() {
        let scrollPos = window.innerHeight * 0.85;
        elements.forEach(el => {
            let position = el.getBoundingClientRect().top;
            if (position < scrollPos) {
                el.classList.add("show");
            }
        });
    }

    window.addEventListener("scroll", checkScroll);
    checkScroll();
});

let index = 0;
const slides = document.querySelectorAll('.banner-img');

function nextSlide() {
    slides[index].classList.remove('active'); // Sembunyikan gambar sekarang
    index = (index + 1) % slides.length; // Pindah ke gambar berikutnya
    slides[index].classList.add('active'); // Tampilkan gambar baru
}

setInterval(nextSlide, 3000); // Ganti gambar setiap 3 detik


let countdownDate = new Date("March 30, 2025 23:59:59").getTime();

let timer = setInterval(function() {
    let now = new Date().getTime();
    let distance = countdownDate - now;
    
    // Waktu
    let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Update elemen HTML
    document.getElementById("hours").innerHTML = formatTime(hours);
    document.getElementById("minutes").innerHTML = formatTime(minutes);
    document.getElementById("seconds").innerHTML = formatTime(seconds);
    
    // Jika waktu habis
    if (distance < 0) {
        clearInterval(timer);
        document.getElementById("timer").innerHTML = "PROMO BERAKHIR!";
        document.getElementById("timer").style.fontSize = "1.8rem";
    }
}, 1000);

// Fungsi untuk menambahkan leading zero
function formatTime(time) {
    return time < 10 ? "0" + time : time;
}

// Daftar produk (misal menggunakan data statis)
const products = [
    { id: 1, name: "Akun Game A", price: 200, rating: 5, category: "game-accounts", image: "product1.jpg" },
    { id: 2, name: "Diamond Game B", price: 150, rating: 4, category: "diamond", image: "product2.jpg" },
    { id: 3, name: "Akun Game C", price: 300, rating: 3, category: "game-accounts", image: "product3.jpg" },
    { id: 4, name: "Diamond Game D", price: 100, rating: 5, category: "diamond", image: "product4.jpg" },
    { id: 5, name: "Akun Game E", price: 250, rating: 4, category: "game-accounts", image: "product5.jpg" },
    { id: 6, name: "Diamond Game F", price: 500, rating: 5, category: "diamond", image: "product6.jpg" }
];

// Menampilkan produk ke halaman
function displayProducts(filteredProducts) {
    const productContainer = document.querySelector('.product-list');
    productContainer.innerHTML = ''; // Clear current products

    filteredProducts.forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('product');
        productElement.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <p class="product-title">${product.name}</p>
            <p class="product-price">Rp ${product.price}</p>
            <p class="product-rating">${'★'.repeat(product.rating)}${'☆'.repeat(5 - product.rating)}</p>
        `;
        productContainer.appendChild(productElement);
    });
}

// Filter produk berdasarkan kategori, harga, dan rating
function filterProducts() {
    const categoryFilter = document.getElementById('category-filter').value;
    const priceFilter = document.getElementById('price-filter').value;
    const ratingFilter = document.getElementById('rating-filter').value;

    // Filter produk berdasarkan kategori, harga, dan rating
    const filteredProducts = products.filter(product => {
        const categoryMatch = (categoryFilter === 'all' || product.category === categoryFilter);
        const priceMatch = product.price <= priceFilter;
        const ratingMatch = (ratingFilter === 'all' || product.rating == ratingFilter);

        return categoryMatch && priceMatch && ratingMatch;
    });

    displayProducts(filteredProducts);
}

// Event listeners untuk filter
document.getElementById('category-filter').addEventListener('change', filterProducts);
document.getElementById('price-filter').addEventListener('input', function() {
    document.getElementById('price-value').textContent = `Rp ${this.value}`;
    filterProducts();
});
document.getElementById('rating-filter').addEventListener('change', filterProducts);

// Menampilkan produk pertama kali
displayProducts(products);

function kirimWhatsApp(event) {
    event.preventDefault();
    const nama = document.getElementById("nama").value;
    const email = document.getElementById("email").value;
    const pesan = document.getElementById("pesan").value;
    const nomorWA = "6287875962943";
    const url = `https://wa.me/${nomorWA}?text=Nama: ${nama}%0AEmail: ${email}%0APesan: ${pesan}`;
    window.open(url, "_blank");
}

const chatBtn = document.getElementById('chat-btn');
const chatBox = document.getElementById('chat-box');

chatBtn.addEventListener('click', () => {
    chatBox.classList.toggle('hide');
});
