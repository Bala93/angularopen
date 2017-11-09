
function rft_nissl() {
	return 'MouseBrain/' + app.seriesid_nissl; //+'&svc.crange='+app.crange+'&svc.gamma='+app.gamma;
}

function rft_fluo() {
	return 'MouseBrain/' + app.seriesid_fluo + '&svc.crange=' + app.crange + '&svc.gamma=' + app.gamma;
}

var url = 'http://mouse.brainarchitecture.org/webapps/adore-djatoka/resolver';

var app = {};
window.app = app;


function initLayers(update_fluo_only) {

	if (!update_fluo_only || update_fluo_only == 'undefined') { // no parameters set
		//load nissl also
		jsrc = new ol.source.Djatoka({
			url: url,
			image: rft_nissl(),
		});


		jsrc.getImageMetadata(app.totalfunction.bind(null, jsrc, 0));
	}

	//fluo / IHC here
	jsrc2 = new ol.source.Djatoka({
		url: url,
		image: rft_fluo(),
	});

	jsrc2.getImageMetadata(app.totalfunction.bind(null, jsrc2, 1))


}

function update_tiles(secidx_nis, secidx_fluo) {
	app.seriesid_nissl = secidx_nis;
	app.seriesid_fluo = secidx_fluo;
	//TODO: update annotation layer also
}

function setupOL(secidx_nis, secidx_fluo) {

	var app = window.app;

	app.seriesid_nissl = '';
	app.seriesid_fluo = '';

	if (secidx_nis > 0)
		app.seriesid_nissl = secidx_nis;
	if (secidx_fluo > 0)
		app.seriesid_fluo = secidx_fluo;

	app.crange = '0-255,0-255,0-255'
	app.gamma = '1'

	res = 24000 / 4.8 * 0.46; //24000= pix width of image, 0.46 = um per pix
	//4.8 = ??


	//app.proj = null;

	app.map_view = null; //for checking allocating once 

	// app.select = new ol.interaction.Select( { 
	// 	wrapX: false
	// });

	var mousePositionControl = new app.MousePosition({
		coordinateFormat: ol.coordinate.createStringXY(1),
		projection: 'pixels',
		className: 'custom-mouse-position',
		target: document.getElementById('mouse-position'),
		undefinedHTML: '&nbsp;'
	});



	app.map = new ol.Map({

		target: 'target',
		// interactions:ol.interactions.defaults.extend([app.select]),
		//layers: [imageLayer],	
		//view: app.map_view,
		pixelRatio: 1,
		controls: ol.control.defaults({
			attribution: false
		}).extend([mousePositionControl]),
		logo: false

	});

	app.map.on('moveend', function(evt) {
            var map = evt.map;
            var view = map.getView();
            var extent = view.calculateExtent(map.getSize());

	    left = extent[0];
	    top_1 = extent[3];
	    width = extent[2]-left;
	    height = top_1 - extent[1];
	    factor_x = 120.0/24000; //187.0/24000;
	    factor_y = 90.0/18000; //150.0/18000;
	    width_f =  factor_x*width;
	    height_f = factor_y*height;
	    left_f = left*factor_x;
	    top_f =-top_1*factor_y;
	    if ( (left_f < 0 && width_f > 187) || (top_f < 0 && height_f > 140 ) ){
	        $('#tnailzone').css('display','none');
	    }
	    else
	    {
	        $('#tnailzone').css({'width':(width_f) + 'px','height':(height_f)+'px', 'left':(left_f)+'px', 'top':top_f+'px','display':'block'});
	    }

            //localStorage['last_extent'] = JSON.stringify(extent);
            //localStorage['last_zoom'] = JSON.stringify(view.getZoom());
        });

	app.layers = [];


	app.totalfunction = function (b, idx) {

		var meta = b.getMeta();
		var imgWidth = meta.width;
		var imgHeight = meta.height;

		var proj = new ol.proj.Projection({
			code: 'DJATOKA',
			units: 'pixels',
			extent: [0, 0, 256 * Math.pow(2, meta.levels - 1), 256 * Math.pow(2, meta.levels - 1)],
			getPointResolution: function (resolution, point) {
				return resolution / res;
			}
		});

		if (app.layers[idx] == undefined) {
			var imageLayer = new ol.layer.Tile({
				source: b,
				projection: proj,
				opacity: 0.5,
			});
			app.map.addLayer(imageLayer);
			app.layers[idx] = imageLayer;
		}
		else {
			console.log('setting ' + idx)
			app.layers[idx].setSource(b);
		}

		var imgCenter = [imgWidth / 2, -imgHeight / 2];
		//imagedims = [imgWidth,imgHeight];

		if (app.map_view == null) {

			app.map_view = new ol.View({
				zoom: 2,
				maxZoom: meta.levels - 1,
				projection: proj,
				center: imgCenter,
				extent: [-0.1 * imgWidth, -0.9 * imgHeight, 1.1 * imgWidth, 0.1 * imgHeight]
			});

			app.map.setView(app.map_view);

			app.map_view.on('change:resolution', function(evt) {
			    var view = evt.target;
			    var map = app.map;
			    var extent = view.calculateExtent(map.getSize());
			    //localStorage['last_extent'] = JSON.stringify(extent);
			    //localStorage['last_zoom'] = JSON.stringify(view.getZoom());
			    /*var center = viewState.center;
			    var projection = viewState.projection;
			    var pointResolution =
				projection.getPointResolution(viewState.resolution, center);
				*/
			    var zoom  = evt.target.getZoom();
			    if (zoom >= 5) {
			    }
			});



		}


	}
}
function annotWindow(){

	$("#annotstate").click(function(){
		$("#annotwindow").toggle();
	});

}

function sagittal_localize(){
	// var nslices = app.nslices;
	// var slice_no = 13;
	// $('#sagittal_pos').css('left',parseFloat(slice_no)/nslices * 180+'px');
	$('#sagittal').click(function (evt) {
		// var app = window.app;
		var nslices = app.nslices;
		x = evt.pageX - $(this).offset().left;
		$('.regular').slick('slickGoTo',x/180*nslices);
	});
}

function create_zoom_slider(){
	// var app = window.app;
	// zoomslider = new ol.control.ZoomSlider();
	// app.map.addControl(zoomslider);
}

// function mapPosition(){
// 	var app = window.app;

// 	var mousePositionControl = new app.MousePosition({
// 		coordinateFormat: ol.coordinate.createStringXY(1),
// 		projection: 'pixels',
// 		className: 'custom-mouse-position',
// 		target: document.getElementById('mouse-position'),
// 		undefinedHTML: '&nbsp;'
// 	});

// }

function brain_info_view(){

	$('#info-trigger').click(function(){
		$('#info-content').toggle();
	});


	// $("#info-trigger").hover(function(){
	// 	$("#info-content").fadeIn();
		
	//   },function(){
	// 	$("#info-content").fadeOut();

	//   })
}



