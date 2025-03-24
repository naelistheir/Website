const menuIcon = document.getElementById('menu-icon');
const navLinks = document.querySelector('.nav-links');

menuIcon.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

document.addEventListener('DOMContentLoaded', function() {
    var scrollIndicator = document.querySelector('.scroll-indicator');

    // Function to detect scroll and hide the indicator
    function hideScrollIndicator() {
        if (window.scrollY > 100) {
            scrollIndicator.classList.add('hidden');
        } else {
            scrollIndicator.classList.remove('hidden');
        }
    }

    // Initial call in case the user has already scrolled
    hideScrollIndicator();

    // Attach event listener to handle scroll events
    window.addEventListener('scroll', hideScrollIndicator);
});

var countdownDate = new Date("Mar 30, 2025 00:00:00").getTime();

var x = setInterval(function() {
    var now = new Date().getTime();
    var distance = countdownDate - now;

    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("timer").innerHTML = days + "d " + hours + "h " + minutes + "m " + seconds + "s ";

    if (distance < 0) {
        clearInterval(x);
        document.getElementById("timer").innerHTML = "EXPIRED";
    }
}, 1000);

document.getElementById("scrollToTopBtn").addEventListener("click", function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

function closeNotification() {
    document.getElementById("discountNotification").style.display = "none";
}

// Fungsi untuk membuat efek mengetik
function typeEffect(elementId, text, speed) {
    let i = 0;
    const element = document.getElementById(elementId);
    const typingInterval = setInterval(function() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
        } else {
            clearInterval(typingInterval); // Stop animasi setelah selesai
        }
    }, speed);
}

// Mulai efek mengetik saat halaman dimuat
document.addEventListener("DOMContentLoaded", function() {
    typeEffect("typing-effect", "Welcome to iLyxx Store", 150); // 150ms untuk kecepatan
    typeEffect("typing-effect-2", "Nikmati Game Lebih Seru dengan Top Up dan Akun Terpercaya!", 100); // 100ms untuk kecepatan
});

setTimeout(function() {
    document.querySelector('.promo-popup').style.display = 'block';
}, 2000); // Show popup after 2 seconds

document.querySelector('.close-popup').addEventListener('click', function() {
    document.querySelector('.promo-popup').style.display = 'none';
});
