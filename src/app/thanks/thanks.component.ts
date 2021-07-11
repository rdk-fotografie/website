import { Component, OnInit } from '@angular/core';
import contact from "../../assets/text/contact.json"

@Component({
  selector: 'app-thanks',
  templateUrl: './thanks.component.html',
  styleUrls: ['./thanks.component.scss']
})
export class ThanksComponent implements OnInit {
  text;

  constructor() {
    this.text=contact;
   }

  ngOnInit(): void {
  }

}
