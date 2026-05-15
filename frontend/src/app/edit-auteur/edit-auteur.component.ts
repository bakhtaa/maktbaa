import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

import { AuteurService } from '../services/auteur.service';

@Component({
  selector: 'app-edit-auteur',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './edit-auteur.component.html'
})
export class EditAuteurComponent implements OnInit {

  formAuteur!: FormGroup;
  id: any;

  constructor(
    private auteurService: AuteurService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {

    this.id = this.route.snapshot.params['id'];

    // form
    this.formAuteur = this.fb.group({
      nom: ['', [Validators.required, Validators.minLength(3)]]
    });

    // load data
    this.auteurService.getAuteurById(this.id).subscribe(data => {
      this.formAuteur.patchValue({
        nom: data.nom
      });
    });
  }

  submit(): void {

    if (this.formAuteur.invalid) {
      alert("Form invalid");
      return;
    }

    this.auteurService.updateAuteur(this.id, this.formAuteur.value).subscribe(() => {
      this.router.navigate(['/auteurs']);
    }, err => {
      console.log(err);
      alert("Error updating author");
    });
  }
}
