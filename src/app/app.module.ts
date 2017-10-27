import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule} from "@angular/router";
import { HttpModule } from '@angular/http';
import { MatSliderModule} from '@angular/material/';
// import {Ng2SliderComponent} from 'ng2-slider-component';
//import {SliderModule} from 'primeng/primeng';

import { rootRouterConfig } from './route';
import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { HttpTestService } from "./httpservice";
import { ThumbnailComponent } from './thumbnail/thumbnail.component';

import { RangeslideComponent } from './rangeslide/rangeslide.component';
// import { SlickModule} from "ngx-slick";

// import {  } from "@angular/";
// declare var angular: any;

import {SliderComponent}from './slider/slider.component';
//import {MdSliderModule} from '@angular2-material/slider';
//import { MdInputModule } from '@angular2-material/input';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';




@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    //SliderModule,
    MatSliderModule,
    RouterModule.forRoot(rootRouterConfig, { }),
    // SlickModule.forRoot(),

  ],
  declarations: [
    AppComponent,
    MapComponent,
    ThumbnailComponent,
    RangeslideComponent,
    SliderComponent,
    // myAppModule
  ],
  
  
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
