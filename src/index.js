// Importa a biblioteca 'chalk' para estilizar o texto no console.
import chalk from "chalk";
// Importa a biblioteca 'prompt' para receber entrada do usuário de forma interativa.
import prompt from "prompt";
// Importa a lista de personagens do nosso arquivo de dados.
import personagens from "./data/character.js";

// Função assíncrona para obter a escolha de um jogador.
async function getPlayer(playerNumber, excludedIndex = null) {
    // Cria um loop infinito que só será interrompido por um 'return' ou 'continue'.
    while (true) {
        // Usa a desestruturação para obter a propriedade 'index' do objeto retornado pelo prompt.
        const { index } = await prompt.get({
            // Define o schema (regras) para o prompt.
            properties: {
                // Define as propriedades do campo 'index'.
                index: {
                    // Mensagem que será exibida ao usuário, estilizada com chalk.
                    description: chalk.cyan(`Índice para o Player ${playerNumber}`),
                    // Expressão regular (regex) para garantir que a entrada seja apenas de dígitos numéricos.
                    pattern: /^\d+$/,
                    // Mensagem de erro se a entrada não corresponder ao padrão.
                    message: 'Por favor, insira um número válido.',
                    // Torna este campo obrigatório.
                    required: true,
                }
            }
        });

        // Converte o índice (que vem como string) para um número inteiro.
        const chosenIndex = parseInt(index, 10);
        // Procura na lista de personagens se existe algum com o índice escolhido.
        const character = personagens.find(p => p.INDEX === chosenIndex);

        // Se nenhum personagem for encontrado com o índice, exibe um erro e continua o loop.
        if (!character) {
            // Exibe a mensagem de erro.
            console.log(chalk.red.bold("Índice inválido. Tente novamente."));
            // Pula para a próxima iteração do loop 'while'.
            continue;
        }

        // Se um personagem já foi excluído (escolhido pelo jogador 1) e o jogador 2 tenta escolhê-lo novamente...
        if (excludedIndex && chosenIndex === excludedIndex) {
            // Exibe a mensagem de erro.
            console.log(chalk.red.bold("Este personagem já foi escolhido. Escolha outro."));
            // Pula para a próxima iteração do loop 'while'.
            continue;
        }

        // Se a escolha for válida, retorna o personagem e seu índice, saindo do loop.
        return { character, index: chosenIndex };
    }
}

// Função assíncrona principal para orquestrar a escolha dos personagens.
async function escolherPersonagem() {
    // Exibe o título para a seleção de personagens.
    console.log(chalk.yellow.bold("Escolha os personagens pelo ÍNDICE:"));
    // Itera sobre a lista de personagens e exibe cada um com seu índice.
    personagens.forEach(char => {
        console.log(`  ${char.INDEX} - ${char.NOME}`);
    });
    // Adiciona uma linha em branco para espaçamento.
    console.log("");

    // Inicia o prompt para receber a entrada do usuário.
    prompt.start();
    // Define o caractere que aparecerá antes de cada pergunta.
    prompt.message = chalk.green(">");
    // Define o caractere que separa a mensagem do prompt da entrada do usuário.
    prompt.delimiter = " ";

    // Chama a função getPlayer para o Jogador 1 e armazena o personagem e seu índice.
    const { character: player1, index: player1Index } = await getPlayer(1);
    // Chama a função getPlayer para o Jogador 2, passando o índice do Jogador 1 para evitar repetição.
    const { character: player2 } = await getPlayer(2, player1Index);

    // Retorna uma cópia dos objetos dos jogadores, zerando os pontos para garantir uma nova corrida limpa.
    return [{ ...player1, PONTOS: 0 }, { ...player2, PONTOS: 0 }];
}

// Função assíncrona para simular o lançamento de um dado de 6 lados.
async function rollDice() {
    // Retorna um número aleatório entre 1 e 6.
    return Math.floor(Math.random() * 6) + 1;
}

// Função assíncrona para sortear um tipo de bloco de pista.
async function getRandomBlock() {
    // Gera um número aleatório entre 0 e 1.
    let random = Math.random();
    // Variável para armazenar o resultado.
    let result;
    // Estrutura de decisão para determinar o tipo de bloco com base no número aleatório.
    switch (true) {
        // 33% de chance de ser "RETA".
        case random < 0.33:
            result = "RETA";
            break;
        // 33% de chance de ser "CURVA".
        case random < 0.66:
            result = "CURVA";
            break;
        // Chance restante (34%) de ser "CONFRONTO".
        default:
            result = "CONFRONTO";
            break;
    }
    // Retorna o tipo de bloco sorteado.
    return result;
}

// Função assíncrona para exibir o resultado do lançamento de dados de um personagem.
async function logRollResult(characterName, block, diceResult, attribute) {
    // Exibe uma mensagem formatada e estilizada com o resultado da jogada.
    console.log(chalk.green.bgBlueBright.italic(`${characterName} 🎲 rolou um dado de ${block} ${diceResult} + ${attribute} = ${diceResult + attribute} \n`));
}

// Função principal do motor da corrida, onde a lógica de cada rodada acontece.
async function playRaceEngine(character1, character2) {
    // Executa um loop para 5 rodadas.
    for (let round = 1; round <= 5; round++) {
        // Exibe o número da rodada atual.
        console.log(chalk.red.bgRedBright.bold(`\n🏁 Rodada ${round}\n`));

        // Sorteia o bloco da pista para esta rodada.
        let block = await getRandomBlock();
        // Exibe o tipo de bloco sorteado.
        console.log(chalk.blue.bgGreenBright.bold(`Bloco: ${block}\n`));

        // Rola os dados para cada jogador.
        let diceResult1 = await rollDice();
        let diceResult2 = await rollDice();

        // Inicializa as variáveis para o teste de habilidade total.
        let TotalTestSkil1 = 0;
        let TotalTestSkil2 = 0;

        // Se o bloco for "RETA", o teste é de VELOCIDADE.
        if (block === "RETA") {
            // Calcula a habilidade total somando o dado com o atributo do personagem.
            TotalTestSkil1 = diceResult1 + character1.VELOCIDADE;
            TotalTestSkil2 = diceResult2 + character2.VELOCIDADE;

            // Exibe os resultados dos dados para ambos os jogadores.
            await logRollResult(character1.NOME, "velocidade", diceResult1, character1.VELOCIDADE);
            await logRollResult(character2.NOME, "velocidade", diceResult2, character2.VELOCIDADE);
        }

        // Se o bloco for "CURVA", o teste é de MANOBRABILIDADE.
        if (block === "CURVA") {
            // Calcula a habilidade total somando o dado com o atributo do personagem.
            TotalTestSkil1 = diceResult1 + character1.MANOBRABILIDADE;
            TotalTestSkil2 = diceResult2 + character2.MANOBRABILIDADE;

            // Exibe os resultados dos dados para ambos os jogadores.
            await logRollResult(character1.NOME, "manobrabilidade", diceResult1, character1.MANOBRABILIDADE);
            await logRollResult(character2.NOME, "manobrabilidade", diceResult2, character2.MANOBRABILIDADE);
        }

        // Se o bloco for "CONFRONTO", o teste é de PODER.
        if (block === "CONFRONTO") {
            // Calcula o poder total de cada jogador.
            let powerResult1 = diceResult1 + character1.PODER;
            let powerResult2 = diceResult2 + character2.PODER;

            // Exibe a mensagem de confronto.
            console.log(chalk.yellow.bgGreen.bold(`${character1.NOME} confrontou com ${character2.NOME}!🥊\n`));
            // Exibe os resultados dos dados de poder.
            await logRollResult(character1.NOME, "poder", diceResult1, character1.PODER);
            await logRollResult(character2.NOME, "poder", diceResult2, character2.PODER);

            // Compara os resultados do confronto.
            if (powerResult1 > powerResult2) {
                // Se o jogador 1 vencer, ele ganha um ponto.
                character1.PONTOS++;
                // Se o jogador 2 tiver pontos, ele perde um.
                if (character2.PONTOS > 0) {
                    character2.PONTOS--;
                }
                // Exibe a mensagem de vitória no confronto.
                console.log(chalk.black.bgYellow.bold(`${character1.NOME} venceu o confronto! 🥇 +1 ponto ${character2.NOME} perdeu um ponto 🐢`));
            } else if (powerResult2 > powerResult1) {
                // Se o jogador 2 vencer, ele ganha um ponto.
                character2.PONTOS++;
                // Se o jogador 1 tiver pontos, ele perde um.
                if (character1.PONTOS > 0) {
                    character1.PONTOS--;
                }
                // Exibe a mensagem de vitória no confronto.
                console.log(chalk.black.bgYellow.bold(`${character2.NOME} venceu o confronto! 🥇 +1 ponto ${character1.NOME} perdeu um ponto 🐢`));
            } else {
                // Se houver empate, exibe a mensagem de empate.
                console.log(chalk.yellow.bgRed.bold("Confronto empatado! Nenhum ponto foi perdido"));
            }
        }

        // Compara os resultados dos testes de habilidade (RETA ou CURVA).
        if (TotalTestSkil1 > TotalTestSkil2) {
            // Se o jogador 1 for maior, exibe a mensagem e adiciona um ponto.
            console.log(chalk.blue.bgYellow(`${character1.NOME} marcou um ponto`));
            character1.PONTOS++;
        } else if (TotalTestSkil2 > TotalTestSkil1) {
            // Se o jogador 2 for maior, exibe a mensagem e adiciona um ponto.
            console.log(chalk.blue.bgYellow.bold(`${character2.NOME} marcou um ponto `));
            character2.PONTOS++;
        }
        // Exibe uma linha divisória ao final de cada rodada.
        console.log(chalk.black.bgYellow.bold("\n-------------------------------------------\n"));
    }
}

// Função assíncrona para declarar o vencedor da corrida.
async function declareWinner(character1, character2) {
    // Exibe o título do resultado final.
    console.log(chalk.yellow.bgRed.italic("Resultado Final:"));

    // Exibe a pontuação final do jogador 1.
    console.log(chalk.green.bgYellowBright.italic(`${character1.NOME} : ${character1.PONTOS} ponto(s)`));
    // Exibe a pontuação final do jogador 2.
    console.log(chalk.yellow.bgRed.italic(`${character2.NOME} : ${character2.PONTOS} ponto(s)`));

    // Compara a pontuação final para determinar o vencedor.
    if (character1.PONTOS > character2.PONTOS) {
        // Se o jogador 1 tiver mais pontos, ele vence.
        console.log(chalk.yellow.bgGreen.bold(`\n${character1.NOME} venceu a corrida, Parabéns 🏆`));
    } else if (character2.PONTOS > character1.PONTOS) {
        // Se o jogador 2 tiver mais pontos, ele vence.
        console.log(chalk.yellow.bgGreen.bold(`\n${character2.NOME} venceu a corrida, Parabéns 🏆`));
    } else {
        // Se os pontos forem iguais, a corrida termina em empate.
        console.log(chalk.black.bgBlue.bold("A corrida terminou em empate"));
    }
}

// Função principal auto-invocável (IIFE) que inicia o jogo.
(async function main() {
    // Chama a função para os jogadores escolherem seus personagens.
    const [player1, player2] = await escolherPersonagem();
    // Exibe a mensagem de início da corrida.
    console.log(chalk.green.bgYellow.bold(`🏁🚨 Corrida entre ${player1.NOME} e ${player2.NOME} começando...\n`));

    // Inicia o motor da corrida com os personagens escolhidos.
    await playRaceEngine(player1, player2);
    // Declara o vencedor ao final da corrida.
    await declareWinner(player1, player2);
})();