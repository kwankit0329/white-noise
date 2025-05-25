document.addEventListener('DOMContentLoaded', function() {
    const sounds = {
        fire: document.getElementById('fire'),
        rain: document.getElementById('rain'),
        wave: document.getElementById('wave'),
        wind: document.getElementById('wind')
    };

    const buttons = document.querySelectorAll('.play-btn');
    const sliders = document.querySelectorAll('.volume-slider');

    // 初始化音量
    Object.values(sounds).forEach(audio => {
        audio.volume = 0.5;
    });

    // 播放/暂停自己，不影响其他音轨
    buttons.forEach(button => {
        button.addEventListener('click', function () {
            const soundId = this.getAttribute('data-sound');
            const audio = sounds[soundId];

            if (audio.paused) {
                audio.play();
                this.textContent = '暂停';
                this.classList.add('playing');
            } else {
                audio.pause();
                this.textContent = '播放';
                this.classList.remove('playing');
            }
        });
    });

    // 音量控制
    sliders.forEach(slider => {
        slider.addEventListener('input', function () {
            const soundId = this.getAttribute('data-sound');
            sounds[soundId].volume = this.value;
        });
    });
});
