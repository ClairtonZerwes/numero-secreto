let listaNumerosSorteados = [];
let numMinSecreto = 5;
let numMaxSecreto = 25;
let maximoTentativas = 5;
let contarTentativas = 1;
let numeroSecreto = obterNumeroInteiroAleatorio(numMinSecreto, numMaxSecreto);
alert(`Bem Vindo! Adivinhe o número secreto. \nVocê tem ${maximoTentativas} Tentivas.`);

exibirMensagemInicial();

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    // responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {1:2}); // descomentar esta linha para usar a voz de IA.
}

function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo de Adivinhação!');
    exibirParagrafo();
    console.log('Numero secreto: ' + numeroSecreto);
}

function exibirParagrafo() {
    exibirTextoNaTela('p', `Escolha um número entre ${numMinSecreto} e ${numMaxSecreto} - ${contarTentativas}ª ${palavraTentativa()}`);
}

function verificarChuteOnclick() {
    let numeroChute = parseInt(document.querySelector('input').value);
    let acertou = false;
    console.log('numeroChute == numeroSecreto ' + numeroChute + (numeroChute == numeroSecreto) + numeroSecreto);
    if (numeroChute >= numMinSecreto && numeroChute <= numMaxSecreto) {
        //chamar function verificar numero secreto
        if (contarTentativas > 1) exibirParagrafo();
        if (contarTentativas <= maximoTentativas) {
            console.log(contarTentativas);
            acertou = verificarNumeroSecreto(numeroChute, numeroSecreto);
            if (acertou) {
                exibirTextoNaTela('h1', `Acertou!!!`);
                exibirTextoNaTela('p', `Parabéns você acertou o número secreto com ${contarTentativas}ª ${palavraTentativa()}!`);
                habilitarBotaoNovoJogo();
            } else {
                if (numeroChute > numeroSecreto) {
                    exibirTextoNaTela('p', `O número secreto é menor - ${contarTentativas+1}ª ${palavraTentativa()}`);
                } else {
                    exibirTextoNaTela('p', `O número secreto é maior - ${contarTentativas+1}ª ${palavraTentativa()}` );
                }
                limparCampo();
            }
        }
        if (contarTentativas >= maximoTentativas && !acertou) {
            exibirTextoNaTela('h1', `Número de tentivas esgotadas!!!`);
            habilitarBotaoNovoJogo()
        }
        contarTentativas++; // somente contar as tentativas depois de verificar se o número do chute está no intervalo correto.
    }
    else {
        alert(`Você deve informar um número entre ${numMinSecreto} e ${numMaxSecreto}`);
        limparCampo();
    }
}

function habilitarBotaoNovoJogo() {
    exibirTextoNaTela('p', `Clique no botão [Novo Jogo] para continuar, o número secreto será mudado.`);
    document.getElementById('reiniciar').removeAttribute('disabled');
}

function palavraTentativa() {
    return contarTentativas > 1 ? 'Tentativas' : 'Tentativa';
}

function limparCampo(){
    document.getElementById('inputNumeroChute').value = '';
    /* // código abaixo executa a mesma funcinalidade da linha acima
    let chute = document.querySelector('input');
    chute.value = '';
    */
}

function reiniciarJogoOnclick() {
    contarTentativas = 1;
    limparCampo();
    numeroSecreto = obterNumeroInteiroAleatorio(numMinSecreto, numMaxSecreto);
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}

function obterNumeroInteiroAleatorio(min, max) {
    // FUNÇÃO MATH DE JAVASCRIPT:
    //      Math.random() 'Gera um número aleatório' 
    //          Exemplo: numAle =  parseInt(Math.random() * 10) + 1; // entre 1 e 10
    //                   numAle =  parseInt(Math.random() * 1000) + 1; // entre 1 e 1000
    //
    //      Math.floor() 'Retorna o maior número inteiro menor ou igual a um número'
    //          Exemplo: console.log(Math.floor(45.95)); // Saída: 45
    //                   console.log(Math.floor(-45.95)); // Saída: -46
    let tamanhoLista = listaNumerosSorteados.length;
    if (tamanhoLista > (numMaxSecreto-numMinSecreto)) {
        listaNumerosSorteados = [];
    }

    let numeroAleatorio = parseInt(Math.floor(Math.random() * (max - min + 1)) + min);
    if (numeroAleatorio == NaN || numeroAleatorio == null || (numeroAleatorio > numMaxSecreto || numeroAleatorio < numMinSecreto) || listaNumerosSorteados.includes(numeroAleatorio)) {
        return obterNumeroInteiroAleatorio(min, max);
    } else {
        listaNumerosSorteados.push(numeroAleatorio);
        console.log(listaNumerosSorteados);
        return numeroAleatorio;
    }
}

function verificarNumeroSecreto(numeroChute, numeroSecreto) {
    if (numeroSecreto == numeroChute) {
        console.log('Você acertou o número sercreto é [' + numeroSecreto + '].');
         return true;
    } else {
        return false;
    }
}

