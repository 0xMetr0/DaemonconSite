export function initTaskbar() {
    const startButton = document.getElementById('start-button');
    const startMenu = document.getElementById('start-menu');
    const runOption = document.getElementById('run-option');
    const runIcon = document.getElementById('run-icon');
    let startMenuOpen = false;
    let isRunning = false;

    if (!startButton || !startMenu) return;

    startButton.addEventListener('mouseenter', () => {
        if (startMenu.style.display === 'none') {
            startMenuOpen = true;
            startMenu.style.display = 'block';
            startButton.classList.add('active');
        }
    });

    document.addEventListener('click', (event) => {
        if (!startMenu.contains(event.target) && !startButton.contains(event.target)) {
            startMenuOpen = false;
            startMenu.style.display = 'none';
            startButton.classList.remove('active');
        }
    });

    startButton.addEventListener('click', (event) => {
        event.stopPropagation();
        startMenuOpen = !startMenuOpen;
        startMenu.style.display = startMenuOpen ? 'block' : 'none';
        startButton.classList.toggle('active');
    });

    if (runOption) {
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
    }

    const submenuParents = document.querySelectorAll('.start-menu-item-with-submenu');
    submenuParents.forEach(item => {
        const submenu = item.querySelector('.submenu');
        let isSubmenuOpen = false;
        if (!submenu) return;
        item.addEventListener('click', (e) => {
            e.stopPropagation();
            document.querySelectorAll('.submenu').forEach(menu => { if (menu !== submenu) { menu.style.display = 'none'; menu.style.opacity = '0'; } });
            isSubmenuOpen = !isSubmenuOpen;
            submenu.style.display = isSubmenuOpen ? 'block' : 'none';
            if (isSubmenuOpen) setTimeout(() => submenu.style.opacity = '1', 10);
        });
        item.addEventListener('mouseenter', () => { submenu.style.display = 'block'; setTimeout(() => submenu.style.opacity = '1', 10); });
        item.addEventListener('mouseleave', (e) => { if (!isSubmenuOpen) { submenu.style.display = 'none'; submenu.style.opacity = '0'; } });
    });

    const menuItems = document.querySelectorAll('.start-menu-item:not(.start-menu-item-with-submenu)');
    menuItems.forEach(item => {
        item.addEventListener('click', (e) => {
            if (!item.getAttribute('onclick')?.includes('openWindow') && item.id !== 'run-option') {
                startMenuOpen = false;
                startMenu.style.display = 'none';
                startButton.classList.remove('active');
            }
        });
    });

    startMenu.addEventListener('mouseleave', (event) => {
        if (!startMenuOpen) {
            startMenu.style.display = 'none';
            startButton.classList.remove('active');
        }
    });
}
