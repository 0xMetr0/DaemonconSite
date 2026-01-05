let bootText = "";
const bootMessages = [
    "DaemonOS 2026v1",
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

export function typeWriter(text, i, fnCallback) {
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

export function startBootSequence(i) {
    if (i < bootMessages.length) {
        typeWriter(bootMessages[i], 0, function() {
            startBootSequence(i + 1);
        });
    } else {
        setTimeout(function() {
            document.getElementById("boot-screen").style.display = "none";
            document.getElementById("desktop").style.display = "block";
            if (window.openWindow) window.openWindow('about');
        }, 1000);
    }
}
