import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-prolog-hanoi',
  templateUrl: './prolog-hanoi.component.html',
  styleUrls: ['./prolog-hanoi.component.css'],
  standalone: false,
})
export class PrologHanoiComponent implements OnInit {
  languages = [];
  code1 = `   |        |         |\n  xxx       |         |\n xxxxx      |         |\nxxxxxxx     |         |`;
  code11 = `   |         |    |   \n   |         |   xxx  \n   |         |  xxxxx \n   |         | xxxxxxx`;
  code2 = `move(1,X,Y,_) :-\n  write('Move top disk from '),\n  write(X),\n  write(' to '),\n  write(Y),\n  nl.\nmove(N,X,Y,Z) :-\n  N>1,\n  M is N-1,\n  move(M,X,Z,Y),\n  move(1,X,Y,_),\n  move(M,Z,Y,X).`;
  code3 = `move(3,left,right,center).`;
  code4 = `Move top disk from left to right\nMove top disk from left to center\nMove top disk from right to center\nMove top disk from left to right\nMove top disk from center to left\nMove top disk from center to right\nMove top disk from left to right`;

  constructor() {}

  ngOnInit(): void {}
}
