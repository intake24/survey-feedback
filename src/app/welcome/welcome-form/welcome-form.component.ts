import { Component, OnInit } from '@angular/core';
import {CharacterTypeEnum, CharacterSentimentEnum} from "../../classes/character.class";

@Component({
  selector: 'i24-welcome-form',
  templateUrl: 'welcome-form.component.html',
  styleUrls: ['welcome-form.component.scss']
})
export class WelcomeFormComponent implements OnInit {

  name: string;
  yearOfBirth: number;
  weight: number;
  height: number;

  characterType: CharacterTypeEnum = CharacterTypeEnum.STRAWBERRY;
  characterSentiment: CharacterSentimentEnum = CharacterSentimentEnum.EXCITING;

  constructor() { }

  ngOnInit() {
  }

}
