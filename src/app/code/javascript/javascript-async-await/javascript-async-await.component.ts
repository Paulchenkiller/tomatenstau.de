import { Component } from '@angular/core';
import { Highlight } from 'ngx-highlightjs';
import { HeadlineComponent } from '../../../headline/headline.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-javascript-async-await',
  templateUrl: './javascript-async-await.component.html',
  imports: [Highlight, HeadlineComponent, TranslateModule],
})
export class JavascriptAsyncAwaitComponent {
  codeBad = `async function run() {
  const results = [];
  // nacheinander statt parallel – langsamer
  results.push(await fetch('/a'));
  results.push(await fetch('/b'));
  results.push(await fetch('/c'));
  return results;
}`;

  codeGood = `async function run() {
  const [a,b,c] = await Promise.all([
    fetch('/a'),
    fetch('/b'),
    fetch('/c')
  ]);
  return [a,b,c];
}`;

  codeError = `async function f() {
  try {
    const res = await fetch('/x');
    return await res.json();
  } catch (e) {
    console.error('Fehler', e);
  }
}`;

  constructor() {}
}
