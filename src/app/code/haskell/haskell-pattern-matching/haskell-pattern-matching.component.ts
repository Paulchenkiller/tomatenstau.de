import { Component } from '@angular/core';
import { Highlight } from 'ngx-highlightjs';
import { HeadlineComponent } from '../../../headline/headline.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-haskell-pattern-matching',
  templateUrl: './haskell-pattern-matching.component.html',
  imports: [Highlight, HeadlineComponent, TranslateModule],
})
export class HaskellPatternMatchingComponent {
  codeMatch = `data List a = Nil | Cons a (List a)

len :: List a -> Int
len Nil         = 0
len (Cons _ xs) = 1 + len xs
`;

  codeGuards = `bmi :: Double -> String
bmi x
  | x < 18.5  = "Untergewicht"
  | x < 25.0  = "Normal"
  | x < 30.0  = "Übergewicht"
  | otherwise = "Adipositas"
`;

  constructor() {}
}
