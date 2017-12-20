
function rft_nissl() {
	return 'MouseBrain/' + app.seriesid_nissl; //+'&svc.crange='+app.crange+'&svc.gamma='+app.gamma;
}

function rft_fluo() {
	return 'MouseBrain/' + app.seriesid_fluo + '&svc.crange=' + app.crange + '&svc.gamma=' + app.gamma;
}

var url = 'http://mouse.brainarchitecture.org/webapps/adore-djatoka/resolver';

var app = {};
window.app = app;

app.seriesid_nissl = '';
app.seriesid_fluo = '';

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
	if (secidx_nis > 0)
		app.seriesid_nissl = secidx_nis;
	if (secidx_fluo > 0)
		app.seriesid_fluo = secidx_fluo;

	//TODO: update annotation layer also
}


function setupOL() { //secidx_nis, secidx_fluo) {

	var app = window.app;


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

	var ScaleLine = function(opt_options) {
        	var options = opt_options || {};
        	options.render = ScaleLine.render;
        	var className = typeof options.className !== 'undefined' ?
            	options.className : 'ol-scale-line';

        	this.innerElement_ = document.createElement('div');
        	this.innerElement_.className = 'ol-scale-line-inner';

        	this.element_ = document.createElement('div');
        	this.element_.className = className + ' ol-unselectable';
        	this.element_.appendChild(this.innerElement_);

        	this.viewState_ = null;

        	this.minWidth_ = typeof options.minWidth !== 'undefined' ? options.minWidth : 64;

        	this.renderedVisible_ = false;

       	 	this.renderedWidth_ = undefined;
        	this.renderedHTML_ = '';
        	//var render = options.render ? options.render : ol.control.ScaleLine.render;

        	ol.control.Control.call(this, {
            		element: this.element_,
            		render: ScaleLine.render,
            		target: options.target
       		});

        		//goog.events.listen(
        		//    this, ol.Object.getChangeEventType(ol.control.ScaleLineProperty.UNITS),
        		//    this.handleUnitsChanged_, false, this);

        		//this.setUnits(/** @type {ol.control.ScaleLineUnits} */ (options.units) ||
        		//    ol.control.ScaleLineUnits.METRIC);

    	};

	ol.inherits(ScaleLine, ol.control.ScaleLine);

    	ScaleLine.render = function(mapEvent) {
        	var frameState = mapEvent.frameState;
        	if (frameState === null) {
            		this.viewState_ = null;
        	} else {
            		this.viewState_ = frameState.viewState;
        	}
        	this.updateElement_();
    	};
    	ScaleLine.prototype.updateElement_ = function () {
        	var viewState = this.viewState_;
        	if (viewState === null) {
            		if (this.renderedVisible_) {
                		this.element_.style.display = 'none';
                		this.renderedVisible_ = false;
            		}
            		return;
        	}

        	var center = viewState.center;
        	var projection = viewState.projection;
        	var pointResolution =projection.getPointResolution(viewState.resolution, center);
        	//var projectionUnits = projection.getUnits();
        	var suffix = 'mm';

        	/*var units = this.getUnits();
        var nominalCount = this.minWidth_ * pointResolution;
        var i = 3 * Math.floor(Math.log(this.minWidth_ * pointResolution) / Math.log(10));
        var count, width;
        while (true) {
            count = ol.control.ScaleLine.LEADING_DIGITS[i % 3] * Math.pow(10, Math.floor(i / 3));
            width = Math.round(count / pointResolution);
            console.log('i', i, 'width', width, 'count', count, 'res', pointResolution);
            if (isNaN(width)) {
                //goog.style.setElementShown(this.element_, false);
                this.renderedVisible_ = false;
                return;
            } else if (width >= this.minWidth_) {
                break;
            }
            ++i;
        }
        */
        	var count, width;
        	count = 1.;
        	width = Math.round(count / pointResolution);
        	while (true) {
            		if (width > 500) {
                	count /= 2;
                	width /= 2;
            		} else {
                	break;
            		}
       	 	}	
        	var html = count + ' ' + suffix;
        	if (this.renderedHTML_ != html) {
            		this.innerElement_.innerHTML = html;
            		this.renderedHTML_ = html;
        	}

        	if (this.renderedWidth_ != width) {
        		this.innerElement_.style.width = width + 'px';
            		this.renderedWidth_ = width;
        	}
        	if (!this.renderedVisible_) {
            //goog.style.setElementShown(this.element_, true);
            		this.element_.style.display = '';
            		this.renderedVisible_ = true;
        	}

    	};
    	var scaleLine = new ScaleLine({
        	unit: 'pixels',
        	minWidth: 150,
    	});

	$('#info-trigger').click(function(){
		$('#info-content').toggle();
	});


	$("#annotstate").click(function(){
		$("#annotwindow").toggle();
	});

	$('#sagittal').click(function (evt) {
		// var app = window.app;
		var nslices = app.nslices;
		//x = evt.pageX - $(this).offset().left;
		x = evt.offsetX;
		$('.regular').slick('slickGoTo',x/180*nslices);
	});

	app.map = new ol.Map({

		target: 'target',
		// interactions:ol.interactions.defaults.extend([app.select]),
		//layers: [imageLayer],	
		//view: app.map_view,
		pixelRatio: 1,
		controls: ol.control.defaults({
			attribution: false
		}).extend([mousePositionControl, scaleLine]),
		logo: false

	});

	app.map.on('precompose', function(evt) {
                    //evt.context.imageSmoothingEnabled = false;
                    //evt.context.webkitImageSmoothingEnabled = false;
                    //evt.context.mozImageSmoothingEnabled = false;
                    //evt.context.msImageSmoothingEnabled = false;
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
			extent: [0, 0, 256 * Math.pow(2, meta.levels -1), 256 * Math.pow(2, meta.levels -1)],
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
		app.imgCenter = imgCenter;
		//imagedims = [imgWidth,imgHeight];

		if (app.map_view == null) {

			app.map_view = new ol.View({
				zoom: 2,
				maxZoom: 10,
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
			    if (zoom >= 8) {
			    	console.log('zoom level ' + zoom);
			    }
			});
	
		$('#zoomreset').click(function(){
				var view = app.map.getView()
				view.setZoom(2);
				view.setCenter(imgCenter);
			});

		}

	}
}

//function sagittal_localize(){
	// var nslices = app.nslices;
	// var slice_no = 13;
	// $('#sagittal_pos').css('left',parseFloat(slice_no)/nslices * 180+'px');
//}

//function create_zoom_slider(){
	// var app = window.app;
	// zoomslider = new ol.control.ZoomSlider();
	// app.map.addControl(zoomslider);
//}

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

//function brain_info_view(){


	// $("#info-trigger").hover(function(){
	// 	$("#info-content").fadeIn();
		
	//   },function(){
	// 	$("#info-content").fadeOut();

	//   })
//}



