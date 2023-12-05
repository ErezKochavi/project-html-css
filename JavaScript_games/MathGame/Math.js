
const op = document.getElementById('op');
const check = document.getElementById('check');
const next = document.getElementById('next');
const sum = document.getElementById('sum');
const num1 = document.getElementById('num1');
const num2 = document.getElementById('num2');
const message = document.getElementById('message');

let symbol;

check.addEventListener('click', () => checkAnswer());
next.addEventListener('click', () => resetPage());

function getOp() {
    let op = ["+", "*", "/", "-"];

    symbol = op[Math.floor(Math.random() * op.length)]

    return symbol;
}


function getNumbers() {
    return Math.floor(Math.random() * 10 + 1);
}

function checkAnswer() {
    let answerUser = parseInt(sum.value);
    let answerEx;

    if (symbol === "+") {
        answerEx = parseInt(num1.innerText) + parseInt(num2.innerText);

    }
    else if (symbol === "-") {
        answerEx = parseInt(num1.innerText) - parseInt(num2.innerText);

    }

    else if (symbol === "*") {
        answerEx = parseInt(num1.innerText) * parseInt(num2.innerText)

    }
    else if (symbol === "/") {
        answerEx = parseInt(num1.innerText) / parseInt(num2.innerText)

    }

    if (answerUser === answerEx) {
        message.innerHTML = '<p>Good Work! Ready For The next Exercise</p>';
    }
    else {
        message.innerHTML = '<p>Not a big Deal, Try Again!</p>';
    }

}

function resetPage() {
    num1.innerText = getNumbers();
    num2.innerText = getNumbers();
    symbol = getOp();
    op.innerText = symbol;
    sum.value = '';
    message.innerHTML = '';
}
resetPage();












