import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrologHanoiComponent } from './prolog-hanoi.component';

describe('PrologHanoiComponent', () => {
  let component: PrologHanoiComponent;
  let fixture: ComponentFixture<PrologHanoiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrologHanoiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrologHanoiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
