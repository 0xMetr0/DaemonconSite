export function openTab(evt, tabName, windowId) {
    const windowElement = document.getElementById(windowId);
    if (!windowElement) return;
    const tabContent = windowElement.getElementsByClassName("tab-content");
    const tabButtons = windowElement.getElementsByClassName("tab-button");
    for (let i = 0; i < tabContent.length; i++) tabContent[i].classList.remove("active");
    for (let i = 0; i < tabButtons.length; i++) tabButtons[i].classList.remove("active");
    const selectedTab = windowElement.querySelector(`#${tabName}`);
    if (selectedTab) selectedTab.classList.add("active");
    if (evt && evt.currentTarget) evt.currentTarget.classList.add("active");
}

export function initializeTabs(windowId) {
    const windowElement = document.getElementById(windowId);
    if (!windowElement) return;
    const tabButtons = windowElement.getElementsByClassName("tab-button");
    for (let button of tabButtons) {
        button.addEventListener('click', function(e) {
            const tabName = this.getAttribute('data-tab');
            openTab(e, tabName, windowId);
        });
    }
    if (tabButtons.length > 0) {
        const firstTabName = tabButtons[0].getAttribute('data-tab');
        openTab({ currentTarget: tabButtons[0] }, firstTabName, windowId);
    }
}
