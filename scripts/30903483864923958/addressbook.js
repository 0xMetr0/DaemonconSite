// Address Book functionality
//Todo: allow for multiple folders 
const contactData = {
    shared: [],
    main: [],
    leads: [
        { name: "Ryan Haley", title: "Faculty Liaison" }
    ],
    usefuldrones: [
        { name: "Max Casson", title: "Web Designer" }
    ],
    founders: [
        { name: "Andrew Green", title: "Founder" },
        { name: "Agnė Butvilas", title: "Organizer" },
        { name: "Ryan Haley", title: "Faculty Sponsor"}
    ],
    lackeys: [
    ]
};

export function showContacts(section) {
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

export function toggleMainIdentity(element) {
    const children = document.getElementById('mainChildren');
    if (element.textContent === '-') {
        element.textContent = '+';
        children.classList.add('hidden');
    } else {
        element.textContent = '-';
        children.classList.remove('hidden');
    }
}

export function initAddressBook() {
    showContacts('main');
    // Note: dragElement is now handled globally in ui.js
}
