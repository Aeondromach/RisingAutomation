const content = document.getElementsByClassName("content-container")[0];
const tabs = document.getElementsByClassName("tabs")[0];

// go through each tab and add a click listener
for (let child of tabs.children) {

    // when a tab is clicked, remove the selected class from the current tab and content
    // then add the selected class to the clicked tab and content
    child.addEventListener("click", function() {
        // get current tab and active tab/content
        const tab = this.getAttribute("data-tab");
        const activeTab = tabs.getElementsByClassName("selected")[0];
        const activeContent = content.getElementsByClassName("selected")[0];

        // de-select active tab/content
        activeTab.classList.remove("selected");
        activeContent.classList.remove("selected");

        // select clicked tab/content
        this.classList.add("selected");
        content.querySelector(`div[data-tab="${tab}"]`).classList.add("selected");
    });
}

// set the first tab and content as selected
tabs.children[0].classList.add("selected");
content.querySelector(`div[data-tab="${tabs.children[0].getAttribute("data-tab")}"]`).classList.add("selected");