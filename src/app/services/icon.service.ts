import { Injectable } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';

// Import only specific icons instead of entire icon packs
import { faHome, faEnvelope, faUniversalAccess } from '@fortawesome/free-solid-svg-icons';

import {
  faGithub,
  faLinkedin,
  faXing,
  faGithubSquare,
  faXingSquare,
  faLinkedin as faLinkedinSquare,
} from '@fortawesome/free-brands-svg-icons';

@Injectable({
  providedIn: 'root',
})
export class IconService {
  constructor(private library: FaIconLibrary) {
    this.initializeIcons();
  }

  private initializeIcons(): void {
    // Add only the specific icons we actually use
    this.library.addIcons(
      // Solid icons
      faHome,
      faEnvelope,
      faUniversalAccess,

      // Brand icons
      faGithub,
      faLinkedin,
      faXing,
      faGithubSquare,
      faXingSquare,
      faLinkedinSquare,
    );
  }

  // Method to get available icon information for debugging
  getLoadedIcons(): string[] {
    return [
      'fas:home',
      'fas:envelope',
      'fas:universal-access',
      'fab:github',
      'fab:linkedin',
      'fab:xing',
      'fab:github-square',
      'fab:xing-square',
    ];
  }
}
