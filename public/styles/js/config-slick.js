(function ($) {
      "use strict"; 
      // Use strict
      $('.slick-image').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            dragged: false,
            fade: true,
            dots: false,
            asNavFor: '.image-number',
            autoplay: true
      });
      $('.image-number').slick({
            slidesToShow: 4,
            arrows: false,
            asNavFor: '.slick-image',
            autoplay: true,
            dots: false,
            focusOnSelect: true,
      });

      $('.project-intro .image').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            dragged: false,
            speed: 3000,
            fade: true,
            dots: true,
            dotsClass: 'slick-dots number',
            autoplay: true,
      }).on('beforeChange', function (event, slick, currentSlide, nextSlide) {
            $('.slick-animate').removeClass('fadeInRight fadeOutLeft');
            $('.slick-animate').eq(nextSlide).addClass('fadeInRight');
            $('.slick-animate').eq(nextSlide + 1).addClass('fadeOutLeft');
      });

      $('.testi-slick').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            dragged: false,
            fade: true,
            dots: true,
            dotsClass: 'slick-dots bullet',
            autoplay: true,
            speed: 1000,
      }).on('beforeChange', function (event, slick, currentSlide, nextSlide) {
            $('.testi-slick .slick-animate').removeClass('slideInUp fade');
            $('.testi-slick .slick-animate').eq(nextSlide).addClass('slideInUp');
            $('.testi-slick .slick-animate').eq(nextSlide + 1).addClass('fade');
      });
})(jQuery);
