const iconsArray = [
    {
        name:'car',
        icon:'<i class="fa-solid fa-car"></i>'
    },
    {
        name:'truck',
        icon:'<i class="fa-solid fa-truck"></i>'
    },
    {
        name:'motorcycle',
        icon:'<i class="fa-solid fa-motorcycle"></i>'
    },
    {
        name:'helicopter',
        icon:'<i class="fa-solid fa-helicopter"></i>'
    },
    {
        name:'train',
        icon:'<i class="fa-solid fa-train-subway"></i>'
    },
    {
        name:'tractor',
        icon:'<i class="fa-solid fa-tractor"></i>'
    },
    {
        name:'car',
        icon:'<i class="fa-solid fa-car"></i>'
    },
    {
        name:'truck',
        icon:'<i class="fa-solid fa-truck"></i>'
    },
    {
        name:'motorcycle',
        icon:'<i class="fa-solid fa-motorcycle"></i>'
    },
    {
        name:'helicopter',
        icon:'<i class="fa-solid fa-helicopter"></i>'
    },
    {
        name:'train',
        icon:'<i class="fa-solid fa-train-subway"></i>'
    },
    {
        name:'tractor',
        icon:'<i class="fa-solid fa-tractor"></i>'
    }
]

let flippedCards = []
let matchedPairs = 0
shuffleCards()
const gameBoard = document.getElementById('gameBoard')
displayCards()

function shuffleCards(){
    for(let i=iconsArray.length-1;i>=0;i--){
        const randIndex = Math.floor(Math.random()*(i+1));
        [iconsArray[i],iconsArray[randIndex]] = [iconsArray[randIndex],iconsArray[i]]
    }
}

function displayCards(){
    iconsArray.forEach((current,index,arr) => {
        const card = document.createElement('div')
        card.setAttribute('id',index)
        card.classList.add('cardback')
        card.classList.add('cardactive')
        gameBoard.append(card)
        card.addEventListener('click',flipCard)
    })
}

function flipCard(){
    if(flippedCards.length < 2 && this.classList.contains('cardactive')){
        let cardId = this.getAttribute('id')
        flippedCards.push(this)
        this.classList.remove('cardback')
        this.innerHTML = iconsArray[cardId].icon
        if(flippedCards.length == 2){
            setTimeout(checkMatch,1000)
        }
    }
}

function checkMatch(){
    const card1Id = flippedCards[0].getAttribute('id')
    const card2Id = flippedCards[1].getAttribute('id')
    if(iconsArray[card1Id].name === iconsArray[card2Id].name){
        flippedCards[0].style.border = 'none'
        flippedCards[0].style.backgroundColor = 'green'
        flippedCards[0].innerHTML = ''
        flippedCards[0].remove('cardactive')
        flippedCards[1].style.border = 'none'
        flippedCards[1].style.backgroundColor = 'green'
        flippedCards[1].innerHTML = ''
        flippedCards[1].remove('cardactive')
        matchedPairs++
        chechGameOver()
    }
    else{
        flippedCards[0].innerHTML = ''
        flippedCards[0].classList.add('cardback')
        flippedCards[1].innerHTML = ''
        flippedCards[1].classList.add('cardback')
    }
    flippedCards = []
}

function chechGameOver(){
    if(matchedPairs == iconsArray.length/2){
        while(gameBoard.firstChild){
            gameBoard.removeChild(gameBoard.firstChild)
        }
        gameBoard.innerHTML = 'You Won'
        gameBoard.classList.remove('game')
        gameBoard.classList.add('won')
    }
}