import {Component, OnInit} from '@angular/core';
import {Member} from '../member/member';

@Component( {
    selector: 'app-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.css'],
    standalone: false
} )
export class AboutComponent implements OnInit {
  persons: Array<Member> = [{
    jobTitle: 'asdf',
    name    : 'string',
    picture : 'assets/images/team/member01-k.jpg',
    slogan  : 'string',
    social  : [{icon: 'facebook', link: 'asdfs'}]
  }, {
    jobTitle: 'asdf',
    name    : 'string',
    picture : 'assets/images/team/member03-k.jpg',
    slogan  : 'string',
    social  : [{icon: 'facebook', link: 'asdfs'}]
  }, {
    jobTitle: 'asdf',
    name    : 'string',
    picture : 'assets/images/team/member04-k.jpg',
    slogan  : 'string',
    social  : [{icon: 'facebook', link: 'asdfs'}]
  }, {
    jobTitle: 'asdf',
    name    : 'string',
    picture : 'assets/images/team/member05-k.jpg',
    slogan  : 'string',
    social  : [{icon: 'facebook', link: 'asdfs'}]
  }];

  constructor() {
  }

  ngOnInit(): void {
  }
}
