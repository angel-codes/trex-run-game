const desert = document.querySelector('.desert');
const dinosaur = document.querySelector('.dinosaur');
const alert = document.querySelector('.alert');

let isJumping = false;
let gravity = 0.9;
let position = 0;
let isGameOver = false;

loadEventListeners();
function loadEventListeners(){
    document.addEventListener('keyup', controlDinosaur);
}

function controlDinosaur(e){
    if(e.keyCode === 32){
        if(!isJumping){
            isJumping = true;
            jump();
        }
    }
}

function jump(){
    let count = 0;

    let timerId = setInterval(() => {
        // Return dinosaur to the original position
        if(count === 15){
            clearInterval(timerId);

            let downTimerId = setInterval(() => {
                // Prevent the dinosaur from going down more than it should
                if(count === 0){ 
                    clearInterval(downTimerId);
                    isJumping = false;
                }

                // Move Down
                position -= 5;
                count--;
                position = position * gravity;
                dinosaur.style.bottom = position + 'px';

            }, 20);
        }

        // Move Up
        position += 20;
        count++;
        position = position * gravity;
        dinosaur.style.bottom = position + 'px';
    }, 20);
}