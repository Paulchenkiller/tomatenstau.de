import { Component } from '@angular/core';
import { HeadlineComponent } from '../headline/headline.component';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  imports: [HeadlineComponent],
})
export class PageNotFoundComponent {
  constructor() {
    // do nothing
  }
}
