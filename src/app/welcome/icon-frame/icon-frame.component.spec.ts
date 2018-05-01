import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {IconFrameComponent} from './icon-frame.component';

describe('IconFrameComponent', () => {
  let component: IconFrameComponent;
  let fixture: ComponentFixture<IconFrameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IconFrameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IconFrameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
