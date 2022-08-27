import { TestBed } from '@angular/core/testing';

import { ServicecategoriaService } from './servicecategoria.service';

describe('ServicecategoriaService', () => {
  let service: ServicecategoriaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicecategoriaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
