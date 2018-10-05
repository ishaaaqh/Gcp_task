import { TestBed } from '@angular/core/testing';

import { GCPServiceService } from './gcp-service.service';

describe('GCPServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GCPServiceService = TestBed.get(GCPServiceService);
    expect(service).toBeTruthy();
  });
});
