import { Component, OnInit, inject, DestroyRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuteurService } from '../services/auteur.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-ajout-auteur',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './ajout-auteur.component.html',
  styleUrl: './ajout-auteur.component.css'
})
export class AjoutAuteurComponent implements OnInit {
  formAuteur!: FormGroup;
  submitted: boolean = false;
  loading: boolean = false;

  private destroyRef = inject(DestroyRef);

  constructor(
    private auteurService: AuteurService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.formAuteur = this.fb.group({
      nom: ['', [Validators.required, Validators.minLength(3)]],
      nationalite: ['', [Validators.required, Validators.minLength(3)]],
      biographie: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  getErrorMessage(fieldName: string): string {
    const control = this.formAuteur.get(fieldName);

    if (!control?.touched && !this.submitted) return '';

    if (control?.hasError('required')) {
      return `${fieldName} is required`;
    }
    if (control?.hasError('minlength')) {
      const minLength = control.errors?.['minlength'].requiredLength;
      return `${fieldName} must contain at least ${minLength} characters`;
    }
    return '';
  }

  submit(): void {
    this.submitted = true;

    if (this.formAuteur.invalid) {
      return;
    }

    this.loading = true;
    this.auteurService.createAuteur(this.formAuteur.value)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.router.navigate(['/auteurs']);
        },
        error: (err: any) => {
          this.loading = false;
          const message = err?.error?.message || 'An error occurred while adding the author';
          alert(message);
          console.error('Error:', err);
        }
      });
  }
}