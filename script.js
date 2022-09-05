function buttonAction (e) {
    console.log(e.target.textContent)
    if (e.target.textContent == "AC") display.textContent = "0";
    else if (e.target.textContent == "=") operate(display.textContent);
    else if (display.textContent == 0) display.textContent = e.target.textContent;
    else display.textContent += e.target.textContent;
}

function operate (equation) {
    
}

let buttons = document.querySelectorAll("button");
let display = document.querySelector(".display");

buttons.forEach(button => button.addEventListener("click", buttonAction));


