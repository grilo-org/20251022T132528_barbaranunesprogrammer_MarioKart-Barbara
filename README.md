# 🏎️ Corrida de Personagens - Mario Kart Estilizado

Este projeto é um jogo de simulação de corrida inspirado em Mario Kart, feito com JavaScript puro e executado no terminal. Dois personagens são escolhidos aleatoriamente e competem em 5 rodadas, passando por diferentes tipos de blocos (reta, curva e confronto).

## ✨ Funcionalidades

- 🎲 Escolha **aleatória** de dois personagens únicos a cada corrida.
- 🔁 Sistema de corrida com **5 rodadas**.
- 🛣️ Tipos de blocos aleatórios:
  - Reta: usa VELOCIDADE
  - Curva: usa MANOBRABILIDADE
  - Confronto: usa PODER
- 🧠 Cálculo de habilidades com rolagem de dado (1 a 6) + atributo.
- 🏆 Sistema de pontuação e **declaração do vencedor** no final.
- 📜 Saída completa no terminal com logs da corrida.

## 👩‍💻 Modificações feitas por mim

- Refatoração da função `escolherPersonagem()` para evitar repetição de personagens.
- Melhoria na função `getRandomBlock()` usando `switch(true)`.
- Separação da lógica de exibição dos resultados (`logRollResult`) para clareza e reutilização.
- Organização do código com funções assíncronas e comentários.
- Adição de console logs com emojis para tornar o jogo mais divertido e visualmente agradável.
- Foi adicionada uma nova regra de confronto:
Quem vence o bloco de confronto (debate) ganha um ponto, e o oponente perde um ponto (se tiver).

## 📁 Estrutura do Projeto

```
📦 corrida-mario-js
┣📁src/
 ┣ 📄 index.js # Código principal da simulação
┣ 📄 README.md # Este arquivo
```

## 🚀 Como rodar

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/corrida-mario-js.git
   ```
   2.Acesse a pasta do projeto:
   ```
   cd corrida-mario-js
   ```
   3.Execute com Node.js:
   ```
   node src/index.js
   ```
   💡 Certifique-se de ter o Node.js instalado em sua máquina.
## 📄 Regras do Jogo

- O jogo acontece em **5 rodadas**.
- Em cada rodada, é sorteado um **bloco aleatório**:
  - **RETA**: soma do dado + velocidade.
  - **CURVA**: soma do dado + manobrabilidade.
  - **CONFRONTO**: soma do dado + poder.
- O personagem com maior resultado na rodada **marca 1 ponto**.
- No **confronto**, quem vencer **ganha 1 ponto** e o outro perde 1 (caso tenha).
- Ao final das 5 rodadas, o personagem com mais pontos **vence a corrida**.


👾 Personagens disponíveis
```
## 🧙‍♂️ Personagens e Atributos

| Nome    | Velocidade | Manobrabilidade | Poder |
|---------|------------|------------------|--------|
| Mario   |     4      |        3         |   3    |
| Luigi   |     3      |        4         |   4    |
| Peach   |     5      |        4         |   2    |
| Bowser  |     2      |        2         |   5    |
| Yoshi   |     4      |        5         |   2    |

```
📌 Observações
Cada tipo de bloco da pista testa uma habilidade diferente.

No confronto, o personagem vencedor ganha 1 ponto e o perdedor perde 1 (se tiver).

O personagem com mais pontos no final é o vencedor.

📷 Exemplo de Saída no Terminal

No confronto, o personagem vencedor ganha 1 ponto e o perdedor perde 1 (se tiver).

O personagem com mais pontos no final é o vencedor.
```
🏁🚨 Corrida entre Mario e Yoshi começando...

🏁 Rodada 1
Bloco: CURVA
Mario 🎲 rolou um dado de manobrabilidade 4 + 3 = 7
Yoshi 🎲 rolou um dado de manobrabilidade 2 + 5 = 7
Confronto empatado ! Nenhum ponto foi perdido
__________________________________
```
📃 Licença
```MIT License

Copyright (c) 2025 Barbara Elen

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights   
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell      
copies of the Software, and to permit persons to whom the Software is          
furnished to do so, subject to the following conditions:                       

The above copyright notice and this permission notice shall be included in     
all copies or substantial portions of the Software.                            

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR     
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,       
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE    
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER        
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, 
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN     
THE SOFTWARE.
``` 



