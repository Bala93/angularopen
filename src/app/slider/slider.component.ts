import { Component,Input,Output,OnInit,EventEmitter } from '@angular/core';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import {MatSliderModule,MatSliderChange} from '@angular/material';


@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})

  
    

export class SliderComponent  {


    change(evt){
        
        console.log(evt.value);
    }
        
}  
  


