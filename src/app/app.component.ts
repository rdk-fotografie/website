import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs/operators';

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
    this.animateHeader();

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

  animateHeader() {
    window.onscroll = () => {
    if (window.pageYOffset > 120) {
        this.shrinkHeader  = true;
    } else if (window.pageYOffset < 50) {
        this.shrinkHeader  = false;
    }
    }
  }
}
