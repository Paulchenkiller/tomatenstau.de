import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {
  FaIconComponent,
  FaIconLibrary,
} from '@fortawesome/angular-fontawesome';
import { NgForOf } from '@angular/common';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  imports: [RouterLink, FaIconComponent, NgForOf],
})
export class HeaderComponent {
  socialMedia = [
    { icon: ['fab', 'github'], link: 'https://github.com/Paulchenkiller' },
    {
      icon: ['fab', 'linkedin'],
      link: 'https://www.linkedin.com/in/meik-geldmacher',
    },
    {
      icon: ['fab', 'xing'],
      link: 'https://www.xing.com/profile/Meik_Geldmacher',
    },
  ];
  nav: any;
  menu = false;

  constructor(
    private router: Router,
    private library: FaIconLibrary,
  ) {
    this.library.addIconPacks(fas, fab);
    this.router.events.subscribe(() => {
      this.menu = false;
    });
  }

  clickEvent(): void {
    this.nav = !this.nav;
  }
}
