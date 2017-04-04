import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormControlMaterialComponent } from './form-control-material.component';

describe('FormControlMaterialComponent', () => {
  let component: FormControlMaterialComponent;
  let fixture: ComponentFixture<FormControlMaterialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormControlMaterialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormControlMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
