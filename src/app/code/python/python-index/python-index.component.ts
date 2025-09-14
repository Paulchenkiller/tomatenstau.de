import { Component } from '@angular/core';
import { Highlight } from 'ngx-highlightjs';
import { HeadlineComponent } from '../../../headline/headline.component';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-python-index',
  templateUrl: './python-index.component.html',
  imports: [Highlight, HeadlineComponent, RouterLink, TranslateModule],
})
export class PythonIndexComponent {
  helloWorld = `#!/usr/bin/python\nprint "Hello World";`;

  constructor() {
    // do nothing
  }
}
