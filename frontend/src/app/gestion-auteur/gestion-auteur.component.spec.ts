import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionAuteurComponent } from './gestion-auteur.component';

describe('GestionAuteurComponent', () => {
  let component: GestionAuteurComponent;
  let fixture: ComponentFixture<GestionAuteurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionAuteurComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GestionAuteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
