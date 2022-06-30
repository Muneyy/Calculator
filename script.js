const textDisplay = document.getElementById("text");
const textPrevious = document.getElementById("text-previous");
const numberButtons = Array.from(document.querySelectorAll(".number-button"));
const operationButtons = Array.from(document.querySelectorAll(".operation-button"))
const equalButton = document.querySelector(".equals-button");
const clearDisplay = document.querySelector(".clear");
const decimalButton = document.getElementById(".");
const undoButton = document.querySelector(".undo");

const arrayHolder = [];
let operationToPerform = "";
// Determine if there is a current operation running
let inOperation = 0;
let justAfterEquals = 0;
let alreadyDecimal = 0;


function initializeButtons() {
    textDisplay.textContent = "";


    numberButtons.forEach(numberButton => numberButton.addEventListener('click', () => {
        
        if (justAfterEquals == 1) {
            textPrevious.textContent = "";
        }
        justAfterEquals = 0;
        if (inOperation == 1) {
            clear();
            textDisplay.textContent = textDisplay.textContent.concat(numberButton.id);
            inOperation = 0;
        } else {
            textDisplay.textContent = textDisplay.textContent.concat(numberButton.id);
        }
        
    }));


    clearDisplay.addEventListener('click', () => {
        alreadyDecimal = 0
        clear();
        removeColor();
        textPrevious.textContent = "";
        arrayHolder.length = 0;
        inOperation = 0;
    });


    operationButtons.forEach(operationButton => operationButton.addEventListener('click', () => {
        alreadyDecimal = 0
        if (justAfterEquals == 0) {
            textPrevious.textContent = textPrevious.textContent
                                                .concat(textDisplay.textContent);
        }
        if (justAfterEquals == 1) {
            textPrevious.textContent = textDisplay.textContent;
        }
        justAfterEquals = 0;
        arrayHolder.push(Number(textDisplay.textContent));
        removeColor();
        operationButton.classList.add("active");



        // If there is a running operation (user does not click equals button even after inputting
        // two values), then calculate the value based on operation and use that value for next 
        // operation
        if (arrayHolder.length == 2) {
            let result = operation(arrayHolder, operationToPerform);
            textDisplay.textContent = `${result}`;
            arrayHolder.length = 0;
            arrayHolder.push(Number(result));

        }
        if (operationButton.id == "add") {
            operationToPerform = operationButton.id;
            inOperation = 1;
            textPrevious.textContent = textPrevious.textContent
                                            .concat(" + ");
        } else if (operationButton.id == "sub") {
            operationToPerform = operationButton.id;
            inOperation = 1;
            textPrevious.textContent = textPrevious.textContent
                                            .concat(" - ");
        } else if (operationButton.id == "mul") {
            operationToPerform = operationButton.id;
            inOperation = 1;
            textPrevious.textContent = textPrevious.textContent
                                            .concat(" * ");
        } else if (operationButton.id == "div") {
            operationToPerform = operationButton.id;
            inOperation = 1;
            textPrevious.textContent = textPrevious.textContent
                                            .concat(" / ");
        }
        // After pushing the second value to the arrayHolder, clear the text display
        // and then display the current running value (from all the running operations
        // that have occurred since).
        clear();
        textDisplay.textContent = `${arrayHolder[0]}`;
    }));


    equalButton.addEventListener('click', () => {
        alreadyDecimal = 0
        removeColor();
        textPrevious.textContent = textPrevious.textContent
                                            .concat(textDisplay.textContent);
        if (operationToPerform == "") {
            return
        } else {
            arrayHolder.push(Number(textDisplay.textContent));
            let result = operation(arrayHolder, operationToPerform);
            textDisplay.textContent = `${result}`;
            arrayHolder.length = 0;
            inOperation = 1;
        }
        justAfterEquals = 1;
    })

    decimalButton.addEventListener('click', () => {
        if (alreadyDecimal === 0) {
            textDisplay.textContent = textDisplay.textContent.concat(".");
        }
        alreadyDecimal = 1;
    })

    undoButton.addEventListener('click', () => {
        
        textDisplay.textContent = textDisplay.textContent.substring(0, textDisplay.textContent.length - 1);
        // textDisplay.textContent = "";
    })
}

// The computations themselves only takes in two values from an array that is
// continuously updated every after an operator/equal has been pressed.
function operation(arr, oper) {
    if (oper === "add") {
        let sum = arr[0] + arr[1];
        return sum.toFixed(2);
    } else if (oper === "sub") {
        let sum = arr[0] - arr[1];
        return sum.toFixed(2);
    } else if (oper === "mul") {
        let sum = arr[0] * arr[1];
        return sum.toFixed(2);
    } else if (oper === "div") {
        let sum = arr[0] / arr[1];
        return sum.toFixed(2);
    };
};

function clear() {
    textDisplay.textContent = "";
};

function removeColor() {
    operationButtons.forEach((button) => {
        button.classList.remove("active");
    })
}














initializeButtons();



