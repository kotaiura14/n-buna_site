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
