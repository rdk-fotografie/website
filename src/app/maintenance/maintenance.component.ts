import { Component, OnInit } from '@angular/core';
import contact from "../../assets/text/contact.json"

@Component({
  selector: 'app-maintenance',
  templateUrl: './maintenance.component.html',
  styleUrls: ['./maintenance.component.scss']
})
export class MaintenanceComponent implements OnInit {
  text;

  constructor() {
    this.text=contact;
   }

  ngOnInit(): void {
  }

}
