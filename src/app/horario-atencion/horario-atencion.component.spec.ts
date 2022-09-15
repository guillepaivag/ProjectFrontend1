import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorarioAtencionComponent } from './horario-atencion.component';

describe('HorarioAtencionComponent', () => {
  let component: HorarioAtencionComponent;
  let fixture: ComponentFixture<HorarioAtencionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HorarioAtencionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HorarioAtencionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
