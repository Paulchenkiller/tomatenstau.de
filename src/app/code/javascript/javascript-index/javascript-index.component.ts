import { Component } from '@angular/core';
import { Highlight } from 'ngx-highlightjs';
import { HeadlineComponent } from '../../../headline/headline.component';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-javascript-index',
  templateUrl: './javascript-index.component.html',
  imports: [Highlight, HeadlineComponent, RouterLink, TranslateModule],
})
export class JavascriptIndexComponent {
  helloWorldJs = `console.log('Hello World');`;
  helloWorldTs = `function greet(name: string): void {\n  console.log('Hello ' + name);\n}\n\ngreet('World');`;

  constructor() {
    // do nothing
  }
}
