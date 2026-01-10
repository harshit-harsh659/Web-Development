function wait() {
    return new Promise(resolve => {
        let user = document.querySelector('div.user');
        let input = null;

        function handler(e) {
            if (e.target.tagName !== 'BUTTON'&& e.target.tagName !=='SPAN') return;

            if (e.target.classList.contains('option_1')) {
                input=1;
            }else if(e.target.classList.contains('option_2')){
                input=2;
            }else{
                input=3;
            }

            user.removeEventListener('click', handler);
            resolve(input);
        }
        user.addEventListener('click', handler);
    })
}

function result(input, comp){
    let para_1=document.querySelector('#result p')
    if (input==1){
        if (comp==1){
            para_1.textContent="Draw";
        }else if (comp==2){
            para_1.textContent="You Lose.";
        }else{
            para_1.textContent="You Won, Congratz!";
        }
    } else if(input==2){
        if (comp==1){
            para_1.textContent="You Won, Congratz!";
        }else if (comp==2){
            para_1.textContent="Draw";
        }else{
            para_1.textContent="You Lose.";
        }
    }else{
        if (comp==1){
            para_1.textContent="You Lose.";
        }else if (comp==2){
            para_1.textContent="You Won, Congratz!";
        }else{
            para_1.textContent="Draw";
        }
    }
    para_1.style.textAlign="center";
}

function sleep(ms){
    return new Promise(resolve=>setTimeout(resolve,ms));
}

async function game() {

    let input = await wait();
    let comp = Math.floor(Math.random() * 3) + 1;
    let imag = document.querySelector('.computer img');
    const par = document.querySelector('#vis_invis');
    imag.style.opacity=0;
    await sleep(400);
    if (comp == 1) {
        imag.src = "./game_1_1.png";
        par.textContent = "The computer thought of Paper.";
    } else if (comp == 2) {
        imag.src = "./game_1_2.png";
        par.textContent = "The computer thought of Scissors.";
    } else {
        imag.src = "./game_1_3.png";
        par.textContent = "The computer thought of Stone.";
    }
    imag.offsetHeight;
    imag.style.opacity=1;
    par.style.fontFamily = "Comic Sans MS";
    par.style.textAlign = "center";
    result(input,comp);
}
game();
