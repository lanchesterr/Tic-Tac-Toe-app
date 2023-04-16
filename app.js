let tiles = document.querySelectorAll(".tile")
let message = document.querySelector('.message-text-element')
let CAT_PLAYER = '😺'
let DOG_PLAYER = '🐶'
let dogPoints = document.querySelector('.dog')
let catPoints = document.querySelector('.cat')
let button = document.querySelector('button')
let WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

let kittyTurn
let resultCat = 0
let resultDog = 0



function handleClick(e){
    let cell = e.target
    let currentPlayer = kittyTurn ? DOG_PLAYER : CAT_PLAYER
    console.log(currentPlayer)
    placeMark(cell,currentPlayer)
    swapTurn()
    if(checkWin(currentPlayer)){
        countPoints(currentPlayer)
        endGame(false)
        removeListener()
    }
    else if(checkDraw){
        endGame(true)
        
    }
}

function countPoints(currentPlayer){
    if(currentPlayer === DOG_PLAYER){
        resultDog += 1
        dogPoints.innerHTML = "🐶 Scores: " + resultDog
    }
    else{
        resultCat += 1
        catPoints.innerHTML = "😺 Scores: " + resultCat
    }
    
}   

function swapTurn(){
    kittyTurn = !kittyTurn
}

function placeMark(cell, currentPlayer){
    cell.innerText = currentPlayer
}

function checkWin(currentPlayer){
    return WINNING_COMBINATIONS.some(combination =>{
        return combination.every(index=>{
            return tiles[index].textContent.includes(currentPlayer)
        })
    })
}

function checkDraw(){
    return [...tiles].every(cell =>{
        return cell.textContent.includes(CAT_PLAYER) || cell.textContent.includes(DOG_PLAYER)
    })
}


function endGame(draw) {
    if (draw) {
        message.innerText = 'Draw!'
    } else {
        message.innerText = `${kittyTurn ? "😺's" : "🐶's"} Wins!`
        
    }
  }

function removeListener(){
    tiles.forEach(tile =>{
        tile.removeEventListener("click",handleClick)
    });
}

button.addEventListener("click",()=>{
    kittyTurn = false
    tiles.forEach(tile => {
        tile.innerHTML = ""
        message.innerHTML = ""
        tile.removeEventListener("click",handleClick)
        tile.addEventListener("click", handleClick,{once:true})
    });
    message.innerHTML = "The winner is ..."
})


tiles.forEach(tile => {
    tile.addEventListener("click", handleClick,{once:true})
});