// スライドショー
let slideIndex = 0;
showSlides();

function showSlides() {
    let slides = document.getElementsByClassName("mySlides");
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }
    slideIndex++;
    if (slideIndex > slides.length) {
        slideIndex = 1;
    }    
    slides[slideIndex - 1].style.display = "block";  
    setTimeout(showSlides, 3000); // 画像を3秒ごとに変更
}

// 各ページ推移
function scrollToSection(sectionId) {
    var section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const nBunaTab = document.getElementById('n-buna-tab');
    const yorushikaTab = document.getElementById('yorushika-tab');
    const nBunaSection = document.getElementById('n-buna-section');
    const yorushikaSection = document.getElementById('yorushika-section');
    const yorushika_album = document.getElementById('yorushika_album-section');
    const nBuna_album = document.getElementById('n-buna_album-section');
    const yorushika_pre = document.getElementById('yorushika_pre-section');
    const nBuna_pre = document.getElementById('n-buna_pre-section');

    nBunaTab.addEventListener('click', function(event) {
        event.preventDefault();

        nBunaSection.scrollIntoView({ behavior: 'smooth' });
        nBunaTab.classList.add('active');
        yorushikaTab.classList.remove('active');
    });

    yorushikaTab.addEventListener('click', function(event) {
        event.preventDefault();
        
        yorushikaSection.scrollIntoView({ behavior: 'smooth' });
        yorushikaTab.classList.add('active');
        nBunaTab.classList.remove('active');
    });

    yorushika_album.addEventListener('click', function(event) {
        event.preventDefault();

        yorushika_album.scrollIntoView({ behavior: 'smooth' });
        yorushikaTab.classList.add('active');
        nBunaTab.classList.remove('active');
    });

    nBuna_album.addEventListener('click', function(event) {
        event.preventDefault();

        nBuna_album.scrollIntoView({ behavior: 'smooth' });
        nBunaTab.classList.add('active');
        yorushikaTab.classList.remove('active');
    });

    yorushika_pre.addEventListener('click', function(event) {
        event.preventDefault();

        yorushika_pre.scrollIntoView({ behavior: 'smooth' });
        yorushikaTab.classList.add('active');
        nBunaTab.classList.remove('active');
    });

    nBuna_pre.addEventListener('click', function(event) {
        event.preventDefault();

        nBuna_pre.scrollIntoView({ behavior: 'smooth' });
        nBunaTab.classList.add('active');
        yorushikaTab.classList.remove('active');
    });
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

// ローディング画面
window.addEventListener('load', function() {
    var loadingScreen = document.getElementById('loading-screen');
    loadingScreen.style.display = 'none';
});


