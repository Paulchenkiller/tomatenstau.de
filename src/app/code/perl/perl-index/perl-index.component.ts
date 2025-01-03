import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-perl-index',
    templateUrl: './perl-index.component.html',
    styleUrls: ['./perl-index.component.css'],
    standalone: false
})
export class PerlIndexComponent implements OnInit {
  helloWorld = `#!/usr/bin/perl\nuse strict;\nprint "Hello World";`;

  constructor() { }

  ngOnInit(): void {
  }

}
