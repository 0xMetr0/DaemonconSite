// Dragging and general UI helpers
export function dragElement(elmnt) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    const header = elmnt.getElementsByClassName('window-header')[0];
    header.onmousedown = dragMouseDown;
    header.ontouchstart = dragTouchStart;

    function dragMouseDown(e) {
        e = e || window.event;
        if (e.target.classList.contains('window-control')) return;
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
        document.body.classList.add('dragging');
        if (window.setActiveWindow) window.setActiveWindow(elmnt);
    }

    function dragTouchStart(e) {
        if (e.target.classList.contains('window-control')) return;
        e.preventDefault();
        const touch = e.touches[0];
        pos3 = touch.clientX;
        pos4 = touch.clientY;
        document.ontouchend = closeDragElement;
        document.ontouchmove = elementDragTouch;
        document.body.classList.add('dragging');
        if (window.setActiveWindow) window.setActiveWindow(elmnt);
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        updatePosition();
    }

    function elementDragTouch(e) {
        e.preventDefault();
        const touch = e.touches[0];
        pos1 = pos3 - touch.clientX;
        pos2 = pos4 - touch.clientY;
        pos3 = touch.clientX;
        pos4 = touch.clientY;
        updatePosition();
    }

    function updatePosition() {
        const newTop = elmnt.offsetTop - pos2;
        const newLeft = elmnt.offsetLeft - pos1;
        const desktop = document.getElementById('desktop');
        const taskbarHeight = document.getElementById('taskbar').offsetHeight;
        const maxLeft = desktop.offsetWidth - elmnt.offsetWidth;
        const maxTop = desktop.offsetHeight - taskbarHeight - elmnt.offsetHeight;
        elmnt.style.top = Math.max(0, Math.min(newTop, maxTop)) + "px";
        elmnt.style.left = Math.max(0, Math.min(newLeft, maxLeft)) + "px";
    }

    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
        document.ontouchend = null;
        document.ontouchmove = null;
        document.body.classList.remove('dragging');
    }
}

export function makeWindowsDraggable() {
    const windows = document.getElementsByClassName('window');
    for (let i = 0; i < windows.length; i++) {
        try { dragElement(windows[i]); } catch (e) { /* ignore */ }
    }
    document.querySelectorAll('.window').forEach(win => {
        win.addEventListener('click', () => { if (window.setActiveWindow) window.setActiveWindow(win); });
    });
}
