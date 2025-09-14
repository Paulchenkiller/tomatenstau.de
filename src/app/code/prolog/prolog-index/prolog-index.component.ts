import { Component } from '@angular/core';
import { HeadlineComponent } from '../../../headline/headline.component';
import { RouterLink } from '@angular/router';
import { Highlight } from 'ngx-highlightjs';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-prolog-index',
  templateUrl: './prolog-index.component.html',
  imports: [HeadlineComponent, RouterLink, Highlight, TranslateModule],
})
export class PrologIndexComponent {
  helloWorld = `write('Hello World').`;

  constructor() {
    // do nothing
  }
}
