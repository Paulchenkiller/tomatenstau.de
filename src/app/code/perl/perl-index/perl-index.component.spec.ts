import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerlIndexComponent } from './perl-index.component';
import { MockHighlightDirective } from '../../../testing/highlight.mock';

describe.skip('PerlIndexComponent', () => {
  let component: PerlIndexComponent;
  let fixture: ComponentFixture<PerlIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MockHighlightDirective],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PerlIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
