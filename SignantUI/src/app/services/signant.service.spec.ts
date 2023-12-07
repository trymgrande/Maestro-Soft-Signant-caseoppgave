import { TestBed } from '@angular/core/testing';

import { SignantService } from './signant.service';

describe('SignantService', () => {
  let service: SignantService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SignantService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
