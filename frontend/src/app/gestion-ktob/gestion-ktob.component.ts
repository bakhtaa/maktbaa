import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LivreService } from '../services/livre.service';
import { AuteurService } from '../services/auteur.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-gestion-livres',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './gestion-ktob.component.html'
})
export class GestionKtobComponent implements OnInit {

  livres: any[] = [];
  auteurs: any[] = [];

  searchTitle: string = '';
  selectedAuteur: string = '';

  currentPage: number = 1;
  pageSize: number = 3;

  constructor(
    private livreService: LivreService,
    private auteurService: AuteurService
  ) { }

  ngOnInit(): void {
    this.loadLivres();
    this.loadAuteurs();
  }

  loadLivres(): void {
    this.livreService.getLivres().subscribe(data => {
      this.livres = data;
    });
  }

  loadAuteurs(): void {
    this.auteurService.getAuteurs().subscribe(data => {
      this.auteurs = data;
    });
  }

  get filteredLivres() {
    return this.livres.filter(livre =>
      livre.titre.toLowerCase().includes(this.searchTitle.toLowerCase()) &&
      (this.selectedAuteur === '' ||
        livre.auteur?.id === this.selectedAuteur ||
        livre.auteur?._id === this.selectedAuteur)
    );
  }

  get totalPages() {
    return Math.ceil(this.filteredLivres.length / this.pageSize);
  }

  get paginatedLivres() {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredLivres.slice(start, start + this.pageSize);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) this.currentPage++;
  }

  prevPage() {
    if (this.currentPage > 1) this.currentPage--;
  }

  deleteLivre(livre: any) {
    Swal.fire({
      title: 'Supprimer ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui'
    }).then(result => {
      if (result.isConfirmed) {
        this.livreService.deleteLivre(livre.id).subscribe(() => {
          this.livres = this.livres.filter(l => l.id !== livre.id);
        });
      }
    });
  }
}
