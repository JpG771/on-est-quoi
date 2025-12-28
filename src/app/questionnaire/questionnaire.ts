import { Component } from '@angular/core';
import { Thermometre } from "../thermometre/thermometre";

@Component({
  selector: 'app-questionnaire',
  imports: [Thermometre],
  templateUrl: './questionnaire.html',
  styleUrl: './questionnaire.scss',
})
export class Questionnaire {

}
