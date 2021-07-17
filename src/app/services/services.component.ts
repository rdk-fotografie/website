import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import services from '../../assets/text/services.json'

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {
  text;
  package="standard";
  shrinkHeader;
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.shrinkHeader=true;
    this.text=services;
  }

  navigateToPage(side, con) {
    this.router.navigate([side], { queryParams: { concern: con, package: this.package }});
  }
  
  changePackage(value) {
    this.package=value;
  }

}
