import {Component, Input, OnInit} from '@angular/core';

@Component( {
    selector: 'app-headline',
    templateUrl: './headline.component.html',
    styleUrls: ['./headline.component.css'],
    standalone: false
} )
export class HeadlineComponent implements OnInit {
  @Input() h1: string;
  @Input() subtitle: string;

  constructor() {
  }

  ngOnInit(): void {
  }
}
