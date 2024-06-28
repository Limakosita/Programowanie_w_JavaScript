document.addEventListener('DOMContentLoaded', () => {
    const sounds = {
        'a': new Audio('./sounds/clap.wav'),
        's': new Audio('./sounds/kick.wav'),
        'd': new Audio('./sounds/hihat.wav'),
    };

    let isRecording = false;
    let currentChannel = 0;
    let startTime;
    const channels = [[]];

    const recordButton = document.getElementById('record');
    const stopButton = document.getElementById('stop');
    const playButton = document.getElementById('play');
    const clearButton = document.getElementById('clear');
    const addChannelButton = document.getElementById('add-channel');
    const removeChannelButton = document.getElementById('remove-channel');

    recordButton.addEventListener('click', () => {
        isRecording = true;
        startTime = Date.now();
        console.log('Recording...');
    });

    stopButton.addEventListener('click', () => {
        isRecording = false;
        console.log('Stopped recording.');
    });

    playButton.addEventListener('click', () => {
        console.log('Playing...');
        channels.forEach((channel, index) => {
            if (channel.length > 0) {
                console.log(`Playing channel ${index + 1}`);
                channel.forEach(({ key, time }) => {
                    setTimeout(() => {
                        playSound(key);
                    }, time);
                });
            }
        });
    });

    clearButton.addEventListener('click', () => {
        channels.forEach(channel => channel.splice(0, channel.length));
        console.log('Cleared all channels.');
    });

    addChannelButton.addEventListener('click', () => {
        channels.push([]);
        console.log('Added new channel.');
    });

    removeChannelButton.addEventListener('click', () => {
        if (channels.length > 1) {
            channels.pop();
            console.log('Removed last channel.');
        }
    });

    document.addEventListener('keypress', (ev) => {
        const key = ev.key;
        if (sounds[key]) {
            playSound(key);
            if (isRecording) {
                const time = Date.now() - startTime;
                channels[currentChannel].push({ key, time });
                console.log(`Recorded ${key} at ${time}ms on channel ${currentChannel + 1}`);
            }
        }
    });

    function playSound(key) {
        const sound = sounds[key];
        if (sound) {
            sound.currentTime = 0;
            sound.play();
        }
    }
});
