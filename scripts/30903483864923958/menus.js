export function initMenus() {
    let activeMenuItem = null;
    let isMenuOpen = false;

    function closeAllMenus() {
        document.querySelectorAll('.menu-item').forEach(item => {
            item.classList.remove('active');
            const dropdown = item.querySelector('.dropdown-menu');
            if (dropdown) dropdown.classList.remove('show');
        });
        isMenuOpen = false;
        activeMenuItem = null;
    }

    function openMenu(menuItem) {
        closeAllMenus();
        menuItem.classList.add('active');
        const dropdown = menuItem.querySelector('.dropdown-menu');
        if (dropdown) dropdown.classList.add('show');
        isMenuOpen = true;
        activeMenuItem = menuItem;
    }

    document.querySelectorAll('.menu-item').forEach(menuItem => {
        menuItem.addEventListener('click', (e) => {
            e.stopPropagation();
            if (activeMenuItem === menuItem) {
                closeAllMenus();
            } else {
                openMenu(menuItem);
            }
        });

        menuItem.addEventListener('mouseenter', () => {
            if (isMenuOpen) openMenu(menuItem);
        });
    });

    document.querySelectorAll('.menu-option:not(.has-submenu)').forEach(option => {
        option.addEventListener('click', (e) => {
            e.stopPropagation();
            closeAllMenus();
            console.log('Selected:', option.textContent.trim());
        });
    });

    document.addEventListener('click', () => closeAllMenus());

    document.querySelectorAll('.dropdown-menu').forEach(menu => {
        menu.addEventListener('click', (e) => e.stopPropagation());
    });
}
