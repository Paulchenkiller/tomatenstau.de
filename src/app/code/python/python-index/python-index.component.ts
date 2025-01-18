import { Component } from '@angular/core';
import { Highlight } from 'ngx-highlightjs';
import { HeadlineComponent } from '../../../headline/headline.component';

@Component({
  selector: 'app-python-index',
  templateUrl: './python-index.component.html',
  imports: [Highlight, HeadlineComponent],
})
export class PythonIndexComponent {
  helloWorld = `#!/usr/bin/python\nprint "Hello World";`;

  constructor() {
    // do nothing
  }
}
