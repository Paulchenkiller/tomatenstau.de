import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-python-index',
  templateUrl: './python-index.component.html',
  styleUrls: ['./python-index.component.css']
})
export class PythonIndexComponent implements OnInit {
  helloWorld = `#!/usr/bin/python\nprint "Hello World";`;

  constructor() { }

  ngOnInit(): void {
  }

}
