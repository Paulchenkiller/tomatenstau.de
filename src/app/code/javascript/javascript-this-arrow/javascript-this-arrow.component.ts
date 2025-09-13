import { Component } from '@angular/core';
import { Highlight } from 'ngx-highlightjs';
import { HeadlineComponent } from '../../../headline/headline.component';

@Component({
  selector: 'app-javascript-this-arrow',
  templateUrl: './javascript-this-arrow.component.html',
  imports: [Highlight, HeadlineComponent],
})
export class JavascriptThisArrowComponent {
  codeThis = `const obj = {
  x: 42,
  normal() { return this.x; },
  arrow: () => { return (this as any).x; }
};

console.log(obj.normal()); // 42
console.log(obj.arrow());  // undefined – Arrow hat kein eigenes this`;

  codeBind = `class Counter {
  count = 0;
  inc() { this.count++; }
}

const c = new Counter();
const fn = c.inc; // loses this
// fn(); // TypeError: cannot read properties of undefined

const bound = c.inc.bind(c);
bound(); // ok`;

  constructor() {}
}
