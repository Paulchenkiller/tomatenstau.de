import { Component } from '@angular/core';
import { Highlight } from 'ngx-highlightjs';
import { HeadlineComponent } from '../../../headline/headline.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-haskell-monads',
  templateUrl: './haskell-monads.component.html',
  imports: [Highlight, HeadlineComponent, TranslateModule],
})
export class HaskellMonadsComponent {
  codeMaybe = `safeHead :: [a] -> Maybe a
safeHead []    = Nothing
safeHead (x:_) = Just x

main = do
  print (safeHead [])      -- Nothing
  print (safeHead [1,2,3]) -- Just 1
`;

  codeEither = `parseInt :: String -> Either String Int
parseInt s = case reads s of
  [(n, "")] -> Right n
  _          -> Left ("keine Zahl: " ++ s)

main = do
  print (parseInt "42")
  print (parseInt "xx")
`;

  constructor() {}
}
