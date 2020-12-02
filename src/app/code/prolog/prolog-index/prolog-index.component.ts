import {Component, OnInit} from '@angular/core';

@Component( {
  selector   : 'app-prolog-index',
  templateUrl: './prolog-index.component.html',
  styleUrls  : ['./prolog-index.component.css']
} )
export class PrologIndexComponent implements OnInit {
  helloWorld = `write('Hello World').`;

  constructor() {
  }

  ngOnInit(): void {
  }
}
