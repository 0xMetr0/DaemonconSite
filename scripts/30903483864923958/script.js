const bootMessages = [
    "DaemonOS 2025v1",
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
    "SYSTEM READY. WELCOME TO DAEMONCON 2025."
];
let highestZIndex = 100;
let solitaireInitialized = false;
let selectedCard = null;
let activeWindow = null;
let bootText = "";
let startMenuOpen = false;
const startMenu = document.getElementById('start-menu');
const startButton = document.getElementById('start-button');
function typeWriter(text, i, fnCallback) {
    if (i < text.length) {
        bootText += text[i];
        document.getElementById("boot-text").innerHTML = bootText + '<span class="blink">|</span>';
        document.getElementById("boot-screen").scrollTop = document.getElementById("boot-screen").scrollHeight;
        setTimeout(function() {
            typeWriter(text, i + 1, fnCallback)
        }, 5);
    } else if (typeof fnCallback == 'function') {
        bootText += '\n';
        setTimeout(fnCallback, 5);
    }
}

function startBootSequence(i) {
    if (i < bootMessages.length) {
        typeWriter(bootMessages[i], 0, function() {
            startBootSequence(i + 1);
        });
    } else {
        setTimeout(function() {
            document.getElementById("boot-screen").style.display = "none";
            document.getElementById("desktop").style.display = "block";
            openWindow('about');
        }, 1000);
    }
}
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


function getWindowConstraints(windowName, availableWidth, availableHeight) {
    // Default constraints
    const defaultConstraints = {
        minWidth: 400,
        minHeight: 300,
        maxWidth: Math.min(1200, availableWidth * 0.9),
        maxHeight: Math.min(800, availableHeight * 0.9),
        preferredWidth: Math.min(600, availableWidth * 0.7),
        preferredHeight: Math.min(400, availableHeight * 0.7)
    };

    // Window-specific constraints
    const constraints = {
        solitaire: {
            minWidth: 1600,
            minHeight: 1200,
            maxWidth: Math.min(1200, availableWidth * 0.95),
            maxHeight: Math.min(900, availableHeight * 0.95),
            preferredWidth: Math.min(1000, availableWidth * 0.8),
            preferredHeight: Math.min(800, availableHeight * 0.8)
        },
        about: {
            minWidth: 400,
            minHeight: 600,
            maxWidth: Math.min(800, availableWidth * 0.8),
            maxHeight: Math.min(600, availableHeight * 0.8),
            preferredWidth: Math.min(500, availableWidth * 0.6),
            preferredHeight: Math.min(500, availableHeight * 0.7)
        },
        schedule: {
            minWidth: 600,
            minHeight: 800,
            maxWidth: Math.min(1000, availableWidth * 0.9),
            maxHeight: Math.min(800, availableHeight * 0.9),
            preferredWidth: Math.min(800, availableWidth * 0.75),
            preferredHeight: Math.min(600, availableHeight * 0.75)
        },
        workshops: {
            minWidth: 300,
            minHeight: 500,
            maxWidth: Math.min(900, availableWidth * 0.85),
            maxHeight: Math.min(700, availableHeight * 0.85),
            preferredWidth: Math.min(700, availableWidth * 0.7),
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
    
    if (windowName === 'solitaire') {
        // Center solitaire window
        left = Math.max(0, (availableWidth - constraints.preferredWidth) / 2);
        top = Math.max(0, (availableHeight - constraints.preferredHeight) / 2);
    } else {
        // Cascade other windows with offset
        const offset = Math.min(30, availableWidth * 0.02); // Responsive offset
        const openWindows = document.querySelectorAll('.window:not(.minimized)');
        const windowCount = openWindows.length;
        
        // Calculate position with cascade effect
        left = Math.min((offset * windowCount) % (availableWidth / 2), availableWidth - constraints.preferredWidth);
        top = Math.min((offset * windowCount) % (availableHeight / 2), availableHeight - constraints.preferredHeight);
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

    if (windowName === 'solitaire') {
        const windowWidth = 800;
        const windowHeight = 600;
        const left = (screen.width - windowWidth) / 2;
        const top = (screen.height - windowHeight) / 2;
        window.style.left = left + 'px';
        window.style.top = top + 'px'
        if (windowName === 'solitaire') {
            // Only initialize if not already initialized
            if (!solitaireInitialized) {
                initSolitaire();
                solitaireInitialized = true;
            }
        }
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
    elmnt.getElementsByClassName('window-header')[0].onmousedown = dragMouseDown;

    function dragMouseDown(e) {
        e = e || window.event;
        if (e.target.classList.contains('window-control')) return;
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;

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
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";

    }

    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
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

function createCard(rank, suit, higher) {
    let suitSymbol, cardColor;
    switch (suit) {
        case 'spade':
            suitSymbol = '♠';
            cardColor = 'black';
            break;
        case 'heart':
            suitSymbol = '♥';
            cardColor = 'red';
            break;
        case 'diamond':
            suitSymbol = '♦';
            cardColor = 'red';
            break;
        case 'club':
            suitSymbol = '♣';
            cardColor = 'black';
            break;
        default:
            suitSymbol = '🃏';
            cardColor = 'black';
            break;
    }

    let frontInnerHTML = `<div class="inner-info card-rank">${rank}</div>`;
    frontInnerHTML += `<div class="inner-info card-suit-small">${suitSymbol}</div>`;
    frontInnerHTML += `<div class="inner-info card-suit-big">${suitSymbol}</div>`;

    return {
        rank,
        higher,
        inner: frontInnerHTML,
        suit,
        color: cardColor,
        below: null
    }
}

function createDeck() {
    const cardRanking = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    const cardSuits = ['spade', 'heart', 'diamond', 'club'];
    const deck = [];
    for (let i = 0; i < cardSuits.length; i++) {
        for (let j = 0; j < cardRanking.length; j++) {
            const higherRank = cardRanking[j + 1] ? cardRanking[j + 1] : null;
            const newCard = createCard(cardRanking[j], cardSuits[i], higherRank);
            deck.push(newCard);
        }
    }
    return deck;
}

function shuffleCards(deck) {
    return deck.sort(() => Math.random() - 0.5);
}

function putCardsInDeck(cards) {
    const deck = document.getElementById('deck');
    if (!deck) {
        console.error("Deck element not found");
        return;
    }
    if (!Array.isArray(cards) || cards.length === 0) {
        console.error("Invalid cards array");
        return;
    }
    deck.innerHTML = '';

    cards.forEach((cardInfo) => {
        const cardElement = document.createElement('div');
        cardElement.className = 'card back';
        cardElement.cardInfo = cardInfo;
        deck.appendChild(cardElement);
        //console.log(`Added card to deck:`, cardInfo);
    });
}


function turnCard() {
    if (!this.cardInfo) {
        console.error('Card info is undefined for this card');
        return;
    }
    const isLastCard = this === this.parentNode.lastElementChild;
    const isCardVisible = this.style.visibility !== 'hidden';
    const isCardFacingDown = this.classList.contains('back');

    if (isLastCard && isCardVisible) {
        if (isCardFacingDown) {
            this.classList.remove('back');
            this.classList.add(`${this.cardInfo.suit}`);
            this.innerHTML = this.cardInfo.inner;
        }
        this.setAttribute('draggable', true);
    }

}

function turnCardBack(card) {
    card.classList.remove(`${card.cardInfo.suit}`);
    card.classList.add('back');
    card.innerHTML = '';
    card.setAttribute('draggable', false);
}

function distributeCards() {
    const piles = document.querySelectorAll('.row');
    piles.forEach((pile, index) => {     
        for (let i = 0; i < index + 1; i++) {
            const deck = document.getElementById('deck');
            const topCard = deck.lastElementChild;
            if (i === index) {
                turnCard.apply(topCard);
            }
                deck.removeChild(topCard);
                pile.append(topCard);
        }
    });
}


function showTopCard(topCards, deck, deckTopCard) {
    if (deckTopCard.cardInfo) {
        deck.removeChild(deckTopCard);
        topCards.append(deckTopCard);
        if (topCards.childElementCount > 1) {
            topCards.childNodes[0].setAttribute('draggable', false);
        }
        if (topCards.childElementCount > 2) {
            topCards.childNodes[1].setAttribute('draggable', false);
        }
        if (topCards.childElementCount > 3) {
            topCards.childNodes[2].setAttribute('draggable', false);
            const firstCard = topCards.firstElementChild;
            turnCardBack(firstCard);
            firstCard.style.visibility = 'hidden';
            topCards.removeChild(firstCard);
            deck.prepend(firstCard);
        }
    }
}

function returnCardsToDeck(topCards, deck) {
    const cardsToDeck = [];
    topCards.childNodes.forEach(card => {
        turnCardBack(card);
        card.style.visibility = 'hidden';
        cardsToDeck.push(card);
    });
    cardsToDeck.forEach(card => {
        deck.prepend(card);
    });
    topCards.innerHTML = '';
    const cardsInDeck = deck.querySelectorAll('.card');
    cardsInDeck.forEach(card => {
        card.style.visibility = 'visible';
    });
}

function checkDeckCards() {
    //console.log("checkDeckCards called");
    const topCards = document.getElementById('top-cards');
    const deck = document.getElementById('deck');
    const deckTopCard = deck.lastElementChild;

    console.log("Deck top card:", deckTopCard);

    if (!deckTopCard) {
        //console.log("No top card, returning cards to deck");
        returnCardsToDeck(topCards, deck);
    } else if (deckTopCard.style.visibility === 'hidden') {
        //console.log("Top card is hidden, returning cards to deck");
        returnCardsToDeck(topCards, deck);
    } else {
        //console.log("Showing top card");
        showTopCard(topCards, deck, deckTopCard);
    }
}


function changeCardPosition(cardToDrop, dropSpot, checkCondition) {
    if (checkCondition) {
        const cardAbove = cardToDrop.previousSibling;
        cardToDrop.parentNode.removeChild(cardToDrop);
        dropSpot.append(cardToDrop);
        if (cardToDrop.cardInfo.below) {
            cardToDrop.cardInfo.below.forEach(card => dropSpot.append(card));
        }

        return cardAbove;
    }
}

function dropInRow(cardToDrop, dropSpot) {
    const cardToDropInfo = cardToDrop.cardInfo;
    const lastCardInRow = dropSpot.lastElementChild;
    if (lastCardInRow) {
        const lastCardInfo = lastCardInRow.cardInfo;
        if (lastCardInfo && lastCardInRow.draggable) {
            const checkRank = lastCardInfo.rank === cardToDropInfo.higher;
            const checkColor = lastCardInfo.color !== cardToDropInfo.color;
            return changeCardPosition(cardToDrop, dropSpot, (checkRank && checkColor));
        }
    } else {
        const checkRank = cardToDrop.cardInfo.rank === 'K';
        return changeCardPosition(cardToDrop, dropSpot, checkRank);
    }
}

function dropInPile(cardToDrop, dropSpot) {
    const cardToDropInfo = cardToDrop.cardInfo;
    const lastCardInPile = dropSpot.lastElementChild;
    if (!cardToDropInfo.below) {
        if (lastCardInPile) {
            const lastCardInfo = lastCardInPile.cardInfo;
            if (lastCardInfo) {
                const checkRank = lastCardInfo.higher === cardToDropInfo.rank;
                const checkSuit = lastCardInfo.suit === cardToDropInfo.suit;
                if (checkRank && checkSuit) {lastCardInPile.setAttribute('draggable', false);}
                return changeCardPosition(cardToDrop, dropSpot, (checkRank && checkSuit));
            } else {
                const checkRank = cardToDropInfo.rank === 'A';
                const checkSuit = lastCardInPile.id.split('-')[0] === cardToDropInfo.suit;
                return changeCardPosition(cardToDrop, dropSpot, (checkRank && checkSuit));
            }

        }
    }
}

    function dropCard(event, cardToDrop) {
        const tgt = event.target;
        const findSpot = function (element, htmlClass) {
            const classList = element.classList;
            if (classList) {
                if (classList.contains(htmlClass)) {return element;} 
                else {return findSpot(element.parentNode, htmlClass);} 
            }
            return;
        }
        const dropSpot = findSpot(tgt, 'row') || findSpot(tgt, 'pile');
        let cardAbove;
        if (dropSpot) {
            if (dropSpot.classList.contains('row')) {cardAbove = dropInRow(cardToDrop, dropSpot);} 
            else if (dropSpot.classList.contains('pile')) {cardAbove = dropInPile(cardToDrop, dropSpot);}
        }
        if (cardAbove) {
            turnCard.apply(cardAbove);
        }
    }

    function checkGameOver() {
        const piles = document.querySelectorAll('.pile');
        let allPilesComplete =  true;
        piles.forEach(pile => {
            allPilesComplete = allPilesComplete && (pile.childElementCount - 1) === 13;
        });
        if (allPilesComplete) {
            alert('YOU WIN!');
        }
    }

    function resetSelections(card) {
        card.cardInfo.below = null;
        card = null;
        return card;
    }

function dragRowCards(card) {

    const cardParent = card.parentNode;
    const isLastCard = card === cardParent.lastElementChild;

    if (!isLastCard) {

        card.cardInfo.below = [];

        for (let i = cardParent.childElementCount - 1; i >= 0; i--) {

            if (cardParent.childNodes[i] === card) {
                return;
            }

            card.cardInfo.below.unshift(cardParent.childNodes[i]);
        }
    }
}

document.addEventListener("dragstart", event => {
    if (event.target.draggable) {
        selectedCard = event.target;
        dragRowCards(selectedCard);
    }
});

document.addEventListener("dragover", event => {
    event.preventDefault();
}, false);

document.addEventListener("drop", event => {
    event.preventDefault();
    dropCard(event, selectedCard);
    selectedCard = resetSelections(selectedCard);
    checkGameOver();
});

function initSolitaire() {
    //console.log("Initializing solitaire");
    const deck = document.getElementById('deck');
    const rows = document.querySelectorAll('.row');
    deck.innerHTML = '';
    rows.forEach(row => row.innerHTML = '');

    const globalDeck = createDeck();
    //console.log("Global deck created:", globalDeck);
    const shuffledDeck = shuffleCards(globalDeck);
    //console.log("Deck shuffled:", shuffledDeck);
    putCardsInDeck(shuffledDeck);
    distributeCards();
    
    deck.addEventListener('click', checkDeckCards);
    //console.log("Click event listener added to deck");
    
    const cards = document.getElementsByClassName('card');
    for (let i = 0; i < cards.length; i++) {
        if (cards[i].cardInfo) {  
            cards[i].addEventListener('click', turnCard);
        } else {
            console.warn('Card found without cardInfo:', cards[i]);
        }
    }
    
    console.log("Solitaire initialization complete");
}

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
//Address Book 
const contactData = {
    shared: [],
    main: [],
    //lackeys: [
    //    { name: "Bruce Coffing", title: "CISO City of Chicago" },
    //    { name: "John Doe", title: "Speaker" },
    //    { name: "Jane Smith", title: "Lackey Role" }
    //],
    leads: [
        { name: "Ryan Haley", title: "Faculty Liaison" },
        { name: "Petar Modrakovic", title: "Convention Coordinator" }
    ],
    usefuldrones: [
        { name: "Max Casson", title: "Web Designer" }
    ],
    founders: [
        { name: "Andrew Green", title: "Founder" },
        { name: "Agnė Butvilas", title: "Organizer" },
        { name: "Ryan Haley", title: "Faculty Sponsor"}
    ]
};
function showContacts(section) {
    document.querySelectorAll('.tree-label').forEach(label => {
        label.classList.remove('selected');
    });
    event.target.classList.add('selected');
    const grid = document.getElementById('contactGrid');
    const contacts = contactData[section];
    grid.innerHTML = '';
    
    contacts.forEach(contact => {
        const div = document.createElement('div');
        div.className = 'contact-item';
        div.innerHTML = `
            <img src="buttons/addressbook.png" alt="Contact">
            <span class="contact-name">${contact.name}</span>
            <span class="contact-title">${contact.title}</span>
        `;
        grid.appendChild(div);
    });
    const footer = document.querySelector('#addressBookWindow .window-footer');
    if (footer) {
        footer.textContent = `${contacts.length} item${contacts.length !== 1 ? 's' : ''}`;
    }
}

function toggleMainIdentity(element) {
    const children = document.getElementById('mainChildren');
    if (element.textContent === '-') {
        element.textContent = '+';
        children.classList.add('hidden');
    } else {
        element.textContent = '-';
        children.classList.remove('hidden');
    }
}
document.addEventListener('DOMContentLoaded', function() {
    showContacts('main');
    dragElement(document.getElementById('addressBookWindow'));
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

function showMobileWarning() {
    const modal = document.getElementById('mobile-warning');
    modal.style.display = 'block';
    const closeBtn = modal.querySelector('.close-button');
    const modalBtn = modal.querySelector('.modal-button');
    
    function closeModal() {
        modal.style.display = 'none';
    }

    closeBtn.onclick = closeModal;
    modalBtn.onclick = closeModal;
    window.onclick = function(event) {
        if (event.target === modal) {
            closeModal();
        }
    };
}

