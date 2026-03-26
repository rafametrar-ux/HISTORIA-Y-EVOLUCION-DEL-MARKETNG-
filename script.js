// script.js
// Interactive JavaScript for smooth scrolling, animations, and event handlers

// Smooth scrolling behavior
const scrollLinks = document.querySelectorAll('a[href^="#"]');

scrollLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetID = this.getAttribute('href');
        const targetSection = document.querySelector(targetID);

        targetSection.scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Example animation on scroll
const animatedElements = document.querySelectorAll('.animate-on-scroll');

function checkVisibility() {
    const triggerBottom = window.innerHeight / 5 * 4;

    animatedElements.forEach(element => {
        const boxTop = element.getBoundingClientRect().top;
        if (boxTop < triggerBottom) {
            element.classList.add('show');
        } else {
            element.classList.remove('show');
        }
    });
}

window.addEventListener('scroll', checkVisibility);

// Event handler example
const button = document.querySelector('#myButton');
button.addEventListener('click', () => {
    alert('Button clicked!');
});
