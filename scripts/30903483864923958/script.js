let highestZIndex = 100;
let activeWindow = null;
let startMenuOpen = false;
const startMenu = document.getElementById('start-menu');
const startButton = document.getElementById('start-button');
const bootMessages = [
    "DaemonOS 2026v5",
    "Copyright (C) DaemonCon",
    "",
    "INITIALIZING SYSTEM: STARTED",
    "LOADING CONFERENCE MODULES: IN PROGRESS",
    "CONFIGURING NETWORK PROTOCOLS: DONE",
    "ACTIVATING FIREWALL: ENABLED",
    "SCANNING FOR VULNERABILITIES: NONE FOUND",
    "PREPARING HACKING CHALLENGES: LOADED",
    "CALIBRATING ENCRYPTION ALGORITHMS: OPTIMIZED",
    "VERIFYING ATTENDEE DATABASE: SECURED",
    "POWERING UP WORKSHOP ENVIRONMENTS: READY",
    "SYNCING WITH SATELLITE NETWORKS: SYNCHRONIZED",
    "INITIALIZING QUANTUM ENTANGLEMENT: STABLE",
    "ESTABLISHING SMBv2 WITH FACULTY: SENT",
    "LOADING DAEMONCON INTERFACE: COMPLETED",
    "",
    "SYSTEM READY. WELCOME TO DAEMONCON 2026."
];
let bootText = "";
let solitaireInitialized = false;
let selectedCard = null;


document.addEventListener('DOMContentLoaded', function() {
    let activeMenuItem = null;
    let isMenuOpen = false;

    function closeAllMenus() {
        document.querySelectorAll('.menu-item').forEach(item => {
            item.classList.remove('active');
            item.querySelector('.dropdown-menu').classList.remove('show');
        });
        isMenuOpen = false;
        activeMenuItem = null;
    }

    function openMenu(menuItem) {
        closeAllMenus();
        menuItem.classList.add('active');
        menuItem.querySelector('.dropdown-menu').classList.add('show');
        isMenuOpen = true;
        activeMenuItem = menuItem;
    }

    // Handle menu item clicks
    document.querySelectorAll('.menu-item').forEach(menuItem => {
        menuItem.addEventListener('click', (e) => {
            e.stopPropagation();
            if (activeMenuItem === menuItem) {
                closeAllMenus();
            } else {
                openMenu(menuItem);
            }
        });

        // Handle menu item hover when a menu is already open
        menuItem.addEventListener('mouseenter', () => {
            if (isMenuOpen) {
                openMenu(menuItem);
            }
        });
    });

    // Handle menu option clicks
    document.querySelectorAll('.menu-option:not(.has-submenu)').forEach(option => {
        option.addEventListener('click', (e) => {
            e.stopPropagation();
            closeAllMenus();
            // Here you can add specific actions for each menu option
            console.log('Selected:', option.textContent.trim());
        });
    });

    // Close menus when clicking outside
    document.addEventListener('click', () => {
        closeAllMenus();
    });

    // Prevent clicks inside dropdown from closing menu
    document.querySelectorAll('.dropdown-menu').forEach(menu => {
        menu.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    });
});

window.onload = function() {
    setTimeout(function() {
        startBootSequence(0);
    }, 500);
}

document.addEventListener('DOMContentLoaded', function() {
    const startButton = document.getElementById('start-button');
    const startMenu = document.getElementById('start-menu');
    const runOption = document.getElementById('run-option');
    const runIcon = document.getElementById('run-icon');
    let startMenuOpen = false;
    let isRunning = false;

    // Start button hover handlers
    startButton.addEventListener('mouseenter', () => {
        if (startMenu.style.display === 'none') {
            startMenuOpen = true;
            startMenu.style.display = 'block';
            startButton.classList.add('active');
        }
    });

    // Handle clicking outside
    document.addEventListener('click', (event) => {
        if (!startMenu.contains(event.target) && !startButton.contains(event.target)) {
            startMenuOpen = false;
            startMenu.style.display = 'none';
            startButton.classList.remove('active');
        }
    });

    // Start button click handler
    startButton.addEventListener('click', (event) => {
        event.stopPropagation();
        startMenuOpen = !startMenuOpen;
        startMenu.style.display = startMenuOpen ? 'block' : 'none';
        startButton.classList.toggle('active');
    });

    // Add Run option handler
    runOption.addEventListener('click', function(e) {
        e.stopPropagation();
        e.preventDefault();
        
        if (!isRunning) {
            isRunning = true;
            runOption.classList.add('running');
            
            runIcon.addEventListener('animationend', function handler() {
                runOption.classList.remove('running');
                isRunning = false;
                runIcon.removeEventListener('animationend', handler);
            }, { once: true });
        }
    });

    // Handle submenu items with both click and hover behavior
    const submenuParents = document.querySelectorAll('.start-menu-item-with-submenu');
    submenuParents.forEach(item => {
        const submenu = item.querySelector('.submenu');
        let isSubmenuOpen = false;

        // Toggle submenu on click
        item.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent menu from closing
            
            // Close all other open submenus first
            document.querySelectorAll('.submenu').forEach(menu => {
                if (menu !== submenu) {
                    menu.style.display = 'none';
                    menu.style.opacity = '0';
                }
            });

            // Toggle current submenu
            isSubmenuOpen = !isSubmenuOpen;
            submenu.style.display = isSubmenuOpen ? 'block' : 'none';
            
            // Use a small timeout to trigger the fade in animation
            if (isSubmenuOpen) {
                setTimeout(() => {
                    submenu.style.opacity = '1';
                }, 10);
            }
        });

        // Handle hover behavior
        item.addEventListener('mouseenter', () => {
            submenu.style.display = 'block';
            setTimeout(() => {
                submenu.style.opacity = '1';
            }, 10);
        });

        item.addEventListener('mouseleave', (e) => {
            // Only close if we're not clicking
            if (!isSubmenuOpen) {
                submenu.style.display = 'none';
                submenu.style.opacity = '0';
            }
        });
    });

    // Modify menu items click behavior
    const menuItems = document.querySelectorAll('.start-menu-item:not(.start-menu-item-with-submenu)');
    menuItems.forEach(item => {
        item.addEventListener('click', (e) => {
            // Keep menu open if this item opens a window OR is the run option
            if (!item.getAttribute('onclick')?.includes('openWindow') && 
                item.id !== 'run-option') {
                startMenuOpen = false;
                startMenu.style.display = 'none';
                startButton.classList.remove('active');
            }
        });
    });

    // Add hover detection for the start menu itself
    startMenu.addEventListener('mouseleave', (event) => {
        // Only auto-close if we didn't click to open it
        if (!startMenuOpen) {
            startMenu.style.display = 'none';
            startButton.classList.remove('active');
        }
    });
});

function isMobileDevice() {
    console.group('Mobile Detection Debug:');
    
    const hasTouch = 'ontouchstart' in window;
    console.log('Has touch events:', hasTouch);
    
    const hasOrientation = typeof window.orientation !== 'undefined';
    console.log('Has orientation:', hasOrientation);
    
    const hasCoarsePointer = window.matchMedia('(pointer: coarse)').matches;
    console.log('Has coarse pointer:', hasCoarsePointer);
    
    const hasAnyCoarsePointer = window.matchMedia('(any-pointer: coarse)').matches;
    console.log('Has any coarse pointer:', hasAnyCoarsePointer);
    console.log('Window inner width:', window.innerWidth);
    console.log('Touch points:', navigator.maxTouchPoints);
    console.log('User Agent:', navigator.userAgent);
    
    const isMobile = hasTouch && (hasOrientation || hasCoarsePointer || hasAnyCoarsePointer);
    console.log('Final result - Is Mobile:', isMobile);
    
    console.groupEnd();
    return isMobile;
}

function getWindowConstraints(windowName, availableWidth, availableHeight) {
    const isMobile = isMobileDevice();
    
    // Mobile-specific constraints
    if (isMobile) {
        const mobileConstraints = {
            minWidth: Math.min(300, availableWidth * 0.9),
            minHeight: Math.min(200, availableHeight * 0.4),
            maxWidth: availableWidth * 0.95,
            maxHeight: availableHeight * 0.9,
            preferredWidth: availableWidth * 0.9,
            preferredHeight: availableHeight * 0.8
        };

        // Window-specific mobile adjustments
        const mobileSpecific = {
            solitaire: {
                preferredWidth: availableWidth * 0.95,
                preferredHeight: availableHeight * 0.85
            },
            about: {
                preferredWidth: availableWidth * 0.9,
                preferredHeight: availableHeight * 0.7
            },
            schedule: {
                preferredWidth: availableWidth * 0.95,
                preferredHeight: availableHeight * 0.85
            },
            workshops: {
                preferredWidth: availableWidth * 0.9,
                preferredHeight: availableHeight * 0.75
            }
        };

        return {
            ...mobileConstraints,
            ...(mobileSpecific[windowName] || {})
        };
    }
    
    // Default desktop constraints
    const defaultConstraints = {
        minWidth: 400,
        minHeight: 300,
        maxWidth: Math.min(1200, availableWidth * 0.9),
        maxHeight: Math.min(800, availableHeight * 0.9),
        preferredWidth: Math.min(600, availableWidth * 0.7),
        preferredHeight: Math.min(400, availableHeight * 0.7)
    };

    // Window-specific desktop constraints
    const constraints = {
        solitaire: {
            minWidth: 800,
            minHeight: 600,
            maxWidth: Math.min(1500, availableWidth * 0.95),
            maxHeight: Math.min(1200, availableHeight * 0.95),
            preferredWidth: Math.min(1000, availableWidth * 0.8),
            preferredHeight: Math.min(800, availableHeight * 0.8)
        },
        about: {
            minWidth: 400,
            minHeight: 400,
            maxWidth: Math.min(800, availableWidth * 0.7),
            maxHeight: Math.min(600, availableHeight * 0.7),
            preferredWidth: Math.min(500, availableWidth * 0.6),
            preferredHeight: Math.min(500, availableHeight * 0.6)
        },
        schedule: {
            minWidth: 600,
            minHeight: 500,
            maxWidth: Math.min(1200, availableWidth * 0.9),
            maxHeight: Math.min(900, availableHeight * 0.9),
            preferredWidth: Math.min(800, availableWidth * 0.75),
            preferredHeight: Math.min(600, availableHeight * 0.75)
        },
        workshops: {
            minWidth: 300,
            minHeight: 400,
            maxWidth: Math.min(900, availableWidth * 0.85),
            maxHeight: Math.min(700, availableHeight * 0.85),
            preferredWidth: Math.min(600, availableWidth * 0.7),
            preferredHeight: Math.min(500, availableHeight * 0.7)
        }
    };

    return constraints[windowName] || defaultConstraints;
}

function openWindow(windowName) {
    if (windowName === 'solitaire' && isMobileDevice()) {
        showMobileWarning();
        return;
    }
    
    const window = document.getElementById(windowName + 'Window');
    const desktop = document.getElementById('desktop');
    const taskbarHeight = document.getElementById('taskbar').offsetHeight;
    
    // Calculate available space
    const availableWidth = desktop.offsetWidth;
    const availableHeight = desktop.offsetHeight - taskbarHeight;
    
    // Get constraints for this window type
    const constraints = getWindowConstraints(windowName, availableWidth, availableHeight);
    
    // Make window visible to apply size constraints
    window.style.display = 'block';
    window.classList.remove('minimized');
    
    // Apply size constraints
    window.style.width = `${constraints.preferredWidth}px`;
    window.style.height = `${constraints.preferredHeight}px`;
    window.style.maxWidth = `${constraints.maxWidth}px`;
    window.style.maxHeight = `${constraints.maxHeight}px`;
    window.style.minWidth = `${constraints.minWidth}px`;
    window.style.minHeight = `${constraints.minHeight}px`;
    
    // Calculate optimal position
    let left, top;
    
    const isMobile = isMobileDevice();
    
    if (isMobile) {
        // Center windows on mobile and add small offset for stacking
        const openWindows = document.querySelectorAll('.window:not(.minimized)');
        const windowCount = openWindows.length;
        const offset = Math.min(20, availableWidth * 0.05);
        
        left = Math.max(10, Math.min((offset * windowCount) % (availableWidth * 0.3), availableWidth - constraints.preferredWidth - 10));
        top = Math.max(10, Math.min((offset * windowCount) % (availableHeight * 0.3), availableHeight - constraints.preferredHeight - 10));
    } else {
        if (windowName === 'solitaire') {
            // Center solitaire window on desktop
            left = Math.max(0, (availableWidth - constraints.preferredWidth) / 2);
            top = Math.max(0, (availableHeight - constraints.preferredHeight) / 2);
        } else {
            // Cascade other windows with offset
            const offset = Math.min(30, availableWidth * 0.02);
            const openWindows = document.querySelectorAll('.window:not(.minimized)');
            const windowCount = openWindows.length;
            
            left = Math.min((offset * windowCount) % (availableWidth / 2), availableWidth - constraints.preferredWidth);
            top = Math.min((offset * windowCount) % (availableHeight / 2), availableHeight - constraints.preferredHeight);
        }
    }
    
    // Ensure window is within bounds
    left = Math.max(0, Math.min(left, availableWidth - constraints.preferredWidth));
    top = Math.max(0, Math.min(top, availableHeight - constraints.preferredHeight));
    
    // Apply position
    window.style.left = `${left}px`;
    window.style.top = `${top}px`;
    
    // Bring the window to the front
    highestZIndex++;
    window.style.zIndex = highestZIndex;
    setActiveWindow(window);

    if (windowName === 'solitaire' && !solitaireInitialized) {
        initSolitaire();
        solitaireInitialized = true;
    }
    
    // Add resize observer to handle window repositioning and resizing
    const resizeObserver = new ResizeObserver(() => {
        // Recalculate constraints based on new display size
        const newConstraints = getWindowConstraints(windowName, desktop.offsetWidth, desktop.offsetHeight - taskbarHeight);
        
        // Update size constraints
        window.style.maxWidth = `${newConstraints.maxWidth}px`;
        window.style.maxHeight = `${newConstraints.maxHeight}px`;
        
        // Adjust window size if it exceeds new constraints
        const currentWidth = window.offsetWidth;
        const currentHeight = window.offsetHeight;
        
        if (currentWidth > newConstraints.maxWidth) {
            window.style.width = `${newConstraints.maxWidth}px`;
        }
        if (currentHeight > newConstraints.maxHeight) {
            window.style.height = `${newConstraints.maxHeight}px`;
        }
        
        // Ensure window stays within bounds
        const maxLeft = Math.max(0, desktop.offsetWidth - window.offsetWidth);
        const maxTop = Math.max(0, desktop.offsetHeight - taskbarHeight - window.offsetHeight);
        
        const currentLeft = parseInt(window.style.left);
        const currentTop = parseInt(window.style.top);
        
        if (currentLeft > maxLeft) {
            window.style.left = `${maxLeft}px`;
        }
        if (currentTop > maxTop) {
            window.style.top = `${maxTop}px`;
        }
    });
    resizeObserver.observe(desktop);
}

function setActiveWindow(window) {
    // Remove active class from previous active window
    if (activeWindow) {activeWindow.querySelector('.window-header').classList.remove('active');}
    
    // Set new active window
    activeWindow = window;
    highestZIndex++;
    window.style.zIndex = highestZIndex;
    window.querySelector('.window-header').classList.add('active');
}

function openTab(evt, tabName, windowId) {
    // Get the specific window's content
    const windowElement = document.getElementById(windowId);
    if (!windowElement) return;

    // Get all tab content and buttons within this specific window
    const tabContent = windowElement.getElementsByClassName("tab-content");
    const tabButtons = windowElement.getElementsByClassName("tab-button");

    // Remove active class from all tabs in this window
    for (let i = 0; i < tabContent.length; i++) {tabContent[i].classList.remove("active");}

    // Remove active class from all buttons in this window
    for (let i = 0; i < tabButtons.length; i++) {tabButtons[i].classList.remove("active");}

    // Activate the selected tab and button
    const selectedTab = windowElement.querySelector(`#${tabName}`);
    if (selectedTab) {selectedTab.classList.add("active");}
    evt.currentTarget.classList.add("active");
}

// Function to set up tab system for a window
function initializeTabs(windowId) {
    const windowElement = document.getElementById(windowId);
    if (!windowElement) return;

    const tabButtons = windowElement.getElementsByClassName("tab-button");
    for (let button of tabButtons) {
        button.addEventListener('click', function(e) {
            const tabName = this.getAttribute('data-tab');
            openTab(e, tabName, windowId);
        });
    }

    // Activate first tab by default
    if (tabButtons.length > 0) {
        const firstTabName = tabButtons[0].getAttribute('data-tab');
        openTab({ currentTarget: tabButtons[0] }, firstTabName, windowId);
    }
}

function dragElement(elmnt) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    const header = elmnt.getElementsByClassName('window-header')[0];
    
    // Mouse events
    header.onmousedown = dragMouseDown;
    
    // Touch events
    header.ontouchstart = dragTouchStart;

    function dragMouseDown(e) {
        e = e || window.event;
        if (e.target.classList.contains('window-control')) return;
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
        
        // Prevent scrolling during drag
        document.body.classList.add('dragging');

        // Bring the clicked window to the front
        highestZIndex++;
        elmnt.style.zIndex = highestZIndex;
        setActiveWindow(elmnt);
    }

    function dragTouchStart(e) {
        if (e.target.classList.contains('window-control')) return;
        e.preventDefault();
        const touch = e.touches[0];
        pos3 = touch.clientX;
        pos4 = touch.clientY;
        document.ontouchend = closeDragElement;
        document.ontouchmove = elementDragTouch;
        
        // Prevent scrolling during drag
        document.body.classList.add('dragging');

        // Bring the clicked window to the front
        highestZIndex++;
        elmnt.style.zIndex = highestZIndex;
        setActiveWindow(elmnt);
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
        
        // Get desktop bounds
        const desktop = document.getElementById('desktop');
        const taskbarHeight = document.getElementById('taskbar').offsetHeight;
        const maxLeft = desktop.offsetWidth - elmnt.offsetWidth;
        const maxTop = desktop.offsetHeight - taskbarHeight - elmnt.offsetHeight;
        
        // Constrain to desktop bounds
        elmnt.style.top = Math.max(0, Math.min(newTop, maxTop)) + "px";
        elmnt.style.left = Math.max(0, Math.min(newLeft, maxLeft)) + "px";
    }

    function closeDragElement() {
        // Remove mouse event listeners
        document.onmouseup = null;
        document.onmousemove = null;
        
        // Remove touch event listeners
        document.ontouchend = null;
        document.ontouchmove = null;
        
        // Re-enable scrolling
        document.body.classList.remove('dragging');
    }
}

function closeWindow(windowName) {
    const window = document.getElementById(windowName + 'Window');
    window.style.display = 'none';
    if (windowName === 'solitaire') {cleanupSolitaire();}
}

function minimizeWindow(windowName) {
    const window = document.getElementById(windowName + 'Window');
    window.classList.add('minimized');
}

function maximizeWindow(windowName) {
    const window = document.getElementById(windowName + 'Window');
    const desktop = document.getElementById('desktop');
    const taskbarHeight = document.getElementById('taskbar').offsetHeight;
    
    if (window.classList.contains('maximized')) {
        window.classList.remove('maximized');
        const constraints = getWindowConstraints(windowName, desktop.offsetWidth, desktop.offsetHeight - taskbarHeight);
        window.style.width = `${constraints.preferredWidth}px`;
        window.style.height = `${constraints.preferredHeight}px`;
        window.style.left = `${(desktop.offsetWidth - constraints.preferredWidth) / 2}px`;
        window.style.top = `${(desktop.offsetHeight - taskbarHeight - constraints.preferredHeight) / 2}px`;
    } else {
        window.classList.add('maximized');
        window.style.width = `${desktop.offsetWidth}px`;
        window.style.height = `${desktop.offsetHeight - taskbarHeight}px`;
        window.style.left = '0';
        window.style.top = '0';
    }
}

// Make the windows draggable
const windows = document.getElementsByClassName('window');
for (let i = 0; i < windows.length; i++) {
    dragElement(windows[i]);
}

document.querySelectorAll('.window').forEach(window => {
    window.addEventListener('click', () => setActiveWindow(window));
});



document.addEventListener('DOMContentLoaded', function() {
    const windowsWithTabs = [
        'scheduleWindow',
        'workshopsWindow',
        'registerWindow'
    ];

    windowsWithTabs.forEach(windowId => {
        initializeTabs(windowId);
    });
});

