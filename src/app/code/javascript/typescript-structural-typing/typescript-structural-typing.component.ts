import { Component } from '@angular/core';
import { Highlight } from 'ngx-highlightjs';
import { HeadlineComponent } from '../../../headline/headline.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-typescript-structural-typing',
  templateUrl: './typescript-structural-typing.component.html',
  imports: [Highlight, HeadlineComponent, TranslateModule],
})
export class TypescriptStructuralTypingComponent {
  codeStructural = `interface Point { x: number; y: number }

// Strukturelle Typisierung: "Duck Typing" – passt, wenn Struktur passt
const p: Point = { x: 1, y: 2, z: 3 }; // OK (z wird ignoriert)
`;

  codeExcess = `type Options = { url: string; timeout?: number };

function fetchX(opts: Options) {}

// Inline-Literale unterliegen Excess Property Checks:
fetchX({ url: 'x', timout: 1000 }); // Fehler: "timout" ist falsch geschrieben

// Workaround: Zwischenvariable (bewusst einsetzen!)
const o = { url: 'x', timout: 1000 } as any;
fetchX(o); // kein Fehler – Excess Property Check umgangen
`;

  constructor() {}
}
