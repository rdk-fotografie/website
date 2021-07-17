import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { Router } from '@angular/router';
import start from '../../assets/text/start.json';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent implements OnInit {

  sliderValues=["s1","s2","s3","s4","s5"];
  sliderPages=["services","about","examples","contact","impressum"];
  sliderIndex=0;
  sliderValue = this.sliderValues[this.sliderIndex];
  sliderSubscriber;
  sliderInterval=3000;
  sliderToRight=true;
  text;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.startSliderSubscriber();
    this.text=start;
  }
  startSliderSubscriber() {
    this.sliderSubscriber = interval(this.sliderInterval).subscribe(x => {
      this.startSliderCarousel();
    });
  }

  stopSliderSubscriber() {
    this.sliderSubscriber.unsubscribe();
  }

  startSliderCarousel() {
    if (this.sliderToRight==true) {
      if (this.sliderIndex>=this.sliderValues.length-1) {
        this.sliderIndex=0;
      } else {
        this.sliderIndex=this.sliderIndex+1;
      }
    } else {
      if (this.sliderIndex<=0) {
        this.sliderIndex=this.sliderValues.length-1;
      } else {
        this.sliderIndex=this.sliderIndex-1;
      }
    }
    this.sliderValue=this.sliderValues[this.sliderIndex];
  }

  handleSliderClick(index) {
    if (index==this.sliderIndex) {
      this.navigateToPage(index);
    } else if ( ( index < this.sliderIndex && !( this.sliderIndex==this.sliderValues.length-1 && index==0 ) ) || ( this.sliderIndex==0 && index==this.sliderValues.length-1 ) ) {
      this.sliderToRight = false;
      this.sliderIndex=index;
    } else {
      this.sliderToRight = true;
      this.sliderIndex=index;
    }
  }

  navigateToPage(index) {
    this.router.navigate([this.sliderPages[index]]);
  }

}
