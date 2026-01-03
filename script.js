const container = document.querySelector("#container")
let num1 = null, num2 = null, currentResult = null
let currentOperator = ""

function logCurrent() {
    console.log(`num1: ${num1} | num2: ${num2} | current operator: ${currentOperator} | current result: ${currentResult}`);
}

function resetCalculator() {
    const screen = document.querySelector("#screen")
    screen.textContent = 0
    num1 = null
    num2 = null
    currentResult = null
    currentOperator = ""
}

function calculate(e) {
    const screen = document.querySelector("#screen")
    switch(currentOperator) {
        case "+": currentResult = num1 + num2; break;
        case "—": currentResult = num1 - num2; break;
        case "x": currentResult = num1 * num2; break;
        case "/": {
            if(num2 == 0) {
                alert("Can't divide by 0!!")
                resetCalculator()
                return
            } else {
                currentResult = Math.round((num1 * 100) / num2) / 100
                break;
            }
        }
    }
    screen.textContent = currentResult.toLocaleString("en-IN")
    num1 = currentResult
    num2 = null
    console.log(e.target);
    currentOperator = (e.target.id == "calculate" ? "" : e.target.textContent)
    logCurrent()
}

function applyLayoutStyle(div) {
    div.style.padding = "15px"
    div.style.display = "flex"
    div.style.width = "410px"
    div.style.border = "2px solid black"
    div.style.backgroundColor = "#e1e1e1ff"
    div.style.justifyContent = "space-between"
}

function applyButtonStyle(div) {
    div.style.width = "90px"
    div.style.height = "90px"
    div.style.border = "2px solid black"
    div.style.fontFamily = "Helvetica"
    div.style.backgroundColor = "white"
    div.style.fontSize = "50px"
    div.style.display = "flex"
    div.style.justifyContent = "center"
    div.style.alignItems = "center"
    div.style.sha
}

function createDisplay(display) {
    const screen = document.createElement("div")
    screen.setAttribute("id", "screen")
    
    screen.style.padding = "0px 5px 0px 5px"
    screen.style.display = "flex"
    screen.style.justifyContent = "flex-end"
    screen.style.alignItems = "center"
    screen.style.backgroundColor = "white"
    screen.style.width = "410px"
    screen.style.height = "90px"
    screen.style.border = "2px solid black"
    screen.style.fontFamily = "Helvetica"
    screen.style.fontSize = "50px"
    screen.style.overflow = "auto"
    screen.textContent = "0"

    display.append(screen)
    display.style.margin = "10px"
}

function createDigits(buttons) {
    const digits = document.createElement("div")
    const clr = document.createElement("div")
    const calc = document.createElement("div")

    digits.setAttribute("id", "digits")
    clr.setAttribute("id", "clear")
    calc.setAttribute("id", "calculate")

    digits.style.width = "300px"
    digits.style.height = "400px"
    digits.style.display = "flex"
    digits.style.flexWrap = "wrap"
    digits.style.justifyContent = "space-between"
    digits.style.alignItems = "stretch"
    digits.style.alignContent = "stretch"

    for(let i = 9; i >= 0; i --) {
        const digit = document.createElement("div")
        digit.setAttribute("id", `${i}`)
        digit.textContent = `${i}`

        applyButtonStyle(digit)

        digits.append(digit)

        digit.addEventListener("click", (e) => {
            const screen = document.querySelector("#screen")
            let updatedText = ""
            if(num1 == null || currentResult != null) {
                updatedText = `${i}`
                num1 = i
                currentResult = null
            } else if(currentOperator == "") {
                updatedText = screen.textContent.replace(/,/g, "") + `${i}`
                num1 = Number(updatedText)
            } else {
                updatedText = (num2 == null ? "" : screen.textContent.replace(/,/g, "")) + `${i}`
                num2 = Number(updatedText)
            }
            logCurrent()
            screen.textContent = Number(updatedText).toLocaleString("en-IN")
        })
    }

    clr.textContent = "C"
    calc.textContent = "="

    applyButtonStyle(clr)
    applyButtonStyle(calc)

    clr.style.backgroundColor = "#fc5f53"
    calc.style.backgroundColor = "#fcef5bff"

    clr.addEventListener("click", resetCalculator)
    calc.addEventListener("click", (e) => {
        if(num1 != null && num2 != null && currentOperator != "") {
            calculate(e)
        } else {
            alert("You have not selected two numbers and an operator!")
        }
    })

    digits.append(clr)
    digits.append(calc)
    buttons.append(digits)
}

function createOperators(buttons) {
    const operators = document.createElement("div")
    operators.setAttribute("id", "operators")
    
    operators.style.height = "400px"
    operators.style.display = "flex"
    operators.style.flexDirection = "column"
    operators.style.flexWrap = "wrap"
    operators.style.justifyContent = "space-around"

    for(let i = 0; i < 4; i ++) {
        const operator = document.createElement("div")
        switch(i) {
            case 0: {
                operator.textContent = "+"
                operator.setAttribute("id", "add")
                break
            }
            case 1: {
                operator.textContent = "—"
                operator.setAttribute("id", "subtract")
                break
            }
            case 2: {
                operator.textContent = "x"
                operator.setAttribute("id", "multiply")
                break
            }
            case 3: {
                operator.textContent = "/"
                operator.setAttribute("id", "divide")
                break
            }
        }
        applyButtonStyle(operator)

        operator.addEventListener("click", (e) => {
            if(num1 != null) {
                if(num2 != null) {
                    calculate(e)
                } else {
                    currentOperator = operator.textContent
                }
                currentResult = null
                logCurrent()
            } else {
                alert("Please select a number first!")
            }
        })

        operators.append(operator)
    }

    buttons.append(operators)
    buttons.style.margin = "10px"
}

function createCalculator() {
    const buttons = document.createElement("div")
    const display = document.createElement("div")
    
    buttons.setAttribute("id", "buttons")
    display.setAttribute("id", "display")
    
    createDisplay(display)
    createDigits(buttons)
    createOperators(buttons)

    applyLayoutStyle(display)
    applyLayoutStyle(buttons)
    
    container.append(display)
    container.append(buttons)

    container.style.display = "flex"
    container.style.flexDirection = "column"
    container.style.alignItems = "center"
}

createCalculator()