import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ConsentAlertComponent} from './consent-alert.component';

describe('ConsentAlertComponent', () => {
  let component: ConsentAlertComponent;
  let fixture: ComponentFixture<ConsentAlertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsentAlertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsentAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
