import { isMobileDevice } from './utils.js';

let highestZIndex = 100;
let activeWindow = null;
let solitaireInitialized = false;

export function getWindowConstraints(windowName, availableWidth, availableHeight) {
    const isMobile = isMobileDevice();
    if (isMobile) {
        const mobileConstraints = {
            minWidth: Math.min(300, availableWidth * 0.9),
            minHeight: Math.min(200, availableHeight * 0.4),
            maxWidth: availableWidth * 0.95,
            maxHeight: availableHeight * 0.9,
            preferredWidth: availableWidth * 0.9,
            preferredHeight: availableHeight * 0.8
        };

        const mobileSpecific = {
            solitaire: { preferredWidth: availableWidth * 0.95, preferredHeight: availableHeight * 0.85 },
            about: { preferredWidth: availableWidth * 0.9, preferredHeight: availableHeight * 0.7 },
            schedule: { preferredWidth: availableWidth * 0.95, preferredHeight: availableHeight * 0.85 },
            workshops: { preferredWidth: availableWidth * 0.9, preferredHeight: availableHeight * 0.75 }
        };

        return { ...mobileConstraints, ...(mobileSpecific[windowName] || {}) };
    }

    const defaultConstraints = {
        minWidth: 400,
        minHeight: 300,
        maxWidth: Math.min(1200, availableWidth * 0.9),
        maxHeight: Math.min(800, availableHeight * 0.9),
        preferredWidth: Math.min(600, availableWidth * 0.7),
        preferredHeight: Math.min(400, availableHeight * 0.7)
    };

    const constraints = {
        solitaire: { minWidth: 800, minHeight: 600, maxWidth: Math.min(1500, availableWidth * 0.95), maxHeight: Math.min(1200, availableHeight * 0.95), preferredWidth: Math.min(1000, availableWidth * 0.8), preferredHeight: Math.min(800, availableHeight * 0.8) },
        about: { minWidth: 400, minHeight: 400, maxWidth: Math.min(800, availableWidth * 0.7), maxHeight: Math.min(600, availableHeight * 0.7), preferredWidth: Math.min(500, availableWidth * 0.6), preferredHeight: Math.min(500, availableHeight * 0.6) },
        schedule: { minWidth: 600, minHeight: 500, maxWidth: Math.min(1200, availableWidth * 0.9), maxHeight: Math.min(900, availableHeight * 0.9), preferredWidth: Math.min(800, availableWidth * 0.75), preferredHeight: Math.min(600, availableHeight * 0.75) },
        workshops: { minWidth: 300, minHeight: 400, maxWidth: Math.min(900, availableWidth * 0.85), maxHeight: Math.min(700, availableHeight * 0.85), preferredWidth: Math.min(600, availableWidth * 0.7), preferredHeight: Math.min(500, availableHeight * 0.7) }
    };

    return constraints[windowName] || defaultConstraints;
}

export function openWindow(windowName) {
    if (windowName === 'solitaire' && isMobileDevice()) {
        // Lazy-load showMobileWarning if not already loaded
        if (!window.showMobileWarning) {
            import('./solitare.js').then(({ showMobileWarning }) => {
                window.showMobileWarning = showMobileWarning;
                showMobileWarning();
            }).catch(e => console.error('Failed to load mobile warning', e));
        } else {
            window.showMobileWarning();
        }
        return;
    }

    const win = document.getElementById(windowName + 'Window');
    if (!win) return;
    const desktop = document.getElementById('desktop');
    const taskbarHeight = document.getElementById('taskbar').offsetHeight;
    const availableWidth = desktop.offsetWidth;
    const availableHeight = desktop.offsetHeight - taskbarHeight;
    const constraints = getWindowConstraints(windowName, availableWidth, availableHeight);

    win.style.display = 'block';
    win.classList.remove('minimized');

    win.style.width = `${constraints.preferredWidth}px`;
    win.style.height = `${constraints.preferredHeight}px`;
    win.style.maxWidth = `${constraints.maxWidth}px`;
    win.style.maxHeight = `${constraints.maxHeight}px`;
    win.style.minWidth = `${constraints.minWidth}px`;
    win.style.minHeight = `${constraints.minHeight}px`;

    let left, top;
    const isMobile = isMobileDevice();

    if (isMobile) {
        const openWindows = document.querySelectorAll('.window:not(.minimized)');
        const windowCount = openWindows.length;
        const offset = Math.min(20, availableWidth * 0.05);
        left = Math.max(10, Math.min((offset * windowCount) % (availableWidth * 0.3), availableWidth - constraints.preferredWidth - 10));
        top = Math.max(10, Math.min((offset * windowCount) % (availableHeight * 0.3), availableHeight - constraints.preferredHeight - 10));
    } else {
        if (windowName === 'solitaire') {
            left = Math.max(0, (availableWidth - constraints.preferredWidth) / 2);
            top = Math.max(0, (availableHeight - constraints.preferredHeight) / 2);
        } else {
            const offset = Math.min(30, availableWidth * 0.02);
            const openWindows = document.querySelectorAll('.window:not(.minimized)');
            const windowCount = openWindows.length;
            left = Math.min((offset * windowCount) % (availableWidth / 2), availableWidth - constraints.preferredWidth);
            top = Math.min((offset * windowCount) % (availableHeight / 2), availableHeight - constraints.preferredHeight);
        }
    }

    left = Math.max(0, Math.min(left, availableWidth - constraints.preferredWidth));
    top = Math.max(0, Math.min(top, availableHeight - constraints.preferredHeight));

    win.style.left = `${left}px`;
    win.style.top = `${top}px`;

    highestZIndex++;
    win.style.zIndex = highestZIndex;
    setActiveWindow(win);

    if (windowName === 'solitaire' && !solitaireInitialized) {
        // Lazy-load solitaire module
        import('./solitare.js').then(({ initSolitaire, cleanupSolitaire, showMobileWarning }) => {
            window.initSolitaire = initSolitaire;
            window.cleanupSolitaire = cleanupSolitaire;
            window.showMobileWarning = showMobileWarning;
            initSolitaire();
            solitaireInitialized = true;
        }).catch(e => console.error('Failed to load solitaire', e));
    } else if (windowName === 'addressBook') {
        // Lazy-load address book module
        import('./addressbook.js').then(({ initAddressBook, showContacts, toggleMainIdentity }) => {
            window.showContacts = showContacts;
            window.toggleMainIdentity = toggleMainIdentity;
            initAddressBook();
        }).catch(e => console.error('Failed to load addressbook', e));
    }

    const resizeObserver = new ResizeObserver(() => {
        const newConstraints = getWindowConstraints(windowName, desktop.offsetWidth, desktop.offsetHeight - taskbarHeight);
        win.style.maxWidth = `${newConstraints.maxWidth}px`;
        win.style.maxHeight = `${newConstraints.maxHeight}px`;
        const currentWidth = win.offsetWidth;
        const currentHeight = win.offsetHeight;
        if (currentWidth > newConstraints.maxWidth) win.style.width = `${newConstraints.maxWidth}px`;
        if (currentHeight > newConstraints.maxHeight) win.style.height = `${newConstraints.maxHeight}px`;
        const maxLeft = Math.max(0, desktop.offsetWidth - win.offsetWidth);
        const maxTop = Math.max(0, desktop.offsetHeight - taskbarHeight - win.offsetHeight);
        const currentLeft = parseInt(win.style.left) || 0;
        const currentTop = parseInt(win.style.top) || 0;
        if (currentLeft > maxLeft) win.style.left = `${maxLeft}px`;
        if (currentTop > maxTop) win.style.top = `${maxTop}px`;
    });
    resizeObserver.observe(desktop);
}

export function setActiveWindow(win) {
    if (!win) return;
    if (activeWindow) {
        const prevHeader = activeWindow.querySelector('.window-header');
        if (prevHeader) prevHeader.classList.remove('active');
    }
    activeWindow = win;
    highestZIndex++;
    win.style.zIndex = highestZIndex;
    const header = win.querySelector('.window-header');
    if (header) header.classList.add('active');
}

export function closeWindow(windowName) {
    const win = document.getElementById(windowName + 'Window');
    if (!win) return;
    win.style.display = 'none';
    if (windowName === 'solitaire' && window.cleanupSolitaire) {
        window.cleanupSolitaire();
        solitaireInitialized = false;
    }
}

export function minimizeWindow(windowName) {
    const win = document.getElementById(windowName + 'Window');
    if (!win) return;
    win.classList.add('minimized');
}

export function maximizeWindow(windowName) {
    const win = document.getElementById(windowName + 'Window');
    if (!win) return;
    const desktop = document.getElementById('desktop');
    const taskbarHeight = document.getElementById('taskbar').offsetHeight;
    if (win.classList.contains('maximized')) {
        win.classList.remove('maximized');
        const constraints = getWindowConstraints(windowName, desktop.offsetWidth, desktop.offsetHeight - taskbarHeight);
        win.style.width = `${constraints.preferredWidth}px`;
        win.style.height = `${constraints.preferredHeight}px`;
        win.style.left = `${(desktop.offsetWidth - constraints.preferredWidth) / 2}px`;
        win.style.top = `${(desktop.offsetHeight - taskbarHeight - constraints.preferredHeight) / 2}px`;
    } else {
        win.classList.add('maximized');
        win.style.width = `${desktop.offsetWidth}px`;
        win.style.height = `${desktop.offsetHeight - taskbarHeight}px`;
        win.style.left = '0';
        win.style.top = '0';
    }
}
