import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrologAckermannComponent } from './prolog-ackermann.component';

describe('PrologAckermannComponent', () => {
  let component: PrologAckermannComponent;
  let fixture: ComponentFixture<PrologAckermannComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrologAckermannComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrologAckermannComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
