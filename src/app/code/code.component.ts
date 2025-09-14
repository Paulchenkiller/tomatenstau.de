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
    { name: 'Perl', route: 'perl' },
    { name: 'Python', route: 'python' },
    { name: 'Java', route: 'java' },
    { name: 'Prolog', route: 'prolog' },
    { name: 'JavaScript/TypeScript', route: 'javascript' },
    { name: 'Haskell', route: 'haskell' },
  ];

  constructor() {
    // do nothing
  }
}
