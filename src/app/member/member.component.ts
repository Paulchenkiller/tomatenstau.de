import { Component, Input, OnInit } from '@angular/core';
import { Member } from './member';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css'],
  standalone: false,
})
export class MemberComponent implements OnInit {
  @Input() person: Member;

  constructor() {}

  ngOnInit(): void {}
}
