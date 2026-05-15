import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionKtobComponent } from './gestion-ktob.component';

describe('GestionKtobComponent', () => {
  let component: GestionKtobComponent;
  let fixture: ComponentFixture<GestionKtobComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionKtobComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GestionKtobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
