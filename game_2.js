let win = 0;
let user_turn=1;

//buttons status
const board=[[0,0,0],[0,0,0],[0,0,0]];

//winning logic
function win_check(user){
    //row logic
    for (let i = 0; i < 3; i++) {
        if (board[i][0] == user && board[i][1] == user && board[i][2] == user) {
            win = 1;
            print_win(user);
            return;
        }
    }

    //column logic
    for (let i = 0; i < 3; i++) {
        if (board[0][i] == user && board[1][i] == user && board[2][i] == user) {
            win = 1;
            print_win(win, user);
            return;
        }
    }

    //diagonally
    if (board[0][0]==user && board[1][1]==user && board[2][2]==user){
        win=1;
        print_win(win, user);
        return;
    }

    if (board[2][0]==user && board[1][1]==user && board[0][2]==user){
        win=1;
        print_win(win, user);
        return;
    }
}

//change turns
function change_turn(){
    user_turn = user_turn === 1 ? 2 : 1;
    document.getElementById("curr-turn").textContent=`Player ${user_turn}`;
}

//event
let _event=document.querySelector(".game-area")
_event.addEventListener("click", click_handler);

function click_handler(e){
    const btn_click=e.target.closest('button');
    if(!btn_click){
        return;
    }
    const p_1=Number(btn_click.dataset.row);
    const p_2=Number(btn_click.dataset.col);
    game(p_1, p_2, user_turn, btn_click);
}

//visual logic
function game(a, b, user, btn_click){
    if (board[a][b]!==0||win){
        return;
    }
    board[a][b]=user;
    draw(btn_click, user);
    win_check(user);
    if (!win){
        change_turn();
    }
}

//visuals
function draw(button, user){
    const img=button.querySelector("img");
    if (user==1){
        img.src="./game_2_1.png";
    } else{
        img.src="./game_2_2.png";
    }
}

function print_win(user){
    let p=document.getElementById("Bottom");
    p.textContent=`Player ${user} won.`;
    p.style.marginLeft="47%"
    p.style.fontWeight="bold";
    p.style.fontSize="20px";
    p.style.marginTop="5px";
}