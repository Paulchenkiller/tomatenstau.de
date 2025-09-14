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
    { name: 'Code', route: '/code' },
    { name: 'Perl', route: '/code/perl' },
    { name: 'Python', route: '/code/python' },
    { name: 'Java', route: '/code/java' },
    { name: 'JavaScript/TypeScript', route: '/code/javascript' },
    { name: 'Haskell', route: '/code/haskell' },
    { name: 'Prolog', route: '/code/prolog' },
  ];

  get filteredTopics() {
    const q = this.query.trim().toLowerCase();
    if (!q) {
      return this.topics;
    }
    return this.topics.filter((t) => t.name.toLowerCase().includes(q));
  }
}
