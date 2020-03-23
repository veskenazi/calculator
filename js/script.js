let history = document.getElementById("history");
let output = document.getElementById("output");
let clearAll = document.getElementById("clearAll");
let backSpace = document.getElementById("backSpace");
let percent = document.getElementById("percent");
let numbers = document.getElementsByClassName("number");
let operators = document.getElementsByClassName("operator");
let dot = document.getElementById("dot");
let result = document.getElementById("result");

let clearOnNextClick = false;
let temp = null;
let op = null;


const checkResult = (res) => {
    let str = res.toString();
    let copy = "";
    let i = 0;
    while (str[i] && i < 15) {
        copy += str[i];
        i++;
    }
    let index = copy.indexOf(".");
    if (index != -1) {
        let n = 15 - (index + 2);
        res = Math.floor(Number(copy) * 10**n) / 10**n;
    } else {
        res = Number(copy);
    }
    return res;
}

const add = (x1, x2) => x1 + x2;
const sub = (x1, x2) => x1 - x2;
const mul = (x1, x2) => x1 * x2;
const div = (x1, x2) => x1 / x2;

const operate = (op, x1, x2) => {
    x1 = parseFloat(x1);
    x2 = parseFloat(x2);
    let res;
    switch (op) {
        case "+":
            res = add(x1, x2);
            break;
        case "-":
            res = sub(x1, x2);
            break;
        case "×":
            res = mul(x1, x2);
            break;
        case "÷":
            res = div(x1, x2);
            break;
    }
    return checkResult(res);
}

clearAll.addEventListener("click", () => {
    history.value = "";
    output.value = "0";
    temp = null;
});

backSpace.addEventListener("click", () => {
    output.value = output.value.slice(0, -1);
});

percent.addEventListener("click", () => output.value /= 100);

for (let number of numbers) {
    number.addEventListener("click", (e) => {
        let res = e.target.textContent;
        if (output.value == "0" || clearOnNextClick) {
            output.value = res;
            clearOnNextClick = false;
        } else if (res == "." && output.value.includes(".")) {
            // do nothing
        } else {
            output.value += res;
        }
    });
}

for (let operator of operators) {
    operator.addEventListener("click", (e) => {
        op = e.target.textContent;
        history.value += output.value + " " + op + " ";
        if (!temp) {
            temp = output.value;
        } else {
            temp = operate(op, temp, output.value);
            output.value = temp;
        }
        clearOnNextClick = true;
    });
}

result.addEventListener("click", () => {
    history.value = "";
    if (!temp) {
        // do nothing
    } else {
        output.value = operate(op, temp, output.value);
        temp = null;
    }
    clearOnNextClick = true;
});