const timelinePointHeight = 40;
const timelineImages = ["assets/svg/car-svgrepo-com.svg", "assets/svg/bolt-svgrepo-com.svg", "assets/svg/battery-charge-svgrepo-com.svg"];
// let observer = null

// helper function that calls a callback when an element enters the viewport
const timelinePointVisible = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const children = entry.target.parentElement.children;

            // apply visible class to all above timeline elements as well as the current
            for (let i = 0; i < children.length; i++) {
                children[i].classList.add("visible");
                if (children[i] === entry.target) {
                    break;
                }
            }
        }
    });
}

const resizeTimeline = () => {
    const timeline = document.getElementsByClassName("vertical-timeline")[0];
    const content = document.getElementsByClassName("image-section-container")[0];

    // remove all children from timeline
    while (timeline.firstChild) {
        timeline.removeChild(timeline.firstChild);
    }

    // current offset and last child
    let workingOffset = 0;
    let lastChild = {point: null, child: null};

    // go through each child in the content container
    for (let i = 0; i < content.children.length; i++) {
        const child = content.children[i];
        const halfHeight = child.clientHeight / 2

        workingOffset += halfHeight;
        
        // <div class="timeline-point"></div>
        const timeline_point = document.createElement("div");
        timeline_point.classList.add("timeline-point");

        if (i < timelineImages.length) {
            const image = document.createElement("img");
            image.src = timelineImages[i % timelineImages.length];
            timeline_point.appendChild(image);
        }

        // set the height of the line between timeline points
        if (lastChild.child != null) lastChild.point.style.setProperty("--timeline-height", (lastChild.child.clientHeight/2 + halfHeight - timelinePointHeight/2) + "px");
        timeline_point.style.top = (workingOffset) + "px";

        // observe viewport intersection with the timeline point
        observer = new IntersectionObserver(timelinePointVisible, {root: null, threshold: 1});
        observer.observe(timeline_point);

        timeline.appendChild(timeline_point);

        workingOffset += halfHeight + 10;
        lastChild = {point: timeline_point, child: child};
    }
}

// resize the timeline on load and when the window is resized
window.addEventListener('load', resizeTimeline);
window.addEventListener('resize', resizeTimeline);