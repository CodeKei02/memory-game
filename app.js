let arrayCards = ['🐷', '🐶', '🦄', '🐣', '🐺', '🐼']
let cartasMezcladas = mixCards(arrayCards)
let contenedorCartas = document.querySelector('.container-cartas')
let cartasVolteadas = []
let mensaje = document.querySelector('.mensaje')
let btnReiniciar = document.querySelector('#btn-reinicio')

function handleClickCard(carta){
    if(cartasVolteadas.length < 2 && !carta.classList.contains('flipped')){
        carta.classList.add('flipped')
        cartasVolteadas.push(carta)

        if(cartasVolteadas.length === 2){
            if(checkMatch(cartasVolteadas[0], cartasVolteadas[1])){
                    cartasVolteadas = []
                    if(todasLasCartasVolteadas()){
                        mostrarMensajeReinicio()
                    }
            }else{
                setTimeout(() =>{
                    cartasVolteadas.forEach(carta => carta.classList.remove('flipped'))
                    cartasVolteadas = []
                }, 1000)
            }
        }
    }
}

btnReiniciar.addEventListener('click', function() {
    reiniciarJuego()
})

cartasMezcladas.forEach(carta => {
    let cartaElemento = document.createElement('div')
    cartaElemento.classList.add('carta')
    cartaElemento.dataset.name = carta

    let frontFaceCard = document.createElement('div')
    frontFaceCard.classList.add('front-face')
    frontFaceCard.textContent = carta

    let backFaceCard = document.createElement('div')
    backFaceCard.classList.add('back-face')
    backFaceCard.textContent = '❓'

    cartaElemento.appendChild(frontFaceCard)
    cartaElemento.appendChild(backFaceCard)
    contenedorCartas.appendChild(cartaElemento)

    cartaElemento.addEventListener('click', () => handleClickCard(cartaElemento));

})

function checkMatch(carta1, carta2){
    return carta1.dataset.name === carta2.dataset.name
}

function mixCards(cards) {
    let todasLasCartas = [...cards, ...cards]

    for (let i = todasLasCartas.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [todasLasCartas[i], todasLasCartas[j]] = [todasLasCartas[j], todasLasCartas[i]];
    }
    
    return todasLasCartas;
}

function todasLasCartasVolteadas(){
    let todasLasCartas = document.querySelectorAll('.carta')
    return Array.from(todasLasCartas).every(carta => carta.classList.contains('flipped'))
}

function mostrarMensajeReinicio(){
    mensaje.classList.remove('disabled')
    
}

function reiniciarJuego(){
    mensaje.classList.add('disabled')
    let todasLasCartas = document.querySelectorAll('.carta')
    todasLasCartas.forEach((carta) => carta.classList.remove('flipped'))

    let cartasMezcladas = mixCards(arrayCards)
    contenedorCartas.innerHTML = ''
    cartasMezcladas.forEach((carta) => {
        let cartaElemento = document.createElement('div')
        cartaElemento.classList.add('carta')
        cartaElemento.dataset.name = carta

        let frontFaceCard = document.createElement('div')
        frontFaceCard.classList.add('front-face')
        frontFaceCard.innerHTML = carta

        let backFaceCard = document.createElement('div')
        backFaceCard.classList.add('back-face')
        backFaceCard.innerHTML = '❓'

        contenedorCartas.appendChild(cartaElemento)
        cartaElemento.appendChild(frontFaceCard)
        cartaElemento.appendChild(backFaceCard)

        cartaElemento.addEventListener('click', () => handleClickCard(cartaElemento))
    })
}




