document.addEventListener('keydown', event => {
    if(event.key == "Escape"){
        if(searchshowed){
            search.style.display = "none";
            searchshowed = false;
        }
    }
    if(event.key == "Enter"){
        if(searchshowed){
            Util.searchAlbum();
            search.style.display = "none";
            searchshowed = false;
        }
    }
})
searchbackground.addEventListener('click', event => {
    if(searchshowed){
        search.style.display = "none";
        searchshowed = false;
    }
})
albumbackground.addEventListener('click', event => {
    if(albumshowed){
        albumheader.style.display = "none";
        albumshowed = false;
    }
})
fullscreenBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen()
                .then(() => {
                    fullscreenOverlay.style.display = "flex";
                    btn.classList.replace("fa-expand", "fa-compress"); 
                })
                .catch(err => console.error("Error attempting to enable fullscreen:", err));
        } else {
            document.exitFullscreen()
                .then(() => {
                    fullscreenOverlay.style.display = "none";
                    btn.classList.replace("fa-compress", "fa-expand");
                })
                .catch(err => console.error("Error attempting to exit fullscreen:", err));
        }
    });
});
document.addEventListener("fullscreenchange", () => {
    fullscreenBtns.forEach(btn => {
        if (document.fullscreenElement) {
            fullscreenOverlay.style.display = "flex";
            document.body.style.overflow = "hidden"; 

            btn.classList.replace("fa-expand", "fa-compress");

            let img = document.querySelector(".fullscreen-img");
            let title = document.querySelector(".fullscreen-title");

            title.classList.remove("animate-title");
            img.classList.remove("animate-img");

            void img.offsetWidth;  
            void title.offsetWidth;  

            title.classList.add("animate-title");
            img.classList.add("animate-img");
        } else {
            fullscreenOverlay.style.display = "none";
            document.body.style.overflow = ""; 
            btn.classList.replace("fa-compress", "fa-expand");
        }
    });
});
progressContainer.forEach(element => {
    element.addEventListener("click", (e) => {
        const width = element.clientWidth;
        const clickX = e.offsetX;
        const duration = currentAudio.duration;
    
        const stepSize = 0.05;
        let progress = clickX / width;
        progress = Math.round(progress / stepSize) * stepSize;
        progress = Math.min(Math.max(progress, 0), 1);
    
        currentAudio.currentTime = progress * duration;
    });
})
volumeControlContainer.forEach(element => {
    element.addEventListener("wheel", (e) => {
        if (!currentAudio) return;
    
        e.preventDefault(); 
    
        const stepSize = 0.1; 
        currentvolume = currentAudio.volume;
    
        if (e.deltaY > 0) {
            currentvolume -= stepSize;
        } else {
            currentvolume += stepSize;
        }
    
        currentvolume = Math.min(Math.max(currentvolume, 0), 1);
        currentAudio.volume = currentvolume;
    
        volumeBar.forEach(element => {
            element.style.width = `${currentvolume * 100}%`;
        })
    });
})
volumeContainer.forEach(element => {
    element.addEventListener("click", (e) => {
        if (!currentAudio) return;
        const width = element.clientWidth;
        const clickX = e.offsetX;
        
        const newVolume = clickX / width;
        currentvolume = Math.min(Math.max(newVolume, 0), 1);
        currentAudio.volume = currentvolume; 
        if (currentAudio) {
            const progress = currentAudio.volume * 100; 
            volumeBar.forEach(element => {
                element.style.width = `${progress}%`;
            })
        }
    });
})
document.addEventListener('keydown', event => {
    if (event.code === "Space" && event.target === document.body) {
        event.preventDefault();
        playerControls.stopPlayTrack();
      }
    if (event.code === "ArrowRight" && event.target === document.body) {
        event.preventDefault();
        currentAudio.currentTime = currentAudio.currentTime + 5;
        if(currentAudio.currentTime >= currentAudio.duration){
            playerControls.handleTrackEnd() ;
        }
    }
    if (event.code === "ArrowLeft" && event.target === document.body) {
        event.preventDefault();
        currentAudio.currentTime = (currentAudio.currentTime - 5) % currentAudio.duration;
    }
    if (event.code === "KeyM" && event.target === document.body) {
       playerControls.toggleMute();
    }
})
