import { TestBed } from '@angular/core/testing';

import { HorarioAtencionService } from './horario-atencion.service';

describe('HorarioAtencionService', () => {
  let service: HorarioAtencionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HorarioAtencionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
