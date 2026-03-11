function showCard(id) {

    document.querySelectorAll("._btn").forEach(btn => {
        btn.classList.remove('active');
    });
    
    document.querySelectorAll(".card").forEach(card => {
        card.classList.remove("display");
    });

    document.getElementById(id).classList.add("display");

    const activeBtn = document.querySelector(`#${id === 'work' ? 'btn1' : id === 'about' ? 'btn2' : 'btn3'}`);
    activeBtn.classList.add('active');
}

document.getElementById("btn1").addEventListener("click", () => {
    showCard("work");
});

document.getElementById("btn2").addEventListener("click", () => {
    showCard("about");
});

document.getElementById("btn3").addEventListener("click", () => {
    showCard("contact");
});