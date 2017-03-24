import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppearInViewportComponent } from './appear-in-viewport.component';

describe('AppearInViewportComponent', () => {
  let component: AppearInViewportComponent;
  let fixture: ComponentFixture<AppearInViewportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppearInViewportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppearInViewportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
