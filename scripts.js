function showSection(section) {
    let currentActive = document.querySelector('.section.active');
    let newActive = document.getElementById(section);
    let currentIndex = Array.from(document.querySelectorAll('.nav button')).indexOf(document.querySelector('.nav button.active'));
    let newIndex = Array.from(document.querySelectorAll('.nav button')).indexOf(event.target);

    if (currentActive) {
        currentActive.classList.remove('fade-in', 'slide-left', 'slide-right');
        currentActive.classList.add('fade-out');

        // フェードアウトが終了してから新しいセクションを表示
        setTimeout(() => {
            currentActive.classList.remove('active', 'fade-out');
            newActive.classList.remove('slide-left', 'slide-right', 'fade-out', 'active');

            if (newIndex > currentIndex) {
                newActive.classList.add('slide-left');
            } else {
                newActive.classList.add('slide-right');
            }

            newActive.classList.add('active');
        }, 200); // 200ミリ秒の遅延を追加

    } else {
        newActive.classList.add('active');
        if (newIndex > currentIndex) {
            newActive.classList.add('slide-left');
        } else {
            newActive.classList.add('slide-right');
        }
    }

    // アクティブボタンの更新
    document.querySelectorAll('.nav button').forEach(button => button.classList.remove('active'));
    event.target.classList.add('active');
}

function toggleInfo() {
    document.body.classList.add('fade-out');
    setTimeout(() => {
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
            document.body.style.backgroundColor = "#ffe4e1";
        } else {
            artistName.textContent = 'n-buna';
            artistImage.style.backgroundImage = "url('images/artist/tako.jpg')";
            nBunaInfo.style.display = 'block';
            yorushikaInfo.style.display = 'none';
            document.body.style.backgroundColor = "#d3f8e2";
        }

        document.body.classList.remove('fade-out');
        document.body.classList.add('fade-in');

        setTimeout(() => {
            document.body.classList.remove('fade-in');
        }, 1000);
    }, 1000);
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
    document.getElementById('site-comment').innerHTML = `サイト作者コメント：${description.siteComment}`;
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

let images = [
    'images/background/bremen.jpg',
    'images/background/cloud.jpg',
    'images/background/gran.jpg',
    'images/background/laland.jpg',
];
let currentIndex = 0;

function changeBackground() {
    currentIndex = (currentIndex + 1) % images.length;
    document.body.style.backgroundImage = `url(${images[currentIndex]})`;
}

setInterval(changeBackground, 10000); // 10秒ごとに背景画像を変更
