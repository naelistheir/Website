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
