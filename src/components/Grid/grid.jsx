import './Grid.css';
import { useState } from "react";
import Card from "../Card/Card";
import isWinner from "../helpers/checkWinner";

function Grid({ numberOfCards }) {
    const [board, setBoard] = useState(Array(numberOfCards).fill(""));
    const [turn, setTurn] = useState(true); // true => O, false => X
    const [winner, setWinner] = useState(null);

    function play(index) {
        if (board[index] !== "" || winner) return; // Prevent overwriting or playing after win

        if (turn === true) {
            board[index] = "O";
        } else {
            board[index] = "X";
        }
        const win = isWinner(board, turn ? "O" : "X");
        if (win) {
            setWinner(win);
        }
        setBoard([...board]);
        setTurn(!turn);
    }

    function resetGame() {
        setBoard(Array(numberOfCards).fill(""));
        setTurn(true);
        setWinner(null);
    }

    return (
        <div className="grid-wrapper">
            {winner && (
                <>
                    <h1 className="turn-highlight">Winner is {winner}</h1>
                    <button className="reset" onClick={resetGame}>Reset Game</button>
                </>
            )}
            <h1 className="turn-highlight">Current turn: {turn ? 'O' : 'X'}</h1>
            <div className="grid">
                {board.map((el, idx) => (
                    <Card key={idx} onPlay={play} player={el} index={idx} />
                ))}
            </div>
        </div>
    );
}

export default Grid;
