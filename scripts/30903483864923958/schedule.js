// Schedule functionality - Appointment descriptions
const appointmentDescriptions = {
    "registration": {
        title: "Registration",
        time: "10:00 AM",
        description: "Placeholder",
        speaker: null,
        location: "Main Lobby"
    },
    "welcome": {
        title: "Welcome",
        time: "10:30 AM",
        description: "Placeholder",
        speaker: "DaemonCon Organizers",
        location: "Main Hall"
    },
    "keynote": {
        title: "Keynote: Trends Change, Purpose Doesn't",
        time: "11:00 AM",
        description: "Placeholder",
        speaker: "Ivana Donevska",
        location: "Main Hall"
    },
    "talk1": {
        title: "Internet Infrastructure, Peering, and Observability Walkthrough",
        time: "01:00 PM",
        description: "Placeholder",
        speaker: "Aaron Atac",
        location: "Main Hall"
    },
    "talk2": {
        title: "Agentic Threat Intel: Building an AI-Powered Intelligence Pipeline",
        time: "02:00 PM",
        description: "Placeholder",
        speaker: "AJ Van Beest",
        location: "Main Hall"
    },
    "talk3": {
        title: "If You Can Talk, You Can Hack: Breaking Chatbots on Purpose",
        time: "02:30 PM",
        description: "Placeholder",
        speaker: "Derick Johnson",
        location: "Main Hall"
    },
    "panel": {
        title: "Industry Panel Discussion",
        time: "03:00 PM",
        description: "Placeholder",
        speaker: "Placeholder",
        location: "Main Hall"
    },
    "talk4": {
        title: "A Decade of DFIR Investigations",
        time: "04:00 PM",
        description: "Placeholder",
        speaker: "Domenic Rizzolo",
        location: "Main Hall"
    },
    "talk5": {
        title: "From Zero to Near-Hero: Conquering 1980's Nintendo Technology",
        time: "04:30 PM",
        description: "Placeholder",
        speaker: "Steve O'Reilly",
        location: "Main Hall"
    },
    "jeopardy": {
        title: "Hacker Jeopardy",
        time: "05:00 PM",
        description: "Placeholder",
        speaker: null,
        location: "Main Hall"
    },
    "closing": {
        title: "Closing Remarks",
        time: "06:00 PM",
        description: "Placeholder",
        speaker: "DaemonCon Organizers",
        location: "Main Hall"
    },
    "afterparty": {
        title: "After Party",
        time: "07:00 PM",
        description: "Placeholder",
        speaker: null,
        location: "TBD"
    }
};

export function selectAppointment(appointmentId) {
    // Remove selected class from all appointments
    document.querySelectorAll('.appointment-row').forEach(row => {
        row.classList.remove('selected');
    });
    
    // Add selected class to clicked appointment
    const selectedRow = document.querySelector(`[data-appointment="${appointmentId}"]`);
    if (selectedRow) {
        selectedRow.classList.add('selected');
    }
    
    // Update description panel
    const descPanel = document.getElementById('appointmentDescription');
    const appointment = appointmentDescriptions[appointmentId];
    
    if (appointment && descPanel) {
        let html = `
            <div class="desc-header">${appointment.title}</div>
            <div class="desc-time"><img src="buttons/Alarm.ico" alt="Time" width="16" height="16"> ${appointment.time}</div>
            <div class="desc-location"><img src="buttons/globe.ico" alt="Location" width="16" height="16"> ${appointment.location}</div>
        `;
        
        if (appointment.speaker) {
            html += `<div class="desc-speaker"><img src="buttons/person.png" alt="Speaker" width="16" height="16"> ${appointment.speaker}</div>`;
        }
        
        html += `<div class="desc-text">${appointment.description}</div>`;
        
        descPanel.innerHTML = html;
    }
}

export function initSchedule() {
    // Add click handlers to all appointment rows
    document.querySelectorAll('.appointment-row').forEach(row => {
        row.addEventListener('click', function() {
            const appointmentId = this.getAttribute('data-appointment');
            if (appointmentId) {
                selectAppointment(appointmentId);
            }
        });
    });
    
    // Select the first appointment by default
    const firstAppointment = document.querySelector('.appointment-row[data-appointment]');
    if (firstAppointment) {
        const appointmentId = firstAppointment.getAttribute('data-appointment');
        selectAppointment(appointmentId);
    }
}