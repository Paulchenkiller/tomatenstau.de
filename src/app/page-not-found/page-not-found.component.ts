import { Component, OnInit } from '@angular/core';
import { HeadlineComponent } from '../headline/headline.component';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css'],
  imports: [HeadlineComponent],
})
export class PageNotFoundComponent implements OnInit {
  constructor() {
    // do nothing
  }

  ngOnInit(): void {}
}
