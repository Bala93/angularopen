import { Component, OnInit,ElementRef,ChangeDetectionStrategy } from '@angular/core';
import{ HttpTestService } from'../httpservice';
import { Observable } from "rxjs/Observable";
declare function thumbnail_init(inp:any);
declare function thumbnail_load();

@Component({
  selector: 'app-thumbnail',
  templateUrl: './thumbnail.component.html',
  styleUrls: ['./thumbnail.component.css'],
  providers:[HttpTestService],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ThumbnailComponent implements OnInit {

  
thumbnails_path;
// slide_array  : Array<string>;
// slide_observ : Observable<Array<string>>;
// slide_array  : Array<number>;
// slide_observ : Observable<Array<any>>;
slide_array  : Observable<any>;
slide_out = [];

    // slideConfig  = {
    //   // "lazyLoad": 'ondemand',
    //   "slidesToShow": 5,
    //   "slidesToScroll": 3,
    //   "initialSlide": 13,
    //   "prevArrow": '<a href="#" class="prev">prev</a>',
    //   "nextArrow": '<a href="#" class="next">next</a>',
    //   "infinite": false,
    // }

constructor(private _httpService: HttpTestService){}


ngOnInit(){
  // thumbnail_init();
  this._httpService.getthumbnails().subscribe(
    data=>{this.slide_array = data;
    this.extract_fluo_tnails();
    thumbnail_init(this.slide_out);
    // console.log(this.slide_out);
    thumbnail_load();
    // this.slide_array.forEach
   });
}

ngAfterViewInit(){
  // thumbnail_load();
}



extract_fluo_tnails(){
  
      var tmplist = this.slide_array["F"];
      var tmpslides = []
      for(var ii=0;ii<tmplist.length;++ii) {
          tmpslides.push(tmplist[ii][1]);
      }
      // console.log(tmpslides);
      this.slide_out = tmpslides;
      // for(var ii=0;ii<tmplist.length;++ii) {
      //   // this.slides.push('<div><img data-lazy = "http://mouse.brainarchitecture.org" + tmplist[ii][1]/></div>');
      //   this.slides.push("Hai")
      // }
      // var count =0 ;
      // for (var ii=0;ii<tmplist.length;++ii){
      //   this.slide_array.push(count);
      //   count += 1;
      // }

      // this.slide_observ =
      // // console.log(this.slides);
      // // this.show = true;

      // return tmpslides
  }
  
}
