import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerlIndexComponent } from './perl-index.component';

describe('PerlIndexComponent', () => {
  let component: PerlIndexComponent;
  let fixture: ComponentFixture<PerlIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerlIndexComponent ]
    })
    .compileComponents();
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
