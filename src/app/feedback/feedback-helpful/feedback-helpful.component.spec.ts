import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackHelpfulComponent } from './feedback-helpful.component';

describe('FeedbackHelpfulComponent', () => {
  let component: FeedbackHelpfulComponent;
  let fixture: ComponentFixture<FeedbackHelpfulComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedbackHelpfulComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbackHelpfulComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
