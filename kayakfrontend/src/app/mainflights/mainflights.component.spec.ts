import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainflightsComponent } from './mainflights.component';

describe('MainflightsComponent', () => {
  let component: MainflightsComponent;
  let fixture: ComponentFixture<MainflightsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainflightsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainflightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
