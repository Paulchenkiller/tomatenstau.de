import { Component } from '@angular/core';
import { Highlight } from 'ngx-highlightjs';
import { HeadlineComponent } from '../../../headline/headline.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-javascript-hoisting-tdz',
  templateUrl: './javascript-hoisting-tdz.component.html',
  imports: [Highlight, HeadlineComponent, TranslateModule],
})
export class JavascriptHoistingTdzComponent {
  codeHoist = `console.log(a); // undefined (var wird „gehoistet“)
var a = 1;`;

  codeTDZ = `console.log(b); // ReferenceError: Cannot access 'b' before initialization
let b = 2; // b liegt bis hier in der TDZ (Temporal Dead Zone)`;

  constructor() {}
}
