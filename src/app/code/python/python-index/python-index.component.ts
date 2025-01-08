import { Component, OnInit } from '@angular/core';
import { Highlight } from 'ngx-highlightjs';
import { HeadlineComponent } from '../../../headline/headline.component';

@Component({
  selector: 'app-python-index',
  templateUrl: './python-index.component.html',
  styleUrls: ['./python-index.component.css'],
  imports: [Highlight, HeadlineComponent],
})
export class PythonIndexComponent implements OnInit {
  helloWorld = `#!/usr/bin/python\nprint "Hello World";`;

  constructor() {
    // do nothing
  }

  ngOnInit(): void {}
}
