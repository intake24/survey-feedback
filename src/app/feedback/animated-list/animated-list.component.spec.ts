import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimatedListComponent } from './animated-list.component';

describe('AnimatedListComponent', () => {
  let component: AnimatedListComponent;
  let fixture: ComponentFixture<AnimatedListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnimatedListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimatedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
