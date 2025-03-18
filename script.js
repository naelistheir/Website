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

function kirimWhatsApp(event) {
    event.preventDefault();
    const nama = document.getElementById("nama").value;
    const email = document.getElementById("email").value;
    const pesan = document.getElementById("pesan").value;
    const nomorWA = "6287875962943";
    const url = `https://wa.me/${nomorWA}?text=Nama: ${nama}%0AEmail: ${email}%0APesan: ${pesan}`;
    window.open(url, "_blank");
}

function prosesTopUp(event) {
    event.preventDefault();
    
    const nama = document.getElementById("nama").value;
    const idGame = document.getElementById("idGame").value;
    const jumlah = document.getElementById("jumlah").value;
    const metode = document.getElementById("metode").value;
    const nomorWA = "6287875962943";

    const pesan = `Halo, saya ingin top up game!%0A%0A` +
                  `Nama: ${nama}%0A` +
                  `ID Game: ${idGame}%0A` +
                  `Jumlah: ${jumlah} Diamond%0A` +
                  `Metode Pembayaran: ${metode}%0A%0A` +
                  `Mohon konfirmasi. Terima kasih!`;

    const url = `https://wa.me/${nomorWA}?text=${pesan}`;
    window.open(url, "_blank");
}
