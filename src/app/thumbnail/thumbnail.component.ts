import { Component, OnInit,ElementRef } from '@angular/core';
import{ HttpTestService } from'../httpservice';
declare function create_thumbnail();
// import $ from "jqeury";

@Component({
  selector: 'app-thumbnail',
  templateUrl: './thumbnail.component.html',
  styleUrls: ['./thumbnail.component.css'],
  providers:[HttpTestService]
})

export class ThumbnailComponent implements OnInit {
  thumbnails_path:any;
  show = false;
  fluo_tnails = [];
  $element: any;
  defaultOptions : {
    "lazyLoad": 'ondemand',
    "slidesToShow": 9,
    "slidesToScroll": 5,
    "initialSlide": 13,
    "prevArrow": '<a href="#" class="prev">prev</a>',
    "nextArrow": '<a href="#" class="next">next</a>',
    "infinite": false
}

  constructor(private _httpService: HttpTestService,private el: ElementRef){
    
  }

  ngOnInit() {
    this._httpService.getthumbnails().subscribe(
      data=>{this.thumbnails_path = data;
       this.extract_fluo_tnails();
       
     }
    )
  }

  ngAfterViewInit(){
    // this.$element = jQuery(this.el.nativeElement).slick(this.defaultOptions)
    // create_thumbnail();
  }

  extract_fluo_tnails(){

    var tmplist = this.thumbnails_path["F"];

    for(var ii=0;ii<tmplist.length;++ii) {
      this.fluo_tnails[tmplist[ii][0]]=tmplist[ii][1];
    }

    // for(var ii=0;ii<tmplist.length;++ii) {
    //   this.fluo_tnails.push(tmplist[ii][1]);
    // }

    // console.log(tmplist);
    this.show = true;
  }

}
