import { Component } from '@angular/core';
import { Highlight } from 'ngx-highlightjs';
import { HeadlineComponent } from '../../../headline/headline.component';

@Component({
  selector: 'app-java-concurrent-modification',
  templateUrl: './java-concurrent-modification.component.html',
  imports: [Highlight, HeadlineComponent],
})
export class JavaConcurrentModificationComponent {
  badCode = `var list = new java.util.ArrayList<>(java.util.List.of(1,2,3));\nfor (Integer i : list) {\n    if (i % 2 == 0) {\n        list.remove(i); // java.util.ConcurrentModificationException\n    }\n}`;

  goodCode1 = `var it = list.iterator();\nwhile (it.hasNext()) {\n    Integer i = it.next();\n    if (i % 2 == 0) {\n        it.remove(); // korrekt: Iterator steuert die Änderung\n    }\n}`;

  goodCode2 = `list.removeIf(i -> i % 2 == 0); // bevorzugt seit Java 8`;

  constructor() {}
}
