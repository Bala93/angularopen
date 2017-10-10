function thumbnail_init(urls){
    var innerhtml = ''
    for (var i = 0 ; i <urls.length;i++){
        element = '<div><img data-lazy= "http://mouse.brainarchitecture.org' + urls[i] + '"/></div>'
        innerhtml += element;
        // document.getElementById('thumbnail').innerHTML += element;
    }
    console.log(innerhtml);
    $('#thumbnail').append(innerhtml);
    

}

function thumbnail_load(){
    var startslide = 0;
    $('.regular').slick({
        lazyLoad: 'ondemand',
        slidesToShow: 10,
        slidesToScroll: 3,
        // initialSlide: startslide,
        prevArrow: '<a href="#" class="prev">prev</a>',
        nextArrow: '<a href="#" class="next">next</a>',
        infinite: false,
        //prevArrow: '<img src="/static/img/arrow_left.png" width="40px" />',
    });
    
    

}
