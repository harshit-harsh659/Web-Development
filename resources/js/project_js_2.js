// Project 2: Spanish Vocabulary - JavaScript File
console.log("Project 2 - Spanish Vocabulary loaded");

document.addEventListener('DOMContentLoaded', function() {
    // Add interactivity to color vocabulary
    const colorElements = document.querySelectorAll('.color-title');
    
    colorElements.forEach(element => {
        element.addEventListener('click', function() {
            console.log('Color clicked:', this.textContent);
        });
    });
});
