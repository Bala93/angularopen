
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
		}).extend(mousePositionControl),
		logo: false

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
				zoom: 1,
				maxZoom: meta.levels - 1,
				projection: proj,
				center: imgCenter,
				extent: [-0.1 * imgWidth, -0.9 * imgHeight, 1.1 * imgWidth, 0.1 * imgHeight]
			});

			app.map.setView(app.map_view);
		}


	}
}

