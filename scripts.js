function showSection(section) {
    let currentActive = document.querySelector('.section.active');
    let newActive = document.getElementById(section);

    currentActive.classList.remove('active');
    setTimeout(() => {
        newActive.classList.add('active');
    }, 1000); // 遷移時間に合わせた遅延
}

function toggleInfo() {
    let artistName = document.getElementById('artist-name');
    let artistImage = document.getElementById('artist-image');
    let artistDescription = document.getElementById('artist-description');
    let nBunaInfo = document.getElementById('n-buna-info');
    let yorushikaInfo = document.getElementById('yorushika-info');

    if (artistName.textContent === 'n-buna') {
        artistName.textContent = 'ヨルシカ';
        artistImage.style.backgroundImage = "url('images/artist/yorushika.jpg')";
        nBunaInfo.style.display = 'none';
        yorushikaInfo.style.display = 'block';
        document.body.style.backgroundColor = "#ffe4e1"; // ヨルシカ用の背景色
    } else {
        artistName.textContent = 'n-buna';
        artistImage.style.backgroundImage = "url('images/artist/tako.jpg')";
        nBunaInfo.style.display = 'block';
        yorushikaInfo.style.display = 'none';
        document.body.style.backgroundColor = "#d3f8e2"; // n-buna用の背景色
    }
}

function erasePage() {
    let eraserEffect = document.getElementById('eraser-effect');
    eraserEffect.classList.add('erasing');
    eraserEffect.addEventListener('animationend', () => {
        eraserEffect.classList.remove('erasing');
    });
}

let slideIndex = 0;
const slides = document.querySelectorAll('.slides img');
const totalSlides = slides.length;
let slideshowPlaying = true;
let slideshowInterval;

function showSlides() {
    if (slideshowPlaying) {
        slides.forEach((slide, index) => {
            slide.style.opacity = (index === slideIndex) ? '1' : '0';
        });
        updateSongDescription(slideIndex);
        slideIndex = (slideIndex + 1) % totalSlides;
    }
}

function updateSongDescription(index) {
    const description = JSON.parse(slides[index].dataset.description);
    document.getElementById('song-title').innerText = description.title;
    document.getElementById('release-date').innerText = `投稿日：${description.releaseDate}`;
    document.getElementById('song-composer').innerText = `作曲：${description.composer}`;
    document.getElementById('song-arranger').innerText = `編曲：${description.arranger}`;
    document.getElementById('song-illustration').innerText = `イラスト：${description.illustration}`;
    document.getElementById('song-vocals').innerText = `唄：${description.vocals}`;
    document.getElementById('author-comment').innerText = `作者コメント：${description.authorComment}`;
    document.getElementById('site-comment').innerText = `サイト作者コメント：${description.siteComment}`;
}

function toggleSlideshow() {
    slideshowPlaying = !slideshowPlaying;
    if (slideshowPlaying) {
        slideshowInterval = setInterval(showSlides, 2000);
    } else {
        clearInterval(slideshowInterval);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    slideshowInterval = setInterval(showSlides, 10000); // 10秒ごとに画像を切り替え
    showSlides(); // 初回のスライド表示と概要更新を行う
    document.querySelector('.slides').addEventListener('click', toggleSlideshow);
});
