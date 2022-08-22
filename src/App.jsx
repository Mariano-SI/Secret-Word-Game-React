//CSS
import './App.css';
//REACT
import { useCallback, useEffect, useState } from 'react';
//Dados
import { wordsList } from './data/words';
//Componentes
import StartScreen from './components/StartScreen'
import Game from './components/Game';
import GameEnd from './components/GameEnd';

const stages = [
  {id:1, name:"start"},
  {id:2, name:"game"},
  {id:3, name:"end"}
]

function App() {
  const[gameStage, setGameStage] = useState(stages[0].name);
  const[words] = useState(wordsList);
  
  //Funçao que é executada no evento de clique, ela faz o parametro da  renderização condicional mudar, assim a segunda tela, a do jogo, é carregada.
  const startGame = ()=>{
    setGameStage(stages[1].name)
  }

  //Processa a letra no input
  const verifyLetter = () =>{
    setGameStage(stages[2].name)
  }

  const retry = ()=>{
    setGameStage(stages[0].name)
  }
  return (
    <div className="App">
     {/* controlando as telas do jogo */}
     {gameStage === "start" && <StartScreen startGame={startGame}/>}
     {gameStage === "game" && <Game verifyLetter={verifyLetter}/>}
     {gameStage === "end" && <GameEnd retry={retry}/>}
    </div>
  )
}

export default App
