import {Component, OnInit} from '@angular/core';

@Component( {
  selector   : 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls  : ['./contact.component.css']
} )
export class ContactComponent implements OnInit {
  code = `#!/usr/bin/perl
use strict;
print "Hello World!"; `;
  constructor() {
  }

  ngOnInit(): void {
  }
}
