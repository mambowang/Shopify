$(document).ready(function(){
    var delayTimer;
    var loaded = 0;
    var close = 0;
    $("body").on('DOMSubtreeModified', function() {
        if(window.location.href.indexOf('productdetails') <= -1 || window.location.href.indexOf('landing') <= -1  && close === 0) {
            close = 1; loaded = 0;
        }
    });
    $("body").on('DOMSubtreeModified', '#landing, #productdetails', function() {
        clearTimeout(delayTimer);
        delayTimer = setTimeout(function(){
            if($(".owl-carousel") && loaded == 0) load();
        },1000);
    });
    function load(){
        close = 0;
        loaded = 1;
        $('.owl-carousel').each(function () {
            var $carousel = $(this);
            $carousel.owlCarousel({
                dots: $carousel.data("dots"),
                items: $carousel.data("items"),
                slideBy: $carousel.data("slideby"),
                center: $carousel.data("center"),
                loop: $carousel.data("loop"),
                margin: $carousel.data("margin"),
                nav: $carousel.data("nav"),
                autoplay: true,
                autoplayTimeout: $carousel.data("autoplay-timeout"),
                navText: ['<span class="fa fa-chevron-left"><span>', '<span class="fa fa-chevron-right"></span>'],
                responsive: $carousel.data("responsive"),
                animateOut: $carousel.data("animateout"),
                animateIn: $carousel.data("animatein"),
            });
        });
    }
});