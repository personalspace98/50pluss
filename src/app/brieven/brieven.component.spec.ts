import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrievenComponent } from './brieven.component';

describe('BrievenComponent', () => {
  let component: BrievenComponent;
  let fixture: ComponentFixture<BrievenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrievenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrievenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
