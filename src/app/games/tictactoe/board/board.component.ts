import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-board',
    templateUrl: './board.component.html',
    styleUrls: ['./board.component.css'],
    standalone: false
})
export class BoardComponent implements OnInit {
  squares: ('X' | 'O')[];
  winnerSquares: boolean[];
  xIsNext: boolean;
  winner: 'X' | 'O';

  constructor() {}

  ngOnInit(): void {
    this.newGame();
  }

  newGame(): void {
    this.squares = Array(9).fill(null);
    this.winnerSquares = Array(9).fill(null);
    this.winner = null;
    this.xIsNext = true;
  }

  get player(): 'X' | 'O' {
    return this.xIsNext ? 'X' : 'O';
  }

  makeMove(idx: number): void {
    if (!this.squares[idx] && !this.winner) {
      this.squares.splice(idx, 1, this.player);
      this.xIsNext = !this.xIsNext;
    }

    this.winner = this.calculateWinner();
  }

  calculateWinner(): 'X' | 'O' {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        this.squares[a] &&
        this.squares[a] === this.squares[b] &&
        this.squares[a] === this.squares[c]
      ) {
        console.log(i);
        console.log(lines[i]);
        this.winnerSquares[a] = true;
        this.winnerSquares[b] = true;
        this.winnerSquares[c] = true;
        return this.squares[a];
      }
    }
    return null;
  }
}
