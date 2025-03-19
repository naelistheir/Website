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

let index = 0;
const slides = document.querySelector('.slider');
const totalSlides = document.querySelectorAll('.slider img').length;

function nextSlide() {
    index = (index + 1) % totalSlides;
    slides.style.transform = `translateX(-${index * 100}%)`;
}

setInterval(nextSlide, 3000); // Ganti gambar setiap 3 detik

function kirimWhatsApp(event) {
    event.preventDefault();
    const nama = document.getElementById("nama").value;
    const email = document.getElementById("email").value;
    const pesan = document.getElementById("pesan").value;
    const nomorWA = "6287875962943";
    const url = `https://wa.me/${nomorWA}?text=Nama: ${nama}%0AEmail: ${email}%0APesan: ${pesan}`;
    window.open(url, "_blank");
}
