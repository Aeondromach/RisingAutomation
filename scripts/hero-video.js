const heroVideo = document.querySelector('.hero-image.video');
const videos = heroVideo.getAttribute("data-video-urls").split(' ');
const videoPositions = heroVideo.getAttribute("data-video-positions").split(' ');

const altHeroVideo = document.createElement("video");
altHeroVideo.classList.add("hero-image");
altHeroVideo.setAttribute("muted", "");
altHeroVideo.classList.add("hidden");
heroVideo.parentElement.insertBefore(altHeroVideo, heroVideo);

let currentVideo = 0;
let altActive = false;

// update the video
// (var for debugging purposes)
var updateVideo = () => {
    let activeVideo = altActive ? altHeroVideo : heroVideo;
    let inactiveVideo = altActive ? heroVideo : altHeroVideo;
    altActive = !altActive;

    // swap the videos
    inactiveVideo.classList.remove("hidden");
    activeVideo.classList.add("hidden");

    // pause the current video and play the next one
    // activeVideo.pause();
    inactiveVideo.play();

    // set the next video that loads in the background
    setTimeout(() => {
        currentVideo = (currentVideo + 1) % videos.length;
        activeVideo.src = videos[currentVideo];
        activeVideo.style.objectPosition = "0 " + videoPositions[currentVideo];
        activeVideo.load();
    }, 750);
}

// on time update listener
const onTimeUpdate = (event) => {
    let video = altActive ? altHeroVideo : heroVideo;

    if (video.readyState != 4) return;
    
    // if we are within the last 2 seconds of the video, go to the next video
    if (video.currentTime > video.duration - 2) updateVideo();
}

// set the current video
heroVideo.src = videos[currentVideo];
heroVideo.style.objectPosition = "0 " + videoPositions[currentVideo];
heroVideo.play();

// set next video
currentVideo = (currentVideo + 1) % videos.length;
altHeroVideo.src = videos[currentVideo];
altHeroVideo.style.objectPosition = "0 " + videoPositions[currentVideo];

// set listener for time updates
heroVideo.addEventListener("timeupdate", onTimeUpdate);
altHeroVideo.addEventListener("timeupdate", onTimeUpdate);
