import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanDecisionComponent } from './loan-decision.component';

describe('LoanDecisionComponent', () => {
  let component: LoanDecisionComponent;
  let fixture: ComponentFixture<LoanDecisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoanDecisionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoanDecisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
