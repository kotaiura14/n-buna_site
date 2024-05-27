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

    if (artistName.textContent === 'n-buna') {
        artistName.textContent = 'ヨルシカ';
        artistImage.style.backgroundImage = "url('images/yorushika.jpg')";
        artistDescription.innerHTML = `
            <ul>
                <li>ヨルシカは日本のロックバンドで、2017年に結成されました。</li>
                <li>n-buna（ナブナ）が作曲、編曲、プロデュースを担当しています。</li>
                <li>ボーカルはsuisが担当しています。</li>
                <li>詩的で文学的な歌詞とメロディアスな楽曲が特徴です。</li>
                <li>代表曲には「ただ君に晴れ」、「花に亡霊」、「言って。」などがあります。</li>
            </ul>`;
        document.body.style.backgroundColor = "#ffe4e1"; // ヨルシカ用の背景色
    } else {
        artistName.textContent = 'n-buna';
        artistImage.style.backgroundImage = "url('images/tako.jpg')";
        artistDescription.innerHTML = `
            <ul>
                <li>n-buna（ナブナ）は日本の音楽プロデューサー、作曲家、編曲家です。</li>
                <li>ボーカロイドを使用した楽曲で知られています。</li>
                <li>代表曲には「夜明けと蛍」、「ウミユリ海底譚」、「透明エレジー」などがあります。</li>
                <li>ヨルシカのメインコンポーザーとしても活動しています。</li>
            </ul>`;
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

function showSlides() {
    slides.forEach((slide, index) => {
        slide.style.opacity = (index === slideIndex) ? '1' : '0';
    });
    slideIndex = (slideIndex + 1) % totalSlides;
}

setInterval(showSlides, 2000); // 2秒ごとに画像を切り替え