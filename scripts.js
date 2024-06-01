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
    document.body.classList.add('fade-out');
    setTimeout(() => {
        let artistName = document.getElementById('artist-name');
        let artistImage = document.getElementById('artist-image');
        
        let sections = ['artist', 'songs', 'albums'];
        sections.forEach(section => {
            let nBunaSection = document.querySelectorAll(`#${section} .n-buna-info`);
            let yorushikaSection = document.querySelectorAll(`#${section} .yorushika-info`);
            
            nBunaSection.forEach(item => item.style.display = artistName.textContent === 'n-buna' ? 'none' : 'block');
            yorushikaSection.forEach(item => item.style.display = artistName.textContent === 'n-buna' ? 'block' : 'none');
        });
        
        if (artistName.textContent === 'n-buna') {
            artistName.textContent = 'ヨルシカ';
            artistImage.style.backgroundImage = "url('images/artist/yorushika.jpg')";
            document.body.style.backgroundColor = "#ffe4e1";
        } else {
            artistName.textContent = 'n-buna';
            artistImage.style.backgroundImage = "url('images/artist/tako.jpg')";
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
    // ページの消去エフェクトを開始する
    let eraserEffect = document.getElementById('eraser-effect');
    eraserEffect.classList.add('erasing');
    eraserEffect.addEventListener('animationend', () => {
        eraserEffect.classList.remove('erasing');
    });
}

let songSlideIndex = 0;
let albumSlideIndex = 0;
const songSlides = document.querySelectorAll('.songs-slideshow .slides img');
const albumSlides = document.querySelectorAll('.albums-slideshow .slides img');
const totalSongSlides = songSlides.length;
const totalAlbumSlides = albumSlides.length;
let songSlideshowPlaying = true;
let albumSlideshowPlaying = true;
let songSlideshowInterval;
let albumSlideshowInterval;

function showSongSlides() {
    songSlides.forEach((slide, index) => {
        slide.style.opacity = (index === songSlideIndex) ? '1' : '0';
    });
    updateSongDescription(songSlideIndex);
    songSlideIndex = (songSlideIndex + 1) % totalSongSlides; // インデックスをインクリメントし、ループさせる
}

function showAlbumSlides() {
    albumSlides.forEach((slide, index) => {
        slide.style.opacity = (index === albumSlideIndex) ? '1' : '0';
    });
    updateAlbumDescription(albumSlideIndex);
    albumSlideIndex = (albumSlideIndex + 1) % totalAlbumSlides; // インデックスをインクリメントし、ループさせる
}

function updateSongDescription(index) {
    const slides = document.querySelectorAll('.songs-slideshow .slides img');
    let description;
    if (document.getElementById('artist-name').textContent === 'n-buna') {
        description = JSON.parse(slides[index].dataset.nBunaSongDescription);
    } else {
        description = JSON.parse(slides[index].dataset.yorushikaSongDescription);
    }
    if (description) {
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

function updateAlbumDescription(index) {
    const slides = document.querySelectorAll('.albums-slideshow .slides img');
    let description;
    if (document.getElementById('artist-name').textContent === 'n-buna') {
        description = JSON.parse(slides[index].dataset.nBunaAlbumDescription);
    } else {
        description = JSON.parse(slides[index].dataset.yorushikaAlbumDescription);
    }
    if (description) {
        document.getElementById('album-title').innerText = description.title || 'N/A';
        document.getElementById('album-overview').innerHTML = description.overview || '';
        const trackList = document.getElementById('album-tracks');
        trackList.innerHTML = '';
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
    songSlideshowInterval = setInterval(showSongSlides, 2000);
    albumSlideshowInterval = setInterval(showAlbumSlides, 10000);
    showSongSlides();
    showAlbumSlides();
    document.querySelector('.songs-slideshow').addEventListener('click', () => {
        songSlideshowPlaying = !songSlideshowPlaying;
        if (songSlideshowPlaying) {
            songSlideshowInterval = setInterval(showSongSlides, 2000);
        } else {
            clearInterval(songSlideshowInterval);
        }
    });
    document.querySelector('.albums-slideshow').addEventListener('click', () => {
        albumSlideshowPlaying = !albumSlideshowPlaying;
        if (albumSlideshowPlaying) {
            albumSlideshowInterval = setInterval(showAlbumSlides, 10000);
        } else {
            clearInterval(albumSlideshowInterval);
        }
    });
});

