import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PythonIndexComponent } from './python-index.component';
import { MockHighlightDirective } from '../../../testing/highlight.mock';

describe.skip('PythonIndexComponent', () => {
  let component: PythonIndexComponent;
  let fixture: ComponentFixture<PythonIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MockHighlightDirective],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PythonIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
