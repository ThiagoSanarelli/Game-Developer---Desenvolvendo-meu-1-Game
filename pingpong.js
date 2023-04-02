let canvascontex;
let posicaojogador1;
let posicaojogador2;
let pontosjogador1;
let pontosjogador2;
let bolaposicaoxorientacao;
let bolaposicaoyorientacao;
let bolaposicaoy;
let bolaposicaox;
let jogador1mov;
let jogador2mov;
let velocidade = document.getElementById('velocidade');
const alturacanva=500;
const larguracanva=800;
const largurajogador=20; 
const alturajogador=200; 
const posicaojogador1x = 10;
const posicaojogador2x = larguracanva - largurajogador - 10;
function setup(){
    const canvas = document.getElementById("canvas")
    canvascontex = canvas.getContext("2d")
    
    // inicializa as posições y do p1 e do p2 para metade da tela
    posicaojogador1 = posicaojogador2 = (alturacanva / 2) - (alturajogador/2)
    
    // inicializa os pontos dos jogadores como 0
    pontosjogador1 = 0
    pontosjogador2 = 0

    //define um intervalo de 60 fps para o loop
    placar()
}

function loop(){
    if(jogador1mov == 87 && posicaojogador1 > 0){
        posicaojogador1 -= 10
    }else if(jogador1mov == 83 && posicaojogador1 + alturajogador < alturacanva){
        posicaojogador1 += 10
    }

    if(jogador2mov == 38 && posicaojogador2 > 0){
        posicaojogador2 -= 10
    }else if(jogador2mov == 40 && posicaojogador2 + alturajogador < alturacanva){
        posicaojogador2 += 10
    }

    if(bolaposicaox >= posicaojogador1x && bolaposicaox <= posicaojogador1x + 10 && bolaposicaoy >= posicaojogador1 && bolaposicaoy <= posicaojogador1 + alturajogador){
        bolaposicaoxorientacao = 1
    }
    else if(bolaposicaox >= posicaojogador2x && bolaposicaox <= posicaojogador2x + 10 && bolaposicaoy >= posicaojogador2 && bolaposicaoy <= posicaojogador2 + alturajogador){
        bolaposicaoxorientacao = -1
    }

    // verifica se a bola bateu no chão ou no teto
    if(bolaposicaoy + 10 >= alturacanva || bolaposicaoy <= 0) bolaposicaoyorientacao *= -1

    //move a bola no eixo X e Y
    bolaposicaox += 5 * bolaposicaoxorientacao
    bolaposicaoy += 5 * bolaposicaoyorientacao

    if(bolaposicaox+10 > larguracanva) {
        pontosjogador1++
        placar()
    }
    else if(bolaposicaox < 0){
        pontosjogador2 ++
        placar()
    }
    desenhar()
}

function placar(){
    console.log(`${pontosjogador1} VS ${pontosjogador2}`)
    bolaposicaoyorientacao = Math.pow(2, Math.floor( Math.random() * 2 )+1) - 3 
    bolaposicaoxorientacao = Math.pow(2, Math.floor( Math.random() * 2 )+1) - 3 
    bolaposicaox = larguracanva / 2 -10
    bolaposicaoy = alturacanva / 2 -10
}

function desenhar(){
    // fundo
    desenharObjeto(0,0,larguracanva,alturacanva,"#000")
    // jogador 1
    desenharObjeto(posicaojogador1x, posicaojogador1, largurajogador, alturajogador)
    // jogador 2
    desenharObjeto(posicaojogador2x, posicaojogador2, largurajogador, alturajogador)
    // barra lateral
    desenharObjeto(larguracanva/2 -5,0,5,alturacanva)
    // bola
    desenharObjeto(bolaposicaox, bolaposicaoy, 10, 10)
    mudarPlacar()
}

function desenharObjeto(x,y,w,h,color="#fff"){
    canvascontex.fillStyle = color
    canvascontex.fillRect(x,y,w,h)
    canvascontex.fillStyle = "#000"
}
document.addEventListener("keydown",function(evento){
    if(evento.keyCode == 87 || evento.keyCode == 83){
        jogador1mov = evento.keyCode
    }
    else if(evento.keyCode== 38 || evento.keyCode==40)
        jogador2mov = evento.keyCode
})
function mudarPlacar(){
    canvascontex.fillStyle = "#fff";
    canvascontex.fillText(pontosjogador1, larguracanva/4, 50);
    canvascontex.fillText(pontosjogador2, 3*(larguracanva/4), 50);
}
function zerarPlacar(){
    pontosjogador2 = 0
    pontosjogador1 = 0
}
function mudarVelocidade(){
    let velocidade = document.getElementById('velocidade').value;
    setInterval(loop,1000/velocidade)
}
setup()