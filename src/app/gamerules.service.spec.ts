import { TestBed } from '@angular/core/testing';

import { GamerulesService } from './gamerules.service';

describe('GamerulesService', () => {
  let service: GamerulesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GamerulesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
