const cards = document.querySelectorAll('.card');
const pontuacao = document.querySelector('.pontos');
let ponto = 0;
let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;


pontuacao.innerHTML = `Pontuação: ${ponto}`;
//função para virar a carta

function flipcard(){
  
    if(lockBoard) return;
    if(this === firstCard) return;

    this.classList.add('flip');
    if(!hasFlippedCard){
        hasFlippedCard = true;
        firstCard = this;
        return;
    }
   

    secondCard = this;
    hasFlippedCard = false;
    checkFortMatch();
}

//Função que verifica se as cartas são iguais

function checkFortMatch(){
 
   
    if(firstCard.dataset.card === secondCard.dataset.card){
        ponto ++;
        pontuacao.innerText = `Pontuação: ${ponto}`;
        disableCards();
        return;
    }

    unflipCards()
}

//Função que desabilita as cartas

function disableCards(){
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

//Função que desvira as cartas

function unflipCards(){
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 1500);
}

//Função que reseta o tabuleiro

function resetBoard(){
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null]
}


//Função que embaralha as cartas

(function shuffle(){
    cards.forEach((card) =>{
        let ramdomPosition = Math.round(Math.random() * 15);
        card.style.order = ramdomPosition;
    })
})();

//Adiciona evento de clique na carta
cards.forEach((card) => {
    card.addEventListener('click', flipcard)
}
);