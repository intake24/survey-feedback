import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {BmSelectComponent} from './select.component';

describe('BmSelectComponent', () => {
  let component: BmSelectComponent;
  let fixture: ComponentFixture<BmSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BmSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BmSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
