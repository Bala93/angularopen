import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderCheckComponent } from './slider-check.component';

describe('SliderCheckComponent', () => {
  let component: SliderCheckComponent;
  let fixture: ComponentFixture<SliderCheckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SliderCheckComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SliderCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
