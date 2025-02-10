async function load(key){
    obj = await Fetcher.fetchdata(key);
    color = new HandleColor(obj);
    if(obj){
        trackList = obj.TrackList;
        color.applyBackground(obj.Album_Cover);
    }

    Fetcher.loadCover();
    Fetcher.loadtracklist();
    Fetcher.loadYouTubeAPI();
}
load("");
