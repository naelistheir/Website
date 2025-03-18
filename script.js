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

let currentIndex = 0;
const slides = document.querySelectorAll(".carousel-item");
const totalSlides = slides.length;

function updateSlide() {
    const carouselInner = document.querySelector(".carousel-inner");
    carouselInner.style.transform = `translateX(-${currentIndex * 100}%)`;
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateSlide();
}

function prevSlide() {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    updateSlide();
}

// Auto-slide setiap 3 detik
setInterval(nextSlide, 3000);

function kirimWhatsApp(event) {
    event.preventDefault();
    const nama = document.getElementById("nama").value;
    const email = document.getElementById("email").value;
    const pesan = document.getElementById("pesan").value;
    const nomorWA = "6287875962943";
    const url = `https://wa.me/${nomorWA}?text=Nama: ${nama}%0AEmail: ${email}%0APesan: ${pesan}`;
    window.open(url, "_blank");
}
