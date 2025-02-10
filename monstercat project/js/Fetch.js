class Fetcher {
    static async fetchdata(key) {
        try {
            let fetchedData = await fetch(`http://localhost:3000/api/deezer?Title=${encodeURIComponent(key)}`);
            let Albumjson = await fetchedData.json();
    
            if (!Albumjson.data || Albumjson.data.length === 0) {
                console.error("No album data found.");
                return null;
            }
    
            let tracklisturl = Albumjson.data[0].tracklist;
            let TrackList = await fetch(`http://localhost:3000/api/tracklist?url=${encodeURIComponent(tracklisturl)}`);
            let TrackListjson = await TrackList.json();
    
            let obj = {
                Artist: Albumjson.data[0].artist.name,
                Album_Cover: Albumjson.data[0].cover_big,
                Album_title: Albumjson.data[0].title,
                TrackList: TrackListjson.data || []
            };
            return obj;
    
        } catch (error) {
            console.error("Error fetching data:", error);
            return null; 
        }
    }
    static loadtracklist() {
        let tracklist = document.querySelector(".tracklist");
        const prevlist = document.querySelector(".list-container");
    
        const list = document.createElement("div");
        list.classList.add("list-container");
    
        if (prevlist) {
            tracklist.removeChild(prevlist);
            tracklist.appendChild(list);
        } else {
            tracklist.appendChild(list);
        }
    
        if (!obj || !obj.TrackList || obj.TrackList.length === 0) {
            document.querySelector(".list-container").innerHTML = "<p class='no-data'>No tracks available</p>";
            return;
        }
    
    
        obj.TrackList.forEach((element, trackIndex) => {
            let entry = document.createElement("div");
            entry.classList.add("entry");
    
            let right = document.createElement("div");
            right.classList.add("right");
    
            let p = document.createElement("p");
            p.textContent = trackIndex + 1;
            right.appendChild(p);
    
            let playIcon = document.createElement("i");
            playIcon.classList.add("fas", "fa-play", "mr-xsmall");
    
    
            playIcon.addEventListener("click", () => {
                if (currentIndex === trackIndex && currentAudio && !currentAudio.paused) {
                    currentAudio.pause();
                    currentPlayIcon.classList.replace("fa-pause", "fa-play");
                    Controls.forEach(element => {
                        element.classList.replace("fa-pause", "fa-play");
                    })
                    document.querySelectorAll(".entry").forEach(entry => entry.style.backgroundColor = "");
                } else {
                    playerControls.loadTrack(trackIndex);
                }
            });
    
            right.appendChild(playIcon);
    
            let songName = document.createElement("div");
            songName.classList.add("song-name");
    
            let songTitle = document.createElement("h3");
            songTitle.textContent = element.title;
            songName.appendChild(songTitle);
    
            let artistName = document.createElement("h5");
            artistName.textContent = element.artist.name;
            songName.appendChild(artistName);
    
            right.appendChild(songName);
    
            let left = document.createElement("div");
            left.classList.add("left");
    
            let duration = document.createElement("h5");
            duration.textContent = Util.formatDuration(element.duration);
            left.appendChild(duration);
    
            let shareIcon = document.createElement("i");
            shareIcon.classList.add("fas", "fa-share-alt");
            left.appendChild(shareIcon);
    
            entry.appendChild(right);
            entry.appendChild(left);
            tracklistentries[trackIndex] = entry;
            list.appendChild(entry);
        });
    }
    static loadCover(){
        if (!obj || !obj.TrackList || obj.TrackList.length === 0) {
            document.querySelector(".header-page").textContent = "No Album Available";
            document.querySelector(".title p").textContent = "";
            document.querySelector("#album-img").src = "assets/noimg.jpeg";
            document.querySelector("#image").style.backgroundImage = "url(assets/noimg.jpeg)";
            document.querySelector(".album-big h2").textContent = "None";
            return;
        }
      
        let background = document.querySelector("#image");
        let title = document.querySelector(".header-page");
        let artist = document.querySelector(".title p");
        let album_image = document.querySelector("#album-img");
        let album_big = document.querySelector(".album-big-img");
        let album_big_h2= document.querySelector(".album-big h2");
    
    
        player.src = obj.TrackList[0].preview;
        title.textContent = obj.Album_title;
        album_big_h2.textContent = obj.Album_title
        artist.textContent = obj.Artist;
        album_image.src = obj.Album_Cover;
        album_big.src = obj.Album_Cover;
        background.style.backgroundImage = `url(${obj.Album_Cover})`;
    
        document.title = obj.Album_title + " - " + obj.Artist
    }
    static async loadYouTubeAPI() {
        try {
            if (!obj || !obj.Album_title || !obj.Artist) {
                console.log("No album information available.");
                document.getElementById("youtubePlayer").src = "";
                return;
            }
            
            const apiKey = "AIzaSyB7jtq09MqHskLcUoqHjXZnRLJ3EYXv_ls"; 
            const query = `${obj.Album_title} ${obj.Artist} album`;
            const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&type=video&key=${apiKey}`;
            
            fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data?.items?.length > 0) {
                    const videoId = data.items[0].id.videoId;
                    document.getElementById("youtubePlayer").src = `https://www.youtube.com/embed/${videoId}`;
                } else {
                    console.log("No embeddable videos found.");
                    document.getElementById("youtubePlayer").src = "https://www.youtube.com/embed/dklasndjnjkd";
                }
            });
        } catch (error) {
            console.error("YouTube API Error:", error);
        }
    }
}
