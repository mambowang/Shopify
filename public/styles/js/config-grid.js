$(document).ready(function(){
    var delayTimer;
    var loaded = 0;
    $("body").on('DOMSubtreeModified', '#landing', function() {
        clearTimeout(delayTimer);
        delayTimer = setTimeout(function(){
            if($(".grid-body") && loaded == 0) slide1();
            else loaded = 0;
        },1000);
    });
    function slide1(){
        loaded = 1;
        $('.grid-body').each(function () {
            var layout = $(this).attr('data-layout') != null ? $(this).attr('data-layout') : 'masonry';
            var $grid = $(this).isotope({
                itemSelector: '.grid-item',
                layoutMode: layout,
                masonry: {
                    columnWidth: '.grid-item'
                }
            });
            $('.grid-filter').on('click', 'span', function () {
                var filterValue = $(this).attr('data-filter');
                $(this).parent().parent().find('li').removeClass('active');
                $(this).parent().addClass('active');
                $grid.isotope({
                    filter: filterValue
                });
            });
            $('.category-list').on('click', 'span', function () {
                
                var filterValue = $(this).attr('data-filter');
                $(this).parent().parent().parent().parent().find('li').removeClass('active');
                $(this).parent().parent().find('li').removeClass('active');
                $(this).parent().addClass('active');
                $grid.isotope({
                    filter: filterValue
                });
            });
        });
    }
});