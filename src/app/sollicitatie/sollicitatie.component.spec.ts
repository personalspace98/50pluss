import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SollicitatieComponent } from './sollicitatie.component';

describe('SollicitatieComponent', () => {
  let component: SollicitatieComponent;
  let fixture: ComponentFixture<SollicitatieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SollicitatieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SollicitatieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
