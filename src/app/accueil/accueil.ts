import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-accueil',
  imports: [MatButtonModule, RouterLink],
  templateUrl: './accueil.html',
  styleUrl: './accueil.scss'
})
export class Accueil {

}
