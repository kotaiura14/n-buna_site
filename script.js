document.addEventListener('DOMContentLoaded', function() {
    const nBunaTab = document.getElementById('n-buna-tab');
    const yorushikaTab = document.getElementById('yorushika-tab');
    const nBunaSection = document.getElementById('n-buna-section');
    const yorushikaSection = document.getElementById('yorushika-section');

    nBunaTab.addEventListener('click', function() {
        yorushikaSection.classList.add('hidden');
        nBunaSection.classList.remove('hidden');
        nBunaTab.classList.add('active');
        yorushikaTab.classList.remove('active');
        ScrollReveal().reveal('#n-buna-section .content', {
            delay: 200,
            origin: 'left'
        });
    });

    yorushikaTab.addEventListener('click', function() {
        nBunaSection.classList.add('hidden');
        yorushikaSection.classList.remove('hidden');
        yorushikaTab.classList.add('active');
        nBunaTab.classList.remove('active');
        ScrollReveal().reveal('#yorushika-section .content', {
            delay: 200,
            origin: 'left'
        });
    });

    // 初期状態
    nBunaTab.click();
    
});

ScrollReveal({
    reset: true,
    distance: '60px',
    duration: 2000,
    delay: 200
});

ScrollReveal().reveal('.main-title, .section-title', {
    delay: 200,
    origin: 'left'
});
ScrollReveal().reveal('.sec-01 .image, .sec-02 .image, .sec-03 .image, .sec-04 .image, .sec-05 .image, .sec-06 .image', {
    delay: 500,
    origin: 'top'
});
ScrollReveal().reveal('.text-box, .info', {
    delay: 600,
    origin: 'bottom'
});

// Slideshow
let slideIndex = 0;
showSlides();

function showSlides() {
    let slides = document.getElementsByClassName("mySlides");
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }
    slideIndex++;
    if (slideIndex > slides.length) {slideIndex = 1}    
    slides[slideIndex-1].style.display = "block";  
    setTimeout(showSlides, 3000); // Change image every 3 seconds
}