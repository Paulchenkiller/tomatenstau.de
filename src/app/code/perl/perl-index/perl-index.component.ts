import { Component } from '@angular/core';
import { HeadlineComponent } from '../../../headline/headline.component';
import { Highlight } from 'ngx-highlightjs';

@Component({
  selector: 'app-perl-index',
  templateUrl: './perl-index.component.html',
  styleUrls: ['./perl-index.component.css'],
  imports: [HeadlineComponent, Highlight],
})
export class PerlIndexComponent {
  helloWorld = `#!/usr/bin/perl\nuse strict;\nprint "Hello World";`;

  constructor() {
    // do nothing
  }
}
