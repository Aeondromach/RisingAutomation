const timelinePointHeight = 40;
// let observer = null;

// helper function that calls a callback when an element enters the viewport
const timelinePointVisible = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const children = entry.target.parentElement.children;

            // apply visible to all above timeline elements as well
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

    let workingOffset = 0;
    let lastChild = {div: null, child: null};

    for (let i = 0; i < content.children.length; i++) {
        const child = content.children[i];
        const halfHeight = child.clientHeight / 2

        workingOffset += halfHeight;
        
        // <div class="timeline-point"></div>
        const div = document.createElement("div");
        div.classList.add("timeline-point");

        if (lastChild.child != null) lastChild.div.style.setProperty("--timeline-height", (lastChild.child.clientHeight/2 + halfHeight - timelinePointHeight/2) + "px");
        div.style.top = (workingOffset) + "px";

        // create observer
        observer = new IntersectionObserver(timelinePointVisible, {root: null, threshold: 1});
        observer.observe(div);

        timeline.appendChild(div);

        workingOffset += halfHeight + 10;
        lastChild = {div: div, child: child};
    }
}

window.addEventListener('load', resizeTimeline);
window.addEventListener('resize', resizeTimeline);