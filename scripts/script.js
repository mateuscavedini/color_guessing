const btnNew = document.getElementById("new-color")
const btnEasy = document.getElementById("easy")
const btnHard = document.getElementById("hard")

const display = document.getElementById("display")
const squares = document.querySelectorAll(".square")
const hardSquares = document.querySelectorAll(".hard")
const result = document.getElementById("result")

let selectedRGB
let easyMode = true
let isOver = false

function reset() {
    isOver = false
    display.style.backgroundColor = "transparent"
    display.style.color = "white"
    result.classList.add("hidden")
    result.textContent = "TRY AGAIN!"
    btnNew.textContent = "NEW COLOR"
}

function colorGenerator() {
    reset()
    
    squares.forEach((sqr) => {
        const r = Math.round(Math.random() * 255)
        const g = Math.round(Math.random() * 255)
        const b = Math.round(Math.random() * 255)
        sqr.style.backgroundColor = `rgb(${r}, ${g}, ${b})`
    })

    colorSelector()
    toggleBtnColor()
    toggleSqrVisibility()
}

function colorSelector() {
    const maxIndex = easyMode ? 2 : 5

    const selectedIndex = Math.round(Math.random() * maxIndex)
    selectedRGB = squares[selectedIndex].style.backgroundColor
    
    display.textContent = selectedRGB.toUpperCase()
}

function toggleBtnColor() {
    if (easyMode) {
        btnEasy.classList.add("pressed")
        btnHard.classList.remove("pressed")
    } else {
        btnEasy.classList.remove("pressed")
        btnHard.classList.add("pressed")
    }
}

function toggleSqrVisibility() {
    squares.forEach((sqr) => sqr.classList.remove("remove"))

    hardSquares.forEach((sqr) => easyMode ? sqr.classList.add("hidden") : sqr.classList.remove("hidden"))
}

function endGame() {
    isOver = true
    btnNew.textContent = "PLAY AGAIN"
    result.textContent = "CORRECT!"
    result.classList.remove("hidden")
    display.style.backgroundColor = selectedRGB
    textColor()
    
    squares.forEach((sqr) => {
        sqr.classList.remove("remove")
        sqr.style.backgroundColor = selectedRGB
    })
}

// for better readability, changes the display's text color based on it's background color (Reference - W3C: https://www.w3.org/TR/AERT/#color-contrast)
function textColor() {
    const colorArray = selectedRGB.replace(/[rgb() ]/g, "").split(",").map(Number)
    const colorBrightness = ((colorArray[0] * 299) + (colorArray[1] * 587) + (colorArray[2] * 114)) / 1000

    if (colorBrightness > 125) {
        return display.style.color = "black"
    }
}


window.addEventListener("load", () => {
    easyMode = true
    colorGenerator()
})

btnNew.addEventListener("click", colorGenerator)
btnEasy.addEventListener("click", () => {
    easyMode = true
    colorGenerator()
})
btnHard.addEventListener("click", () => {
    easyMode = false
    colorGenerator()
})

squares.forEach((sqr) => {
    if (isOver) {
        return
    }

    sqr.addEventListener("click", () => {
        if (selectedRGB != sqr.style.backgroundColor) {
            sqr.classList.add("remove")
            return result.classList.remove("hidden")
        }
    
        endGame()
    })
})