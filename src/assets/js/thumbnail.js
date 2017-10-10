function thumbnail_init(urls,secids_nis, secids_fluo){
    var innerhtml = ''
    for (var i = 0 ; i <urls.length;i++){
        if (urls[i] == undefined)
            // this highlighted is to show which one is loaded
            element = '<div><img data-lazy="/assets/img/notfound.jpg"/></div>';
        else {
            secid_nis = secids_nis[i]!=undefined? secids_nis[i]:0;
            secid_fl = secids_fluo[i]!=undefined? secids_fluo[i]:0;
            evt = '"changesection(' +secid_nis+',' + secid_fl+ ')"';
            element = '<div><img data-lazy= "http://mouse.brainarchitecture.org' + urls[i] + '" onclick ='+ evt + '/></div>'
        }
        innerhtml += element;
        // document.getElementById('thumbnail').innerHTML += element;
    }
    console.log(innerhtml);
    $('#thumbnail').append(innerhtml);
    
}

function thumbnail_load(){
    var startslide = 13;
    $('.regular').slick({
        lazyLoad: 'ondemand',
        slidesToShow: 10,
        slidesToScroll: 3,
        initialSlide: startslide,
        prevArrow: '<a href="#" class="prev">prev</a>',
        nextArrow: '<a href="#" class="next">next</a>',
        infinite: false,
        //prevArrow: '<img src="/static/img/arrow_left.png" width="40px" />',
    });
    
}

function changesection(secidx_nis, secidx_fluo){

    update_tiles(''+secidx_nis, ''+secidx_fluo);
    initLayers(false);
    //return false;
}
