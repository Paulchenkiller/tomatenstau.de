import { Component } from '@angular/core';
import { Highlight } from 'ngx-highlightjs';
import { HeadlineComponent } from '../../../headline/headline.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-haskell-typeclasses',
  templateUrl: './haskell-typeclasses.component.html',
  imports: [Highlight, HeadlineComponent, TranslateModule],
})
export class HaskellTypeclassesComponent {
  codeDerive = `data Color = Red | Green | Blue deriving (Show, Eq, Ord)

main = do
  print Red              -- nutzt Show
  print (Red == Green)   -- nutzt Eq
  print (Red < Blue)     -- nutzt Ord
`;

  codeCustom = `newtype Point = Point (Int, Int)

instance Show Point where
  show (Point (x,y)) = "(" ++ show x ++ "," ++ show y ++ ")"
`;

  constructor() {}
}
