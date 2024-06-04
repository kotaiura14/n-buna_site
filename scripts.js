let songSlideshowInterval;
let albumSlideshowInterval;
let songSlideIndex = 0;
let albumSlideIndex = 0;
let songSlideshowPlaying = true;
let albumSlideshowPlaying = true;

document.addEventListener('DOMContentLoaded', () => {
    updateSlidesVisibility(); // スライドショーの表示を初期化
    resetSlideIntervals(); // 初期インターバル設定

    // 初回表示
    showSongSlides();
    showAlbumSlides();

    // スライドショーのクリックイベントリスナーを設定
    document.querySelector('.songs-slideshow').addEventListener('click', toggleSongSlideshow);
    document.querySelector('.albums-slideshow').addEventListener('click', toggleAlbumSlideshow);
});

// スライドの表示を更新する関数
function updateSlidesVisibility() {
    const artistName = document.getElementById('artist-name').textContent.trim();
    const isNBuna = artistName === 'n-buna';

    // スライドショーの表示を切り替える
    document.querySelectorAll('.songs-slideshow .slides').forEach(slide => {
        slide.style.display = slide.classList.contains(isNBuna ? 'n-buna-info' : 'yorushika-info') ? 'block' : 'none';
    });

    document.querySelectorAll('.albums-slideshow .slides').forEach(slide => {
        slide.style.display = slide.classList.contains(isNBuna ? 'n-buna-info' : 'yorushika-info') ? 'block' : 'none';
    });

    resetSlideIndexes(); // スライドのインデックスをリセット
    updateSongDescription(songSlideIndex); // 即時更新
    updateAlbumDescription(albumSlideIndex); // 即時更新
}

// スライドのインデックスをリセットする関数
function resetSlideIndexes() {
    songSlideIndex = 0;
    albumSlideIndex = 0;
}

// セクションを表示する関数
function showSection(section, event) {
    if (event) event.preventDefault();

    let currentActive = document.querySelector('.section.active');
    let newActive = document.getElementById(section);
    let currentIndex = Array.from(document.querySelectorAll('.nav button')).indexOf(document.querySelector('.nav button.active'));
    let newIndex = Array.from(document.querySelectorAll('.nav button')).indexOf(event.target);

    if (currentActive) {
        currentActive.classList.remove('fade-in', 'slide-left', 'slide-right');
        currentActive.classList.add('fade-out');
        setTimeout(() => {
            currentActive.classList.remove('active', 'fade-out');
            newActive.classList.remove('slide-left', 'slide-right', 'fade-out', 'active');
            if (newIndex > currentIndex) {
                newActive.classList.add('slide-left');
            } else {
                newActive.classList.add('slide-right');
            }
            newActive.classList.add('active');
            updateSlidesVisibility();
            resetSlideIntervals(); // インターバルをリセット
            showSongSlides(); // スライド表示の即時更新
            showAlbumSlides(); // スライド表示の即時更新
        }, 200);
    } else {
        newActive.classList.add('active');
        if (newIndex > currentIndex) {
            newActive.classList.add('slide-left');
        } else {
            newActive.classList.add('slide-right');
        }
        updateSlidesVisibility();
        resetSlideIntervals(); // インターバルをリセット
        showSongSlides(); // スライド表示の即時更新
        showAlbumSlides(); // スライド表示の即時更新
    }

    document.querySelectorAll('.nav button').forEach(button => button.classList.remove('active'));
    event.target.classList.add('active');
}

function resetSlideIntervals() {
    clearInterval(songSlideshowInterval);
    clearInterval(albumSlideshowInterval);
    songSlideshowInterval = setInterval(showSongSlides, 2000);
    albumSlideshowInterval = setInterval(showAlbumSlides, 10000);
}

// スライドショーの表示を切り替える関数
function showSongSlides() {
    const songSlides = Array.from(document.querySelectorAll('.songs-slideshow .slides img')).filter(slide => slide.parentElement.style.display !== 'none');
    const totalSongSlides = songSlides.length;

    if (totalSongSlides > 0) {
        songSlides.forEach((slide, index) => {
            slide.style.opacity = '0';
        });

        songSlides[songSlideIndex].style.opacity = '1';

        updateSongDescription(songSlideIndex);

        songSlideIndex = (songSlideIndex + 1) % totalSongSlides;
    }
}

// スライドショーの表示を切り替える関数
function showAlbumSlides() {
    const albumSlides = Array.from(document.querySelectorAll('.albums-slideshow .slides img')).filter(slide => slide.parentElement.style.display !== 'none');
    const totalAlbumSlides = albumSlides.length;

    if (totalAlbumSlides > 0) {
        albumSlides.forEach((slide, index) => {
            slide.style.opacity = '0';
        });

        albumSlides[albumSlideIndex].style.opacity = '1';

        updateAlbumDescription(albumSlideIndex);

        albumSlideIndex = (albumSlideIndex + 1) % totalAlbumSlides;
    }
}

// 曲の説明を更新する関数
function updateSongDescription(index) {
    const slides = Array.from(document.querySelectorAll('.songs-slideshow .slides img')).filter(slide => slide.parentElement.style.display !== 'none');
    let description;
    if (document.getElementById('artist-name').textContent.trim() === 'n-buna') {
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

// アルバムの説明を更新する関数
function updateAlbumDescription(index) {
    const slides = Array.from(document.querySelectorAll('.albums-slideshow .slides img')).filter(slide => slide.parentElement.style.display !== 'none');
    let description;
    if (document.getElementById('artist-name').textContent.trim() === 'n-buna') {
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

// 曲のスライドショーの再生/停止を切り替える関数
function toggleSongSlideshow() {
    songSlideshowPlaying = !songSlideshowPlaying;
    if (songSlideshowPlaying) {
        songSlideshowInterval = setInterval(showSongSlides, 2000);
    } else {
        clearInterval(songSlideshowInterval);
    }
}

// アルバムのスライドショーの再生/停止を切り替える関数
function toggleAlbumSlideshow() {
    albumSlideshowPlaying = !albumSlideshowPlaying;
    if (albumSlideshowPlaying) {
        albumSlideshowInterval = setInterval(showAlbumSlides, 10000);
    } else {
        clearInterval(albumSlideshowInterval);
    }
}

// アーティスト情報を切り替える関数
function toggleInfo() {
    document.body.classList.add('fade-out');
    setTimeout(() => {
        let artistName = document.getElementById('artist-name');
        let artistImage = document.getElementById('artist-image');
        let sections = ['artist', 'songs', 'albums'];
        sections.forEach(section => {
            let nBunaSection = document.querySelectorAll(`#${section} .n-buna-info`);
            let yorushikaSection = document.querySelectorAll(`#${section} .yorushika-info`);
            nBunaSection.forEach(item => item.style.display = artistName.textContent.trim() === 'n-buna' ? 'none' : 'block');
            yorushikaSection.forEach(item => item.style.display = artistName.textContent.trim() === 'n-buna' ? 'block' : 'none');
        });
        if (artistName.textContent.trim() === 'n-buna') {
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
            updateSlidesVisibility(); // スライドショーの表示を更新
            resetSlideIntervals(); // インターバルをリセット
            showSongSlides(); // スライド表示の即時更新
            showAlbumSlides(); // スライド表示の即時更新
        }, 1000);
    }, 1000);
}
