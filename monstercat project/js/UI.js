class UIupdates{
    static showControlPlayer() {
        const playerContainer = document.querySelector(".control-player-container");

        playerContainer.style.display = "flex";

        setTimeout(() => {
            playerContainer.classList.add("show");
        }, 10); 
    }
    static hideControlPlayer() {
        const playerContainer = document.querySelector(".control-player-container");

        playerContainer.classList.remove("show");

        setTimeout(() => {
            playerContainer.style.display = "none";
        }, 700);
    }
    static updatePlayButton(isPlaying) {
        const playButtons = document.querySelectorAll(".pause-forward i.fa-play, .pause-forward i.fa-pause");
        playButtons.forEach(button => {
            button.classList.toggle("fa-play", !isPlaying);
            button.classList.toggle("fa-pause", isPlaying);
        });

        if (tracklistentries && tracklistentries[currentIndex]) {
            let trackIcon = tracklistentries[currentIndex].querySelector("i.fa-play, i.fa-pause");

            if (trackIcon) {
                trackIcon.classList.toggle("fa-play", !isPlaying);
                trackIcon.classList.toggle("fa-pause", isPlaying);
            }
        }
    }
    static preview() {
        playerControls.loadTrack(0);
    }
    static showSearch(){
        search.style.display = "flex";
        searchbox.focus();
        searchshowed = true;
    }
    static showAlbumCover(){
        albumheader.style.display = "flex";
        albumshowed = true;
    }
}