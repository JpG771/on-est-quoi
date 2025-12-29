import { Component, ViewEncapsulation, inject } from '@angular/core';
import { Thermometre } from "../thermometre/thermometre";
import { Contrat } from "../contrat/contrat";
import { Destinataire } from "../destinataire/destinataire";
import { Summary } from "../summary/summary";
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { QuestionnaireService } from '../services/questionnaire.service';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-questionnaire',
  imports: [Destinataire, Thermometre, Contrat, Summary, MatButtonModule, MatStepperModule, CommonModule, RouterLink],
  templateUrl: './questionnaire.html',
  styleUrl: './questionnaire.scss',
  encapsulation: ViewEncapsulation.None
})
export class Questionnaire {
  questionnaire = inject(QuestionnaireService);

}
