import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TellMeMoreComponent} from './tell-me-more.component';

describe('TellMeMoreComponent', () => {
  let component: TellMeMoreComponent;
  let fixture: ComponentFixture<TellMeMoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TellMeMoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TellMeMoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
