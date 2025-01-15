const heroVideo = document.querySelector('.hero-image.video');
const videos = heroVideo.getAttribute("data-video-urls").split(' ');

const altHeroVideo = document.createElement("video");
altHeroVideo.classList.add("hero-image");
altHeroVideo.setAttribute("muted", "");
altHeroVideo.classList.add("hidden");
heroVideo.parentElement.insertBefore(altHeroVideo, heroVideo);

let currentVideo = 0;
let altActive = false;

var updateVideo = () => {
    let activeVideo = altActive ? altHeroVideo : heroVideo;
    let inactiveVideo = altActive ? heroVideo : altHeroVideo;
    altActive = !altActive;

    inactiveVideo.classList.remove("hidden");
    activeVideo.classList.add("hidden");

    // activeVideo.pause();
    inactiveVideo.play();

    setTimeout(() => {
        currentVideo = (currentVideo + 1) % videos.length;
        activeVideo.src = videos[currentVideo];
        activeVideo.load();
    }, 750);
}

const onTimeUpdate = (event) => {
    let video = altActive ? altHeroVideo : heroVideo;
    
    if (video.duration < 1) return;
    
    if (video.currentTime > video.duration - 2) updateVideo();
}

heroVideo.src = videos[currentVideo];
heroVideo.play();

currentVideo = (currentVideo + 1) % videos.length;
altHeroVideo.src = videos[currentVideo];

// heroVideo.addEventListener('ended', updateVideo);
// altHeroVideo.addEventListener('ended', updateVideo);

heroVideo.addEventListener("timeupdate", onTimeUpdate);
altHeroVideo.addEventListener("timeupdate", onTimeUpdate);

// setInterval(() => {
//     console.log(heroVideo.currentTime, altHeroVideo.currentTime);
// }, 500);