import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuteurService } from '../services/auteur.service';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-gestion-auteur',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './gestion-auteur.component.html'
})
export class GestionAuteurComponent implements OnInit {

  auteurs: any[] = [];

  searchName: string = '';
  sortOption: string = '';

  currentPage: number = 1;
  pageSize: number = 5;

  constructor(private auteurService: AuteurService) { }

  ngOnInit(): void {
    this.loadAuteurs();
  }

  loadAuteurs(): void {
    this.auteurService.getAuteurs().subscribe(data => {
      this.auteurs = data;
    });
  }

  get filteredAuteurs() {
    let result = this.auteurs.filter(a =>
      a.nom.toLowerCase().includes(this.searchName.toLowerCase())
    );

    if (this.sortOption === 'nom') {
      result = result.sort((a, b) => a.nom.localeCompare(b.nom));
    }

    return result;
  }

  get totalPages() {
    return Math.ceil(this.filteredAuteurs.length / this.pageSize);
  }

  get paginatedAuteurs() {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredAuteurs.slice(start, start + this.pageSize);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) this.currentPage++;
  }

  prevPage() {
    if (this.currentPage > 1) this.currentPage--;
  }

  deleteAuteur(auteur: any) {
    Swal.fire({
      title: 'Supprimer auteur ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui'
    }).then(result => {
      if (result.isConfirmed) {
        this.auteurService.deleteAuteur(auteur.id).subscribe(() => {
          this.auteurs = this.auteurs.filter(a => a.id !== auteur.id);
        });
      }
    });
  }
}