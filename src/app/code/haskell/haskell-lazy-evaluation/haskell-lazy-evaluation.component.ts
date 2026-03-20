import { Component } from '@angular/core';
import { Highlight } from 'ngx-highlightjs';
import { HeadlineComponent } from '../../../headline/headline.component';
import { TranslateModule } from '@ngx-translate/core';
import { CodeCopyDirective } from '../../code-copy.directive';

@Component({
  selector: 'app-haskell-lazy-evaluation',
  templateUrl: './haskell-lazy-evaluation.component.html',
  imports: [Highlight, CodeCopyDirective, HeadlineComponent, TranslateModule],
})
export class HaskellLazyEvaluationComponent {
  codeLazy = `-- Infinite Liste dank Lazy Evaluation
ones :: [Int]
ones = 1 : ones

take10 :: [Int]
take10 = take 10 ones  -- funktioniert
`;

  codeSpaceLeak = `-- Achtung: Falsches Falten kann zu Space Leaks führen
import Data.List (foldl')

sumSlow :: [Int] -> Int
sumSlow = foldl (+) 0   -- kann viel Speicher binden

sumFast :: [Int] -> Int
sumFast = foldl' (+) 0  -- strikt, wenig Speicher
`;

  constructor() {}
}
