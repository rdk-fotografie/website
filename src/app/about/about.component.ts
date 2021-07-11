import { Component, OnInit } from '@angular/core';
import about from '../../assets/text/about.json'

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  text;
  
  constructor() {
    this.text=about;
   }

  ngOnInit(): void {
  }

}
