import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsAuteurComponent } from './details-auteur.component';

describe('DetailsAuteurComponent', () => {
  let component: DetailsAuteurComponent;
  let fixture: ComponentFixture<DetailsAuteurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsAuteurComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailsAuteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
