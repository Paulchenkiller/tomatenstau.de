import { Component } from '@angular/core';
import { HeadlineComponent } from '../headline/headline.component';
import { TranslateModule } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  imports: [HeadlineComponent, TranslateModule, RouterLink],
})
export class PageNotFoundComponent {}
