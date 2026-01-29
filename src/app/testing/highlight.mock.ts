import { Component, Input } from '@angular/core';

// Mock the ngx-highlightjs Highlight directive for testing
@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: '[highlight]',
  templateUrl: './highlight.mock.html',
  standalone: true,
})
export class MockHighlightDirective {
  @Input() highlight: string | undefined;
  @Input() language: string | undefined;
}
