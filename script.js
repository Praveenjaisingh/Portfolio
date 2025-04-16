
document.querySelectorAll('.navbar .nav-links li a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

const form = document.querySelector('.contact form');

form.addEventListener('submit', function (e) {
    const name = form.querySelector('#name').value;
    const email = form.querySelector('#email').value;
    const message = form.querySelector('#message').value;
    let valid = true;

    // Check if all fields are filled
    if (!name || !email || !message) {
        alert('Please fill in all fields.');
        valid = false;
    }

    
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (email && !email.match(emailPattern)) {
        alert('Please enter a valid email address.');
        valid = false;
    }

    if (!valid) {
        e.preventDefault();
    }
});
