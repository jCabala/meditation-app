const app = () => {
    const song = document.querySelector(".song");
    const play = document.querySelector(".play");
    const outline = document.querySelector(".moving-outline circle");
    const video = document.querySelector(".vid-container video");

    //SOUNDS
    const sounds = document.querySelectorAll('.sound-picker button');

    //TIME DISPLAY
    const timeDisplay = document.querySelector(".time-display");
    const timeSelect = document.querySelectorAll(".time-select button");

    //LEN OF THE OUTLINE
    const outlineLength = outline.getTotalLength(); 

    //Duration of the
    let duration = 600;

    outline.style.strokeDasharray = outlineLength;
    outline.style.strokeDashoffset = outlineLength;


    //SELECT SOUND
    timeSelect.forEach(option => {
        option.addEventListener('click', () => {
            duration = option.id;
            timeDisplay.textContent = `${Math.floor(duration/60)}:${Math.floor(duration%60)}`;
           
        })
    })
    //SELECT SONG
    sounds.forEach(option => {
        option.addEventListener('click', () => {
            song.src = option.getAttribute('data-sound');
            video.src = option.getAttribute('data-video');
            song.pause();
            video.pause();
            play.src = './svg/play.svg';
        })
    })

    //PLAY SOUND
    play.addEventListener('click', () => {
        checkPlaying(song);
    })

    const checkPlaying = song => {
        if(song.paused){
            song.play();
            video.play();
            play.src = './svg/pause.svg';
        } else {
            song.pause();
            video.pause();
            play.src = './svg/play.svg';
        }
    }

    //ANIMATE THE CIRCLE 
    song.ontimeupdate = () => {
        let currentTime = song.currentTime;
        let elapsed = duration - currentTime;
        let seconds = Math.floor(elapsed % 60);
        let minutes = Math.floor(elapsed / 60);

        let progress = outlineLength - (currentTime/duration) * outlineLength;
        outline.style.strokeDashoffset = progress;
        timeDisplay.textContent = `${minutes}:${seconds}`
        if(currentTime >= duration){
            play.src = './svg/play.svg';
            song.pause();
            video.pause();
            play.src = './svg/play.svg';
            timeDisplay.textContent = '0:0';
            outline.style.strokeDashoffset = outlineLength;
            song.currentTime = 0;
        }
    }
}

app();