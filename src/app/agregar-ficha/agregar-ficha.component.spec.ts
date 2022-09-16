import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarFichaComponent } from './agregar-ficha.component';

describe('AgregarFichaComponent', () => {
  let component: AgregarFichaComponent;
  let fixture: ComponentFixture<AgregarFichaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarFichaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarFichaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
