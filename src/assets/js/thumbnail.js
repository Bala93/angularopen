function create_thumbnail(){
    var startslide = 13;
    $('.regular').slick({
        lazyLoad: 'ondemand',
        slidesToShow: 9,
        slidesToScroll: 5,
        initialSlide: startslide,
        prevArrow: '<a href="#" class="prev">prev</a>',
        nextArrow: '<a href="#" class="next">next</a>',
        infinite: false,
        //prevArrow: '<img src="/static/img/arrow_left.png" width="40px" />',
    });

}