function buttonAction (e) {
    console.log(e.target.textContent)
    const btnValue = e.target.textContent;
    if (btnValue == "AC") display.textContent = "0";
    else if (btnValue == "=") operate(display.textContent);
    else if (display.textContent == 0) display.textContent = btnValue;
    else if (regexpInts.test(btnValue)) display.textContent += " " + btnValue + " ";
    else display.textContent += btnValue;
}

function operate (equation) {
    equationArr = equation.split(" ");

    //while loop until array has 1 value
    //look for operators and replace operators and adjacent ints with result
        //prioritize * and / then +  and -

}

const regexpInts = /[\+\-\*\/\%]/ig;

let buttons = document.querySelectorAll("button");
let display = document.querySelector(".display");

buttons.forEach(button => button.addEventListener("click", buttonAction));


