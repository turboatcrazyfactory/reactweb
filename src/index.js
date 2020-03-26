import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'

class Square extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            cssClass: ''
        };
    }

    render() {
        if (this.props.lastClickLocation === this.props.id) {
            this.state.cssClass = 'flash-in';
            setTimeout(() => {
                this.setState({cssClass: ''});
            }, 2000);
        }

        return (
            <button className={"square " + this.state.cssClass}
                    onClick={this.props.onClick}
            >
                {this.props.value}
            </button>
        );
    }
}

class Board extends React.Component {
    renderSquare(i) {
        return (
            <Square id={i} value={this.props.squares[i]}
                    onClick={() => {
                        this.props.handleClick(i);
                    }}
                    lastClickLocation={this.props.lastClickLocation}
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
            history: [
                {
                    squares: Array(9).fill(null)
                }
            ],
            currentStep: 0,
            squares: Array(9).fill(null),
        };
    }

    whoseTurn() {
        return this.state.currentStep % 2 === 0 ? 'X' : 'O';
    }

    mark(i) {
        const newHistory = this.state.history.slice(0, this.state.currentStep + 1);
        const current = newHistory[newHistory.length - 1];
        const newSquares = current.squares.slice();
        if (Game.calculateWinner(newSquares) || newSquares[i]) {
            return;
        }

        const row = Math.ceil((i + 1) / 3);
        const col = (i + 1) % 3 === 0 ? 3 : (i + 1) % 3;

        newSquares[i] = this.whoseTurn();
        this.setState({
            history: newHistory.concat([{squares: newSquares, lastCellChangeLocation: `(${col}, ${row})`, lastClickLocation: i}]),
            currentStep: newHistory.length,
        });
    }

    restart() {
        this.setState({...this.state, currentStep: 0});
    }

    static calculateWinner(squares) {
        const lines = [
            [0, 1, 2],
            [3, 4, 5], // (1,2) | (2,2) | (3,2)
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
        this.setState({...this.state, currentStep: move});
    }

    render() {
        const current = this.state.history[this.state.currentStep];
        const squares = this.state.history[this.state.currentStep].squares;
        const winner = Game.calculateWinner(squares);
        const moves = this.state.history.map((step, move) => {
            const desc = move
                ? `Go to move #${move} ${step.lastCellChangeLocation}`
                : 'Go to game start';

            return (
                <li key={{move}}>
                    <button onClick={() => {
                        this.jumpTo(move);
                    }} style={{fontWeight: move === this.state.currentStep ? 'bold' : ''}}>
                        {desc}
                    </button>
                </li>
            );
        });
        let status = 'Next player: ' + this.whoseTurn();
        let end = false;
        if (winner) {
            status = 'Winner: ' + winner;
            end = true;
        }

        if (squares.indexOf(null) === -1) {
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
                        handleClick={(i) => {
                            this.mark(i);
                        }}
                        lastClickLocation={current.lastClickLocation}

                        squares={squares}
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
