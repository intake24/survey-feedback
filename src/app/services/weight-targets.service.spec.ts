import { TestBed, inject } from '@angular/core/testing';

import { WeightTargetsService } from './weight-target.service';

describe('WeightTargetsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WeightTargetsService]
    });
  });

  it('should ...', inject([WeightTargetsService], (service: WeightTargetsService) => {
    expect(service).toBeTruthy();
  }));
});
