function showCard(id) {
    document.querySelectorAll("._btn").forEach(btn => {
        btn.classList.remove('active');
    });
    
    document.querySelectorAll(".card").forEach(card => {
        card.classList.remove("active");
    });

    document.getElementById(id).classList.add("active");
    
    const activeBtn = document.querySelector(`#${id === 'projects' ? 'btn1' : id === 'games' ? 'btn2' : 'btn3'}`);
    activeBtn.classList.add('active');
}

document.getElementById("btn1").addEventListener("click", () => {
    showCard("projects");
});

document.getElementById("btn2").addEventListener("click", () => {
    showCard("games");
});

document.getElementById("btn3").addEventListener("click", () => {
    showCard("about");
});

document.addEventListener("DOMContentLoaded", () => {
    showCard("projects");
    startCarousel();
});

let currentImageIndex = 0;
let images = [];

async function loadCarouselImages() {
    try {
        const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
        const carouselImages = [];
        
        for (let i = 1; i <= 100; i++) {
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
                
                if (carouselImages.length >= 6) break; 
            }
            if (carouselImages.length >= 6) break;
        }
        //placeholders
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
    
    carousel.innerHTML = '';
    
    images.forEach((imageData, index) => {
        const img = document.createElement('img');
        img.src = imageData.src;
        img.alt = imageData.alt;
        img.className = `carousel-image ${index === 0 ? 'active' : ''}`;
        carousel.appendChild(img);
    });
    
    images = document.querySelectorAll('.carousel-image');
    
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
