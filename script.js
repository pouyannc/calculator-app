function buttonAction (e) {
    console.log(e.target.textContent)
    const btnValue = e.target.textContent;
    if (btnValue == "CLEAR") display.textContent = "0";
    else if (btnValue == "DELETE") {
        const displayArr = display.textContent.split("");
        if (displayArr[displayArr.length-1] == " ") displayArr.splice(displayArr.length-3,3);
        else displayArr.pop();
        display.textContent = displayArr.join("");
    }
    else if (btnValue == "=") {
        let answer = evaluate(display.textContent.split(" "));
        displayAns.textContent = answer;
    }
    else if (display.textContent == 0) display.textContent = btnValue;
    else if (regexpInts.test(btnValue)) display.textContent += " " + btnValue + " ";
    else display.textContent += btnValue;
}

function evaluate (equationArr) {
    let equationLen = equationArr.length;
    if (equationLen === 1) return equationArr[0];

    let firstMulDivIndex = equationArr.findIndex(e => (e === "*" || e === "/"));
    if (firstMulDivIndex === -1) {
        let firstAddSubIndex = equationArr.findIndex(e => (e === "+" || e === "-"));
        if (firstAddSubIndex === -1) return "Err";
        else {
            let ans = operate[equationArr[firstAddSubIndex]](equationArr[firstAddSubIndex-1], equationArr[firstAddSubIndex+1]);
            equationArr.splice(firstAddSubIndex-1, 3, ans);
            return evaluate (equationArr);
        }
    } else {
        let ans = operate[equationArr[firstMulDivIndex]](equationArr[firstMulDivIndex-1], equationArr[firstMulDivIndex+1]);
        equationArr.splice(firstMulDivIndex-1, 3, ans);
        return evaluate (equationArr);
    } 

}

const operate = {
    "+": (a,b) => parseInt(a) + parseInt(b),
    "-": (a,b) => parseInt(a) - parseInt(b),
    "*": (a,b) => parseInt(a) * parseInt(b),
    "/": (a,b) => parseInt(a) / parseInt(b),
} 

const regexpInts = /[\+\-\*\/\%]/ig;

let buttons = document.querySelectorAll("button");
let display = document.querySelector(".display");
let displayAns = document.querySelector(".displayAns");

buttons.forEach(button => button.addEventListener("click", buttonAction));


