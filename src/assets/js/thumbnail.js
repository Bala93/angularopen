function thumbnail_init(urls, secids_nis, secids_fluo,bregmas,nisslstart, fluostart) {
    var innerhtml = ''
    var app = window.app;
    app.nslices = urls.length;

    var contexturl = '';
    var contextsec = '';
    
    for (var i = 0; i < urls.length; i++) {
        if (urls[i] == undefined)
            // this highlighted is to show which one is loaded
            element = '<div><center>-</center><img data-lazy="./assets/img/notfound.jpg"/></div>';
        else {
            secid_nis = secids_nis[i] != undefined ? secids_nis[i] : 0;
            secid_fl = secids_fluo[i] != undefined ? secids_fluo[i] : 0;

            var sliceno = urls[i].split('/')[3].split('_')[3].split('.')[0];
	    var pmdno = urls[i].split('/')[2];

            evt = '"changesection(\''+ pmdno + '\',\''+ sliceno+'\',' + secid_nis + ',' + secid_fl + ')"';
            // console.log(urls[i]);
            // console.log(secid_nis);
            // var sliceno_temp = urls[i].split('/')[]
            var bregma = bregmas[i] + '';
            //if (parseInt(sliceno) == 90) { //FIXME: update this
	    if(secid_nis==nisslstart || secid_fl==fluostart) {
                element = '<div><center>'+sliceno+'</center><center>'+ bregma+'</center><img id = nis_' + secid_nis + ' class = "highlighted" data-lazy= "http://mouse.brainarchitecture.org' + urls[i] + '" onclick =' + evt + '/></div>';

		contexturl = urls[i];
		contextsec = sliceno;

            }
	    else if(bregma >-0.04 && bregma<0.04 ) {
                element = '<div><center>'+sliceno+'</center><center>'+ bregma+'</center><img id = nis_' + secid_nis + ' class = "bregma" data-lazy= "http://mouse.brainarchitecture.org' + urls[i] + '" onclick =' + evt + '/></div>';
	    }
	    else{
                
                element = '<div style="color:whitesmoke"><img id = nis_' + secid_nis  + ' data-lazy= "http://mouse.brainarchitecture.org' + urls[i] + '" onclick =' + evt + '/><center>'+ bregma+'</center></div>'
            }
                
        }
        innerhtml += element;
        // document.getElementById('thumbnail').innerHTML += element;
    }
    // console.log(innerhtml);
    $('#thumbnail').append(innerhtml);
    $("#imgdisp").attr("src",'http://mouse.brainarchitecture.org/'+contexturl); //'http://mouse.brainarchitecture.org/brainimg/PMD2327/PMD2327&2326-F5-2015.09.18-05.25.02_PMD2327_2_0014.jpg');
	atlasurl = 'http://mitradevel.cshl.org/webtools/seriesbrowser/getatlasgeojson/'+pmdno+'/'+contextsec+'/';
    app.atlas_layer.setSource(new ol.source.Vector({url: atlasurl, format:new ol.format.GeoJSON()}));
    return contextsec;
}

function thumbnail_load(startslide) {
    //var startslide = 90; //FIXME
    $('.regular').slick({
        lazyLoad: 'ondemand',
        slidesToShow: 10,
        slidesToScroll: 3,
        initialSlide: startslide,
        arrows: true,
        prevArrow: '<a href="#" class="slick-prev prev">prev</a>',
        nextArrow: '<a href="#" class="slick-next next">next</a>',
        infinite: false,

    });

}

function changesection(pmdno,secnum,secidx_nis, secidx_fluo) {
    update_tiles('' + secidx_nis, '' + secidx_fluo);
    initLayers(false);
	//console.log("thumbnail url: "+ tn_url)
	atlasurl = 'http://mitradevel.cshl.org/webtools/seriesbrowser/getatlasgeojson/'+pmdno+'/'+secnum+'/';
    app.atlas_layer.setSource(new ol.source.Vector({url: atlasurl, format:new ol.format.GeoJSON()}));

    prev_tile_id = '#'+document.getElementsByClassName('highlighted')[0].id;
    current_tile_id = '#nis_' + secidx_nis;
    $(prev_tile_id).removeClass('highlighted');
    $(current_tile_id).addClass('highlighted');
    img_src = $(current_tile_id).attr('src');
    // console.log(img_src);
    $("#imgdisp").attr("src",img_src);
}

