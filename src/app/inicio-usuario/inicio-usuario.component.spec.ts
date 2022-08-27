import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InicioUsuarioComponent } from './inicio-usuario.component';

describe('InicioUsuarioComponent', () => {
  let component: InicioUsuarioComponent;
  let fixture: ComponentFixture<InicioUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InicioUsuarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InicioUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
