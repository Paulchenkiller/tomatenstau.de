import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-square',
  templateUrl: './square.component.html',
  styleUrls: ['./square.component.css'],
  standalone: false,
})
export class SquareComponent implements OnInit {
  @Input() value: 'X' | 'O';
  @Input() winnerSquare: boolean;

  constructor() {}

  ngOnInit(): void {}
}
