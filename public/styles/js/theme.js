$(document).ready(function(){
    var delayTimer;
    var loaded = 0;
    $("body").on('DOMSubtreeModified', "#productdetails", function() {
        clearTimeout(delayTimer);
        loaded = 0;
        delayTimer = setTimeout(function(){
            if(loaded === 0) quantity();
        },1000);
    });
    function quantity(){
        loaded = 1;
        (function ($) {
            $('.quantity').each(function () {
                var index = $(this).children('input').val() != '' ? $(this).children('input').val() : 0;

                $(this).children('input').val(index);

                $(this).children('.add').on('click', function () {
                    index++;
                    $(this).siblings('input').val(index);
                });

                $(this).children('.sub').on('click', function () {
                    index--;
                    $(this).siblings('input').val(index);
                });
            });
        })(jQuery);
    }
    $(window).on('load', function () {
        (function ($) {
            "use strict";
            // use strict

            /* Toggle List Checkout */
            $('.shop-cart-button, #checkout').on('click', function () {
                $(".shop-cart-button").siblings().slideToggle();
            });

            /* Mobile Menu */
            $('.header-mobile__button').on('click', function () {
                $(this).children().toggleClass('active');
                $('.header-mobile__navbar').slideToggle(300);
            });
            $('.header-mobile__navbar li').each(function () {
                if ($(this).children().length > 1) {
                    $(this).children('a').append("<span></span>");
                }
                $(this).children('a').on('click', function () {
                    $(this).siblings('.sub-menu').slideToggle(300).parent().toggleClass('active');
                });
            });

        })(jQuery);

        // Sticky Header
        (function ($) {
            "use strict";
            // use strict

            var n = $('.header'),
                s = n.outerHeight();
            n.after("<div class='header__holder'></div>");
            $(window).on('scroll', function () {
                $(window).scrollTop() > s ?
                    ($('.header__holder').css("height", s), n.addClass('header__fixed')) :
                    ($('.header__holder').css("height", 0), n.removeClass('header__fixed'))
            });
        })(jQuery);

        // Back to top
        (function ($) {
            "use strict";
            // use strict

            $(window).on('scroll', function () {
                if ($(this).scrollTop() > 600) {
                    $('.to-top').fadeIn(500);
                } else {
                    $('.to-top').fadeOut(500);
                }
            });
            $('.to-top').on('click', function () {
                $("html, body").animate({
                    scrollTop: 0
                }, {
                    duration: 1000,
                    easing: "easeOutSine"
                });
            });
        })(jQuery);

        // Add - Sub product in shop cart

        // Page Side bar
        (function ($) {
            "use strict";
            // use strict
            var bar_button = 0;
            var user = 0;
            var status = 0;
            var login = false;
            $('.bar-button').on('click', function () {
                $(this).siblings().slideToggle();
                bar_button = 1;
                status == 0? status = 1:status=0;
            });
            $('li a.login').on('click', function(){
                user = 0;
                login = true;
            })
            $('.user').on('click', function () {
                if(!login) {
                    user = 1;
                }
                login = false;
            });
            $('html').click(function () {
                if(bar_button != 1 && user != 1 && status == 1){
                    status = 0;
                    $('.user').slideToggle();
                }
                bar_button = 0;
                user = 0;
            });
        })(jQuery);


        (function ($) {
            "use strict";
            // use strict

            $('.product-rating').each(function () {
                var index = $(this).data('star');
                for (var i = 0; i < 5; i++) {
                    if (i < index) $(this).append('<i class="fa fa-star"></i>');
                    else $(this).append('<i class="fa fa-star-o"></i>');
                }
            });
        })(jQuery);

        (function ($) {
            "use strict";
            // use strict

            $('#layout_grid').on('click', function () {
                $('.shop-list-body').addClass('shop-grid');
            });
            $('#layout_list').on('click', function () {
                $('.shop-list-body').removeClass('shop-grid');
            });
        })(jQuery);

        (function ($) {
            "use strict";

            var search = $('.search-button');
            search.siblings().slideUp();
            search.on('click', function () {
                search.siblings().slideToggle();
            });
            search.siblings().children('a').on('click', function () {
                search.siblings().slideToggle();
            })
        })(jQuery);

        (function ($) {
            "use strict";
            // use strict

            $('.au-tabs').each(function () {
                $(this).find('.tab-title').on('click', function () {
                    var tab = $(this);
                    tab.siblings().removeClass('tab-active');
                    tab.addClass('tab-active');
                });
            });
        })(jQuery);

        // banner
        (function($){
            "use strict";
            // use strict

            $('.js-au-banner').each(function(){
                var banner = $(this);
                var content = banner.find('.banner-content');
                var bg = banner.data('image')!= null ? ('url(' + banner.data('image') + ')') : '';
                banner.css({
                    "height" : banner.data('height'),
                    "background-image": bg
                });
                content.css({
                    'right' : banner.data('positionright'),
                    'left' : banner.data('positionleft'),
                    'top' : banner.data('positiontop'),
                    'bottom' : banner.data('positionbottom')
                });
            });
        })(jQuery);
    });
});