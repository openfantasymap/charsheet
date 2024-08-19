import { TestBed } from '@angular/core/testing';

import { MasterSheetService } from './master-sheet.service';

describe('MasterSheetService', () => {
  let service: MasterSheetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MasterSheetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
