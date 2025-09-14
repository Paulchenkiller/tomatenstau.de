import { Component } from '@angular/core';
import { Highlight } from 'ngx-highlightjs';
import { HeadlineComponent } from '../../../headline/headline.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-haskell-purity-io',
  templateUrl: './haskell-purity-io.component.html',
  imports: [Highlight, HeadlineComponent, TranslateModule],
})
export class HaskellPurityIoComponent {
  codeIo = `-- main hat den Typ IO (), Nebenwirkungen sind im IO-Kontext
main :: IO ()
main = do
  putStrLn "Wie heißt du?"
  name <- getLine
  putStrLn ("Hallo " ++ name)`;

  codePure = `-- reine Funktion: gleicher Input -> gleicher Output, keine Effekte
hello :: String -> String
hello name = "Hallo " ++ name`;

  constructor() {}
}
