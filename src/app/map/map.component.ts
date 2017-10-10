import { Component, OnInit } from '@angular/core';
import{ HttpTestService } from'../httpservice';
import { HostListener } from "@angular/core";

import * as $ from "jquery";
declare var ol:any;

declare function setupOL();
declare function initLayers();
declare function add_annotLayers();
// declare function add_controls();
declare function set_draw_style();
// declare function 


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  providers:[HttpTestService]
})

export class MapComponent implements OnInit {

  app;
  draw;
  //select;
  geom_type = "Point";
  drawtype  = false;
  total_detections:any;
  drawn_features:any;
  deleted_features:any;
  response=false;
  response_msg;
  getData;
  first_pass_length;

  constructor(private _httpService: HttpTestService){
  }
    
  ngOnInit() {
    this.app = window["app"];
  }

  ngAfterViewInit(){
        
    setupOL();
    initLayers();
    add_annotLayers();
    // add_controls();
    set_draw_style();
    this.vector_edit_change();
    this.getpolygons();
    this.maponclick();

    //this.select = this.app.select;

    //var slidervalues = [0,128,256,512,1024,2048,4095];

    

    // $("#resamp").click(function(){

      
    //     //$("#target").empty();
    //     var app=window["app"];      
    //      var crange = app.crange;
    //      //setupOL();
    //      app.crange = "0-1024,0-255,0-255";
  
    //    console.log(app.crange);
    //     //console.log(window);
    //   initLayers();
    //   });  
  } 
  
addInteraction(devicevalue) {

 // var devicevalue = (<HTMLInputElement>document.getElementById('modetype')).value;
  // var value;

  if (devicevalue !== 'None') {
        // console.log('In');
        this.draw = new ol.interaction.Draw({
          source:this.app.vector_edit.getSource(),
          type: devicevalue,
          style:this.app.draw_style,   
      });
        this.app.map.addInteraction(this.draw);
     }
} 

maponclick(){
  
      var this_ = this;
      
      this.app.map.on('click', function(evt) {
      //  if (evt.dragging) return;
      //  if (intSelect.value!='Delete') return;
      var selectvalue=(<HTMLInputElement>document.getElementById('modetype')).value;
         if (evt.dragging) return;
         if (selectvalue!='delete') return;  
  
  
      var pixel = this_.app.map.getEventPixel(evt.originalEvent);
      var feature = this_.app.map.forEachFeatureAtPixel(pixel,
          function(feature, layer) {
              var layername = layer.get('name');
              if(layername=='guardlayer')
                  return undefined;
              return feature;
          });
      if (feature!== undefined){
        
        var featureid = feature.getId();
        //var firstpass = vector_data.getSource().getFeatures();
        //var featurearr= vector_edit.getSource().getFeatures();
        var featureprops = feature.getProperties();
  
        if(featureid==undefined || featureid > this_.first_pass_length)
          {
            if(featureprops.hasOwnProperty('name') && featureprops.name=='guard')
              return;
            this_.app.vector_edit.getSource().removeFeature(feature);        
          }
        else 
          {    
              this_.app.vector_data.getSource().removeFeature(feature);
              this_.app.vector_deletions.getSource().addFeature(feature);
          }
  
        }
          this_.updateCounts();
    });
    
  }




//Events  
onChangeGeometry(deviceValue) {
  this.geom_type = deviceValue;
  this.app.map.removeInteraction(this.draw);
  // this.app.map.removeInteraction(this.select);
  this.addInteraction(deviceValue);  
}

onchangeMode(mode){
  console.log(mode);
  if (mode == "draw"){
    //  this.app.map.removeInteraction(this.select);
     this.drawtype =true;
     this.addInteraction(this.geom_type);
    }
  if (mode == "view"){
    this.app.map.removeInteraction(this.draw);
    // this.app.map.removeInteraction(this.select);
    this.drawtype =false;
    
    }
  if (mode == "delete"){
    this.app.map.removeInteraction(this.draw);
    // this.app.map.addInteraction(this.select);  
    this.drawtype =false;
  }
    
}

vector_edit_change(){

  var this_ = this;

  this.app.vector_edit.on('change',function(){
    this_.updateCounts();
  })

}

callpost(event){
  

  this.response=true;
  this.response_msg="Saving";
  var features_new = this.app.vector_edit.getSource().getFeatures();
  var  features_del = this.app.vector_deletions.getSource().getFeatures();
  var del_feat_id = [];   
  var added_features = [];
  var post_data;
  var final_features;

  for ( var i in features_del){
   del_feat_id.push(features_del[i].getId());
  }

  for( var i in features_new){
    var temp_features = new ol.format.GeoJSON().writeFeature(features_new[i]);
    added_features.push(JSON.parse(temp_features));
  }


  final_features = {'type':'FeatureCollection','features':added_features};

  post_data={"deletedids":del_feat_id,"drawnfeat":JSON.stringify(final_features)};
  console.log(post_data);

  this._httpService.postFeatures(post_data).subscribe(
   (response)=>{
    var status = response.json()[0];
    if (status == "Success"){
      setTimeout(()=>{
        this.response=false;
        this.response_msg="Saved"
     },2000); 
    }
   }
 );

}


getpolygons(){
  this._httpService.getfirstpasspolygons().subscribe(
    data=>{this.getData=data;
    this.add_polygon_feature(data);
    console.log(data);
 },
   error=>alert(error),
); 
 
}update

add_polygon_feature(getData){
  //Add features to the vector_data -- Firstpass
  console.log(getData[0].firstpass);
  var json_data;
  var temp_json=getData[0].firstpass;
  var temp_draw =getData[0].drawnfeat;
  var draw_data;
  var deleted_ids= getData[0].deletedids;

  // This is to add firstpass data to the vector_data layer. The addition is done based on considering the deleted
  // ids. If the id is present in deleted id list then the polygon is added to the delete layer.
  if(temp_json.length!=0)
    json_data = (new ol.format.GeoJSON()).readFeatures( getData[0].firstpass);
  else
    json_data=(new ol.format.GeoJSON()).readFeatures({'type': 'FeatureCollection', 'features': []});

  this.first_pass_length = json_data.length;
  for (var i in json_data){ 
   
    if (deleted_ids.indexOf(json_data[i].getId()) !=-1){
        this.app.vector_deletions.getSource().addFeature(json_data[i]);
    }
    else{
        this.app.vector_data.getSource().addFeature(json_data[i]);
    }

  }
  
  // This is to add the polygons drawn by the user. 
  if(temp_draw.length!=0)
   draw_data = (new ol.format.GeoJSON()).readFeatures(getData[0].drawnfeat);
  else
    draw_data=(new ol.format.GeoJSON()).readFeatures({'type': 'FeatureCollection', 'features': []})

    this.app.vector_edit.getSource().addFeatures(draw_data);
  /*
    for (var i in draw_data){
      vector_edit.getSource().addFeature(draw_data[i]);
    }
    */
  this.updateCounts();

}




updateCounts(){
  this.total_detections=this.app.vector_data.getSource().getFeatures().length;
  this.drawn_features=this.app.vector_edit.getSource().getFeatures().length;
  this.deleted_features=this.app.vector_deletions.getSource().getFeatures().length;

}

setDefault(){
  //Set default -- 
  // this.app.map.getView().setZoom(1);
  // this.app.map.getView().setCenter([554/2,-554/2]);
}

// Catch the checkbox state -- firstpass
groundtruth(event){
  console.log("ground");
  if(event.target.checked){
    this.app.vector_data.setVisible(true);
  }
  else{
    this.app.vector_data.setVisible(false);
  }

}

// Catch the checkbox state -- user drawn
userdraw(event){
console.log("userdraw")
  if(event.target.checked){
    this.app.vector_edit.setVisible(true);
  }
  else{
    this.app.vector_edit.setVisible(false);
  }
}

// Catch the checkbox state -- user deleted
userdel(event){
console.log("userdel")
if(event.target.checked){
    this.app.vector_deletions.setVisible(true);
  }
  else{
    this.app.vector_deletions.setVisible(false);
  }

}

// Catch events
@HostListener('window:keydown',['$event'])
eventHandler(event:KeyboardEvent){
  var pressedkey = event.code;
  // console.log(pressedkey);
  if (pressedkey == 'Escape'){  
    // map.removeInteraction(select);
    var device_state=(<HTMLInputElement>document.getElementById('modetype')).value;
    var draw_state = (<HTMLInputElement>document.getElementById('type')).value;
    if(device_state=='draw') 
      {
        this.app.map.removeInteraction(this.draw);
        this.addInteraction(draw_state);
      }
    } 

}

}
