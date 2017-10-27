import { Routes } from '@angular/router';
import { MapComponent } from "./map/map.component";
// import { SliderCheckComponent } from "./slider-check/slider-check.component";
import { RangeslideComponent } from "./rangeslide/rangeslide.component";
import { ThumbnailComponent } from "./thumbnail/thumbnail.component";
//import {SliderComponent} from "./slider/slider.component";
export const rootRouterConfig: Routes = [
    {path:'map',component:MapComponent},
    // {path:'slider',component:SliderCheckComponent},
    {path:'rangeslider',component:RangeslideComponent},
    {path:'thumbnail',component:ThumbnailComponent},
   // {path:'slider',component:SliderComponent}

];


