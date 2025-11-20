let typedInstance = null;

document.addEventListener('DOMContentLoaded', () => {
    const bgMusic = document.getElementById('bg-music');
    const musicControl = document.getElementById('music-control');
    const musicIcon = document.getElementById('music-icon');
    const btnStart = document.getElementById('btn-start');

    // Start Button Logic
    if (btnStart) {
        btnStart.addEventListener('click', () => {
            // Play Music
            if (bgMusic) {
                bgMusic.volume = 0.5;
                bgMusic.play().catch(e => console.log("Audio play failed:", e));
            }
            if (musicControl) musicControl.classList.remove('hidden');

            // Fire Confetti
            fireConfetti();

            // Go to Step 2
            nextStep(2);
        });
    }

    // Music Control Toggle
    let isPlaying = true;
    if (musicControl) {
        musicControl.addEventListener('click', () => {
            if (isPlaying) {
                bgMusic.pause();
                musicIcon.classList.remove('fa-volume-up');
                musicIcon.classList.add('fa-volume-mute');
            } else {
                bgMusic.play();
                musicIcon.classList.remove('fa-volume-mute');
                musicIcon.classList.add('fa-volume-up');
            }
            isPlaying = !isPlaying;
        });
    }

    // Carousel Logic
    const track = document.getElementById('carousel-track');
    const slides = track ? Array.from(track.children) : [];
    const nextButton = document.getElementById('next-slide');
    const prevButton = document.getElementById('prev-slide');
    const indicators = document.querySelectorAll('.indicator');
    let currentSlideIndex = 0;
    let carouselInterval;

    function updateCarousel(index) {
        if (!track) return;
        track.style.transform = `translateX(-${index * 100}%)`;

        indicators.forEach((ind, i) => {
            if (i === index) {
                ind.classList.add('active');
            } else {
                ind.classList.remove('active');
            }
        });
        currentSlideIndex = index;
    }

    function nextSlide() {
        let newIndex = currentSlideIndex + 1;
        if (newIndex >= slides.length) newIndex = 0;
        updateCarousel(newIndex);
    }

    function prevSlide() {
        let newIndex = currentSlideIndex - 1;
        if (newIndex < 0) newIndex = slides.length - 1;
        updateCarousel(newIndex);
    }

    if (nextButton) {
        nextButton.addEventListener('click', () => {
            nextSlide();
            resetCarouselInterval();
        });
    }

    if (prevButton) {
        prevButton.addEventListener('click', () => {
            prevSlide();
            resetCarouselInterval();
        });
    }

    indicators.forEach((ind, i) => {
        ind.addEventListener('click', () => {
            updateCarousel(i);
            resetCarouselInterval();
        });
    });

    function startCarousel() {
        if (carouselInterval) clearInterval(carouselInterval);
        carouselInterval = setInterval(nextSlide, 3000);
    }

    function stopCarousel() {
        if (carouselInterval) clearInterval(carouselInterval);
    }

    function resetCarouselInterval() {
        stopCarousel();
        startCarousel();
    }

    // Expose start/stop to global scope for nextStep function
    window.startCarousel = startCarousel;
    window.stopCarousel = stopCarousel;
});

// Navigation Function
function nextStep(stepNumber) {
    // Hide all steps
    document.querySelectorAll('.step-section').forEach(el => {
        el.classList.remove('active');
        setTimeout(() => {
            if (!el.classList.contains('active')) el.style.display = 'none';
        }, 500); // Wait for fade out
    });

    // Show target step
    const targetStep = document.getElementById(`step-${stepNumber}`);
    if (targetStep) {
        targetStep.style.display = 'flex';
        // Small delay to allow display:flex to apply before opacity transition
        setTimeout(() => {
            targetStep.classList.add('active');
        }, 50);

        // Special actions for specific steps
        if (stepNumber === 2) {
            initTyped();
            if (window.stopCarousel) window.stopCarousel();
        } else if (stepNumber === 3) {
            if (window.startCarousel) window.startCarousel();
        } else {
            if (window.stopCarousel) window.stopCarousel();
        }

        if (stepNumber === 5) {
            fireConfetti();
        }

        // Start carousel on step 3
        if (stepNumber === 3) {
            startCarousel();
        } else {
            stopCarousel();
        }
    }
}

// Typed.js Initialization
function initTyped() {
    if (typedInstance) {
        typedInstance.destroy();
    }

    // Check if element exists before initializing
    if (document.getElementById('typed-text')) {
        typedInstance = new Typed('#typed-text', {
            strings: [
                "Chúc thầy 20/11 thật nhiều niềm vui!",
                "Cảm ơn thầy vì đã luôn tận tâm với chúng em.",
                "Chúc thầy luôn hạnh phúc và tràn đầy cảm hứng!",
                "From LE353 with love ❤️"
            ],
            typeSpeed: 40,
            backSpeed: 20,
            loop: true
        });
    }
}

// Confetti Function
function fireConfetti() {
    var count = 200;
    var defaults = {
        origin: { y: 0.7 }
    };

    function fire(particleRatio, opts) {
        confetti(Object.assign({}, defaults, opts, {
            particleCount: Math.floor(count * particleRatio)
        }));
    }

    fire(0.25, {
        spread: 26,
        startVelocity: 55,
    });
    fire(0.2, {
        spread: 60,
        startVelocity: 60,
    });
    fire(0.35, {
        spread: 100,
        decay: 0.91,
        scalar: 0.8
    });
    fire(0.1, {
        spread: 120,
        startVelocity: 25,
        decay: 0.92,
        scalar: 1.2
    });
    fire(0.1, {
        spread: 120,
        startVelocity: 45,
    });
}
