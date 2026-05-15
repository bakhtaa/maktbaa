import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LivreService } from '../services/livre.service';

@Component({
  selector: 'app-details-livre',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './details-livre.component.html',
  styleUrl: './details-livre.component.css'
})
export class DetailsLivreComponent implements OnInit {

  livre: any;

  constructor(
    private livreService: LivreService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];

    this.livreService.getLivreById(id).subscribe(
      data => {
        console.log(data);
        this.livre = data;
      },
      err => console.log(err)
    );
  }
}