const timelineHeight = 40;

const resizeTimeline = () => {
    const timeline = document.getElementsByClassName("vertical-timeline")[0];
    const content = document.getElementsByClassName("image-section-container")[0];

    // remove all children from timeline
    while (timeline.firstChild) {
        timeline.removeChild(timeline.firstChild);
    }

    let workingOffset = 0;

    for (let i = 0; i < content.children.length; i++) {
        const child = content.children[i];
        const halfHeight = child.clientHeight / 2

        workingOffset += halfHeight;
        
        // <div class="timeline-point"></div>
        const div = document.createElement("div");
        div.classList.add("timeline-point");

        div.style.top = (workingOffset - (timelineHeight)) + "px";

        timeline.appendChild(div);

        workingOffset += halfHeight;
    }

}

window.addEventListener('load', resizeTimeline);
window.addEventListener('resize', resizeTimeline);