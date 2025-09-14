import { Component } from '@angular/core';
import { Highlight } from 'ngx-highlightjs';
import { HeadlineComponent } from '../../../headline/headline.component';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-haskell-index',
  templateUrl: './haskell-index.component.html',
  imports: [Highlight, HeadlineComponent, RouterLink, TranslateModule],
})
export class HaskellIndexComponent {
  helloWorld = `main = putStrLn "Hello World"`;

  constructor() {
    // do nothing
  }
}
