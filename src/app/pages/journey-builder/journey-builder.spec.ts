import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JourneyBuilder } from './journey-builder';

describe('JourneyBuilder', () => {
  let component: JourneyBuilder;
  let fixture: ComponentFixture<JourneyBuilder>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JourneyBuilder]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JourneyBuilder);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
