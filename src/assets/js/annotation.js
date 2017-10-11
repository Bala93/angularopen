function add_annotLayers(){

    var app = window.app;

    var source_edit = new ol.source.Vector({
        wrapX: false,
        features: (new ol.format.GeoJSON()).readFeatures({'type': 'FeatureCollection', 'features': []})
      });
    
    vector_edit = new ol.layer.Vector({
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

    vector_data = new ol.layer.Vector({
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


    vector_deletions = new ol.layer.Vector({
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
    
    
    app.vector_edit = vector_edit;
    app.vector_data = vector_data;
    app.vector_deletions = vector_deletions;
    app.map.addLayer(app.vector_edit);
    app.map.addLayer(app.vector_data);
    app.map.addLayer(app.vector_deletions);

}

function set_draw_style(){

draw_style = new ol.style.Style({
    fill: new ol.style.Fill({
      color: 'rgba(255, 255, 255, 0)'
    }),
    stroke: new ol.style.Stroke({
      color: '#ff00ff',
      width: 2
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