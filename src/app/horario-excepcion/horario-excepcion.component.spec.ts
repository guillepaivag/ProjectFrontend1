import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorarioExcepcionComponent } from './horario-excepcion.component';

describe('HorarioExcepcionComponent', () => {
  let component: HorarioExcepcionComponent;
  let fixture: ComponentFixture<HorarioExcepcionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HorarioExcepcionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HorarioExcepcionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
