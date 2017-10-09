import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule} from "@angular/router";
import { HttpModule } from '@angular/http';
import { MatSliderModule} from '@angular/material/';

import { rootRouterConfig } from './route';
import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { HttpTestService } from "./httpservice";
import { ThumbnailComponent } from './thumbnail/thumbnail.component';
import { SliderCheckComponent } from './slider-check/slider-check.component';
import { RangeslideComponent } from './rangeslide/rangeslide.component';
// import { SlickModule} from "ngx-slick";
// declare var angular: any;



@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    ThumbnailComponent,
    SliderCheckComponent,
    RangeslideComponent,
    // myAppModule
  ],
  imports: [

    BrowserModule,
    HttpModule,
    MatSliderModule,
    RouterModule.forRoot(rootRouterConfig, { })
    
    // SlickModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
