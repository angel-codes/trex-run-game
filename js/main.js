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
    if(e.keyCode === 38){
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
                position -= 3;
                count--;
                position = position * gravity;
                dinosaur.style.bottom = position + 'px';

            }, 20);
        }

        // Move Up
        position += 23;
        count++;
        position = position * gravity;
        dinosaur.style.bottom = position + 'px';
    }, 20);
}

function generateCactus(){

    let randomTime = Math.random() * 4000;

    // Generate Cactus
    let cactusPosition = 1000;
    const cactus = document.createElement('div');
    if(!isGameOver) cactus.classList.add('cactus');
    desert.appendChild(cactus);
    cactus.style.left = cactusPosition + 'px';

    // Set new position to the cactus
    let timerId = setInterval(() => {

        // Stop game when the Dinosaur collapse against a cactus
        if(cactusPosition > 0 && cactusPosition < 60 && position < 60){
            clearInterval(timerId);
            alert.innerHTML = 'Game Over';
            isGameOver = true;

            // Remove all elements
            while(desert.firstChild){
                desert.removeChild(desert.lastChild);
            }
        }

        cactusPosition -= 10;
        cactus.style.left = cactusPosition + 'px';
    }, 20);

    // Generate more cactus
    if(!isGameOver) setTimeout(generateCactus, randomTime);
}

generateCactus();