$(document).ready(function(){
    var delayTimer;
    var loaded = 0;
    var close = 0;
    $("body").on('DOMSubtreeModified', function() {
        if(window.location.href.indexOf('listing') <= -1 && close === 0) {
            close = 1; loaded = 0;
        }
    });
    $("body").on('DOMSubtreeModified', '#listingpage', function() {
        clearTimeout(delayTimer);
        delayTimer = setTimeout(function(){
            if($("#filter-price") && loaded === 0) load();
        },1000);
    });
    function load(){
        close = 0;
        loaded = 1;
        var nonLinearSlider = document.getElementById('filter-price');
        if(nonLinearSlider){
            noUiSlider.create(nonLinearSlider, {
                start: [0, 500],
                connect: true,
                range: {
                    'min': [0],
                    'max': [500]
                }
            });
            var snapValues = [
                document.getElementById('filter-price-value-lower'),
                document.getElementById('filter-price-value-upper')
            ];

            nonLinearSlider.noUiSlider.on('update', function (values, handle) {
                snapValues[handle].innerHTML = '$' + values[handle];
            });
        }
    }
});