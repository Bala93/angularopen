import { Component, OnInit } from '@angular/core';
import { MatSliderModule } from "@angular/material";

@Component({
  selector: 'app-slider-check',
  templateUrl: './slider-check.component.html',
  styleUrls: ['./slider-check.component.css']
})
export class SliderCheckComponent implements OnInit {
  max = 100;
  min = 0;
  step = 10;
  value = 0;
  thumbLabel = true;
  vertical = false;
  disabled = false;
  invert = false;
  tickInterval = false;


  constructor() { }

  ngOnInit() {

  }

  getSlider(){

    console.log(this.value);
  }

}
