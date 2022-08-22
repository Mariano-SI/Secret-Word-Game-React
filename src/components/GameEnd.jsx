import './GameEnd.css';

const GameEnd = ({retry}) =>{
    return(
        <div>
            <button onClick={retry}>Jogar novamente</button>
        </div>
    );
};

export default GameEnd;