const gameEl = document.getElementById("game")
const statusEl = document.getElementById("status")
let letterArr = [...Array(6)].map(x=>Array(5).fill(""))
let colorArr = [...Array(6)].map(x=>Array(5).fill("white"))
let row = 0
let col = -1

let solutions = []
let solution = ""
let solutionArr = []

let finished = false

document.addEventListener("DOMContentLoaded", start)
document.addEventListener("keydown", handleKey)

async function start() {
	solutions = await fetch("solutions.json").then(data => data.json())
	let randomNum = Math.floor(Math.random() * solutions.length)
	solution = solutions[randomNum]
	solution = solution.toUpperCase()
	solutionArr = solution.split('')

	drawField()
}



function drawField() {
	for (let i = 0; i < 6; i++) {
		for (let j = 0; j < 5; j++) {
			let el = document.createElement("div")
			el.style.position = "absolute"
			el.style.top = i * 60 + "px"
			el.style.left = j * 60 + "px"
			el.style.height = "60px"
			el.style.width = "60px"
			el.style.backgroundColor = colorArr[i][j]
			el.style.border = "1px solid black"
			gameEl.appendChild(el)
		}
	}
}

function handleKey(e) {
	if (!finished && e.which >= 65 && e.which <= 90 && col < 4) {
		col++
		let letter = e.key.toUpperCase()
		letterArr[row][col] = letter
		render()
	}

	else if (e.key == "Enter" && col === 4) {
		checkWord()
	}

	else if (e.key == "Backspace" && col >= 0) {
		letterArr[row][col] = null
		col--
		render()
	}

}

function checkWord() {
	if(!finished && col == 4){
		let count = 0
		solutionArr.forEach((solLetter,index)=> {
			if(solLetter === letterArr[row][index]){
				colorArr[row][index] = "green"
				count++
			}
			else {
				colorArr[row][index] = "gray"
				letterArr[row].forEach((letter2,index2) => {
					if(solLetter === letter2 && colorArr[row][index2] !== "green"){
						colorArr[row][index2] = "orange"
					}
				})
			}
		});
		if(count === 5){
			console.log("you win")
			finished = true
			statusEl.innerHTML = "<span color='blue'>GOD GAMER</span>"
		}
		else if(row === 5){
			console.log("you lose")
			finished = true
			statusEl.innerHTML = "<span color='red'>SO BAD</span>"
		} else {
			row++
			col = -1
		}
	}
	render()
}


function render() {
	gameEl.innerHTML = ""
	drawField()

	for (let i = 0; i < 6; i++) {
		for (let j = 0; j < 5; j++) {
			let el = document.createElement("span")
			el.innerText = letterArr[i][j]
			el.style.position = "absolute"
			el.style.top = i * 60 + 15 + "px"
			el.style.left = j * 60 + 15 + "px"
			el.style.fontSize = "30px"
			gameEl.appendChild(el)
		}
	}
}