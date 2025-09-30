import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
  standalone: true,
  imports: [RouterOutlet, TranslateModule],
})
export class ContentComponent {
  constructor(@Inject(PLATFORM_ID) private platformId: object) {
    // do nothing
  }

  onActivate(_event: any): void {
    // Only run scroll animation in browser environment
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const scrollToTop = window.setInterval(() => {
      const pos = window.pageYOffset;
      if (pos > 0) {
        window.scrollTo(0, pos - 20); // how far to scroll on each step
      } else {
        window.clearInterval(scrollToTop);
      }
    }, 16);
  }
}
