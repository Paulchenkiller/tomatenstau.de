import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-code',
  templateUrl: './code.component.html',
  styleUrls: ['./code.component.css'],
  standalone: false,
})
export class CodeComponent implements OnInit {
  codeComponents = [{ name: 'Perl' }, { name: 'Python' }, { name: 'Prolog' }];

  constructor() {}

  ngOnInit(): void {}
}
