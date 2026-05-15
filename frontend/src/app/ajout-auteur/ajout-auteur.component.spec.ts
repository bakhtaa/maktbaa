import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutAuteurComponent } from './ajout-auteur.component';

describe('AjoutAuteurComponent', () => {
  let component: AjoutAuteurComponent;
  let fixture: ComponentFixture<AjoutAuteurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AjoutAuteurComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AjoutAuteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
