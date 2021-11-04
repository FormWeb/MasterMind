const board = document.getElementById("board")
const choices = document.getElementById("choices")

const btnEasy = document.getElementById("btn_easy")
const btnNormal = document.getElementById("btn_normal")
const btnHard = document.getElementById("btn_hard")

let setting = {
    lines: 12,
    columns: 4,
    colors: ["#cc0000", "#52ba25", "#3d85c6", "#741b47"]
}

let currentTurn = 0
let currentColumn = 0
let colorsToFind = []
let colorsNotFound = []
let pickedColors = []
let results = []

btnEasy.addEventListener("click", () => {
    setupSetting({
        lines: 12,
        columns: 4,
        colors: ["#cc0000", "#52ba25", "#3d85c6", "#741b47"]
    }) 
})

btnNormal.addEventListener("click", () => {
    setupSetting({
        lines: 12,
        columns: 6,
        colors: ["#cc0000", "#52ba25", "#3d85c6", "#741b47", "#ff7f00", "#ffd700"]
    }) 
})

btnHard.addEventListener("click", () => {
    setupSetting({
        lines: 8,
        columns: 6,
        colors: ["#cc0000", "#52ba25", "#3d85c6", "#741b47", "#ff7f00", "#ffd700"]
    }) 
})

function setupSetting(difficulty) {

    const winText = document.getElementById("win")

    winText.innerText = ""

    setting = difficulty

    currentTurn = 0
    currentColumn = 0
    pickedColors = []
    results = []

    const cells = document.querySelectorAll("#board > td")

    for (let cell of cells) {
        cell.style.background = ""
    }

    setupGame()
    setupBoard()
}

function setupGame() {
    board.innerHTML = ""
    choices.innerHTML = ""

    colorsToFind = []
    for (let i = 0 ; i < setting.colors.length ; i++) {
        colorsToFind.push(setting["colors"][Math.floor(Math.random() * setting.colors.length)])
    }
    
    console.log(colorsToFind)
    setupColorsNotFound()
}

function setupColorsNotFound() {
    colorsNotFound = []
    for (i = 0 ; i < colorsToFind.length ; i++) {
        colorsNotFound.push(colorsToFind[i])
    }
}

function setupBoard() {


    for (let i = setting["lines"] ; i > 0 ; i--) {
        const line = document.createElement('tr')
        const firstColumn = document.createElement("td")

        firstColumn.innerText = i

        line.appendChild(firstColumn)
        

        for (let j = 0 ; j < setting["columns"] ; j++) {
            const cell = document.createElement("td")
            cell.style.width = "32px"
            cell.id = "try"+(i-1)+"-"+j

            line.appendChild(cell)
        }

        for (let j = 0 ; j < setting["columns"] ; j++) {
            const cell = document.createElement("td")
            cell.style.width = "16px"
            cell.id = "result"+(i-1)+"-"+j

            line.appendChild(cell)
        }

        board.appendChild(line)
    }

    const choiceLine = document.createElement('tr')

    for (let j = 0 ; j < setting["columns"] ; j++) {
        const cell = document.createElement("td")
        cell.style.width = "32px"
        cell.style.height = "32px"
        cell.style.background = setting["colors"][j]

        cell.addEventListener("click", () => {
            chooseColor(setting["colors"][j])
        })

        choiceLine.appendChild(cell)
    }

    choices.appendChild(choiceLine)
}

function chooseColor(n) {
    const cell = document.getElementById("try"+currentTurn+"-"+currentColumn)
    cell.style.background = n
    pickedColors.push(n)
    currentColumn++

    if (currentColumn >= setting["columns"]) {
        
        currentColumn = 0
        testPickedColors()
        
        currentTurn++
    }
}

function testPickedColors() {

    // Test colors

    for (let i = 0 ; i < pickedColors.length ; i++) {

        if (colorsToFind[i] === pickedColors[i]) {
            results.push("+")
            const firstIndex = colorsNotFound.indexOf(pickedColors[i])
            if (firstIndex != -1) {
                colorsNotFound.splice(colorsNotFound.indexOf(pickedColors[i]), 1)
            }
        }
    }

    for (let i = 0 ; i < pickedColors.length ; i++) {

        if (colorsNotFound.includes(pickedColors[i])) {
            results.push("~")
            const firstIndex = colorsNotFound.indexOf(pickedColors[i])
            if (firstIndex != -1) {
                colorsNotFound.splice(colorsNotFound.indexOf(pickedColors[i]), 1)
            }
        }

    }

    for (let i = 0 ; i < results.length ; i++) {
        const cell = document.getElementById("result"+currentTurn+"-"+currentColumn)
        cell.innerText = results[i]
        currentColumn++
    }

    // Check if it's win

    let win = true
    for (let i = 0 ; i < pickedColors.length ; i++) {
        if (pickedColors[i] != colorsToFind[i]) {
            win = false
        }
    }

    if (win) {
        console.log("Gagné")

        let winText = document.getElementById("win")

        winText.innerText = "Gagné !"
    }

    console.log(colorsNotFound)

    currentColumn = 0
    pickedColors =[]
    results = []
    setupColorsNotFound()

}


setupGame()
setupBoard()