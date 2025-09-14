import { Component } from '@angular/core';
import { Highlight } from 'ngx-highlightjs';
import { HeadlineComponent } from '../../../headline/headline.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-java-equals-hashcode',
  templateUrl: './java-equals-hashcode.component.html',
  imports: [Highlight, HeadlineComponent, TranslateModule],
})
export class JavaEqualsHashcodeComponent {
  badCode = `class Point {\n    int x, y;\n    // equals überschrieben, hashCode NICHT!\n    @Override public boolean equals(Object o) {\n        if (this == o) return true;\n        if (!(o instanceof Point)) return false;\n        Point p = (Point) o;\n        return x == p.x && y == p.y;\n    }\n}\n\nvar set = new java.util.HashSet<Point>();\nset.add(new Point());\n// Enthält logisch gleiche Objekte mehrfach oder findet sie nicht`;

  goodCode = `class Point {\n    int x, y;\n    @Override public boolean equals(Object o) {\n        if (this == o) return true;\n        if (!(o instanceof Point p)) return false;\n        return x == p.x && y == p.y;\n    }\n    @Override public int hashCode() {\n        return java.util.Objects.hash(x, y);\n    }\n}`;

  constructor() {}
}
