import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FadeInDownComponent } from './fade-in-down.component';

describe('angular FadeInDownComponent', () => {
  let component: FadeInDownComponent;
  let fixture: ComponentFixture<FadeInDownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FadeInDownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FadeInDownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
