import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TijdlijnComponent } from './tijdlijn.component';

describe('TijdlijnComponent', () => {
  let component: TijdlijnComponent;
  let fixture: ComponentFixture<TijdlijnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TijdlijnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TijdlijnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
