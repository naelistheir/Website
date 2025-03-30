// Mobile Menu Toggle
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Add glow effect to cards on hover
const cards = document.querySelectorAll('.product-card');
cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.animation = 'glow 2s infinite';
    });
    card.addEventListener('mouseleave', () => {
        card.style.animation = 'none';
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Payment Method Functionality
const paymentButtons = document.querySelectorAll('.payment-btn');
const qrisPopups = document.querySelectorAll('.qris-popup');
const closeButtons = document.querySelectorAll('.close-popup');
let countdownTimer;

paymentButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        // Get service name from the product card
        const serviceName = button.closest('.product-card').querySelector('h3').textContent;
        
        // Update WhatsApp link with service name
        const whatsappLink = qrisPopups[index].querySelector('.confirm-btn');
        whatsappLink.href = `https://wa.me/6287875962943?text=Halo%20iLyxx%20Store,%20saya%20sudah%20melakukan%20pembayaran%20untuk%20layanan%20${encodeURIComponent(serviceName)}`;
        
        // Show the popup
        qrisPopups[index].style.display = 'flex';
        
        // Start countdown
        let timeLeft = 60;
        const countdownElement = qrisPopups[index].querySelector('#countdown');
        
        countdownTimer = setInterval(() => {
            timeLeft--;
            countdownElement.textContent = timeLeft;
            
            if (timeLeft <= 0) {
                clearInterval(countdownTimer);
                qrisPopups[index].style.display = 'none';
            }
        }, 1000);
    });
});

closeButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        clearInterval(countdownTimer);
        qrisPopups[index].style.display = 'none';
    });
});

// Close popup when clicking outside
window.addEventListener('click', (e) => {
    qrisPopups.forEach((popup, index) => {
        if (e.target === popup) {
            clearInterval(countdownTimer);
            popup.style.display = 'none';
        }
    });
});

// Testimonial Carousel Functionality (Optional)
let currentTestimonial = 0;
const testimonials = document.querySelectorAll('.testimonial-card');
const totalTestimonials = testimonials.length;

function showTestimonial(index) {
    testimonials.forEach((testimonial, i) => {
        testimonial.style.display = i === index ? 'block' : 'none';
    });
}

// Uncomment below if you want auto-rotating testimonials
/*
function nextTestimonial() {
    currentTestimonial = (currentTestimonial + 1) % totalTestimonials;
    showTestimonial(currentTestimonial);
}

// Auto rotate every 5 seconds
setInterval(nextTestimonial, 5000);

// Initialize
showTestimonial(0);
*/

// Blog Read More Functionality
document.querySelectorAll('.read-more-btn').forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        // You can add functionality to load full article here
        console.log('Read more clicked');
        // Example: window.location.href = '/blog/' + articleId;
    });
});

// View All Articles Button
document.querySelector('.view-all-btn').addEventListener('click', (e) => {
    e.preventDefault();
    // Redirect to blog page
    console.log('View all articles clicked');
    // Example: window.location.href = '/blog';
});

// AI Chatbot Functionality
const chatbot = document.querySelector('.ai-chatbot');
const toggleBtn = document.querySelector('.chatbot-toggle');
const closeBtn = document.querySelector('.chatbot-close');
const chatInput = document.querySelector('.chatbot-input input');
const chatMessages = document.querySelector('.chatbot-messages');

toggleBtn.addEventListener('click', () => {
    chatbot.classList.toggle('active');
});

closeBtn.addEventListener('click', () => {
    chatbot.classList.remove('active');
});

// Simple responses
const responses = {
    "hello": "Hello there! How can I assist you with our coding services today?",
    "services": "We offer: 1. Coding Services 2. Bug Fixing 3. Setup Services. Which one interests you?",
    "price": "Our prices start from Rp 100,000 depending on project complexity. Could you share more about your needs?",
    "default": "I'm still learning! For detailed inquiries, please contact us directly via WhatsApp at +62 878-7596-2943"
};

function addMessage(text, isAI = false) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message');
    if (isAI) messageDiv.classList.add('ai-message');
    messageDiv.innerHTML = `<p>${text}</p>`;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && chatInput.value.trim() !== '') {
        const userMessage = chatInput.value.toLowerCase();
        addMessage(chatInput.value);
        chatInput.value = '';
        
        setTimeout(() => {
            let response = responses.default;
            if (userMessage.includes('hello') || userMessage.includes('hi')) {
                response = responses.hello;
            } else if (userMessage.includes('service') || userMessage.includes('offer')) {
                response = responses.services;
            } else if (userMessage.includes('price') || userMessage.includes('cost')) {
                response = responses.price;
            }
            addMessage(response, true);
        }, 1000);
    }
});

// Matrix Rain Effect
const matrixRain = document.querySelector('.matrix-rain');
const canvas = document.createElement('canvas');
matrixRain.appendChild(canvas);

canvas.style.display = 'block';
canvas.width = matrixRain.offsetWidth;
canvas.height = matrixRain.offsetHeight;

const ctx = canvas.getContext('2d');
const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const nums = '0123456789';
const alphabet = katakana + latin + nums;

const fontSize = 16;
const columns = canvas.width / fontSize;
const rainDrops = [];

for (let x = 0; x < columns; x++) {
    rainDrops[x] = 1;
}

const draw = () => {
    ctx.fillStyle = 'rgba(20, 20, 35, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = '#6a5acd';
    ctx.font = fontSize + 'px monospace';

    for (let i = 0; i < rainDrops.length; i++) {
        const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
        ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);
        
        if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            rainDrops[i] = 0;
        }
        rainDrops[i]++;
    }
};

setInterval(draw, 30);

window.addEventListener('resize', () => {
    canvas.width = matrixRain.offsetWidth;
    canvas.height = matrixRain.offsetHeight;
});

// Neon Notification
setTimeout(() => {
    const notification = document.querySelector('.neon-notification');
    notification.style.display = 'flex';
    
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => {
            notification.style.display = 'none';
        }, 500);
    }, 5000);
}, 3000);

// Close button functionality
document.querySelector('.close-promo').addEventListener('click', function() {
    const promoBar = document.querySelector('.luxury-promo-bar');
    promoBar.style.opacity = '0';
    promoBar.style.height = '0';
    promoBar.style.padding = '0';
    setTimeout(() => {
        promoBar.style.display = 'none';
        document.querySelector('main').style.marginTop = '70px';
    }, 300);
});

document.addEventListener('DOMContentLoaded', function() {
  // Inisialisasi carousel
  const videoContainers = document.querySelectorAll('.video-container');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  const indicators = document.querySelectorAll('.indicators span');
  let currentIndex = 0;
  let player;

  // Fungsi untuk mengubah video aktif
  function showVideo(index) {
    videoContainers.forEach((container, i) => {
      container.classList.toggle('active', i === index);
    });
    
    indicators.forEach((indicator, i) => {
      indicator.classList.toggle('active', i === index);
    });
    
    currentIndex = index;
  }

  // Navigasi tombol
  prevBtn.addEventListener('click', function() {
    const newIndex = (currentIndex - 1 + videoContainers.length) % videoContainers.length;
    showVideo(newIndex);
  });

  nextBtn.addEventListener('click', function() {
    const newIndex = (currentIndex + 1) % videoContainers.length;
    showVideo(newIndex);
  });

  // Navigasi indikator
  indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', function() {
      showVideo(index);
    });
  });

  // Auto-advance (opsional)
  let carouselInterval = setInterval(() => {
    const newIndex = (currentIndex + 1) % videoContainers.length;
    showVideo(newIndex);
  }, 5000);

  // Pause auto-advance saat hover
  const carousel = document.querySelector('.video-carousel');
  carousel.addEventListener('mouseenter', () => {
    clearInterval(carouselInterval);
  });

  carousel.addEventListener('mouseleave', () => {
    carouselInterval = setInterval(() => {
      const newIndex = (currentIndex + 1) % videoContainers.length;
      showVideo(newIndex);
    }, 5000);
  });

  // Load YouTube API
  const tag = document.createElement('script');
  tag.src = "https://www.youtube.com/iframe_api";
  const firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
});

// YouTube Player API
function onYouTubeIframeAPIReady() {
  const players = document.querySelectorAll('iframe');
  
  players.forEach((iframe, index) => {
    new YT.Player(iframe.id || `player${index}`, {
      events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange
      }
    });
  });
}

function onPlayerReady(event) {
  // Optional: Autoplay first video
  if (event.target.a.id === 'video1') {
    // event.target.playVideo(); // Uncomment untuk autoplay
  }
}

function onPlayerStateChange(event) {
  // Handle player state changes if needed
}

