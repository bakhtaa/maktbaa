import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuteurService } from '../services/auteur.service';

@Component({
  selector: 'app-details-auteur',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './details-auteur.component.html',
  styleUrl: './details-auteur.component.css'
})
export class DetailsAuteurComponent implements OnInit {

  auteur: any;

  constructor(
    private auteurService: AuteurService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];

    this.auteurService.getAuteurById(id).subscribe(
      data => {
        this.auteur = data;
      },
      err => console.log(err)
    );
  }
}