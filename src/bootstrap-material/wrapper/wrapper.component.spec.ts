import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {BmWrapperComponent} from './wrapper.component';

describe('BmWrapperComponent', () => {
  let component: BmWrapperComponent;
  let fixture: ComponentFixture<BmWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BmWrapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BmWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
