import { Component, ViewEncapsulation, inject } from '@angular/core';
import { Thermometre } from "../thermometre/thermometre";
import { Contrat } from "../contrat/contrat";
import { Destinataire } from "../destinataire/destinataire";
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { QuestionnaireService } from '../services/questionnaire.service';

@Component({
  selector: 'app-questionnaire',
  imports: [Destinataire, Thermometre, Contrat, MatButtonModule, MatStepperModule, CommonModule],
  templateUrl: './questionnaire.html',
  styleUrl: './questionnaire.scss',
  encapsulation: ViewEncapsulation.None
})
export class Questionnaire {
  questionnaire = inject(QuestionnaireService);

}
