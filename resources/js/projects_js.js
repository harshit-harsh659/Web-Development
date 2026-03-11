
console.log("Projects page loaded");

document.addEventListener('DOMContentLoaded', function() {

    const projectLinks = document.querySelectorAll('ol li a');
    
    projectLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            console.log('Navigating to:', this.textContent);
        });
    });
});
