import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs/operators';
import {HostListener} from '@angular/core';
import e from 'express';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'RDK-Fotografie';
  shrinkHeader=false;
  footerEnabled=true;

  constructor(private router:Router, private activatedRoute:ActivatedRoute) {}

  ngOnInit(): void {
    this.router.events.pipe(
      filter(events=>events instanceof NavigationEnd),
      map(evt =>this.activatedRoute),
      map(route => {
        while(route.firstChild) {
        route = route.firstChild;
        }
        return route;
        })).pipe(
          filter(route => route.outlet === 'primary'),
          mergeMap(route => route.data)
      ).subscribe(x=>x.footer===false ?this.footerEnabled=false:this.footerEnabled=true)
  }

  @HostListener('window:scroll', ['$event'])
  onscroll(e: Event) {
    if (this.getYPosition(e) > 120) {
      this.shrinkHeader  = true;
    } else if (this.getYPosition(e) < 50) {
        this.shrinkHeader  = false;
    }
  }

  getYPosition(e: Event): number {
    if ((e.target as Element)['scrollTop'] != undefined) {
      return (e.target as Element)['scrollTop']
    } else {
      return (e.target as Element)['scrollingElement']['scrollTop']
    }
  }
}
