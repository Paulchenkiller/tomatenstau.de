import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Subject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { CodeCopyDirective } from './code-copy.directive';
import { MockHighlightDirective } from '../testing/highlight.mock';

class TranslateStub {
  public onLangChange = new Subject<{ lang: string }>();
  private lang: 'en' | 'de' = 'en';

  instant(key: string): string {
    const dictEn: Record<string, string> = {
      'A11Y.COPY_CODE': 'Copy code to clipboard',
      'A11Y.COPIED': 'Copied!',
    };
    const dictDe: Record<string, string> = {
      'A11Y.COPY_CODE': 'Code in Zwischenablage kopieren',
      'A11Y.COPIED': 'Kopiert!',
    };
    const dict = this.lang === 'en' ? dictEn : dictDe;
    return dict[key] || key;
  }

  switchTo(lang: 'en' | 'de'): void {
    this.lang = lang;
    this.onLangChange.next({ lang });
  }
}

@Component({
  standalone: true,
  imports: [MockHighlightDirective, CodeCopyDirective],
  template: '<pre id="pre1"><code highlight="foo"></code></pre>',
})
class HostComponent {}

describe('CodeCopyDirective', () => {
  let fixture: ComponentFixture<HostComponent>;
  let translate: TranslateStub;

  beforeEach(async () => {
    jest.useFakeTimers();
    translate = new TranslateStub();

    await TestBed.configureTestingModule({
      imports: [HostComponent],
      providers: [{ provide: TranslateService, useValue: translate }],
    }).compileComponents();

    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('adds a copy button and updates labels when language changes', () => {
    const pre = fixture.nativeElement.querySelector('#pre1') as HTMLPreElement;
    const button = pre.querySelector('button.copy-btn') as HTMLButtonElement | null;

    expect(button).toBeTruthy();
    expect(button?.textContent).toBe('Copy code to clipboard');
    expect(button?.getAttribute('aria-label')).toBe('Copy code to clipboard');

    translate.switchTo('de');
    fixture.detectChanges();

    expect(button?.textContent).toBe('Code in Zwischenablage kopieren');
    expect(button?.getAttribute('aria-label')).toBe('Code in Zwischenablage kopieren');
  });

  it('shows feedback after copying and reverts back to the default label', async () => {
    Object.assign(navigator, {
      clipboard: { writeText: jest.fn().mockResolvedValue(undefined) },
    });

    const pre = fixture.nativeElement.querySelector('#pre1') as HTMLPreElement;
    const code = pre.querySelector('code') as HTMLElement;
    code.textContent = 'console.log(1)';
    const button = pre.querySelector('button.copy-btn') as HTMLButtonElement;

    button.click();
    await Promise.resolve();

    expect(button.textContent).toBe('Copied!');
    expect(button.getAttribute('aria-label')).toBe('Copied!');

    jest.advanceTimersByTime(1600);

    expect(button.textContent).toBe('Copy code to clipboard');
    expect(button.getAttribute('aria-label')).toBe('Copy code to clipboard');
  });
});
