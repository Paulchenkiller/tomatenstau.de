import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
  standalone: false,
})
export class CardComponent implements OnInit {
  @Input() header: string;
  @Input() content: string;

  constructor() {}

  ngOnInit(): void {}
}
