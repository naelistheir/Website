document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navbar = document.querySelector('.navbar');
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
    
    // Sticky navbar on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Smooth scrolling for all links
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
    
    // Animate elements when scrolling
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.service-card, .portfolio-item, .about-content > *, .contact-content > *');
        const windowHeight = window.innerHeight;
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            
            if (elementPosition < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial state for animated elements
    document.querySelectorAll('.service-card, .portfolio-item, .about-content > *, .contact-content > *').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Run once on load
    animateOnScroll();
    
    // Run on scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Form submission
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Here you would typically send the form data to a server
            alert('Pesan Anda telah terkirim! Kami akan segera menghubungi Anda.');
            this.reset();
        });
    }
});

// Music Player Functionality
const bgMusic = document.getElementById('bgMusic');
const musicToggle = document.getElementById('musicToggle');
const musicText = document.querySelector('.music-text');
let isPlaying = false;

// Fungsi untuk memulai musik setelah interaksi pengguna
function startMusic() {
    // Hapus event listener setelah pertama kali dijalankan
    document.removeEventListener('click', startMusic);
    document.removeEventListener('keydown', startMusic);
    
    bgMusic.volume = 0.3; // Atur volume rendah (30%)
    const playPromise = bgMusic.play();
    
    if (playPromise !== undefined) {
        playPromise.then(_ => {
            // Musik berhasil diputar
            isPlaying = true;
            musicText.textContent = 'Pause Music';
            musicToggle.innerHTML = '<i class="fas fa-pause"></i><span class="music-text">Pause Music</span>';
            localStorage.setItem('musicPref', 'playing');
        })
        .catch(error => {
            // Gagal memutar musik
            console.log("Autoplay prevented:", error);
            musicText.textContent = 'Play Music';
            musicToggle.innerHTML = '<i class="fas fa-music"></i><span class="music-text">Play Music</span>';
        });
    }
}

// Random increment (contoh)
setInterval(() => {
    const fakeCount = Math.floor(Math.random() * 50) + 10;
    document.getElementById("live-counter").textContent = fakeCount;
    }, 3000);

// Coba autoplay dengan permission
function tryAutoplay() {
    bgMusic.volume = 0; // Set volume ke 0 dulu
    
    const playPromise = bgMusic.play();
    
    if (playPromise !== undefined) {
        playPromise.then(_ => {
            // Jika berhasil, set volume normal
            bgMusic.pause();
            bgMusic.volume = 0.3;
            
            // Simpan preferensi
            isPlaying = true;
            musicText.textContent = 'Pause Music';
            musicToggle.innerHTML = '<i class="fas fa-pause"></i><span class="music-text">Pause Music</span>';
            localStorage.setItem('musicPref', 'playing');
            
            // Coba play lagi dengan volume sudah di-set
            bgMusic.play();
        })
        .catch(error => {
            // Jika autoplay diblokir, tunggu interaksi pengguna
            console.log("Autoplay prevented, waiting for user interaction");
            musicText.textContent = 'Play Music';
            
            // Tambahkan event listener untuk interaksi pertama
            document.addEventListener('click', startMusic);
            document.addEventListener('keydown', startMusic);
        });
    }
}

// Load music preference
if(localStorage.getItem('musicPref') === 'playing') {
    tryAutoplay();
} else {
    musicText.textContent = 'Play Music';
}

// Toggle button functionality
musicToggle.addEventListener('click', function(e) {
    e.stopPropagation(); // Mencegah trigger startMusic
    
    if(isPlaying) {
        bgMusic.pause();
        musicText.textContent = 'Play Music';
        musicToggle.innerHTML = '<i class="fas fa-music"></i><span class="music-text">Play Music</span>';
        localStorage.setItem('musicPref', 'paused');
    } else {
        bgMusic.volume = 0.3;
        bgMusic.play();
        musicText.textContent = 'Pause Music';
        musicToggle.innerHTML = '<i class="fas fa-pause"></i><span class="music-text">Pause Music</span>';
        localStorage.setItem('musicPref', 'playing');
    }
    isPlaying = !isPlaying;
});

// Pause music when tab is inactive
document.addEventListener('visibilitychange', function() {
    if(document.hidden) {
        bgMusic.pause();
    } else if(isPlaying && localStorage.getItem('musicPref') === 'playing') {
        bgMusic.play();
    }
});

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navbar = document.querySelector('.navbar');
    
    // Better touch handling for mobile
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
        
        // Toggle body scroll when menu is open
        if (navLinks.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });
    
    // Close menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Sticky navbar with better mobile support
    let lastScroll = 0;
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            navbar.classList.remove('scrolled');
            return;
        }
        
        if (currentScroll > lastScroll && currentScroll > 100) {
            // Scroll down
            navbar.classList.remove('scrolled');
        } else if (currentScroll < lastScroll && currentScroll > 50) {
            // Scroll up
            navbar.classList.add('scrolled');
        }
        
        lastScroll = currentScroll;
    });
    
    // Smooth scrolling with offset for mobile
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Touch device detection
    function isTouchDevice() {
        return 'ontouchstart' in window || navigator.maxTouchPoints;
    }
    
    if (isTouchDevice()) {
        document.body.classList.add('touch-device');
        
        // Add touch feedback for buttons
        document.querySelectorAll('.btn, a').forEach(button => {
            button.addEventListener('touchstart', function() {
                this.classList.add('touch-active');
            });
            
            button.addEventListener('touchend', function() {
                this.classList.remove('touch-active');
            });
        });
    }
    
    // Animate elements when scrolling - optimized for mobile
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.service-card, .portfolio-item, .about-content > *, .contact-content > *');
        const windowHeight = window.innerHeight;
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            
            if (elementPosition < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial state for animated elements
    document.querySelectorAll('.service-card, .portfolio-item, .about-content > *, .contact-content > *').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Run animations
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll();
    
    // Form submission with mobile-friendly feedback
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show mobile-friendly alert
            const alertDiv = document.createElement('div');
            alertDiv.className = 'mobile-alert';
            alertDiv.innerHTML = `
                <div class="alert-content">
                    <p>Pesan lo udah terkirim! 🎉</p>
                    <p>Kita bakal segera balas ke email/WA lo.</p>
                    <button class="alert-close">Oke!</button>
                </div>
            `;
            
            document.body.appendChild(alertDiv);
            
            // Close alert
            document.querySelector('.alert-close').addEventListener('click', function() {
                document.body.removeChild(alertDiv);
            });
            
            this.reset();
        });
    }
});

// Versi lebih robust dengan debugging
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM fully loaded"); // Debugging line
    
    const popup = document.getElementById('welcomePopup');
    const closeBtn = document.querySelector('.close-popup');
    const actionBtn = document.querySelector('.popup-btn');
    
    if (!popup) {
        console.error("Popup element not found!");
        return;
    }
    
    // Debugging localStorage
    console.log("PopupShown in localStorage:", localStorage.getItem('popupShown'));
    
    // Tampilkan popup jika belum pernah dilihat
    if (!localStorage.getItem('popupShown')) {
        console.log("Showing popup for the first time");
        setTimeout(() => {
            popup.style.display = 'block';
            localStorage.setItem('popupShown', 'true');
        }, 2000);
    } else {
        console.log("Popup already shown before");
    }
    
    // Event listeners dengan error handling
    try {
        closeBtn.addEventListener('click', () => {
            popup.style.display = 'none';
        });
        
        popup.addEventListener('click', (e) => {
            if (e.target === popup) {
                popup.style.display = 'none';
            }
        });
        
        actionBtn.addEventListener('click', () => {
            popup.style.display = 'none';
            const contactSection = document.querySelector('#contact');
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    } catch (e) {
        console.error("Error setting up popup events:", e);
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    
    // Check for saved preference or system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Set initial theme
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
        body.setAttribute('data-theme', 'dark');
    }
    
    // Toggle theme on button click
    themeToggle.addEventListener('click', function() {
        if (body.getAttribute('data-theme') === 'dark') {
            body.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
        } else {
            body.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // Order button functionality
    document.querySelectorAll('.order-btn').forEach(button => {
        button.addEventListener('click', function() {
            const serviceCard = this.closest('.service-card');
            const paymentOptions = serviceCard.querySelector('.payment-options');
            
            // Toggle payment options visibility
            if (paymentOptions.style.display === 'none') {
                paymentOptions.style.display = 'block';
                this.textContent = 'Tutup';
            } else {
                paymentOptions.style.display = 'none';
                this.textContent = 'Order Sekarang';
                // Also hide QR container if open
                serviceCard.querySelector('.qr-container').style.display = 'none';
            }
        });
    });
    
    // Payment method selection
    document.querySelectorAll('.payment-method').forEach(method => {
        method.addEventListener('click', function() {
            const methodType = this.getAttribute('data-method');
            const serviceCard = this.closest('.service-card');
            const qrContainer = serviceCard.querySelector('.qr-container');
            const qrImage = serviceCard.querySelector('.qr-code');
            
            // Set QR image based on payment method
            switch(methodType) {
                case 'qris':
                    qrImage.src = 'assets/images/qris-payment.png'; // Replace with your QRIS image
                    break;
                case 'gopay':
                    qrImage.src = 'assets/images/gopay-qr.png'; // Replace with your Gopay QR
                    break;
                case 'dana':
                    qrImage.src = 'assets/images/dana-qr.png'; // Replace with your DANA QR
                    break;
            }
            
            // Show QR container
            qrContainer.style.display = 'block';
            
            // Scroll to QR code for better visibility
            qrContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        });
    });
});

// QR Download Functionality
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.download-qr-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const qrContainer = this.closest('.qr-container');
            const qrImage = qrContainer.querySelector('.qr-code');
            const serviceName = qrContainer.closest('.service-card').querySelector('h3').textContent;
            
            // Create temporary download link
            const link = document.createElement('a');
            link.href = qrImage.src;
            link.download = `iLyxxStore-${serviceName.replace(/\s+/g, '-')}-QR.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    particlesJS('particles-js', {
        "particles": {
            "number": {
                "value": 60, // Lebih sedikit untuk background putih
                "density": {
                    "enable": true,
                    "value_area": 800
                }
            },
            "color": {
                "value": "#4361ee" // Biru brand
            },
            "opacity": {
                "value": 0.7, // Lebih opaque
                "random": true
            },
            "line_linked": {
                "enable": true,
                "distance": 120,
                "color": "#3a56d4",
                "opacity": 0.4,
                "width": 1
            }
        },
        "interactivity": {
            "detect_on": "window",
            "events": {
                "onhover": {
                    "enable": window.innerWidth > 768
                }
            }
        }
    });
});

function updateParticlesTheme(isDark) {
    const particles = window.pJSDom[0].pJS.particles;
    
    if(isDark) {
        particles.color.value = "#4cc9f0"; // Biru muda
        particles.line_linked.color = "#4895ef";
        document.getElementById('particles-js').style.background = "#121212";
    } else {
        particles.color.value = "#4361ee";
        particles.line_linked.color = "#3a56d4";
        document.getElementById('particles-js').style.background = "#ffffff";
    }
}

document.addEventListener('DOMContentLoaded', () => {
  // Game elements
  const startScreen = document.getElementById('reaction-start-screen');
  const gameArea = document.getElementById('reaction-game-area');
  const target = document.getElementById('reaction-target');
  const playerNameInput = document.getElementById('player-name');
  const startBtn = document.getElementById('start-btn');
  const currentTimeDisplay = document.getElementById('current-time');
  const bestTimeDisplay = document.getElementById('best-time');
  const reactionDisplay = document.getElementById('reaction-display');
  const topPlayerContainer = document.getElementById('top-player');
  
  // Game variables
  let startTime;
  let timeoutId;
  let bestTimes = JSON.parse(localStorage.getItem('reactionLeaderboard')) || [];
  let playerName = '';
  let isWaiting = false;
  
  // Initialize
  updateLeaderboard();
  
  // Event listeners
  startBtn.addEventListener('click', startGame);
  target.addEventListener('click', handleTargetClick);
  
  // Game functions
  function startGame() {
    playerName = playerNameInput.value.trim() || 'Anonymous';
    playerName = playerName.substring(0, 12);
    
    startScreen.style.display = 'none';
    gameArea.style.display = 'block';
    isWaiting = true;
    
    reactionDisplay.textContent = "Wait for the color change...";
    target.textContent = '';
    target.style.backgroundColor = 'var(--gray)';
    target.classList.remove('active');
    
    // Initial delay
    setTimeout(() => {
      reactionDisplay.textContent = "Get ready...";
      
      // Random delay between 2-5 seconds
      const delay = 2000 + Math.random() * 3000;
      timeoutId = setTimeout(startReactionTest, delay);
    }, 1000);
  }
  
  function startReactionTest() {
    startTime = Date.now();
    target.classList.add('active');
    target.textContent = 'CLICK NOW!';
    isWaiting = false;
  }
  
  function handleTargetClick() {
    if (isWaiting) {
      // Clicked too soon
      reactionDisplay.textContent = "Too soon! Wait for the color change";
      target.classList.remove('active');
      target.textContent = 'X';
      target.style.backgroundColor = '#ff6b6b';
      clearTimeout(timeoutId);
      
      setTimeout(() => {
        startGame();
      }, 1500);
      return;
    }
    
    if (!target.classList.contains('active')) return;
    
    const reactionTime = Date.now() - startTime;
    currentTimeDisplay.textContent = reactionTime;
    
    // Save score
    saveScore(reactionTime);
    
    // Visual feedback
    target.classList.remove('active');
    target.textContent = `${reactionTime}ms`;
    target.style.backgroundColor = '#51cf66';
    reactionDisplay.textContent = "Nice! Preparing next round...";
    isWaiting = true;
    
    // Next round after delay
    setTimeout(() => {
      startGame();
    }, 2000);
  }
  
  function saveScore(time) {
    const existingPlayer = bestTimes.find(p => p.name === playerName);
    
    if (!existingPlayer || time < existingPlayer.time) {
      if (existingPlayer) {
        existingPlayer.time = time;
      } else {
        bestTimes.push({ name: playerName, time: time });
      }
      
      // Sort by best time
      bestTimes.sort((a, b) => a.time - b.time);
      
      // Keep top 10 (though we only display top 1)
      if (bestTimes.length > 10) {
        bestTimes = bestTimes.slice(0, 10);
      }
      
      localStorage.setItem('reactionLeaderboard', JSON.stringify(bestTimes));
      updateLeaderboard();
      
      // Animation if new champion
      if (bestTimes[0].name === playerName) {
        topPlayerContainer.classList.add('new-champion');
        setTimeout(() => {
          topPlayerContainer.classList.remove('new-champion');
        }, 1000);
      }
    }
  }
  
  function updateLeaderboard() {
    if (bestTimes.length > 0) {
      const topPlayer = bestTimes[0];
      topPlayerContainer.innerHTML = `
        <div class="player-rank">1</div>
        <div class="player-name">${topPlayer.name}</div>
        <div class="player-time">${topPlayer.time}ms</div>
      `;
      bestTimeDisplay.textContent = topPlayer.time;
    } else {
      topPlayerContainer.innerHTML = `
        <div class="player-rank">1</div>
        <div class="player-name">-</div>
        <div class="player-time">0ms</div>
      `;
      bestTimeDisplay.textContent = '0';
    }
  }
});
// Store Rating System
document.addEventListener('DOMContentLoaded', function() {
  const stars = document.querySelectorAll('.star');
  const starsContainer = document.querySelector('.stars');
  const submitBtn = document.getElementById('submit-rating');
  const ratingComment = document.getElementById('rating-comment');
  const thankYouMsg = document.querySelector('.rating-thank-you');
  const avgRatingEl = document.getElementById('avg-rating');
  const totalRatingsEl = document.getElementById('total-ratings');

  // Load existing ratings
  let ratings = JSON.parse(localStorage.getItem('storeRatings')) || [];
  updateStats();

  // Star hover and click effects
  stars.forEach(star => {
    star.addEventListener('click', function() {
      const value = parseInt(this.getAttribute('data-value'));
      starsContainer.setAttribute('data-rating', value);
      updateStars(value);
    });

    star.addEventListener('mouseover', function() {
      const value = parseInt(this.getAttribute('data-value'));
      updateStars(value);
    });

    star.addEventListener('mouseout', function() {
      const currentRating = parseInt(starsContainer.getAttribute('data-rating'));
      updateStars(currentRating);
    });
  });

  // Submit rating
  submitBtn.addEventListener('click', function() {
    const rating = parseInt(starsContainer.getAttribute('data-rating'));
    
    if (rating === 0) {
      alert('Please select a rating first');
      return;
    }

    const feedback = {
      rating: rating,
      comment: ratingComment.value.trim(),
      date: new Date().toISOString()
    };

    ratings.push(feedback);
    localStorage.setItem('storeRatings', JSON.stringify(ratings));
    
    // Show thank you message
    thankYouMsg.style.display = 'block';
    ratingComment.value = '';
    starsContainer.setAttribute('data-rating', '0');
    updateStars(0);
    
    // Update stats
    updateStats();
    
    // Hide thank you after 3 seconds
    setTimeout(() => {
      thankYouMsg.style.display = 'none';
    }, 3000);
  });

  // Helper functions
  function updateStars(value) {
    stars.forEach(star => {
      const starValue = parseInt(star.getAttribute('data-value'));
      if (starValue <= value) {
        star.classList.add('active');
        star.textContent = '★';
      } else {
        star.classList.remove('active');
        star.textContent = '☆';
      }
    });
  }

  function updateStats() {
    if (ratings.length > 0) {
      const total = ratings.length;
      const sum = ratings.reduce((acc, curr) => acc + curr.rating, 0);
      const average = (sum / total).toFixed(1);
      
      avgRatingEl.textContent = average;
      totalRatingsEl.textContent = total;
    } else {
      avgRatingEl.textContent = '0';
      totalRatingsEl.textContent = '0';
    }
  }
});

// Tambahkan ini jika perlu tracking klik
document.querySelector('.download-btn.rar').addEventListener('click', function(e) {
  // Opsional: Kirim data analytics
  console.log('Download RAR initiated');
  
  // Opsional: Timer redirect jika perlu
  setTimeout(() => {
    window.location.href = "https://mega.nz/file/sHEQEQYC#KG4uReulwTmjQ8WVXjsQsiKvc33Xisvdh04m2Y8pC-A";
  }, 300);
});
