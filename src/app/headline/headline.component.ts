import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-headline',
  templateUrl: './headline.component.html',
  styleUrls: ['./headline.component.css'],
})
export class HeadlineComponent implements OnInit {
  @Input() h1: string;
  @Input() subtitle: string;

  constructor() {
    // do nothing
  }

  ngOnInit(): void {}
}
