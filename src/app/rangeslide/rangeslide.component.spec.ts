import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RangeslideComponent } from './rangeslide.component';

describe('RangeslideComponent', () => {
  let component: RangeslideComponent;
  let fixture: ComponentFixture<RangeslideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RangeslideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RangeslideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
