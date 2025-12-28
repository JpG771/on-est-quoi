import { Component, ViewEncapsulation } from '@angular/core';
import { Thermometre } from "../thermometre/thermometre";
import { Contrat } from "../contrat/contrat";
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-questionnaire',
  imports: [Thermometre, Contrat, MatButtonModule, MatStepperModule],
  templateUrl: './questionnaire.html',
  styleUrl: './questionnaire.scss',
  encapsulation: ViewEncapsulation.None
})
export class Questionnaire {

}
