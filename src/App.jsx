//CSS
import "./App.css";
//REACT
import { useCallback, useEffect, useState } from "react";
//Dados
import { wordsList } from "./data/words";
//Componentes
import StartScreen from "./components/StartScreen";
import Game from "./components/Game";
import GameEnd from "./components/GameEnd";

const stages = [
  { id: 1, name: "start" },
  { id: 2, name: "game" },
  { id: 3, name: "end" },
];

const numTentativas = 3;

function App() {
  const [gameStage, setGameStage] = useState(stages[0].name);
  const [words] = useState(wordsList);

  //Controlar carregamentos das palavras, usarei na função startGame
  const [pickedWord, setPickedWord] = useState("");
  const [pickedCategory, setPickedCategory] = useState("");
  const [letters, setLetters] = useState([]);

  const [letrasAdivinhadas, setLetrasAdivinhadas] = useState([]);
  const [letrasErradas, setLetrasErradas] = useState([]);
  const [tentativas, setTentativas] = useState(numTentativas); //nmumero de tentativas
  const [pontuacao, setPontuacao] = useState(0);

  const pickWordAndCategory = useCallback(() => {
    //random category
    const categories = Object.keys(words);
    const category = categories[Math.floor(Math.random() * categories.length)];
    //console.log(category);

    //random word in picked category
    const word =
      words[category][Math.floor(Math.random() * words[category].length)];
      //console.log(word);

    return { word, category };
  },[words]);
  //Funçao que é executada no evento de clique, ela faz o parametro da  renderização condicional mudar, assim a segunda tela, a do jogo, é carregada.
  const startGame = useCallback(() => {

    clearLetterStates();

    //pick word and category
    const { word, category } = pickWordAndCategory(); //destruturing no retorno da função
    //console.log(word, category);

    //create an array of letters of word
    let wordLetters = word.split("");
    wordLetters = wordLetters.map((l) => l.toLowerCase());
    //console.log(wordLetters);

    //setar states
    setPickedWord(word);
    setPickedCategory(category);
    setLetters(wordLetters);

    setGameStage(stages[1].name);
  }, [pickWordAndCategory]);

  //Processa a letra no input
  const verifyLetter = (letter) => {
    //padronizar para minusculo(padrão das palavras vindas do objeto)
    const normalizedLetter = letter.toLowerCase();
    //console.log(normalizedLetter);

    //checar se a letra ja foi utilizada antes
    if (
      letrasAdivinhadas.includes(normalizedLetter) ||
      letrasErradas.includes(normalizedLetter)
    ) {
      return;
    }

    //incluindo a letra em seu array certo após a jogada
    if (letters.includes(normalizedLetter)) {
      setLetrasAdivinhadas((actualGuessedLetters) => [
        ...actualGuessedLetters,
        letter,
      ]);
    } else {
      setLetrasErradas((actualWrongLetters) => [
        ...actualWrongLetters,
        normalizedLetter,
      ]);

      setTentativas((tentativas) => tentativas - 1); //diminuo as tentativas
    }
    //console.log(`Letras adivinhadas: ${letrasAdivinhadas}`);
    //console.log(`Letras erradas: ${letrasErradas}`);
  };

  const clearLetterStates = () => {
    setLetrasAdivinhadas([]);
    setLetrasErradas([]);
  };
  //Encerrando e resetando o game automaticamente, useEffect monitora uma variavel, e aplicamos logica nisso
  //condição de derrota
  useEffect(() => {
    if (tentativas <= 0) {
      clearLetterStates();
      setGameStage(stages[2].name);
    }
  }, [tentativas]);

  //condição de vitória
  useEffect(() => {
    const letrasUnicas = [...new Set(letters)];
    //console.log(letrasUnicas);

    //letrasAdivinhadas não repete elementos, nem letras unicas, então se seus tamanhos são iguais é porque seus elementos batem, entao:

    if (letrasUnicas.length === letrasAdivinhadas.length && gameStage === stages[1].name) {
      //acrescenta pontos
      setPontuacao((actualScore)=>actualScore+=100);
      //gera nova palavra
     
      startGame();
    }
  }, [letrasAdivinhadas, startGame, letters]);

  const retry = () => {
    setPontuacao(0);
    setTentativas(numTentativas);
    setGameStage(stages[0].name);
  };
  return (
    <div className="App">
      {/* controlando as telas do jogo */}
      {gameStage === "start" && <StartScreen startGame={startGame} />}
      {gameStage === "game" && (
        <Game
          verifyLetter={verifyLetter}
          pickedWord={pickedWord}
          pickedCategory={pickedCategory}
          letters={letters}
          letrasAdivinhadas={letrasAdivinhadas}
          letrasErradas={letrasErradas}
          tentativas={tentativas}
          pontuacao={pontuacao}
        />
      )}
      {gameStage === "end" && <GameEnd retry={retry} pontuacao={pontuacao} />}
    </div>
  );
}

export default App;
