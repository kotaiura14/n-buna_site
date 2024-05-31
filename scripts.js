function showSection(section) {
    // 現在アクティブなセクションを取得
    let currentActive = document.querySelector('.section.active');
    // 新しいアクティブなセクションを取得
    let newActive = document.getElementById(section);
    // 現在のアクティブなボタンのインデックスを取得
    let currentIndex = Array.from(document.querySelectorAll('.nav button')).indexOf(document.querySelector('.nav button.active'));
    // クリックされたボタンのインデックスを取得
    let newIndex = Array.from(document.querySelectorAll('.nav button')).indexOf(event.target);

    if (currentActive) {
        // 現在のアクティブなセクションをフェードアウトさせる
        currentActive.classList.remove('fade-in', 'slide-left', 'slide-right');
        currentActive.classList.add('fade-out');

        // フェードアウトが終了してから新しいセクションを表示
        setTimeout(() => {
            currentActive.classList.remove('active', 'fade-out');
            newActive.classList.remove('slide-left', 'slide-right', 'fade-out', 'active');

            // 新しいセクションのスライド方向を設定
            if (newIndex > currentIndex) {
                newActive.classList.add('slide-left');
            } else {
                newActive.classList.add('slide-right');
            }

            // 新しいセクションをアクティブにする
            newActive.classList.add('active');
        }, 200); // 200ミリ秒の遅延を追加

    } else {
        // 初めてセクションが表示される場合は、直接表示する
        newActive.classList.add('active');
        if (newIndex > currentIndex) {
            newActive.classList.add('slide-left');
        } else {
            newActive.classList.add('slide-right');
        }
    }

    // アクティブなボタンを更新する
    document.querySelectorAll('.nav button').forEach(button => button.classList.remove('active'));
    event.target.classList.add('active');
}

function toggleInfo() {
    // ページのフェードアウトを開始する
    document.body.classList.add('fade-out');
    setTimeout(() => {
        // 要素を取得
        let artistName = document.getElementById('artist-name');
        let artistImage = document.getElementById('artist-image');
        let artistDescription = document.getElementById('artist-description');
        let nBunaInfo = document.getElementById('n-buna-info');
        let yorushikaInfo = document.getElementById('yorushika-info');

        if (artistName.textContent === 'n-buna') {
            // アーティスト情報をヨルシカに切り替える
            artistName.textContent = 'ヨルシカ';
            artistImage.style.backgroundImage = "url('images/artist/yorushika.jpg')";
            nBunaInfo.style.display = 'none';
            yorushikaInfo.style.display = 'block';
            document.body.style.backgroundColor = "#ffe4e1";
        } else {
            // アーティスト情報をn-bunaに切り替える
            artistName.textContent = 'n-buna';
            artistImage.style.backgroundImage = "url('images/artist/tako.jpg')";
            nBunaInfo.style.display = 'block';
            yorushikaInfo.style.display = 'none';
            document.body.style.backgroundColor = "#d3f8e2";
        }

        // ページのフェードインを開始する
        document.body.classList.remove('fade-out');
        document.body.classList.add('fade-in');

        // フェードインが終了したらフェードクラスを削除する
        setTimeout(() => {
            document.body.classList.remove('fade-in');
        }, 1000);
    }, 1000);
}

function erasePage() {
    // ページの消去エフェクトを開始する
    let eraserEffect = document.getElementById('eraser-effect');
    eraserEffect.classList.add('erasing');
    eraserEffect.addEventListener('animationend', () => {
        eraserEffect.classList.remove('erasing');
    });
}

let slideIndex = 0;
const slides = document.querySelectorAll('.songs-slideshow .slides img');
const totalSlides = slides.length;
let slideshowPlaying = true;
let slideshowInterval;

function showSlides() {
    if (slideshowPlaying) {
        // スライドを表示する
        slides.forEach((slide, index) => {
            slide.style.opacity = (index === slideIndex) ? '1' : '0';
        });
        // スライドに関連する曲の情報を更新する
        updateSongDescription(slideIndex);
        slideIndex = (slideIndex + 1) % totalSlides;
    }
}

function updateSongDescription(index) {
    const slides = document.querySelectorAll('.songs-slideshow .slides img');
    if (index < slides.length) {
        // スライドに関連する曲の情報を表示する
        const description = JSON.parse(slides[index].dataset.songDescription);
        document.getElementById('song-title').innerText = description.title || 'N/A';
        document.getElementById('release-date').innerText = description.releaseDate ? `投稿日：${description.releaseDate}` : 'N/A';
        document.getElementById('song-composer').innerText = description.composer ? `作曲：${description.composer}` : 'N/A';
        document.getElementById('song-arranger').innerText = description.arranger ? `編曲：${description.arranger}` : 'N/A';
        document.getElementById('song-illustration').innerText = description.illustration ? `イラスト：${description.illustration}` : 'N/A';
        document.getElementById('song-vocals').innerText = description.vocals ? `唄：${description.vocals}` : 'N/A';
        document.getElementById('author-comment').innerText = description.authorComment ? `作者コメント：${description.authorComment}` : 'N/A';
        document.getElementById('site-comment').innerHTML = description.siteComment ? `サイト作者コメント：${description.siteComment}` : 'N/A';
    }
}

function toggleSlideshow() {
    // スライドショーの再生/停止を切り替える
    slideshowPlaying = !slideshowPlaying;
    if (slideshowPlaying) {
        slideshowInterval = setInterval(showSlides, 2000);
    } else {
        clearInterval(slideshowInterval);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // ページの読み込みが完了したら、スライドショーを開始する
    slideshowInterval = setInterval(showSlides, 2000); // 2秒ごとに画像を切り替え
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
    // 背景画像を変更する
    currentIndex = (currentIndex + 1) % images.length;
    document.body.style.backgroundImage = `url(${images[currentIndex]})`;
}

setInterval(changeBackground, 10000); // 10秒ごとに背景画像を変更

let albumIndex = 0;
const albumSlides = document.querySelectorAll('.albums-slideshow .slides img');
const totalAlbumSlides = albumSlides.length;
let albumSlideshowPlaying = true;
let albumSlideshowInterval;

function showAlbumSlides() {
    if (albumSlideshowPlaying) {
        // アルバムスライドを表示する
        albumSlides.forEach((slide, index) => {
            slide.style.opacity = (index === albumIndex) ? '1' : '0';
        });
        // アルバムに関連する情報を更新する
        updateAlbumDescription(albumIndex);
        albumIndex = (albumIndex + 1) % totalAlbumSlides;
    }
}

function updateAlbumDescription(index) {
    const slides = document.querySelectorAll('.albums-slideshow .slides img');
    if (index < slides.length) {
        // アルバムに関連する情報を表示する
        const description = JSON.parse(slides[index].dataset.albumDescription);
        document.getElementById('album-title').innerText = description.title || 'N/A';
        document.getElementById('album-overview').innerHTML = description.overview || ''; // アルバムの概要を更新
        const trackList = document.getElementById('album-tracks');
        trackList.innerHTML = ''; // 以前のトラックをクリアする
        if (description.tracks) {
            description.tracks.forEach(track => {
                const li = document.createElement('li');
                li.innerText = track;
                trackList.appendChild(li);
            });
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // ページの読み込みが完了したら、アルバムスライドショーを開始する
    albumSlideshowInterval = setInterval(showAlbumSlides, 10000); // 10秒ごとに画像を切り替え
    showAlbumSlides(); // 初回のスライド表示と概要更新を行う
    document.querySelector('.albums-slideshow').addEventListener('click', () => {
        albumSlideshowPlaying = !albumSlideshowPlaying;
        if (albumSlideshowPlaying) {
            albumSlideshowInterval = setInterval(showAlbumSlides, 10000);
        } else {
            clearInterval(albumSlideshowInterval);
        }
    });
});
