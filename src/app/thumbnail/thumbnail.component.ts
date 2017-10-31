import { Component, OnInit, ElementRef, ChangeDetectionStrategy } from '@angular/core';
import { HttpTestService } from '../httpservice';
import { Observable } from "rxjs/Observable";
declare function thumbnail_init(inp: any, secids_nis: any, secids_flu: any,bregmas:any);
declare function thumbnail_load();

@Component({
  selector: 'app-thumbnail',
  templateUrl: './thumbnail.component.html',
  styleUrls: ['./thumbnail.component.css'],
  providers: [HttpTestService],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ThumbnailComponent implements OnInit {


  thumbnails_path;
  // slide_array  : Array<string>;
  // slide_observ : Observable<Array<string>>;
  // slide_array  : Array<number>;
  // slide_observ : Observable<Array<any>>;
  slide_array: Observable<any>;
  slide_out = [];
  sectionids_nissl = [];
  sectionids_fluo = [];
  bregmas = [];

  constructor(private _httpService: HttpTestService) { }


  ngOnInit() {
    // thumbnail_init();
    this._httpService.getthumbnails().subscribe(
      data => {
      this.slide_array = data;
        // console.log(this.slide_array);
        this.extract_fluo_tnails();
        thumbnail_init(this.slide_out, this.sectionids_nissl, this.sectionids_fluo,this.bregmas);
        // console.log(this.slide_out);
        thumbnail_load();
        // this.slide_array.forEach
      });
  }

  ngAfterViewInit() {
    // thumbnail_load();
  }



  extract_fluo_tnails() {

    var tmplist = this.slide_array["N"];
    var tmpslides = [];
    var secids_nissl = [];
    var secids_fluo = [];
    

    for (var ii = 0; ii < tmplist.length; ++ii) {
      
      secids_nissl[tmplist[ii][0]] = tmplist[ii][2];
    }
    // console.log(tmpslides);
    // display thumbnail down
    
    // ids for nissl to refresh map
    this.sectionids_nissl = secids_nissl;

    tmplist = this.slide_array["F"];
    for (var ii = 0; ii < tmplist.length; ++ii) {
      tmpslides[tmplist[ii][0]] = tmplist[ii][1];
      secids_fluo[tmplist[ii][0]] = tmplist[ii][2];
      this.bregmas[tmplist[ii][0]] = tmplist[ii][3];
    }
    // console.log(bregmas);
    // ids for flouro to refresh map
    this.sectionids_fluo = secids_fluo;
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

  image_clicked() {
    console.log("Clicked");
  }

}