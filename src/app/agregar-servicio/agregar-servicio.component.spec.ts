import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarServicioComponent } from './agregar-servicio.component';

describe('AgregarServicioComponent', () => {
  let component: AgregarServicioComponent;
  let fixture: ComponentFixture<AgregarServicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarServicioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarServicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
