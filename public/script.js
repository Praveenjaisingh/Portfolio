let voiceHasPlayed = false;

function speakWelcome() {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const msg = new SpeechSynthesisUtterance(
        "Hi, I'm Praveen. Welcome to my portfolio. I'm a Full Stack Developer specializing in Node.js, Laravel, and PostgreSQL. Feel free to explore my work. If you have any queries, please reach out. Thank you!"
    );
    msg.rate = 0.92;
    msg.pitch = 1.05;
    msg.volume = 1;
    const voices = window.speechSynthesis.getVoices();
    const preferred = voices.find(v => v.lang === 'en-US' && v.name.toLowerCase().includes('male'))
        || voices.find(v => v.lang === 'en-US')
        || voices.find(v => v.lang.startsWith('en'));
    if (preferred) msg.voice = preferred;
    window.speechSynthesis.speak(msg);
    return msg;
}

window.addEventListener('load', () => {
    if (voiceHasPlayed) return;
    setTimeout(() => {
        if (!voiceHasPlayed) {
            speakWelcome();
            voiceHasPlayed = true;
        }
    }, 1200);
});

window.speechSynthesis.onvoiceschanged = () => {
    if (!voiceHasPlayed) {
        speakWelcome();
        voiceHasPlayed = true;
    }
};

let hoverCooldown = false;
document.addEventListener('DOMContentLoaded', () => {
    const imgWrap = document.querySelector('.hero-img-wrap');
    if (imgWrap) {
        imgWrap.addEventListener('mouseenter', () => {
            if (hoverCooldown) return;
            hoverCooldown = true;
            speakWelcome();
            setTimeout(() => { hoverCooldown = false; }, 8000);
        });
    }
});
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursorFollower');
let mouseX = 0, mouseY = 0, followerX = 0, followerY = 0;

document.addEventListener('mousemove', e => {
    mouseX = e.clientX; mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
});

function animateFollower() {
    followerX += (mouseX - followerX) * 0.12;
    followerY += (mouseY - followerY) * 0.12;
    follower.style.left = followerX + 'px';
    follower.style.top = followerY + 'px';
    requestAnimationFrame(animateFollower);
}
animateFollower();

const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

class Dot {
    constructor() { this.reset(); }
    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.r = Math.random() * 1.5 + 0.5;
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = (Math.random() - 0.5) * 0.3;
        this.alpha = Math.random() * 0.5 + 0.1;
    }
    update() {
        this.x += this.vx; this.y += this.vy;
        if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) this.reset();
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(239,68,68,${this.alpha})`;
        ctx.fill();
    }
}

const dots = [];
for (let i = 0; i < 80; i++) dots.push(new Dot());

function drawConnections() {
    for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
            const dx = dots[i].x - dots[j].x;
            const dy = dots[i].y - dots[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 120) {
                ctx.beginPath();
                ctx.moveTo(dots[i].x, dots[i].y);
                ctx.lineTo(dots[j].x, dots[j].y);
                ctx.strokeStyle = `rgba(239,68,68,${0.05 * (1 - dist / 120)})`;
                ctx.lineWidth = .5;
                ctx.stroke();
            }
        }
    }
}

function animateCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    dots.forEach(d => { d.update(); d.draw(); });
    drawConnections();
    requestAnimationFrame(animateCanvas);
}
animateCanvas();

const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
});

const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuToggle.classList.toggle('open');
});
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuToggle.classList.remove('open');
    });
});

const navItems = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
    let current = '';
    document.querySelectorAll('section').forEach(sec => {
        if (window.scrollY >= sec.offsetTop - 160) current = sec.getAttribute('id');
    });
    navItems.forEach(a => {
        a.classList.remove('active');
        if (a.getAttribute('href') === '#' + current) a.classList.add('active');
    });
});
const sections = document.querySelectorAll('.section');
function revealSections() {
    sections.forEach(s => {
        if (s.getBoundingClientRect().top < window.innerHeight - 100) s.classList.add('show');
    });
}
window.addEventListener('scroll', revealSections);
window.addEventListener('load', revealSections);

const skillCards = document.querySelectorAll('.skill-card');
const skillObserver = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('visible');
    });
}, { threshold: 0.3 });
skillCards.forEach(c => skillObserver.observe(c));

function animateCounter(el) {
    const target = parseInt(el.dataset.count);
    let count = 0;
    const step = target / 60;
    const timer = setInterval(() => {
        count += step;
        if (count >= target) { count = target; clearInterval(timer); }
        el.textContent = Math.floor(count);
    }, 20);
}

const statsBar = document.querySelector('.stats-bar');
const statsObserver = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
        document.querySelectorAll('.stat-num').forEach(animateCounter);
        statsObserver.disconnect();
    }
}, { threshold: 0.5 });
if (statsBar) statsObserver.observe(statsBar);
const roles = [
    'Full Stack Developer',
    'PHP (Laravel) Developer',
    'Node.js Engineer',
    'Core Java Developer'
];
let roleIndex = 0, charIndex = 0, isDeleting = false;
const roleEl = document.getElementById('roleText');

function typeRole() {
    if (!roleEl) return;
    const current = roles[roleIndex];
    if (!isDeleting) {
        roleEl.textContent = current.slice(0, ++charIndex);
        if (charIndex === current.length) { isDeleting = true; setTimeout(typeRole, 1800); return; }
    } else {
        roleEl.textContent = current.slice(0, --charIndex);
        if (charIndex === 0) { isDeleting = false; roleIndex = (roleIndex + 1) % roles.length; }
    }
    setTimeout(typeRole, isDeleting ? 50 : 80);
}
typeRole();

const serviceCards = document.querySelectorAll('.service-card');
const serviceObserver = new IntersectionObserver(entries => {
    entries.forEach((e, i) => {
        if (e.isIntersecting) {
            setTimeout(() => e.target.classList.add('visible'), i * 100);
        }
    });
}, { threshold: 0.2 });
serviceCards.forEach(c => serviceObserver.observe(c));

const certCards = document.querySelectorAll('.cert-card');
const certObserver = new IntersectionObserver(entries => {
    entries.forEach((e, i) => {
        if (e.isIntersecting) {
            setTimeout(() => e.target.classList.add('visible'), i * 80);
        }
    });
}, { threshold: 0.15 });
certCards.forEach(c => certObserver.observe(c));

document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const cx = rect.width / 2;
        const cy = rect.height / 2;
        const rotX = ((y - cy) / cy) * 5;
        const rotY = ((x - cx) / cx) * -5;
        card.style.transform = `translateY(-8px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});

const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async e => {
        e.preventDefault();
        const btn = contactForm.querySelector('button');
        btn.innerHTML = '<span>Sending...</span><i class="bx bx-loader-alt bx-spin"></i>';
        btn.disabled = true;

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        try {
            const res = await fetch('/api/sendMail', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, message })
            });
            const text = await res.text();
            let data;
            try { data = JSON.parse(text); } catch { data = {}; }

            if (res.ok && data.status) {
                btn.innerHTML = '<span>Message Sent!</span><i class="bx bx-check"></i>';
                setTimeout(() => window.location.href = '/Thankyou.html', 1000);
            } else {
                alert(data.message || '❌ Failed to send message');
                btn.innerHTML = '<span>Send Message</span><i class="bx bx-send"></i>';
                btn.disabled = false;
            }
        } catch {
            alert('❌ Server error');
            btn.innerHTML = '<span>Send Message</span><i class="bx bx-send"></i>';
            btn.disabled = false;
        }
    });
}

const yr = document.getElementById('year');
if (yr) yr.textContent = new Date().getFullYear();
