import {Component, OnInit} from '@angular/core';

@Component( {
  selector   : 'app-code',
  templateUrl: './code.component.html',
  styleUrls  : ['./code.component.css']
} )
export class CodeComponent implements OnInit {
  code = {
    helloWorld: {
      perl: `#!/usr/bin/perl\nuse strict;\nprint "Hello World!";`,
      python: `#!/usr/bin/python\nprint "Hello World"";`,
      prolog: `write('Hello World').`
    }
  };

  constructor() {
  }

  ngOnInit(): void {
  }
}
