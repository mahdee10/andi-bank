import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlineServicesComponent } from './online-services.component';

describe('OnlineServicesComponent', () => {
  let component: OnlineServicesComponent;
  let fixture: ComponentFixture<OnlineServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnlineServicesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnlineServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
