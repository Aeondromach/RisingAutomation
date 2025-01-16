window.addEventListener("load", () => {
    const clickToFullscreen = document.getElementsByClassName("click-to-fullscreen");

    for (let element of clickToFullscreen) {
        element.addEventListener("click", () => {
            window.open(element.getAttribute("src"), "_blank");
        });
    }
});