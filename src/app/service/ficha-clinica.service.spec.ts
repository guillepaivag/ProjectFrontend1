import { TestBed } from '@angular/core/testing';

import { FichaClinicaService } from './ficha-clinica.service';

describe('FichaClinicaService', () => {
  let service: FichaClinicaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FichaClinicaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
