function add_annotLayers(){

    var app = window.app;

    app.editfeatures =  new ol.Collection();
    

    var source_edit = new ol.source.Vector({
        wrapX: false,
        features:app.editfeatures,
        //(new ol.format.GeoJSON()).readFeatures({'type': 'FeatureCollection', 'features': []})
      });
      
      
    var modify = new ol.interaction.Modify({
        features: app.editfeatures
    });


    app.atlas_layer = new ol.layer.Vector( {
	source: new ol.source.Vector({
		wrapX: false,
		})
    })

    

  var vector_edit = new ol.layer.Vector({
        source: source_edit,
        style: new ol.style.Style({
          fill: new ol.style.Fill({
            color: 'rgba(255, 255, 255, 0)'
          }),
          stroke: new ol.style.Stroke({
            color: '#00ff00',
            width: 2
          }),
          image: new ol.style.Circle({
            radius: 7,
            fill: null,
            stroke: new ol.style.Stroke({
              color: '#00ff00',
              width: 2
            }),
          })
        })
    });

  var vector_data = new ol.layer.Vector({
        source : new ol.source.Vector({
        wrapX: false,
        }),
        style: new ol.style.Style({
          fill: new ol.style.Fill({
            color: 'rgba(255, 255, 255, 0)'
            
          }),
          stroke: new ol.style.Stroke({
            color: '#000000',
            width: 2
          }),
          image: new ol.style.Circle({
            radius: 7,
            fill: new ol.style.Fill({
              color: '#ffcc33'
            })
          })
       })
      });


  var  vector_deletions = new ol.layer.Vector({
        source: new ol.source.Vector({wrapX:false}),
        visible:false,
        style: new ol.style.Style({
        fill: new ol.style.Fill({
            color: 'rgba(255, 255, 255, 0)'
            }),
            stroke: new ol.style.Stroke({
            color: '#ff0000',
            width: 2
        }),
        image: new ol.style.Circle({
        radius: 7,
        fill: new ol.style.Fill({
            color: '#ff0000'
          })
        })
      })
    });

   var highlightStyle = new ol.style.Style({
        stroke: new ol.style.Stroke({
          color: '#f00',
          width: 1
        }),
        fill: new ol.style.Fill({
          color: 'rgba(255,0,0,0.1)'
        }),
        text: new ol.style.Text({
          font: '12px Calibri,sans-serif',
          fill: new ol.style.Fill({
            color: '#000'
          }),
          stroke: new ol.style.Stroke({
            color: '#f00',
            width: 3
          })
        })
      });


    var split_layer = new ol.layer.Vector({

		source : new ol.source.Vector({
		  url : 'http://mitradevel.cshl.org/static/tile_split.json',
		  format : new ol.format.GeoJSON(),
		  wrapX : false
	   }),
		
		style : new ol.style.Style({
		  fill : new ol.style.Fill({
			   color : 'rgba(255,255,255,0)'
			}),
		 stroke : new ol.style.Stroke({
			color : '#ffffff',
			width : 1
		  }),
		 image : new ol.style.Circle({
			radius : 7,
			fill : new ol.style.Fill({
			 color : '#ffcc33' })
			})
		})
	
    });


//	var split_coord = app.split_layer_coords;
//	console.log(split_coord);
	
//    for (var i = 1080; i < 24000;i+1080){
	
//	split_layer.getSource().addFeature(new ol.Feature(new ol.geom.LineString([[i,0],[i,-18000]])))
	  
//	}
	
   

    var featureOverlay = new ol.layer.Vector({
	source:new ol.source.Vector(),
	style : function(feature){
	   highlightStyle.getText().setText(feature.get('name'));
	   return highlightStyle;
	}

    });

    var highlight;
    
    app.vector_edit = vector_edit;
    app.vector_data = vector_data;
    app.vector_deletions = vector_deletions;
    app.featureOverlay = featureOverlay;
    app.split_layer = split_layer;
    app.map.addLayer(app.atlas_layer);
    app.map.addLayer(app.vector_edit);
    app.map.addLayer(app.vector_data);
    app.map.addLayer(app.vector_deletions);
    app.map.addLayer(app.featureOverlay);
    app.map.addLayer(app.split_layer);	
    app.modify = modify;
    app.highlight = highlight;
    // app.map.addInteraction(modify);
}

function set_draw_style(){

draw_style = new ol.style.Style({
    fill: new ol.style.Fill({
      color: 'rgba(255, 255, 255, 0)'
    }),
    stroke: new ol.style.Stroke({
      color: '#ff00ff',
      width: 4
    }),
    image: new ol.style.Circle({
      radius: 4,
      fill : new ol.style.Fill({
        color : 'rgba(0,0,255,1)' 
    }),
      stroke: new ol.style.Stroke({
         color: '#0000ff',
         width: 2
      })
  }),
  });
  var app = window.app;
  app.draw_style = draw_style;

}


function displayFeatureInfo(pixel){
  var app = window.app;
  var highlight = app.highlight;
  var feature = app.map.forEachFeatureAtPixel(pixel,function(feature){
	return feature;
   });
  var info  = document.getElementById('info');
  if (feature){
      info.innerHTML = feature.getId() + ':' + feature.get('name');
   }
  else{
      info.innerHTML = '&nbsp';	
   }
  if (feature !== highlight){
 
     if ( highlight){
	featureOverlay.getSource().removeFeature(highlight);
   } 
     if (feature){
	featureOverlay.getSource().addFeature(feature);	
    }
   highlight = feature;

   }



}




// function add_controls(){
//   var mousePositionControl = new ol.control.MousePosition({
//     coordinateFormat: ol.coordinate.createStringXY(4),
//     projection: 'EPSG:4326',
//     // comment the following two lines to have the mouse position
//     // be placed within the map.
//     className: 'custom-mouse-position',
//   //  target: document.getElementById('mouse-position'),
//      target:document.getElementById('mouse_positions'),
//       undefinedHTML: '&nbsp;'
//   });
//   var app = window.app;
//   app.add_control(mousePositionControl);

// }

var thickLineToPolygon = (function () {
  function getOffsets(a,b,thickness) {
    dx = b[0] - a[0];
    dy = b[1] -a[1];
    len = Math.sqrt(dx*dx + dy*dy);
    scale = thickness / (2*len);
    ddx = -scale*dy;
    ddy = scale*dx;
    //ddx = ddx + (ddx >0)?0.5:-0.5;
    //ddy = ddy + (ddy>0)?0.5:-0.5;
    return [ddx, ddy];
  }
  
  function getIntersection(a1, b1, a2, b2) {
    k1 = (b1[1]-a1[1])/(b1[0]-a1[0]);
    k2 = (b2[1]-a2[1])/(b2[0]-a2[0]);
    
    if(k1===k2) return;
    if(!isFinite(k1) || !isFinite(k2)) return;
    
    m1 = a1[1] - k1*a1[0];
    m2 = a2[1] - k2*a2[0];
    
    x = (m1-m2)/(k2-k1);
    
    y = k1 * x + m1;
    
    return [x,y];
  }
  
    //points is linestring
  
  function me(points, thickness) {
    var off,
      poly = [],
      isFirst, isLast,
      prevA, prevB,
      interA, interB,
      p0a, p1a, p0b, p1b;
    
    for(var i=0, i1=points.length - 1; i<i1; i++) {
      isFirst=!i;
      isLast = (i===points.length-2);
      
      off = getOffsets(points[i], points[i+1], thickness);
      
      p0a = [ points[i][0]+off[0], points[i][1]+off[1] ];
      p1a = [ points[i+1][0]+off[0], points[i+1][1]+off[1]];
      
      p0b = [points[i][0] - off[0], points[i][1] -off[1]];
      p1b = [points[i+1][0] -off[0], points[i+1][1]-off[1]];
      
      if (!isFirst) {
        if(interA=getIntersection(prevA[0],prevA[1], p0a, p1a)) {
          poly.unshift(interA);
        }
        if(interB=getIntersection(prevB[0], prevB[1], p0b, p1b)){
          poly.push(interB);
        }
      }
      
      if(isFirst) {
        poly.unshift(p0a);
        poly.push(p0b);
      }
      
      if(isLast) {
        poly.unshift(p1a);
        poly.push(p1b);
      }
      
      if(!isLast) {
        prevA = [p0a, p1a];
        prevB = [p0b, p1b];
      }
    }
    
    return poly;
    
  }
  
  return me;
}());




function remove_user(){
 $('#username').html('');
 $('#login').show();
 $('#logout').hide();
 $('#callpost').hide();
}

function add_user(){
   var cont = window.app.username;
   if (cont) {
   $('#username').html(cont);
   $('#logout').show();
   $('#login').hide();
   $('#callpost').show();
 }
}

// function line_thickness(){

//   $('#line_width').
// }

