import { DOCUMENT } from '@angular/common';
import { interval } from 'rxjs';
import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { ImageService } from '../image.service';
import { HttpClient } from '@angular/common/http';
import { delay, tap } from 'rxjs/operators';
import examples from '../../assets/text/examples.json'
import { TransitionCheckState } from '@angular/material';

@Component({
  selector: 'app-examples',
  templateUrl: './examples.component.html',
  styleUrls: ['./examples.component.scss']
})
export class ExamplesComponent implements OnInit { 
  ticking = false;
  isFirefox = (/Firefox/i.test(navigator.userAgent));
  isIe = (/MSIE/i.test(navigator.userAgent)) || (/Trident.*rv\:11\./i.test(navigator.userAgent));
  scrollSensitivitySetting = 30;  
  negScrollSensitivitySetting = -30; 
  slideDurationSetting = 1000; 
  currentSlideNumber = 0;
  background: HTMLCollection;
  diashowDelay=3000;
  diashowCounter=0;
  diashowInterval;
  preloadedImages = new Array();
  imagesToPreload=["https://www.dropbox.com/s/eo5ii7qh80uat2h/1-1.jpg?raw=1", 
  "https://www.dropbox.com/s/2i4zs45rwjosqnl/1-2.jpg?raw=1", 
  "https://www.dropbox.com/s/06tanq8mrzv14vv/1-3.jpg?raw=1",
  "https://www.dropbox.com/s/vmkaix9ev7bslko/2-1.jpg?raw=1", 
  "https://www.dropbox.com/s/w9cv0a5mnb8p31o/2-2.jpg?raw=1", 
  "https://www.dropbox.com/s/hjofjokn4h5h9nt/2-3.jpg?raw=1",
  "https://www.dropbox.com/s/scsdvblhzygck0f/3-1.jpg?raw=1", 
  "https://www.dropbox.com/s/wyg54r8uapszdnr/3-2.jpg?raw=1", 
  "https://www.dropbox.com/s/yofnqozvezkjsnp/3-3.jpg?raw=1",
  "https://www.dropbox.com/s/n5yrhkjrj7n8e4y/before1.png?raw=1",
  "https://www.dropbox.com/s/apsstqsefeelau2/after1.png?raw=1",
  "https://www.dropbox.com/s/js4zhlenttb5asm/before2.png?raw=1",
  "https://www.dropbox.com/s/txwhxutogzhdwk0/after2.png?raw=1"]

  images=[
    ["https://www.dropbox.com/s/eo5ii7qh80uat2h/1-1.jpg?raw=1", "https://www.dropbox.com/s/2i4zs45rwjosqnl/1-2.jpg?raw=1", "https://www.dropbox.com/s/06tanq8mrzv14vv/1-3.jpg?raw=1"],
    ["https://www.dropbox.com/s/vmkaix9ev7bslko/2-1.jpg?raw=1", "https://www.dropbox.com/s/w9cv0a5mnb8p31o/2-2.jpg?raw=1", "https://www.dropbox.com/s/hjofjokn4h5h9nt/2-3.jpg?raw=1"],
    ["https://www.dropbox.com/s/scsdvblhzygck0f/3-1.jpg?raw=1", "https://www.dropbox.com/s/wyg54r8uapszdnr/3-2.jpg?raw=1", "https://www.dropbox.com/s/yofnqozvezkjsnp/3-3.jpg?raw=1"]
  ];
  dataLoaded=false;
  footerEnabled=false;
  text;
  mousewheelEvent;
  mouseMoveEvent;

  notFirst=false;
  notLast=true;

  constructor(@Inject(DOCUMENT) document, private http: HttpClient) {
    for (var i = 0; i < this.imagesToPreload.length; i++) {
      this.preloadedImages[i] = new Image();
      this.preloadedImages[i].src = this.imagesToPreload[i];
    }
    setTimeout(()=>{ }, 10000);    
    this.dataLoaded=true;
    this.text=examples;
   }

  ngOnInit(): void {
    this.mousewheelEvent = this.isFirefox ? "DOMMouseScroll" : "wheel";
    let header = document.getElementsByClassName('ui-section-header');
    header[0].classList.add("small-head");
    this.background = document.getElementsByClassName('background');
    this.throttle = this.throttle.bind(this);
    this.mouseMoveEvent=this.throttle(this.parallaxScroll, 60);
    window.addEventListener(this.mousewheelEvent, this.mouseMoveEvent, false);
    this.startDiashow();
  }

  ngOnDestroy(): void {
    clearInterval(this.diashowInterval);
    window.removeEventListener(this.mousewheelEvent, this.mouseMoveEvent, false);    
  }

  startDiashow() {
    clearInterval(this.diashowInterval);
    this.diashowInterval = setInterval(() => {
      this.diashowCounter++;
      this.background[this.currentSlideNumber].setAttribute("style", "background-image: url(" + this.images[this.currentSlideNumber][this.diashowCounter%this.images[this.currentSlideNumber].length] + ");");
    }, this.diashowDelay)
  }

  throttle(func, delay) {
    var timer = 0;

    return function():void {
        var context = this,
            args = [].slice.call(arguments);

        clearTimeout(timer);
        var timer = setTimeout(()=>{  
            func.apply(context, args);
        }, delay);
    };
  }

      // ------------- DETERMINE DELTA/SCROLL DIRECTION ------------- //
  parallaxScroll = (evt): void => {
    var delta;
    if (this.isFirefox) {
      delta = evt.detail * (-120);
    } else if (this.isIe) {
      delta = -evt.deltaY;
    } else {
      delta = evt.wheelDelta;
    }

    if (this.ticking != true) {
      if (delta <= this.negScrollSensitivitySetting) {
        //Down scroll
        this.nextItem();
      }
      if (delta >= this.scrollSensitivitySetting) {
        //Up scroll
        this.previousItem();
      }
    }
  }

  nextItem(): void {
    this.ticking = true;
    this.notFirst=true;
    if (this.currentSlideNumber !== this.background.length - 1) {
      this.currentSlideNumber++;
      var previousSlide = this.background[this.currentSlideNumber-1];
      previousSlide.classList.remove("up-scroll")
      previousSlide.classList.add("down-scroll");
      this.startDiashow();
    }
    if (this.currentSlideNumber == this.background.length - 1) {
      this.notLast=false;
    }
    this.slideDurationTimeout(this.slideDurationSetting);
  }

  previousItem(): void {
    this.ticking = true;
    this.notLast=true;
      if (this.currentSlideNumber !== 0) {
        this.currentSlideNumber--;
      } 
      if (this.currentSlideNumber == 0) {
        this.notFirst=false;
      }
      var currentSlide = this.background[this.currentSlideNumber];
      currentSlide.classList.remove("down-scroll")
      currentSlide.classList.add("up-scroll");
      this.startDiashow();
      this.slideDurationTimeout(this.slideDurationSetting);
  }

  slideDurationTimeout(slideDuration): void {
    setTimeout(()=>{ 
      this.ticking = false;
    }, slideDuration);
  }

}
