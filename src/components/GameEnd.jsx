import './GameEnd.css';

const GameEnd = ({retry, pontuacao}) =>{
    return(
        <div>
            <h1>Fim de Jogo!</h1>
            <h2>A sua pontuação foi: <span>{pontuacao}</span></h2>
            <button onClick={retry}>Jogar novamente</button>
        </div>
    );
};

export default GameEnd;