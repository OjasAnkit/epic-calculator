const container = document.querySelector("#container")

function applyStyle(div) {
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

        applyStyle(digit)

        digits.append(digit)
    }

    clr.textContent = "C"
    calc.textContent = "="

    applyStyle(clr)
    applyStyle(calc)

    clr.style.backgroundColor = "#fc5f53"
    calc.style.backgroundColor = "#fcef5bff"

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
        applyStyle(operator)

        operators.append(operator)
    }

    buttons.append(operators)
}

function createCalculator() {
    const buttons = document.createElement("div")
    const display = document.createElement("div")
    
    buttons.setAttribute("id", "buttons")
    display.setAttribute("id", "display")
    
    createDisplay(display)
    createDigits(buttons)
    createOperators(buttons)

    buttons.style.padding = "15px"
    buttons.style.display = "flex"
    buttons.style.width = "410px"
    buttons.style.border = "2px solid black"
    buttons.style.backgroundColor = "#f3f3f3ff"
    buttons.style.justifyContent = "space-between"
    
    container.append(display)
    container.append(buttons)
}

createCalculator()
// 7 8 9   + --> number - 1 / 3 == 2
// 4 5 6   - 
// 3 2 1   *
// 0 C =   / 
