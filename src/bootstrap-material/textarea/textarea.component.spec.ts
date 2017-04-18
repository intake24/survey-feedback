import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BmTextareaComponent } from './textarea.component';

describe('BmTextareaComponent', () => {
  let component: BmTextareaComponent;
  let fixture: ComponentFixture<BmTextareaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BmTextareaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BmTextareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
