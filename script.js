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
    'romeo-vaughn-website': {
        title: 'Romeo Vaughn Website',
        description:
            'A portfolio website built for Romeo Vaughn to showcase his latest released music, upcoming shows, and contact information, built with HTML, CSS.',
        tags: ['HTML', 'CSS',],
        link: 'https://github.com/saucedawebdev/romeo-vaughn-website',
        demo: 'https://saucedawebdev.github.io/romeo-vaughn-website/',
    },
    'rio-grande-fitness-website': {
        title: 'Rio Grande Fitness Website',
        description:
            'A website built for Rio Grande Fitness to showcase their services, pricing, and contact information, built with HTML, CSS, and JavaScript.',
        tags: ['HTML', 'CSS', 'JavaScript'],
        link: 'https://github.com/saucedawebdev/rio-grande-fitness-website',
        demo: 'https://saucedawebdev.github.io/rio-grande-fitness-website/',
    },
    'firefigher-incident-tracker': {
        title: 'Firefighter Incident Tracker',
        description:
            'A web application built for firefighters to track their incidents, built with JavaScript, HTML, and CSS.',
        tags: ['HTML', 'CSS', 'JavaScript'],
        link: 'https://github.com/saucedawebdev/firefigher-incident-tracker',
        demo: 'https://saucedawebdev.github.io/firefigher-incident-tracker/',
    },
    'habit-tracker-app': {
        title: 'Habit Tracker',
        description:
            'A productivity app that lets users track their habits, goals, and progress, built with JavaScript, HTML, and CSS.',
        tags: ['HTML', 'CSS', 'JavaScript', 'DOM'],
        link: 'https://github.com/saucedawebdev/habit-tracker',
        demo: 'https://saucedawebdev.github.io/habit-tracker/',
    },
    'daily-water-tracker-app': {
        title: 'Daily Water Tracker',
        description:
            'A health and wellness app that lets users track their water intake, built with JavaScript, HTML, and CSS.',
        tags: ['HTML', 'CSS', 'JavaScript'],
        link: 'https://github.com/saucedawebdev/daily-water-tracker',
        demo: 'https://saucedawebdev.github.io/daily-water-tracker/',
    },
    'tip-calculator-app': {
        title: 'Tip Calculator',
        description:
            'A calculator app that lets users calculate tips, built with JavaScript, HTML, and CSS.',
        tags: ['HTML', 'CSS', 'JavaScript'],
        link: 'https://github.com/saucedawebdev/tip-calculator',
        demo: 'https://saucedawebdev.github.io/tip-calculator/',
    },
};

const modal = document.getElementById('project-modal');
const modalTitle = document.getElementById('modal-title');
const modalDescription = document.getElementById('modal-description');
const modalTags = document.getElementById('modal-tags');
const modalLink = document.getElementById('modal-link');
const modalDemo = document.getElementById('modal-demo');

function openModal(projectId) {
    const project = projects[projectId];
    if (!project) return;

    modalTitle.textContent = project.title;
    modalDescription.textContent = project.description;
    modalTags.innerHTML = project.tags.map((tag) => `<span class="tag">${tag}</span>`).join('');
    modalDemo.href = project.demo;
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
    card.querySelector('button.project-btn').addEventListener('click', () => {
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
