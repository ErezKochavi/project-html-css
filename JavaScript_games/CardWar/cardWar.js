const gameBoard = document.getElementById('gameBoard');
const colors = ["#527853", "#31304D", "#F0ECE5", "#E7BCDE", "#2D9596", "#BE3144", "#E0F4FF", "#776B5D"];
const colorsList = [...colors, ...colors];
const tileNum = colorsList.length;

//Game Score Board
let count = 0;
let activeTile = null;
let awaitingEndMove = false;

function buildTile(color) {
    const div = document.createElement('div');

    div.classList.add("tile");
    div.setAttribute('data-color', color);
    div.setAttribute('data-revealed', "false");

    div.addEventListener('click', () => {
        const revealed = div.getAttribute('data-revealed');
        if (awaitingEndMove || revealed === "true" || div == activeTile) {
            return;
        }
        //see color
        div.style.backgroundColor = color;
        if (!activeTile) {
            activeTile = div;
            return;
        }
        const colorToMatch = activeTile.getAttribute('data-color');
        if (colorToMatch === color) {
            div.setAttribute('data-revealed', "true");
            activeTile.setAttribute('data-revealed', "true");

            activeTile = null;
            awaitingEndMove = false;
            count += 2;
            if (count == tileNum) {
                alert('You Won!!! , if You Want To Play Again, REFRESH!');
            }
            return;
        }
        awaitingEndMove = true;
        setTimeout(() => {
            activeTile.style.backgroundColor = null;
            div.style.backgroundColor = null;
            awaitingEndMove = false;
            activeTile = null;
        }, 1000);
    });
    return div;
}
//build Game Board
for (let i = 0; i < tileNum; i++) {
    const randomI = Math.floor(Math.random() * colorsList.length);
    const color = colorsList[randomI];
    const tile = buildTile(color);

    colorsList.splice(randomI, 1);
    gameBoard.appendChild(tile);
}