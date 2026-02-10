function showCard(id) {
    document.querySelectorAll(".card").forEach(card => {
        card.classList.remove("display");
    });

    document.getElementById(id).classList.add("display");
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
