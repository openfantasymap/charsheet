import { TestBed } from '@angular/core/testing';

import { AotmService } from './aotm.service';

describe('AotmService', () => {
  let service: AotmService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AotmService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
