import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { LivreService } from '../services/livre.service';
import { AuteurService } from '../services/auteur.service';

@Component({
  selector: 'app-edit-livre',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './edit-livre.component.html'
})
export class EditLivreComponent implements OnInit {

  formLivre!: FormGroup;
  id: any;
  auteurs: any[] = [];

  constructor(
    private livreService: LivreService,
    private auteurService: AuteurService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {

    this.id = this.route.snapshot.params['id'];

    // 1. form
    this.formLivre = this.fb.group({
      titre: ['', Validators.required],
      description: ['', Validators.required],
      prix: ['', Validators.required],
      auteur: ['', Validators.required]
    });

    // 2. load auteurs (relation)
    this.auteurService.getAuteurs().subscribe(data => {
      this.auteurs = data;
    });

    // 3. load livre by id
    this.livreService.getLivreById(this.id).subscribe(data => {
      this.formLivre.patchValue({
        titre: data.titre,
        description: data.description,
        prix: data.prix,
        auteur: data.auteur?.id || data.auteur?._id
      });
    });
  }

  submit(): void {

    if (this.formLivre.invalid) {
      alert("Form invalid");
      return;
    }

    this.livreService.updateLivre(this.id, this.formLivre.value).subscribe(() => {
      this.router.navigate(['/livres']);
    }, err => {
      console.log(err);
      alert("Error updating book");
    });
  }
}