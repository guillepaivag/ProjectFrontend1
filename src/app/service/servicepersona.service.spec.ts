import { TestBed } from '@angular/core/testing';

import { ServicePersonaService } from './servicepersona.service';

describe('UsuarioService', () => {
  let service: ServicePersonaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicePersonaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
