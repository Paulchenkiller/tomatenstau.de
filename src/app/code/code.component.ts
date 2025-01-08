import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeadlineComponent } from '../headline/headline.component';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-code',
  templateUrl: './code.component.html',
  styleUrls: ['./code.component.css'],
  imports: [RouterLink, HeadlineComponent, NgForOf],
})
export class CodeComponent implements OnInit {
  codeComponents = [{ name: 'Perl' }, { name: 'Python' }, { name: 'Prolog' }];

  constructor() {
    // do nothing
  }

  ngOnInit(): void {}
}
