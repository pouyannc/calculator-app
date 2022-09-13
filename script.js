function buttonAction (e) {
    const btnValue = e.target.textContent;
    
    if (btnValue == "CLEAR") {
        display.textContent = "0";
        oneDecimalPnt = false;
    }
    else if (btnValue == "DELETE") {
        const displayArr = display.textContent.split("");
        if (displayArr[displayArr.length-1] == " ") displayArr.splice(displayArr.length-3,3);
        else if (displayArr.length == 1) displayArr[0] = 0; 
        else displayArr.pop();
        display.textContent = displayArr.join("");
    }
    else if (btnValue == "=") {
        if (display.textContent != 0) {
            let answer = evaluate(display.textContent.split(" "));
            if (typeof answer == "string") {
                displayAns.textContent = answer;
                if (answer != "Undefined") ansTemp = display.textContent;
            } else {
                displayAns.textContent = +answer.toFixed(8);
                ansTemp = displayAns.textContent;
            }
        }
    }
    else if (regexpInts.test(btnValue)) {
        if (ansTemp != "") {
            display.textContent = ansTemp;
            ansTemp = "";
        }
        display.textContent += " " + btnValue + " ";
        oneDecimalPnt = false;
    }
    else if (btnValue == ".") {
        if (oneDecimalPnt == false) {
            display.textContent += btnValue;
            oneDecimalPnt = true;
        }
    }
    else {
        if (display.textContent == 0 && oneDecimalPnt == false) display.textContent = btnValue;
        else if (ansTemp != "") {
            display.textContent = btnValue;
            ansTemp = "";
        }
        else display.textContent += btnValue;
    }
}

function evaluate (equationArr) {
    let equationLen = equationArr.length;
    if (equationLen === 1) return equationArr[0];

    let firstMulDivIndex = equationArr.findIndex(e => (e === "x" || e === "÷"));
    if (firstMulDivIndex === -1) {
        let firstAddSubIndex = equationArr.findIndex(e => (e === "+" || e === "-"));
        if (firstAddSubIndex === -1) return "Err";
        else {
            let ans = operate[equationArr[firstAddSubIndex]](equationArr[firstAddSubIndex-1], equationArr[firstAddSubIndex+1]);
            equationArr.splice(firstAddSubIndex-1, 3, ans);
            return evaluate (equationArr);
        }
    } else {
        if (equationArr[firstMulDivIndex] === "÷" && equationArr[firstMulDivIndex + 1] == 0) return "Undefined";
        else {
            let ans = operate[equationArr[firstMulDivIndex]](equationArr[firstMulDivIndex-1], equationArr[firstMulDivIndex+1]);
            equationArr.splice(firstMulDivIndex-1, 3, ans);
            return evaluate (equationArr);
        }
    } 

}

const operate = {
    "+": (a,b) => parseFloat(a) + parseFloat(b),
    "-": (a,b) => parseFloat(a) - parseFloat(b),
    "x": (a,b) => parseFloat(a) * parseFloat(b),
    "÷": (a,b) => parseFloat(a) / parseFloat(b),
} 

const regexpInts = /[\+\-\x\÷\%]/ig;

let buttons = document.querySelectorAll("button");
let display = document.querySelector(".display");
let displayAns = document.querySelector(".displayAns");

let oneDecimalPnt = false;
let ansTemp = "";

buttons.forEach(button => button.addEventListener("click", buttonAction));


