class playerControls{
    static stopPlayTrack() {
        if (!currentAudio) return; 

        if (currentAudio.paused) {
            currentAudio.play();
            currentAudio.addEventListener("timeupdate", Util.updateProgressBar);
            Controls.forEach(element => {
                element.classList.replace("fa-play", "fa-pause");
            })
            
            if (currentPlayIcon && currentPlayIcon !== Controls) {
                currentPlayIcon.classList.replace("fa-play", "fa-pause");
            }
        } else {
            currentAudio.pause();
            Controls.forEach(element => {
                element.classList.replace("fa-pause", "fa-play"); 
            })
            let check = false;
            Controls.forEach(element => {
            if(currentPlayIcon !== Controls)
            {
                check = true;
            }
            })
            if (currentPlayIcon && check) {
                currentPlayIcon.classList.replace("fa-pause", "fa-play");
            }
        }
    }
    static loadTrack(index) {
        if (!trackList || trackList.length === 0) return;
        if(currentAudio == null){
            UIupdates.showControlPlayer();
        }

        if (currentAudio) {
            currentAudio.pause();
            currentAudio.removeEventListener("timeupdate", Util.updateProgressBar);
            currentAudio.removeEventListener("ended", playerControls.handleTrackEnd);
        }

        document.querySelectorAll(".entry").forEach(entry => entry.style.backgroundColor = "");
        if (currentPlayIcon) {
            currentPlayIcon.classList.replace("fa-pause", "fa-play");
        }

        currentIndex = index;
        currentAudio = new Audio(trackList[currentIndex].preview);
        currentAudio.volume = currentvolume;
        currentAudio.addEventListener("timeupdate", Util.updateProgressBar);
        currentAudio.addEventListener("ended", playerControls.handleTrackEnd); 
        
        let newEntry = tracklistentries[currentIndex];
        if (newEntry) {
            newEntry.style.backgroundColor = themecolor;
            currentPlayIcon = newEntry.querySelector("i.fa-play, i.fa-pause");
            if (currentPlayIcon) {
                currentPlayIcon.classList.replace("fa-play", "fa-pause");
            }
        }

        let fullscreen_AlbumCover = document.querySelector(".fullscreen-img img");
        let fullscreen_title = document.querySelector(".fullscreen-title");
        let al_title = document.querySelector(".logo-title h3");

        fullscreen_AlbumCover.src = obj.Album_Cover
        fullscreen_title.children[0].textContent = obj.TrackList[currentIndex].title_short
        fullscreen_title.children[1].textContent = obj.TrackList[currentIndex].artist.name
        document.documentElement.style.setProperty("--image", `url(${obj.Album_Cover})`);
        document.title = obj.TrackList[currentIndex].title_short + " - " + obj.TrackList[currentIndex].artist.name
        al_title.textContent = obj.Album_title
        songtitle.textContent = obj.TrackList[currentIndex].title_short
        songsinger.textContent =  obj.TrackList[currentIndex].artist.name
        songimg.src = obj.Album_Cover

        currentAudio.play();
        UIupdates.updatePlayButton(true);
    }
    static handleTrackEnd() {
        if (!isRepeat) {
            playerControls.forwardTrack();
        } else {
            currentAudio.currentTime = 0;
            currentAudio.play();
        }
    }
    static forwardTrack() {
        
        if (!trackList || trackList.length === 0 || currentAudio == null) return;

        if (isShuffle) {
            currentIndex = Math.floor(Math.random() * trackList.length);
        } else {
            currentIndex = (currentIndex + 1) % trackList.length;
        }

        playerControls.loadTrack(currentIndex);
    }
    static backwardTrack() {
        if (!trackList || trackList.length === 0 || currentAudio == null) return;

        if (currentAudio.currentTime > 3) {
            currentAudio.currentTime = 0;
        } else {
            currentIndex = (currentIndex - 1 + trackList.length) % trackList.length;
            playerControls.loadTrack(currentIndex);
        }
    }
    static toggleRepeat() {
        isRepeat = !isRepeat;
        currentAudio.loop = isRepeat;
        const repeatbtns = document.querySelectorAll(".fa-repeat")
        repeatbtns.forEach(element => {
            element.classList.toggle("active", isRepeat);
        })
    }
    static toggleShuffle() {
        isShuffle = !isShuffle;
        const shufflebtns = document.querySelectorAll(".fa-shuffle")
        shufflebtns.forEach(element => {
            element.classList.toggle("active", isShuffle);
        })
    }
    static toggleMute()
    {
        let volumeicon = document.querySelectorAll("i.fa-volume-up, i.fa-volume-mute");
        muted = !muted;
        currentAudio.muted = muted;
        if (muted) {
            volumeicon.forEach(element => {
                element.classList.replace("fa-volume-up", "fa-volume-mute");
            })
            volumeBar.forEach(element => {
                element.style.width = "0%";
            })
        } else {
            volumeicon.forEach(element => {
                element.classList.replace("fa-volume-mute", "fa-volume-up");
            })
            volumeBar.forEach(element => {
                element.style.width = `${currentvolume * 100}%`;
            })
        }
    }
    static stopPlayTrack() {
        if (!currentAudio) return;

        if (currentAudio.paused) {
            currentAudio.play();
            currentAudio.addEventListener("timeupdate", Util.updateProgressBar);
            UIupdates.updatePlayButton(true);
        } else {
            currentAudio.pause();
            UIupdates.updatePlayButton(false);
        }
    }
}