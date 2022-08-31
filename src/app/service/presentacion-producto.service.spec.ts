import { TestBed } from '@angular/core/testing';

import { PresentacionProductoService } from './presentacion-producto.service';

describe('PresentacionProductoService', () => {
  let service: PresentacionProductoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PresentacionProductoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
