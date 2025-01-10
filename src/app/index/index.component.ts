import { Component } from '@angular/core';
import { HeadlineComponent } from '../headline/headline.component';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
  imports: [HeadlineComponent],
})
export class IndexComponent {
  constructor() {
    // do nothing
  }
}
