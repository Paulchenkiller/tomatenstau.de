import { Component } from '@angular/core';
import { Highlight } from 'ngx-highlightjs';
import { HeadlineComponent } from '../../../headline/headline.component';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-java-index',
  templateUrl: './java-index.component.html',
  imports: [Highlight, HeadlineComponent, RouterLink, TranslateModule],
})
export class JavaIndexComponent {
  helloWorld = `public class HelloWorld {\n    public static void main(String[] args) {\n        System.out.println("Hello World");\n    }\n}`;

  constructor() {
    // do nothing
  }
}
