document.addEventListener('DOMContentLoaded', function() {
    // 获取所有音频元素和按钮
    const sounds = {
        fire: document.getElementById('fire'),
        rain: document.getElementById('rain'),
        wave: document.getElementById('wave'),
        wind: document.getElementById('wind')
    };
    
    const buttons = document.querySelectorAll('.play-btn');
    const sliders = document.querySelectorAll('.volume-slider');
    
    // 初始化音频音量
    Object.keys(sounds).forEach(sound => {
        sounds[sound].volume = 0.5;
    });
    
    // 播放/暂停按钮功能
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const soundId = this.getAttribute('data-sound');
            const audio = sounds[soundId];
            
            if (audio.paused) {
                // 暂停所有其他音频
                Object.keys(sounds).forEach(key => {
                    if (key !== soundId) {
                        sounds[key].pause();
                        document.querySelector(`.play-btn[data-sound="${key}"]`).textContent = '播放';
                        document.querySelector(`.play-btn[data-sound="${key}"]`).classList.remove('playing');
                    }
                });
                
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
    
    // 音量滑块功能
    sliders.forEach(slider => {
        slider.addEventListener('input', function() {
            const soundId = this.getAttribute('data-sound');
            sounds[soundId].volume = this.value;
        });
    });
    
    // 当音频结束时重新播放（确保循环）
    Object.keys(sounds).forEach(sound => {
        sounds[sound].addEventListener('ended', function() {
            this.currentTime = 0;
            this.play();
        });
    });
});
