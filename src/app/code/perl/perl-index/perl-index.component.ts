import { Component } from '@angular/core';
import { HeadlineComponent } from '../../../headline/headline.component';
import { RouterLink } from '@angular/router';
import { Highlight } from 'ngx-highlightjs';

@Component({
  selector: 'app-perl-index',
  templateUrl: './perl-index.component.html',
  imports: [HeadlineComponent, Highlight, RouterLink],
})
export class PerlIndexComponent {
  helloWorld = `#!/usr/bin/perl\nuse strict;\nprint "Hello World";`;

  constructor() {
    // do nothing
  }
}
