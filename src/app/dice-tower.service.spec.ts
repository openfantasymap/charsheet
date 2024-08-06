import { TestBed } from '@angular/core/testing';

import { DiceTowerService } from './dice-tower.service';

describe('DiceTowerService', () => {
  let service: DiceTowerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DiceTowerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
