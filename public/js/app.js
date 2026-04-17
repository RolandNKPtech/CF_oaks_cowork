// Overlay Navigation Menu

$(document).ready(function () {
    
        /*** Tabs ***/

    $('.tabs-head-item').on("click", function() {
        var id = $(this).attr('data-tab'),
        content = $('.tabs-body-item[data-tab="'+ id +'"]');

        $('.tabs-head-item.active').removeClass('active');
        $(this).addClass('active');

        $('.tabs-body-item.active').removeClass('active');
        content.addClass('active');
    });

    $('.memebership-list-item').on("click", function() {
        var id = $(this).attr('data-tab'),
        content = $('#'+id);

        $('.memebership-list-item.active').removeClass('active');
        $(this).addClass('active');

        $('.membersheep-freeservise-video.active').removeClass('active');
        content.addClass('active');
    });

    $(".spoiler-block .head").on("click", function() {
//        $(".spoiler-block-item").removeClass("active");
        $(this).parent().toggleClass("active");
    });

    
    $('.membersheep-pdiscount-item').on('click', function(){
          var point = $(this).attr('href');
          $('html, body').animate({scrollTop: $(point).offset().top - 240}, 500, 'swing');   
          return false;
    });
    
    
//    $('.open-menu').on('click', function () {
//        $('.overlay').addClass('open');
//        $('body').addClass('non-scroll');
//        var basicTimeline = anime.timeline();
//        basicTimeline.add(
//            {
//                targets: '.menu-group',
//                translateY: ['100%', 0],
//                opacity: [0, 1],
//                duration: 400,
//                offset: 900,
//                easing: 'linear',
//                delay: function (target, index) {
//                    return index * 150;
//                }
//            }
//        ).add(
//            {
//                targets: '.app-icon',
//                opacity: [0, 1],
//                duration: 250,
//                offset: 1000,
//                easing: 'linear'
//            }
//        );
//    });

//    $('.close-menu').on('click', function () {
//        anime.timeline()
//            .add(
//                {
//                    targets: '.menu-group',
//                    translateY: '100%',
//                    opacity: 0,
//                    duration: 600,
//                    delay: function (target, index, targetCount) {
//                        return (targetCount - index) * 100;
//                    }
//                }
//            )
//            .add(
//                {
//                    targets: '.app-icon',
//                    opacity: 0,
//                    duration: 400,
//                    offset: '-=300',
//                    easing: 'linear'
//                }
//            );
//        setTimeout(function () {
//            $('body').removeClass('non-scroll');
//            $('.overlay').removeClass('open');
//        }, 1200);
//
//    });

//    $('.form-trigger').on('click', function() {
//        $('.overlay-form').addClass('open');
//        $('body').addClass('non-scroll');
//        var basicTimeline = anime.timeline();
//        basicTimeline.add(
//            {
//                targets: '.form-section',
//                translateY: ['100%', 0],
//                opacity: [0, 1],
//                duration: 400,
//                offset: 900,
//                easing: 'linear',
//                delay: function (target, index) {
//                    return index * 150;
//                }
//            }
//        ).add(
//            {
//                targets: '.form-app-icon',
//                opacity: [0, 1],
//                duration: 250,
//                offset: 1000,
//                easing: 'linear'
//            }
//        );
//    });
//
//    $('.form-close-menu').on('click', function () {
//        anime.timeline()
//            .add(
//                {
//                    targets: '.form-section',
//                    translateY: '100%',
//                    opacity: 0,
//                    duration: 600,
//                    delay: function (target, index, targetCount) {
//                        return (targetCount - index) * 100;
//                    }
//                }
//            )
//            .add(
//                {
//                    targets: '.form-app-icon',
//                    opacity: 0,
//                    duration: 400,
//                    offset: '-=300',
//                    easing: 'linear'
//                }
//            );
//        setTimeout(function () {
//            $('body').removeClass('non-scroll');
//            $('.overlay-form').removeClass('open');
//        }, 1200);
//    });
});

$('.jarallax').jarallax({
    speed: 0.2
});

new WOW().init();

function changeButton(element) {

    if ( $(element).children('*').attr("class") == 'fal fa-plus-circle' ){
        $(element).children('*').removeClass('fa-plus-circle');
        $(element).children('*').addClass('fa-minus-circle');
    }
    else {
        $(element).children('*').removeClass('fa-minus-circle');
        $(element).children('*').addClass('fa-plus-circle');
    }
    // element.children("*").removeClass('fa-plus-circle');
    // element.children('*').addClass('fa-minus-circle');
}


function showoverlay(target){
    var id = '#'+target;
    console.log(id);
    var el = document.querySelector(id);
    console.log(el);
    el.classList.add('open');
}

function hideoverlay(target){
    var id = '#'+target;
    var el = document.querySelector(id);
    el.classList.remove('open');

    if (target == "consultationform") {
        $("header .pricing-portal")[0].innerHTML = "";
    }
}

function getSum(total, num) {
    return total + num;
}


$(window).on('load',function(){

    //MATCHING HEIGHTS FOR THE CATEGORY MENU
    var el3 = $('#menu-cat3');
    var el3Height = el3.height();
    var el3Heights = [];
    var el3Cats = $(el3).children();

    for(var cat = 0; cat < el3Cats.length; cat++){

        catHeights = [];

        catHeights.push($(el3Cats[cat]).find('.category-label .category-label-text').height());
        var links = $(el3Cats[cat]).find('.category-label .sub-category').children();

        for(var l = 0; l < links.length; l++){

            catHeights.push($(links[l]).height() + 5);
        }
        catHeights.push(121);

        var catHeightsSum = catHeights.reduce(getSum);

        el3Heights.push(catHeightsSum);    
    }

    var el3MaxHeight = Math.max.apply(null,el3Heights);
    
    if(el3MaxHeight >= el3Height && $(window).width() >= 992){
        
        for(var cat = 0; cat < el3Cats.length; cat++){
            
            $(el3Cats[cat]).height(el3MaxHeight + 'px');
            
        }
        
    }
    
    
    
    var el4 = $('#menu-cat4');
    var el4Height = el4.height();
    var el4Heights = [];
    var el4Cats = $(el4).children();

    for(var cat = 0; cat < el4Cats.length; cat++){

        catHeights = [];

        catHeights.push($(el4Cats[cat]).find('.category-label .category-label-text').height());
        var links = $(el4Cats[cat]).find('.category-label .sub-category').children();

        for(var l = 0; l < links.length; l++){

            catHeights.push($(links[l]).height() + 5);
        }
        catHeights.push(121);
        
        var catHeightsSum = catHeights.reduce(getSum);

        el4Heights.push(catHeightsSum);    
    }

    var el4MaxHeight = Math.max.apply(null,el4Heights);
    
    if(el4MaxHeight >= el4Height && $(window).width() >= 992){
        
        for(var cat = 0; cat < el4Cats.length; cat++){
            
            $(el4Cats[cat]).height(el4MaxHeight + 'px');
            
        }
        
    }

    var overlayButtons = document.querySelectorAll('.overlay-button');
    var overlayMenus = document.querySelectorAll('.new-menu .menu-section ul');
    for (i = 0; i < overlayButtons.length; i++) {
        overlayButtons[i].addEventListener('click', function(e) {
            e.preventDefault();
            currentEl = e.currentTarget;

            for (i = 0; i < overlayMenus.length; i++) {
                overlayMenus[i].classList.remove("active");
            }

            overlayMenuId = currentEl.getAttribute('data-target');
            overlayMenu = document.getElementById(overlayMenuId);
            overlayMenu.classList.toggle("active");
        });
    }

    var overlayBack = document.querySelectorAll('.menu-back a');
    for(i = 0; i < overlayBack.length; i++) {
        overlayBack[i].addEventListener('click', function(e){
            e.preventDefault();
            
            var activeOverlay = document.querySelector('.new-menu ul.active');
            activeOverlay.classList.remove('active');
            
            var openedDropdowns = document.querySelectorAll('.new-menu ul .collapse.show');
            for (j = 0; j < openedDropdowns.length; j++) {
                openedDropdowns[j].classList.remove('show');
            }
            
            document.querySelector('.new-menu ul.main-menu').classList.add('active');



        });
    }

    $('#is_product_other').on('change', function () {
        let $productOther = $('#product_other')
        if ($(this).prop('checked')) {
            $productOther.prop('disabled', false).show()
        } else {
            $productOther.prop('disabled', true).hide()
        }
    })

    $(".show-carousel").on('click',function () {
        $('.new-video-carousel').flickity('resize')
    });
});

if ($(window).width() <= 550){
    let height = +$('.pre-op-info-page iframe').attr('height')+300
    if ($('body.pre-op-info-page').first().hasClass("tummy-tuck-liposuction")) {
        height += 400
    } else if ($('body.pre-op-info-page').hasClass("360-liposuction-or-360-liposuction-BBL")) {
        height += 50
    }
    let width = 0
    if ($(window).width() <= 412) {
        width = $(window).width()
        height -= (+$(window).width()-320)*3
    } else {
        height -= (+$(window).width()-320)*1.5
        width = 412
    }
    $('.pre-op-info-page iframe').attr('height', height );
    $('.pre-op-info-page iframe').attr('width', width);
    $(".pre-op-info-page .iframe-form .container").css("width", width);
    $(".pre-op-info-page .iframe-form .container").css("padding-right", 0);
    $(".pre-op-info-page .iframe-form .container").css("padding-left", 0);
    $(".pre-op-info-page .iframe-form iframe").css("overflow-x", 'hidden');
}
function getDistanceFromTop(element) {
    var yPos = 0;

    while(element) {
        yPos += (element.offsetTop);
        element = element.offsetParent;
    }

    return yPos;
}

function scrollToForm() {
    var page = location.href.split("/").slice(-1)[0];
    if($(window).width() >= 768 && page !== 'contact-us.php') {
        showoverlay('consultationform');
    } else {
        window.scrollTo(0, getDistanceFromTop($('#ContactForm')[0]));
    }
}

function service_cta_popup(fieldtext) {
    $("#consultationform #message").val(fieldtext);
    show_estimate("", $("header .pricing-portal")[0]);
    showoverlay('consultationform');
}

function expandCarousel(e) {
    e.preventDefault();
    $("#formCarousel").addClass('expanded-carousel');
    showRecaptcha(e);
}

function validateSlideOne(e, num) {
    e.preventDefault();
    
    var cup_size_want = $("#formCarousel input[name='consult[option_one][]']");
    if($(cup_size_want).is(':checked')){
        var slide = $("#formCarousel .carousel-item")[num];
        $(slide).find('.plash-size-error').html('');
        $("#formCarousel").carousel('next');
    } else {
        var slide = $("#formCarousel .carousel-item")[num];
        $(slide).find('.plash-size-error').append('<div>Please select one option</div>');
    }  

}

function validateSlideTwo(e, num) {
    e.preventDefault();
    
    var cup_size_want = $("#formCarousel input[name='consult[option_two][]']");
    if($(cup_size_want).is(':checked')){
        var slide = $("#formCarousel .carousel-item")[num];
        $(slide).find('.plash-size-error').html('');
        $("#formCarousel").carousel('next');
    } else {
        var slide = $("#formCarousel .carousel-item")[num];
        $(slide).find('.plash-size-error').append('<div>Please select one option</div>');
    }  

}

function validateSlideDoctor(e, num) {
    e.preventDefault();
    
    var doctor = $("#formCarousel input[name='consult[doctor]']");
    if($(doctor).is(':checked')){
        var slide = $("#formCarousel .carousel-item")[num];
        $(slide).find('.plash-size-error').html('');
        $("#formCarousel").carousel('next');
    } else {
        var slide = $("#formCarousel .carousel-item")[num];
        $(slide).find('.plash-size-error').append('<div>Please select one option</div>');
    }  

}

function validateSlideThree(e, num) {
    e.preventDefault();
    
    var name = $("#formCarousel input[name='consult[name]']");
    var email = $("#formCarousel input[name='consult[email]']");
    var phone = $("#formCarousel input[name='consult[phone]']");
    var slide = $("#formCarousel .carousel-item")[num];
    $(slide).find('.plash-size-error').html('');
    var valid = true;
    
    if ($(name).val() == ""){
        valid = false;
        $(slide).find('.plash-size-error').append('<div>Name is required field</div>');
    } else if (!validateText($(name).val())) {
        valid = false;
        $(slide).find('.plash-size-error').append('<div>Invalid Name please try again.</div>');
    }
    
    if ($(phone).val() == ""){
        valid = false;
        $(slide).find('.plash-size-error').append('<div>Phone is required field</div>');
    } else if (!validatePhone($(phone).val())) {
        valid = false;
        $(slide).find('.plash-size-error').append('<div>Invalid Phone Number please try again.</div>');
    }
    
    if ($(email).val() == ""){
        valid = false;
        $(slide).find('.plash-size-error').append('<div>Enail is required field</div>');
    } else if (!validateEmail($(email).val())) {
        valid = false;
        $(slide).find('.plash-size-error').append('<div>Invalid Email please try again.</div>');
    }
    
    if(valid) {
        
        $(slide).find('.plash-size-click').prepend('<div class="recaptcha"><div class="g-recaptcha"></div></div>');
        re = $('.g-recaptcha')[0];
        var loadCaptcha = function() {
            captchaContainer = grecaptcha.render(re, {
            'sitekey' : '6LeQeGMUAAAAABN0r7V4DF-g3aLLFMQ0iWjy1CTM',
            'callback' : 'submitCarouselForm'
          });
        };    
        loadCaptcha();
        $("#formCarousel").find('.submit').addClass('d-none');
    }
}

function submitCarouselForm() {
    $("#formCarousel form").submit();
}

function scrollIntoView(id,e) {
    e.preventDefault();
    document.getElementById(id).scrollIntoView({
        behavior: 'smooth'
    });
}