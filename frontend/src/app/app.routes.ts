import { Routes } from '@angular/router';

import { GestionKtobComponent } from './gestion-ktob/gestion-ktob.component';
import { AjoutLivreComponent } from './ajout-livre/ajout-livre.component';
import { EditLivreComponent } from './edit-livre/edit-livre.component';
import { DetailsLivreComponent } from './details-livre/details-livre.component';

import { GestionAuteurComponent } from './gestion-auteur/gestion-auteur.component';
import { AjoutAuteurComponent } from './ajout-auteur/ajout-auteur.component';
import { EditAuteurComponent } from './edit-auteur/edit-auteur.component';
import { DetailsAuteurComponent } from './details-auteur/details-auteur.component';

export const routes: Routes = [

  { path: '', redirectTo: 'livres', pathMatch: 'full' },
  { path: 'livres', component: GestionKtobComponent },
  { path: 'ajouter-livre', component: AjoutLivreComponent },
  { path: 'edit-livre/:id', component: EditLivreComponent },
  { path: 'details-livre/:id', component: DetailsLivreComponent },


  { path: 'auteurs', component: GestionAuteurComponent },
  { path: 'ajouter-auteur', component: AjoutAuteurComponent },
  { path: 'edit-auteur/:id', component: EditAuteurComponent },
  { path: 'details-auteur/:id', component: DetailsAuteurComponent },
];