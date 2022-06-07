const btnNew = document.getElementById("new-color")
const btnEasy = document.getElementById("easy")
const btnHard = document.getElementById("hard")

const prompt = document.getElementById("prompt")
const squares = document.querySelectorAll(".square")
const hardSquares = document.querySelectorAll(".hard")
const result = document.getElementById("result")

let selectedRGB

let easyMode = true
// let isCorresponding = false


function colorGenerator() {
    squares.forEach((sqr) => {
        let r = Math.round(Math.random() * 255)
        let g = Math.round(Math.random() * 255)
        let b = Math.round(Math.random() * 255)
        sqr.style.backgroundColor = `rgb(${r}, ${g}, ${b})`
    })
    colorSelector()
}

function colorSelector() {
    if (easyMode) {
        let maxIndex = 2
        selectedIndex = Math.round(Math.random() * maxIndex)
    } else {
        let maxIndex = 5
        selectedIndex = Math.round(Math.random() * maxIndex)
    }
    selectedRGB = squares[selectedIndex].style.backgroundColor
    prompt.textContent = selectedRGB.toUpperCase()
    prompt.style.backgroundColor = selectedRGB // << REMOVE *****
}

function toggleBtnColor() {
    if (easyMode) {
        btnEasy.style.color = "black"
        btnEasy.style.backgroundColor = "white"
        btnHard.style.color = "white"
        btnHard.style.backgroundColor = "transparent"
    } else {
        btnEasy.style.color = "white"
        btnEasy.style.backgroundColor = "transparent"
        btnHard.style.color = "black"
        btnHard.style.backgroundColor = "white"
    }
}

function toggleVisibility() {
    hardSquares.forEach((sqr) => {
        if (easyMode) {
            return sqr.style.visibility = "hidden"
        } else {
            return sqr.style.visibility = "visible"
        }
    })
}

window.addEventListener("load", () => {
    easyMode = true
    btnEasy.style.color = "black"
    btnEasy.style.backgroundColor = "white"
    colorGenerator()
})
btnNew.addEventListener("click", colorGenerator)
btnEasy.addEventListener("click", () => {
    easyMode = true
    toggleBtnColor()
    toggleVisibility()
    colorGenerator()
})
btnHard.addEventListener("click", () => {
    easyMode = false
    toggleBtnColor()
    toggleVisibility()
    colorGenerator()
})

// squares.forEach((sqr) => {
//     sqr.addEventListener("click", () => {
//         console.log(sqr)
        
//         if (selectedRGB == sqr.style.backgroundColor) {
//             result.textContent = "CORRECT!"
//             result.style.visibility = "visible"
//             return prompt.style.backgroundColor = selectedRGB
//         }
//         sqr.style.transition = "0.4s ease-in"
//         sqr.style.visibility = "hidden"
//     })
// })

/*

css classlist example
.transition {
  transition: 0.5s ease-in-out;
  opacity: 0;
  visibility: hidden;
}

*/