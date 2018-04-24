import { TestBed, inject } from '@angular/core/testing';

import { OfficeInfoService } from './office-info.service';

describe('UserInfoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OfficeInfoService]
    });
  });

  it('should be created', inject([OfficeInfoService], (service: OfficeInfoService) => {
    expect(service).toBeTruthy();
  }));
});
