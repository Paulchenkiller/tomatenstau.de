import {
  AfterViewInit,
  Directive,
  ElementRef,
  Inject,
  OnDestroy,
  Renderer2,
  DOCUMENT,
  isDevMode,
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: 'code[highlight]',
  standalone: true,
})
export class CodeCopyDirective implements AfterViewInit, OnDestroy {
  private button: HTMLButtonElement | null = null;
  private revertTimeoutId: number | null = null;
  private langChangeSubscription?: Subscription;

  constructor(
    private elementRef: ElementRef<HTMLElement>,
    private renderer: Renderer2,
    private translate: TranslateService,
    @Inject(DOCUMENT) private doc: Document,
  ) {}

  ngAfterViewInit(): void {
    const pre = this.getPreElement();
    if (!pre) {
      return;
    }

    this.ensurePrePositioning(pre);
    this.button = this.createButton(pre);
    this.updateButtonLabel();

    this.langChangeSubscription = this.translate.onLangChange.subscribe(() => {
      this.updateButtonLabel();
    });
  }

  ngOnDestroy(): void {
    this.langChangeSubscription?.unsubscribe();
    if (this.revertTimeoutId !== null) {
      clearTimeout(this.revertTimeoutId);
    }
  }

  private getPreElement(): HTMLPreElement | null {
    const parent = this.elementRef.nativeElement.parentElement;
    return parent instanceof HTMLPreElement ? parent : null;
  }

  private ensurePrePositioning(pre: HTMLPreElement): void {
    if (!pre.style.position) {
      this.renderer.setStyle(pre, 'position', 'relative');
    }
  }

  private createButton(pre: HTMLPreElement): HTMLButtonElement {
    const button = this.renderer.createElement('button') as HTMLButtonElement;
    button.type = 'button';
    button.className = 'copy-btn';
    this.renderer.setStyle(button, 'position', 'absolute');
    this.renderer.setStyle(button, 'top', '0.5rem');
    this.renderer.setStyle(button, 'right', '0.5rem');

    this.renderer.listen(button, 'click', () => {
      void this.copyCode();
    });

    this.renderer.appendChild(pre, button);
    return button;
  }

  private updateButtonLabel(): void {
    if (!this.button) {
      return;
    }

    const label = this.getCopyLabel();
    this.button.textContent = label;
    this.button.setAttribute('aria-label', label);
    this.button.title = label;
  }

  private async copyCode(): Promise<void> {
    if (!this.button) {
      return;
    }

    const text = this.elementRef.nativeElement.textContent || '';
    const copiedLabel = this.getCopiedLabel();
    const defaultLabel = this.getCopyLabel();

    let didCopy = await this.copyWithClipboardApi(text);
    if (!didCopy) {
      didCopy = this.copyWithFallback(text);
    }

    if (!didCopy) {
      return;
    }

    this.button.textContent = copiedLabel;
    this.button.setAttribute('aria-label', copiedLabel);

    if (this.revertTimeoutId !== null) {
      clearTimeout(this.revertTimeoutId);
    }

    this.revertTimeoutId = window.setTimeout(() => {
      if (!this.button) {
        return;
      }
      this.button.textContent = defaultLabel;
      this.button.setAttribute('aria-label', defaultLabel);
      this.button.title = defaultLabel;
    }, 1500);
  }

  private async copyWithClipboardApi(text: string): Promise<boolean> {
    const clipboard = this.doc.defaultView?.navigator?.clipboard;
    if (!clipboard?.writeText) {
      return false;
    }

    try {
      await clipboard.writeText(text);
      return true;
    } catch (error) {
      this.logCopyError('clipboard', error);
      return false;
    }
  }

  private copyWithFallback(text: string): boolean {
    const textarea = this.renderer.createElement('textarea') as HTMLTextAreaElement;
    textarea.value = text;
    this.renderer.setStyle(textarea, 'position', 'fixed');
    this.renderer.setStyle(textarea, 'top', '-1000px');
    this.renderer.appendChild(this.doc.body, textarea);
    textarea.focus();
    textarea.select();

    try {
      const copied = this.doc.execCommand('copy');
      if (!copied) {
        this.logCopyError('fallback', new Error('document.execCommand("copy") returned false.'));
      }
      return copied;
    } finally {
      this.renderer.removeChild(this.doc.body, textarea);
    }
  }

  private logCopyError(stage: 'clipboard' | 'fallback', error: unknown): void {
    if (isDevMode()) {
      console.warn(`Failed to copy code via ${stage}.`, error);
    }
  }

  private getCopyLabel(): string {
    return this.translate.instant('A11Y.COPY_CODE') || 'Copy code to clipboard';
  }

  private getCopiedLabel(): string {
    return this.translate.instant('A11Y.COPIED') || 'Copied!';
  }
}
