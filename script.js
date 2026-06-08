// --- Smooth scroll: handled via CSS (html { scroll-behavior: smooth }) ---

// --- Active navigation highlighting ---
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

const navObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                navLinks.forEach((link) => link.classList.remove('active'));
                const activeLink = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
                if (activeLink) activeLink.classList.add('active');
            }
        });
    },
    { rootMargin: '-40% 0px -50% 0px', threshold: 0 }
);

sections.forEach((section) => navObserver.observe(section));

// --- Project popup modal ---
const projects = {
    portfolio: {
        title: 'Portfolio Website',
        description:
            'Personal portfolio built with HTML, CSS, and JavaScript. Features smooth scrolling, active navigation, project modals, and a dark/light theme toggle.',
        tags: ['HTML', 'CSS', 'JavaScript'],
        link: 'https://github.com/ramonsauceda931-png',
    },
    recipe: {
        title: 'Recipe Page',
        description:
            'A responsive recipe page built during the Meta Front-End Developer course, focusing on semantic HTML and modern CSS layout.',
        tags: ['HTML', 'CSS'],
        link: 'https://github.com/ramonsauceda931-png',
    },
    'water-tracker': {
        title: 'Daily Water Tracker',
        description:
            'A hydration tracking app that lets users log glasses of water throughout the day. Includes add, subtract, and reset controls with motivational feedback when daily goals are reached.',
        tags: ['HTML', 'CSS', 'JavaScript', 'DOM'],
        link: 'https://github.com/ramonsauceda931-png',
    },
    'tip-calculator': {
        title: 'Tip Calculator',
        description:
            'A simple tip calculator that takes a bill amount and tip percentage, then calculates and displays the total. Built with form inputs and JavaScript event handling.',
        tags: ['HTML', 'CSS', 'JavaScript'],
        link: 'https://github.com/ramonsauceda931-png',
    },
    'romeo-vaughn-portfolio': {
        title: 'Romeo Vaughn Portfolio',
        description:
            'A portfolio website built for Romeo Vaughn to showcase projects, skills, and professional experience with a clean, responsive layout.',
        tags: ['HTML', 'CSS', 'JavaScript'],
        link: 'https://github.com/ramonsauceda931-png',
    },
};

const modal = document.getElementById('project-modal');
const modalTitle = document.getElementById('modal-title');
const modalDescription = document.getElementById('modal-description');
const modalTags = document.getElementById('modal-tags');
const modalLink = document.getElementById('modal-link');

function openModal(projectId) {
    const project = projects[projectId];
    if (!project) return;

    modalTitle.textContent = project.title;
    modalDescription.textContent = project.description;
    modalTags.innerHTML = project.tags.map((tag) => `<span class="tag">${tag}</span>`).join('');
    modalLink.href = project.link;

    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
}

document.querySelectorAll('.project-card').forEach((card) => {
    card.querySelector('.project-btn').addEventListener('click', () => {
        openModal(card.dataset.project);
    });
});

modal.querySelector('.modal-close').addEventListener('click', closeModal);
modal.querySelector('.modal-overlay').addEventListener('click', closeModal);

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
        closeModal();
    }
});

// --- Dark / light mode toggle ---
const themeToggle = document.getElementById('theme-toggle');
const savedTheme = localStorage.getItem('theme') || 'dark';

document.documentElement.setAttribute('data-theme', savedTheme);
themeToggle.textContent = savedTheme === 'dark' ? '🌙' : '☀️';

themeToggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';

    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    themeToggle.textContent = next === 'dark' ? '🌙' : '☀️';
});
