window.onload = function() {
        document.getElementById("popup").style.display = "flex";
    };

function closePopup() {
    document.querySelector(".popup").style.display = "none";
}

document.addEventListener("DOMContentLoaded", function() {
    const elements = document.querySelectorAll(".animasi-teks");

    function cekScroll() {
        elements.forEach(el => {
            const posisi = el.getBoundingClientRect().top;
            const tinggiLayar = window.innerHeight;

            if (posisi < tinggiLayar - 50) {
                el.classList.add("muncul");
            }
        });
    }

    window.addEventListener("scroll", cekScroll);
    cekScroll(); 
});

let currentIndex = 0; // Menyimpan indeks gambar yang sedang ditampilkan
const images = document.querySelectorAll('.carousel-img'); // Mengambil semua gambar di carousel
const totalImages = images.length; // Mengambil jumlah total gambar

// Fungsi untuk berpindah ke gambar berikutnya
function nextImage() {
    currentIndex = (currentIndex + 1) % totalImages; // Menambahkan 1, dan kembali ke gambar pertama setelah gambar terakhir
    updateCarousel();
}

// Fungsi untuk berpindah ke gambar sebelumnya
function prevImage() {
    currentIndex = (currentIndex - 1 + totalImages) % totalImages; // Mengurangi 1, dan kembali ke gambar terakhir setelah gambar pertama
    updateCarousel();
}

// Fungsi untuk memperbarui posisi carousel sesuai dengan gambar yang sedang aktif
function updateCarousel() {
    const carousel = document.querySelector('.carousel');
    const offset = -currentIndex * 100 / totalImages; // Menghitung offset untuk geser carousel
    carousel.style.transform = `translateX(${offset}%)`; // Menggeser carousel sesuai dengan indeks gambar
}

// Menambahkan event listener untuk tombol navigasi
document.querySelector('.next').addEventListener('click', nextImage);
document.querySelector('.prev').addEventListener('click', prevImage);

function kirimWhatsApp(event) {
    event.preventDefault();
    const nama = document.getElementById("nama").value;
    const email = document.getElementById("email").value;
    const pesan = document.getElementById("pesan").value;
    const nomorWA = "6287875962943";
    const url = `https://wa.me/${nomorWA}?text=Nama: ${nama}%0AEmail: ${email}%0APesan: ${pesan}`;
    window.open(url, "_blank");
}
