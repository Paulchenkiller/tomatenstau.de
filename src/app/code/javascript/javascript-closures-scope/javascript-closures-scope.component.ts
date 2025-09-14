import { Component } from '@angular/core';
import { Highlight } from 'ngx-highlightjs';
import { HeadlineComponent } from '../../../headline/headline.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-javascript-closures-scope',
  templateUrl: './javascript-closures-scope.component.html',
  imports: [Highlight, HeadlineComponent, TranslateModule],
})
export class JavascriptClosuresScopeComponent {
  codeVar = `// Erwartet oft 0..4, gibt aber 5x 5 aus
for (var i = 0; i < 5; i++) {
  setTimeout(() => console.log(i), 0); // var ist funktions-, nicht block-skopiert
}`;

  codeLet = `// Lösung: let (Blockscope) oder IIFE/Closure
for (let i = 0; i < 5; i++) {
  setTimeout(() => console.log(i), 0); // 0 1 2 3 4
}`;

  codeClosure = `function makeAdder(x) {
  return function(y) {
    return x + y; // x lebt in der Closure weiter
  }
}

const add5 = makeAdder(5);
console.log(add5(3)); // 8`;

  constructor() {}
}
