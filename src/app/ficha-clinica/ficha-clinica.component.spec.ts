import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FichaClinicaComponent } from './ficha-clinica.component';

describe('FichaClinicaComponent', () => {
  let component: FichaClinicaComponent;
  let fixture: ComponentFixture<FichaClinicaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FichaClinicaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FichaClinicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
