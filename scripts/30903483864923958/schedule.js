// Appointment descriptions
const appointmentDescriptions = {
    "keynote": {
        title: "",
        time: "11:00 AM",
        description: "",
        speaker: "",
        location: "Main Hall"
    },
    "talk1": {
        title: "",
        time: "01:00 PM",
        description: "",
        speaker: "",
        location: "Main Hall"
    },
    "talk2": {
        title: "",
        time: "02:00 PM",
        description: "",
        speaker: "",
        location: "Main Hall"
    },
    "talk3": {
        title: "",
        time: "02:30 PM",
        description: "",
        speaker: "",
        location: "Main Hall"
    },
    "talk4": {
        title: "",
        time: "",
        description: "",
        speaker: "",
        location: "Main Hall"
    },
    "talk5": {
        title: "",
        time: "04:30 PM",
        description: "",
        speaker: "",
        location: "Main Hall"
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
