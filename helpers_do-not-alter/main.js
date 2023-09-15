//! DO NOT ALTER THIS CODE // 
import { gameDetails, domDisplay } from "../script.js";

const userInput = document.querySelector('input');
const title = document.querySelector('title');
const brand = document.querySelector('.navbar-brand');
const room = document.getElementById('room-display-container').firstChild;
const foot = document.querySelector('footer');

room.textContent = `Welcome to ${gameDetails.title}! ${gameDetails.startingRoomDescription}`;

let location;

userInput.addEventListener('keypress', (event) => {
    
    if(event.key === "Enter") {
        location = domDisplay(userInput.value);
        displayRooms();
        userInput.value = '';
    }

});

const mainDisplay = () => {
    const author = document.querySelector('h6');
    const desc = document.getElementById('student-game-desc');
    let gameTitle = gameDetails.title;

    title.textContent = gameTitle;
    brand.textContent = gameTitle;

    author.innerHTML = `
        <b>By: ${gameDetails.author}</b> Cohort: ${gameDetails.cohort}
        `;

    desc.textContent = gameDetails.desc;
    
    let commandDisplay = document.createElement('p');

    commandDisplay.textContent = `Commands: `

    gameDetails.playerCommands.map(e => {
        let b = document.createElement('b');

        b.textContent = `${e} | `;
        commandDisplay.appendChild(b);
    });

    foot.appendChild(commandDisplay);

}

const displayRooms = () => {
    room.textContent = location;
}

mainDisplay();

//! DO NOT ALTER THIS CODE //