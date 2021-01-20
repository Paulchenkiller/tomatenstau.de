import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {
  gamesComponents = [
    {name: 'TicTacToe', link: 'ttt'},
    {name: 'Memory', link: 'memory'}
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
