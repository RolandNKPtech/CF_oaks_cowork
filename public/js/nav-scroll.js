var didScroll;
var lastScrollTop = 0;
var delta = 5;
var navbarHeight = $('.fixed-top').outerHeight();
var windowH = $(window).height();

$(window).scroll(function () {
    didScroll = true;
    if ($(window).scrollTop() >= 25) {
        $('.fixed-top').addClass('nav-down-bg');
    } else {
        $('.fixed-top').removeClass('nav-down-bg');
    }
});

setInterval(function () {
    if (didScroll) {
        hasScrolled();
        didScroll = false;
    }
}, 250);

function hasScrolled() {
    var st = $(this).scrollTop();
    if (Math.abs(lastScrollTop - st) <= delta)
        return;
    if (st > lastScrollTop && st > navbarHeight) {
        $('.fixed-top').removeClass('nav-down').addClass('nav-up');
    } else {
        if (st + $(window).height() < $(document).height()) {
            $('.fixed-top.nav-up').removeClass('nav-up').addClass('nav-down');
        }
    }
    lastScrollTop = st;
}


//Scroll Top
$(document).ready(function () {
    var offset = 250;
    var duration = 300;

    $(window).scroll(function () {
        if ($(this).scrollTop() > offset) {

            //$('.back-to-top').fadeIn(duration);
            $('.back-to-top').addClass('show');
        } else {

            //$('.back-to-top').fadeOut(duration);
            $('.back-to-top').removeClass('show');
        }
    });

    $('.back-to-top').click(function (event) {

        event.preventDefault();
        //Animation requires JqueryUI
        $('html, body').animate({scrollTop: 0}, duration);

        //window.scroll(0,0);
        return false;
    });
});