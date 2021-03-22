import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlgComponent } from './blg.component';

describe('BlgComponent', () => {
  let component: BlgComponent;
  let fixture: ComponentFixture<BlgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
