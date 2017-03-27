import { Component, OnInit } from '@angular/core';
import {CharacterTypeEnum, CharacterSentimentEnum} from "../../classes/character.class";

@Component({
  selector: 'i24-thanks',
  templateUrl: './thanks.component.html',
  styleUrls: ['./thanks.component.scss']
})
export class ThanksComponent implements OnInit {

  characterType: CharacterTypeEnum = CharacterTypeEnum.STRAWBERRY;
  characterSentiment: CharacterSentimentEnum = CharacterSentimentEnum.EXCITING;

  constructor() { }

  ngOnInit() {
  }

}
