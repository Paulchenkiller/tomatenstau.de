import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrologIndexComponent } from './prolog-index.component';
import { RouterModule } from '@angular/router';

describe('PrologIndexComponent', () => {
  let component: PrologIndexComponent;
  let fixture: ComponentFixture<PrologIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterModule.forRoot([])],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrologIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
