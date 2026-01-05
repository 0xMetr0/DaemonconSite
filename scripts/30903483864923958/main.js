import { initMenus } from './menus.js';
import { initTaskbar } from './taskbar.js';
import { makeWindowsDraggable } from './ui.js';
import { initializeTabs, openTab } from './tabs.js';
import * as Windows from './windows.js';
import { startBootSequence } from './bootsequence.js';

document.addEventListener('DOMContentLoaded', () => {
    // Expose key functions to global scope for legacy inline handlers
    window.openWindow = Windows.openWindow;
    window.setActiveWindow = Windows.setActiveWindow;
    window.closeWindow = Windows.closeWindow;
    window.minimizeWindow = Windows.minimizeWindow;
    window.maximizeWindow = Windows.maximizeWindow;
    window.getWindowConstraints = Windows.getWindowConstraints;
    window.openTab = openTab;
    window.startBootSequence = startBootSequence;

    // Initialize UI modules
    try { initMenus(); } catch (e) { console.warn('initMenus failed', e); }
    try { initTaskbar(); } catch (e) { console.warn('initTaskbar failed', e); }
    try { makeWindowsDraggable(); } catch (e) { console.warn('makeWindowsDraggable failed', e); }

    // Initialize tabs for windows that use them
    ['scheduleWindow', 'workshopsWindow', 'registerWindow'].forEach(id => {
        try { initializeTabs(id); } catch (e) { /* ignore */ }
    });

    // Start boot sequence
    setTimeout(() => startBootSequence(0), 500);
});
