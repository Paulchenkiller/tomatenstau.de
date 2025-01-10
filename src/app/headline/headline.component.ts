import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-headline',
  templateUrl: './headline.component.html',
  styleUrls: ['./headline.component.css'],
})
export class HeadlineComponent {
  @Input() h1: string;
  @Input() subtitle: string;

  constructor() {
    // do nothing
  }
}
