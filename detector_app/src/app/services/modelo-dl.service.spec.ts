import { TestBed } from '@angular/core/testing';

import { ModeloDlService } from './modelo-dl.service';

describe('ModeloDlService', () => {
  let service: ModeloDlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModeloDlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
