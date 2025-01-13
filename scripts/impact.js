const content = document.getElementsByClassName("content-container")[0];
const tabs = document.getElementsByClassName("tabs")[0];

for (let child of tabs.children) {
    child.addEventListener("click", function() {
        const tab = this.getAttribute("data-tab");
        const activeTab = tabs.getElementsByClassName("selected")[0];
        const activeContent = content.getElementsByClassName("selected")[0];

        activeTab.classList.remove("selected");
        activeContent.classList.remove("selected");

        this.classList.add("selected");
        content.querySelector(`div[data-tab="${tab}"]`).classList.add("selected");
    });
}

tabs.children[0].classList.add("selected");
content.querySelector(`div[data-tab="${tabs.children[0].getAttribute("data-tab")}"]`).classList.add("selected");