import { Component, OnInit } from '@angular/core';
import { HeadlineComponent } from '../../../headline/headline.component';
import { RouterLink } from '@angular/router';
import { Highlight } from 'ngx-highlightjs';

@Component({
  selector: 'app-prolog-index',
  templateUrl: './prolog-index.component.html',
  styleUrls: ['./prolog-index.component.css'],
  imports: [HeadlineComponent, RouterLink, Highlight],
})
export class PrologIndexComponent implements OnInit {
  helloWorld = `write('Hello World').`;

  constructor() {
    // do nothing
  }

  ngOnInit(): void {}
}
