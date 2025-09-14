import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeadlineComponent } from '../headline/headline.component';
import { NgForOf } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-code',
  templateUrl: './code.component.html',
  imports: [RouterLink, HeadlineComponent, NgForOf, TranslateModule],
})
export class CodeComponent {
  codeComponents = [
    { name: 'NAV.PERL', route: 'perl' },
    { name: 'NAV.PYTHON', route: 'python' },
    { name: 'NAV.JAVA', route: 'java' },
    { name: 'NAV.PROLOG', route: 'prolog' },
    { name: 'NAV.JAVASCRIPT', route: 'javascript' },
    { name: 'NAV.HASKELL', route: 'haskell' },
  ];

  constructor() {
    // do nothing
  }
}
