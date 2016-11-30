"use strict";

function loadingAnimate() {
    var $firstLoadingEls = $('#main-container'),
        $secondLoadingEls = $('.main-header a,.main-header input,#footer-content'),
        stagger = 150;

    $firstLoadingEls.add($secondLoadingEls).css({visibility: 'visible'});
    $secondLoadingEls.hide();

    $firstLoadingEls.velocity("transition.slideDownIn", {
        drag: true
    });

    setTimeout(function () {
        $secondLoadingEls.velocity("transition.slideDownIn", {
            drag: true, stagger: stagger
        });

    }, stagger + 300);
}

function headerAnimateCtrl() {
    if ($(document).scrollTop() > 20) {
        $('.main-header').addClass('animation');
    } else {
        $('.main-header').removeClass('animation');
    }
}

$(document)
    .on('click', '#scroll-to-top', function () {
        $('html, body').animate({scrollTop: 0}, 600);
    })

    .on('scroll', function () {
        clearTimeout(window._scrollTimeoutTimer);
        headerAnimateCtrl();
        window._scrollTimeoutTimer = setTimeout(function () {
            var distance = $(document).scrollTop();
            if (distance > 500) {
                $('#scroll-to-top:hidden').velocity("transition.slideDownIn", {
                    drag: true, stagger: 150
                });
            } else {
                $('#scroll-to-top:visible').velocity("transition.slideDownOut", {
                    drag: true, stagger: 150
                });
            }
        }, 100);
    })

    .on('pjax:beforeSend', '#pjax-container', function (event, setting, options) {
        $('#main-logo').removeClass('active');
        $('.layer-full').fadeIn();
    })
    .on('pjax:end', '#pjax-container', function (event, data, status, xhr, options) {
        $('.layer-full').hide();
        $('#main-logo').addClass('active');
        loadingAnimate();
    }).on('click', 'a.toc-link', function () {
    $("html, body").stop().animate({
        scrollTop: $($(this).attr("href")).offset().top - 50 + "px"
    }, {
        duration: 500,
        easing: "swing"
    });
});

$(function () {
    headerAnimateCtrl();
    loadingAnimate();
    $('#main-logo').addClass('active');
    $(document).pjax('a', '#pjax-container', {
        fragment: '#pjax-container',
        timeout: 5000,
        cache: false
    });
});

