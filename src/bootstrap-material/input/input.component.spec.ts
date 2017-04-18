import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BmInputComponent } from './input.component';

describe('BmInputComponent', () => {
  let component: BmInputComponent;
  let fixture: ComponentFixture<BmInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BmInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BmInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
