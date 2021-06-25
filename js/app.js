// HTML Elements
const statusDiv = document.querySelector(".status-action-status");
const timeDiv = document.querySelector(".time-container");
// const winDiv = document.querySelector(".win-moves");
const movesDiv = document.querySelector(".moves-container");
const newDiv = document.querySelector(".status-action-new");
const playAgain = document.querySelector(".win-play-again");
const cellDivs = document.querySelectorAll(".game-cell");
const pauseButton = document.querySelector(".pause");
const pauseBOX = document.getElementById("playCircle")


// game variables
let gameIsLive = true;
let count = 0;
let gameStart = false;
let empCell = 15;
let t = 0,
    moves = 0; /*Time, Moves*/
var array = [" "];
for (i = 1; i < 16; i++) {
    array.push(String(i));
}
array.shift();
array.push(" ");
var solArr = [...array];
console.log(solArr);
// Functions
function swap(e, cellNo) {
    let temp = array[e];
    array[e] = array[cellNo];
    array[cellNo] = temp;
}

function moveIt(pos, n) {
    let e = empCell;
    if (pos == "rt" && (e == 2 || e == 7)) {
        swap(e, n);
    } else if (pos == "lt" && (e == 1 || e == 4)) {
        swap(e, n);
    } else if (pos == "lb" && (e == 8 || e == 13)) {
        swap(e, n);
    } else if (pos == "rb" && (e == 11 || e == 14)) {
        swap(e, n);
    } else if (pos == "t" && (e == n + 1 || e == n - 1 || e == n + 4)) {
        swap(e, n);
    } else if (pos == "b" && (e == n + 1 || e == n - 1 || e == n - 4)) {
        swap(e, n);
    } else if (pos == "r" && (e == n + 4 || e == n - 4 || e == n - 1)) {
        swap(e, n);
    } else if (pos == "l" && (e == n + 4 || e == n - 4 || e == n + 1)) {
        swap(e, n);
    } else if (e == n + 4 || e == n - 4 || e == n + 1 || e == n - 1) {
        swap(e, n);
    } else {
        return 0;
    }
    return 1;
}

function cellPosition(cellNo) {
    let pos = "";
    let remainder = cellNo % 4;
    if (remainder == 0) {
        pos = "l";
        // console.log("left");
    } else if (remainder == 3) {
        pos = "r";
        // console.log("right");
    }
    if (cellNo == 0 || cellNo == 1 || cellNo == 2 || cellNo == 3) {
        pos += "t";
        // console.log("top");
    } else if (cellNo == 12 || cellNo == 13 || cellNo == 14 || cellNo == 15) {
        pos += "b";
        // console.log("bottom");
    }
    // console.log(pos);
    return pos;
}

function cellNumber(block) {
    for (i = 0; i < 16; i++) {
        //   console.log(cellDiv);
        if (cellDivs[i] == block) {
            // console.log(i);
            return i;
        }
    }
}
const checkGameStatus = () => {
    let win = 1; //FINAL WIN WIN WINNER
    for (i = 0; i < 15; i++) {
        if (array[i] == solArr[i]) {
            cellDivs[i].classList.add("won");
        } else {
            cellDivs[i].classList.remove("won");
            win = 0;
        }
    }
    if (win) {
        clearInterval(oneSec);
        gameIsLive = false;
        gameStart = false;
        document.querySelector(".win-moves").innerHTML = `${moves} moves`;
        document.getElementById("winner").style.display = 'flex';
    }
};
// Write Number according to the array
function updateNumbers() {
    if (!gameIsLive) {
        return;
    }
    for (i = 0; i < 16; i++) {
        //   console.log(cellDiv);
        if (array[i] == " ") {
            empCell = i;
        }
        cellDivs[i].innerHTML = array[i];
    }

}
// check if two arrays are equal
function arrayEquals(a, b) {
    return Array.isArray(a) &&
        Array.isArray(b) &&
        a.length === b.length &&
        a.every((val, index) => val === b[index]);
}

//   arrayEquals(a, b); // false
//   arrayEquals(a, c); // true


// Function - random Int in a range
/**
 * Returns a random integer between min (inclusive) and max (inclusive).
 * The value is no lower than min (or the next integer greater than min
 * if min isn't an integer) and no greater than max (or the next integer
 * lower than max if max isn't an integer).
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//Function - arrange numbers randomly
function randomArrayShuffle() {
    // array=[...solArr];
    let shuffleTimes = getRandomInt(100, 200);
    while (shuffleTimes--) {
        let shuffle = getRandomInt(1, 4); //    1/2/3/4
        // console.log(shuffle);
        let temp = 0;
        let cellNo;
        let pos = cellPosition(empCell);
        if (shuffle == "1" && pos != "b" && pos != "lb" && pos != "rb") {
            cellNo = empCell + 4;
            temp = 1;
        } else if (shuffle == "3" && pos != "t" && pos != "lt" && pos != "rt") {
            cellNo = empCell - 4;
            temp = 1;
        } else if (shuffle == "2" && pos != "l" && pos != "lb" && pos != "lt") {
            cellNo = empCell - 1;
            temp = 1;
        } else if (shuffle == "4" && pos != "r" && pos != "rb" && pos != "rt") {
            cellNo = empCell + 1;
            temp = 1;
        }

        if (temp && moveIt(pos, cellNo)) {
            updateNumbers();
        }
    }
    for (i = 0; i < 15; i++) {
        if (array[i] == solArr[i]) {
            count++;
        }
    }
    // if(arrayEquals(array,solArr))
    // {
    //     console.log("they were equal");
    //     shuffleArr();
    // }
    // console.log(array);
    //array is now shuffled randomly = ["d", "c", "b", "e", "a"]
    // return array;
}

function shuffleArr() {
    count = 0;
    randomArrayShuffle();
    while (arrayEquals(array, solArr) || count > 2) {
        randomArrayShuffle();
    }
    console.log(count);
    checkGameStatus();
}

shuffleArr(); // For the first time on reload

//Update and prin time and moves
function updateTime() {
    if (gameStart && gameIsLive) {
        console.log("Time updated");
        t++;
    }
}
var oneSec = setInterval(updateTime, 1000);

function printStatus() {
    if (!gameIsLive) {
        return;
    }
    timeDiv.innerHTML = `${t}s`;
    movesDiv.innerHTML = `${moves}`;
}
setInterval(printStatus, 10);

//   console.log(array);

// updateNumbers();
// Function - Status

// Event Handlers
const handleReset = () => {
    gameIsLive = true;
    gameStart = false;
    t = 0;
    moves = 0;
    pauseButton.innerHTML = 'Pause';
    document.querySelector(".pauseBOX").style.display = 'none';
    shuffleArr();
    updateNumbers();
    checkGameStatus();
};
const handlePlayAgain = () => {
    gameIsLive = true;
    gameStart = false;
    pauseButton.innerHTML = 'Pause';
    document.querySelector(".pauseBOX").style.display = 'none';
    document.getElementById("winner").style.display = 'none';
    t = 0;
    oneSec = setInterval(updateTime, 1000);
    moves = 0;
    shuffleArr();
    updateNumbers();
    checkGameStatus();
};
const handleCellClick = (e) => {
    if (!gameIsLive) {
        return;
    }
    gameStart = true;

    const classList = e.target.classList;
    // console.log(e.target.classList);
    //   console.log(e);
    // const location = e.target.classList[1];
    const location = classList[1];
    // console.log(location);
    let block = document.querySelector(`.${location}`);
    // console.log(block);
    let cellNo = cellNumber(block); // on which user clicked
    let pos = cellPosition(cellNo); //top, bottom, right, left
    if (moveIt(pos, cellNo)) {
        moves++;
        updateNumbers();
        checkGameStatus();
    }
};
const Pause = (e) => {
    if (!gameStart) {
        return;
    }
    if (gameIsLive) {
        // gameStart = false;
        gameIsLive = false;
        pauseButton.innerHTML = 'Play';
        document.querySelector(".pauseBOX").style.display = 'flex';
    } else {
        // gameStart = true;
        gameIsLive = true;
        pauseButton.innerHTML = 'Pause';
        document.querySelector(".pauseBOX").style.display = 'none';
    }

};

function handle(e) {
    console.log(e);
}


// Event Listeners
newDiv.addEventListener("click", handleReset);
playAgain.addEventListener("click", handlePlayAgain);
pauseButton.addEventListener("click", Pause);
pauseBOX.addEventListener("click", Pause);

// kinput.onkeydown = kinput.onkeyup = kinput.onkeypress = handle;

document.getElementById("body").addEventListener("keydown", e => {


    if (!gameIsLive) {
        return;
    }
    gameStart = true;
    console.log(e.key);
    let cellNo; // on which user clicked
    let pos = cellPosition(empCell); //top, bottom, right, left
    let temp = 0; // to check if pressed key is valid
    if (e.key == "ArrowUp" && pos != "b" && pos != "lb" && pos != "rb") {
        cellNo = empCell + 4;
        temp = 1;
    } else if (e.key == "ArrowDown" && pos != "t" && pos != "lt" && pos != "rt") {
        cellNo = empCell - 4;
        temp = 1;
    } else if (e.key == "ArrowRight" && pos != "l" && pos != "lb" && pos != "lt") {
        cellNo = empCell - 1;
        temp = 1;
    } else if (e.key == "ArrowLeft" && pos != "r" && pos != "rb" && pos != "rt") {
        cellNo = empCell + 1;
        temp = 1;
    }

    if (temp && moveIt(pos, cellNo)) {
        moves++;
        updateNumbers();
        checkGameStatus();
    }
});
for (const cellDiv of cellDivs) {
    if (!gameIsLive) {
        continue;
    }
    //   console.log(cellDiv);
    // cellDiv.addEventListener("keydown",logkey);
    cellDiv.addEventListener("click", handleCellClick);
}







// ----------------------------------------------------------------------------------