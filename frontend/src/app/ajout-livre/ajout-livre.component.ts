import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { LivreService } from '../services/livre.service';
import { AuteurService } from '../services/auteur.service';

@Component({
  selector: 'app-ajout-livre',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './ajout-livre.component.html'
})
export class AjoutLivreComponent implements OnInit {

  formLivre!: FormGroup;
  auteurs: any[] = [];
  submitted: boolean = false;

  constructor(
    private livreService: LivreService,
    private auteurService: AuteurService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {

    // 1. form
    this.formLivre = this.fb.group({
      titre: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      prix: ['', [Validators.required, Validators.min(1)]],
      image: [''],
      auteur: ['', Validators.required]

    });

    // 2. load auteurs (relation)
    this.auteurService.getAuteurs().subscribe(data => {
      this.auteurs = data;
    });
  }
  
  onFileSelected(event: any): void {

    const file = event.target.files[0];

    if (file) {

      const reader = new FileReader();

      reader.onload = () => {

        this.formLivre.patchValue({
          image: reader.result as string
        });

      };

      reader.readAsDataURL(file);
    }
  }
  submit(): void {

    this.submitted = true;

    if (this.formLivre.invalid) {
      alert("Form invalid");
      return;
    }

    this.livreService.createLivre(this.formLivre.value).subscribe(() => {
      this.router.navigate(['/livres']);
    }, err => {
      console.log(err);
      alert(err.error?.message || "Error adding book");
    });
  }
}