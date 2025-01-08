import { Component, OnInit } from '@angular/core';
import { HeadlineComponent } from '../headline/headline.component';
import { Highlight } from 'ngx-highlightjs';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  imports: [HeadlineComponent, Highlight],
})
export class ContactComponent implements OnInit {
  code = `#!/usr/bin/perl
use strict;
print "Hello World!"; `;

  constructor() {
    // do nothing
  }

  ngOnInit(): void {}
}
