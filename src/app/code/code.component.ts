import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeadlineComponent } from '../headline/headline.component';
import { NgForOf } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

interface CodeTopic {
  name: string;
  route: string;
  fallback: string;
}

@Component({
  selector: 'app-code',
  templateUrl: './code.component.html',
  imports: [RouterLink, HeadlineComponent, NgForOf, TranslateModule],
})
export class CodeComponent {
  codeComponents: CodeTopic[] = [
    { name: 'NAV.PERL', route: 'perl', fallback: 'Perl' },
    { name: 'NAV.PYTHON', route: 'python', fallback: 'Python' },
    { name: 'NAV.JAVA', route: 'java', fallback: 'Java' },
    { name: 'NAV.PROLOG', route: 'prolog', fallback: 'Prolog' },
    { name: 'NAV.JAVASCRIPT', route: 'javascript', fallback: 'JavaScript/TypeScript' },
    { name: 'NAV.HASKELL', route: 'haskell', fallback: 'Haskell' },
  ];
}
