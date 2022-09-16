import { TestBed } from '@angular/core/testing';

import { HorarioExcepcionService } from './horario-excepcion.service';

describe('HorarioExcepcionService', () => {
  let service: HorarioExcepcionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HorarioExcepcionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
