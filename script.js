const road = document.querySelectorAll('#grid > div');
const scoreEl = document.querySelector('#score');

const duckIdx = 1;
const duck = road[duckIdx];
duck.classList.add('duck');

let speed = 150;
let score = 0;

// Logica aggiunta pianta
function addPlant() {
    let currentPlantIdx = road.length - 1;
    road[currentPlantIdx].classList.add('plant');

    // Movimento della pianta
    const plantIntVal = setInterval(function () {
        score++;
        scoreEl.innerText = score;

        if (score % 50 === 0) {
            speed = speed - 20;
        }

        road[currentPlantIdx].classList.remove('plant');
        currentPlantIdx--;

        if (currentPlantIdx < 0) {
            clearInterval(plantIntVal);
            addPlant();
            return;
        }
        
        if (
            currentPlantIdx === duckIdx &&
            !road[currentPlantIdx].classList.contains('duck-jump')
        ) {
            road[currentPlantIdx].classList.remove('duck');
            road[currentPlantIdx].classList.add('plant');
            showAlert('CRASH!');
            clearInterval(plantIntVal);
            return;
        }

        road[currentPlantIdx].classList.add('plant');
    }, speed);
}

addPlant();


function jump(event) {
    if (event.code === 'Space' && !event.repeat) {
        duck.classList.add('duck-jump');
        setTimeout(function () {
            duck.classList.remove('duck-jump');
        }, 300);

    }
}

document.addEventListener('keydown', jump);