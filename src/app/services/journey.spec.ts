import { TestBed } from '@angular/core/testing';

import { Journey } from './journey';

describe('Journey', () => {
  let service: Journey;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Journey);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
