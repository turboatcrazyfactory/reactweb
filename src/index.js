import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'

function Square(props) {
    return (
        <button className="square"
                onClick={props.onClick}
        >
            {props.value}
        </button>
    );
}

class Board extends React.Component {
    renderSquare(i) {
        return (
            <Square value={this.props.squares[i]}
                    onClick={() => {
                        this.props.handleSquareClick(i);
                    }}
            />
        );
    }

    render() {
        return (
            <div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

function RestartButton(props) {
    return (
        <a href="#" onClick={props.onClick} style={{display: props.hidden ? 'none' : ''}}>Restart</a>
    );
}


class Game extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            history: [],
            currentTurn: 'X',
            squares: Array(9).fill(null),
        };
    }

    mark(i) {
        const newSquares = this.state.squares.slice();
        const newHistory = this.state.history.slice();
        const newCurrentTurn = this.state.currentTurn === 'X' ? 'O' : 'X';
        if (Game.calculateWinner(newSquares) || newSquares[i]) {
            return;
        }

        newSquares[i] = this.state.currentTurn;
        newHistory.push({squares: newSquares, currentTurn: newCurrentTurn});
        this.setState({
            squares: newSquares,
            history: newHistory,
            currentTurn: newCurrentTurn,
        });
    }

    restart() {
        this.setState({...this.state, currentTurn: 'X', squares: Array(9).fill(null)});
    }

    static calculateWinner(squares) {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }

        return null;
    }

    jumpTo(move) {
        const targetMove = this.state.history[move];
        this.setState({...this.state, ...targetMove});
    }

    render() {
        const winner = Game.calculateWinner(this.state.squares);
        const moves = this.state.history.map((step, move) => {
            const desc = move
                ? `Go to move #${move}`
                : 'Go to game start';

            return (
                <li>
                    <button onClick={() => {
                        this.jumpTo(move);
                    }}>
                        {desc}
                    </button>
                </li>
            );
        });
        let status = 'Next player: ' + this.state.currentTurn;
        let end = false;
        if (winner) {
            status = 'Winner: ' + winner;
            end = true;
        }

        if (this.state.squares.indexOf(null) === -1) {
            end = true;
        }

        return (
            <div className="game">
                <div className="game-board">
                    <RestartButton onClick={() => {
                        this.restart();
                    }} hidden={!end}/>
                    <Board
                        handleChange={(squares) => {
                            if (!squares) {
                                return;
                            }
                            this.recordHistory(squares);
                        }}
                        handleSquareClick={(i) => {
                            this.mark(i);
                        }}

                        squares={this.state.squares}
                    />
                </div>
                <div className="game-info">
                    <div className="status">{status}</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }
}

// ========================================

ReactDOM.render(
    <Game/>,
    document.getElementById('root')
);
