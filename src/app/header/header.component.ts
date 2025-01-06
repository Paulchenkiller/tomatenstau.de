import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  standalone: false,
})
export class HeaderComponent implements OnInit {
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

  constructor(private router: Router) {
    this.router.events.subscribe((__) => {
      this.menu = false;
    });
  }

  clickEvent(): void {
    this.nav = !this.nav;
  }

  ngOnInit(): void {}
}
