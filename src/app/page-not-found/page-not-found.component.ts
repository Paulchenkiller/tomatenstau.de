import { Component } from '@angular/core';
import { HeadlineComponent } from '../headline/headline.component';
import { TranslateModule } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';
import { NgForOf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  imports: [HeadlineComponent, TranslateModule, RouterLink, NgForOf, FormsModule],
})
export class PageNotFoundComponent {
  query = '';
  topics = [
    { name: 'NAV.CODE', route: '/code' },
    { name: 'NAV.PERL', route: '/code/perl' },
    { name: 'NAV.PYTHON', route: '/code/python' },
    { name: 'NAV.JAVA', route: '/code/java' },
    { name: 'NAV.JAVASCRIPT', route: '/code/javascript' },
    { name: 'NAV.HASKELL', route: '/code/haskell' },
    { name: 'NAV.PROLOG', route: '/code/prolog' },
  ];

  get filteredTopics() {
    const q = this.query.trim().toLowerCase();
    if (!q) {
      return this.topics;
    }
    return this.topics.filter((t) => t.name.toLowerCase().includes(q));
  }
}
