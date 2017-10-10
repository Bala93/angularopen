import { Component, OnInit } from '@angular/core';
declare function createsliders();
declare function initLayers(reload_fluo:boolean);
  


@Component({
  selector: 'app-rangeslide',
  templateUrl: './rangeslide.component.html',
  styleUrls: ['./rangeslide.component.css']
})
export class RangeslideComponent implements OnInit {
  app;

  constructor() { }

  ngOnInit() {
    this.app = window["app"];
  }
  
  ngAfterViewInit(){

    createsliders();
  }

  resample(){
    console.log("resample");
    // get gamma
    // console.log(this.app.gam);
    
    this.app.crange = this.app.cnt1[0] + '-' + this.app.cnt2[0] + ',' + 
                    this.app.cnt1[1] + '-' + this.app.cnt2[1] + ',' + 
                    this.app.cnt1[2] + '-' + this.app.cnt2[2]



    console.log(this.app.crange);
    initLayers(true);


  }

  default(){
    console.log("default");
    this.app.crange = "0-255,0-255,0-255";
    this.app.gamma = '1';
    //console.log(this.app.crange);
    initLayers(false);
  }
}
