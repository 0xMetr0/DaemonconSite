// Appointment descriptions
const appointmentDescriptions = {
    "keynote": {
        title: "Keynote: Trends Change, Purpose Doesn't",
        time: "11:00 AM",
        description: "Ikigai, the Japanese concept describing the convergence of purpose and contribution, offers a human-centered lens for the speakers to identify their passion in the ever changing field of technology, especially the digital security field. Example: As quantum technologies challenge classical notions of determinism, efficiency, and problem-solving, they also invite reflection on why and for whom such computational power is pursued. Similarly, this framework can be applied to LLM/AI trends and the overwhelming amount of technologies that dominate the market. This abstract explores how ikigai can function as an ethical and motivational framework, aligning technical innovation with personal meaning in the cyber security space.",
        speaker: "Ivana Donevska",
        location: "Main Hall"
    },
    "talk1": {
        title: "Internet Infrastructure, Peering, and Observability Walkthrough",
        time: "01:00 PM",
        description: "This presentation is a high-level walkthrough designed to welcome newcomers and non-engineers to the internet infrastructure community. Topics include physical infrastructure, economical business relationships, routing security, observational tooling, and measurement.",
        speaker: "Aaron Atac",
        location: "Main Hall"
    },
    "talk2": {
        title: "Agentic Threat Intel: Building an AI-Powered Intelligence Pipeline",
        time: "02:00 PM",
        description: "Threat intelligence is drowning in noise. Feeds, blogs, advisories, social media - there's more signal out there than any analyst can process manually. What if you could build an AI agent that does the harvesting for you? This talk walks through building an agentic threat intel monitor from scratch, focusing onpatterns you can apply to your own projects: Spec-Driven Development: Writing a clear specification that guides your AI agent's behavior - what to collect, how to evaluate, when to alert \nSource Discovery & Harvesting: Identifying valuable intel sources and automating collection without getting blocked or overwhelmed\n Letting AI Navigate Infrastructure: Using Claude to build and deploy in GCP - watching an agent provision its own resources\nSignal vs. Noise: Defining criteria that separate actionable intelligence from background chatter",
        speaker: "AJ Van Beest",
        location: "Main Hall"
    },
    "talk3": {
        title: "If You Can Talk, You Can Hack: Breaking Chatbots on Purpose",
        time: "02:30 PM",
        description: "This talk introduces AI pentesting through interactive examples that show how chatbots can be broken using prompt injection and logic flaws. Attendees will learn how attackers manipulate AI behavior through conversation, explore common failure patterns, and gain practical testing techniques",
        speaker: "Derick Johnson",
        location: "Main Hall"
    },
    "talk4": {
        title: "A Decade of DFIR Investigations",
        time: "04:00 PM",
        description: "Digital Forensics and Incident Response investigations can take many forms, spanning from expert witness testimony to years-long battles with APT's to phishing matters solved in a single call. Taking a step back, I will review my experiences from a decade plus of investigations: the headline making ones, the small ones, and the outright bizarre ones. I'll discuss general investigative techniques and how skills you build early in your career can outlive tools, forensic artifacts, and industry trends.",
        speaker: "Domenic Rizzolo",
        location: "Main Hall"
    },
    "talk5": {
        title: "From Zero to Near-Hero: Conquering 1980's Nintendo Technology",
        time: "04:30 PM",
        description: "In 2017, THOTCON 0x8 held a Tool Assisted Speedrun (TAS) contest. Entrants submitted a video of a Nintendo Entertainment System (NES) game edited with the FCEUX application, an open-source NES and Family Computer Disk System emulator. FCEUX's TAS Editor enables the execution of a game's button presses with extreme precision. This allows a player to optimize the game sprite's speed, action and timing with a goal of completing the game as quickly as possible. In essence, a TAS video is animation with a console game as the medium. The TAS contest presented an opportunity to learn the FCEUX application and then demonstrate creativity in producing a video that would be judged on style and performance as opposed to speed. Prior to entering, I had never heard of TAS videos and my gaming experience was limited to casual play at best. I also had no experience in editing Read Only Memory (ROM) of NES games. But my passion for learning how things work and getting stuff for free compelled me to take up the challenge. This turbo talk will summarize how I approached the contest's scope and then created the winning entry",
        speaker: "Steve O'Reilly",
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