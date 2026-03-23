function showCard(id) {
    // Remove active class from all buttons
    document.querySelectorAll("._btn").forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Hide all cards
    document.querySelectorAll(".card").forEach(card => {
        card.classList.remove("display");
    });

    // Show the selected card
    document.getElementById(id).classList.add("display");

    // Show the card contents container
    document.querySelector(".card.contents").classList.add("show");
    
    // Add active class to the clicked button
    const activeBtn = document.querySelector(`#${id === 'work' ? 'btn1' : id === 'about' ? 'btn2' : 'btn3'}`);
    activeBtn.classList.add('active');
}

// Button event listeners
document.getElementById("btn1").addEventListener("click", () => {
    showCard("work");
});

document.getElementById("btn2").addEventListener("click", () => {
    showCard("about");
});

// Show "About" content by default on page load
document.addEventListener("DOMContentLoaded", () => {
    showCard("about");
    startCarousel();
});

// Carousel functionality
let currentImageIndex = 0;
let images = [];

async function loadCarouselImages() {
    try {
        // Define common image extensions
        const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
        const carouselImages = [];
        
        // Try to load common project image names
        for (let i = 1; i <= 10; i++) {
            for (const ext of imageExtensions) {
                const imgPath = `./resources/carousel/carousel_${i}${ext}`;
                const img = new Image();
                img.src = imgPath;
                
                await new Promise((resolve) => {
                    img.onload = () => {
                        carouselImages.push({
                            src: imgPath,
                            alt: `Project ${i}`
                        });
                        resolve();
                    };
                    img.onerror = () => resolve();
                });
                
                if (carouselImages.length >= 3) break; // Stop after finding 3 images
            }
            if (carouselImages.length >= 3) break;
        }
        
        // If no images found, use placeholders
        if (carouselImages.length === 0) {
            for (let i = 1; i <= 3; i++) {
                carouselImages.push({
                    src: `https://picsum.photos/seed/project${i}/250/400.jpg`,
                    alt: `Project ${i}`
                });
            }
        }
        
        return carouselImages;
    } catch (error) {
        console.error('Error loading carousel images:', error);
        return [];
    }
}

async function initializeCarousel() {
    images = await loadCarouselImages();
    const carousel = document.querySelector('.carousel');
    
    // Clear existing images
    carousel.innerHTML = '';
    
    // Add loaded images to carousel
    images.forEach((imageData, index) => {
        const img = document.createElement('img');
        img.src = imageData.src;
        img.alt = imageData.alt;
        img.className = `carousel-image ${index === 0 ? 'active' : ''}`;
        carousel.appendChild(img);
    });
    
    // Update images reference
    images = document.querySelectorAll('.carousel-image');
    
    // Start rotation if images exist
    if (images.length > 0) {
        setInterval(showNextImage, 3000);
    }
}

function showNextImage() {
    if (images.length === 0) return;
    
    images[currentImageIndex].classList.remove('active');
    currentImageIndex = (currentImageIndex + 1) % images.length;
    images[currentImageIndex].classList.add('active');
}

function startCarousel() {
    initializeCarousel();
}
