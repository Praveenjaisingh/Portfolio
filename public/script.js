const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

if (menuToggle) {
    menuToggle.addEventListener("click", () => {
        navLinks.classList.toggle("active");
    });
}

document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("active");
    });
});

const sections = document.querySelectorAll(".section");

function revealSections() {
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const triggerPoint = window.innerHeight - 120;
        if (sectionTop < triggerPoint) {
            section.classList.add("show");
        }
    });
}

window.addEventListener("scroll", revealSections);
window.addEventListener("load", revealSections);

const navItems = document.querySelectorAll(".nav-links a");
window.addEventListener("scroll", () => {
    let current = "";
    document.querySelectorAll("section").forEach(section => {
        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop) {
            current = section.getAttribute("id");
        }
    });
    navItems.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${current}`) {
            link.classList.add("active");
        }
    });
});

const contactForm = document.getElementById("contactForm");

if (contactForm) {
    contactForm.addEventListener("submit", async function (e) {
        e.preventDefault();
        const button = contactForm.querySelector("button");
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const message = document.getElementById("message").value;
        button.innerHTML = "Sending...";
        button.disabled = true;
        try {
            const response = await fetch("/api/sendMail", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, email, message }),
            });
            const text = await response.text();
            let data;
            try {
                data = JSON.parse(text);
            } catch (err) {
                alert("❌ Server error");
                button.innerHTML = "Send Message";
                button.disabled = false;
                return;
            }
            if (response.ok && data.status) {
                button.innerHTML = "Message Sent ✓";
                setTimeout(() => {
                    window.location.href = "/Thankyou.html";
                }, 1000);
            } else {
                alert(data.message || "❌ Failed to send message");
                button.innerHTML = "Send Message";
                button.disabled = false;
            }
        } catch (error) {
            alert("❌ Server error");
            button.innerHTML = "Send Message";
            button.disabled = false;
        }
    });
}
const footerYear = document.getElementById("year");

if (footerYear) {
    footerYear.textContent = new Date().getFullYear();
}