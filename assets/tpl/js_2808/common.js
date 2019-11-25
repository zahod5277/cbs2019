$(document).ready(function() {

var titleColumn = $('.service-main-menu .service-menu-block__column:last').find('.column-title').detach();
var titleList = $('.service-main-menu .service-menu-block__column:last').find('ul').detach();
$('.service-main-menu .service-menu-block__column:last').remove();
titleColumn.appendTo('.service-main-menu .service-menu-block__column:last');
titleList.appendTo('.service-main-menu .service-menu-block__column:last');

if($(window).width() < 1721 && $(window).width() >= 1336){
    $('.mmenu-list').append('<li class="mmenu-list__item sub-item"><a href="javascript:void(0);" class="mmenu-list__link more-list-link">Еще</a><div class="sub-list"><ul></ul></div></li>');
    $('.mmenu-list .mmenu-list__item:nth-child(6)').detach().appendTo('.mmenu-list .mmenu-list__item.sub-item .sub-list ul');
    $('.mmenu-list .mmenu-list__item:nth-child(5)').detach().appendTo('.mmenu-list .mmenu-list__item.sub-item .sub-list ul');
    $('.more-list-link').click(function () {
        if($(this).hasClass('active')){
            $(this).removeClass('active');
            $(this).parent().find('.sub-list').slideUp('fast');
        }
        else{
            $(this).addClass('active');
            $(this).parent().find('.sub-list').slideDown('fast');
        }
    });
}
if($( window ).width() <= 768){

    $('.main-menu .backcall-block').detach().appendTo('.main-menu .mmenu-list');
    $('.main-menu .mmenu-list .mmenu-list__item:first').append('<div class="service-sub"></div>');
    $('.service-menu-block .service-menu-block__column').each(function(i,elem) {
        $(this).detach().appendTo('.main-menu .mmenu-list .mmenu-list__item .service-sub');
    });


    $('.main-menu .mmenu-list .mmenu-list__item .service-sub').append('<div class="service-menu-block__column"></div>');


    $('.service-link-main').click(function () {
        if($(this).parent().find('.service-sub').hasClass('active')){
            $(this).removeClass('active');
            $(this).parent().find('.service-sub').slideUp('fast');
            $(this).parent().find('.service-sub').removeClass('active');
        }
        else{
            $(this).parent().find('.service-sub').addClass('active');
            $(this).parent().find('.service-sub').slideDown('fast');
            $(this).addClass('active');
        }
    });
    $('.column-title').click(function () {
        if($(this).hasClass('active')){
            $(this).next("ul").slideUp('fast');
            $(this).removeClass('active');
        }
        else{
            $('.column-title').removeClass('active');
            $('.service-menu-block__column ul').slideUp('fast');
            $(this).next('ul').slideDown('fast');
            $(this).addClass('active');
        }
    })

    if($( window ).width() >= 370){
        $('.backcall-block .header-phone-link').detach().insertAfter('.main-menu .container .menu-block');
    }
}
else{
    $('.service-link-main').click(function(){
        if($(this).hasClass('active')){
            $('.service-main-menu').removeClass('show');
            $(this).removeClass('active');
        }
        else{
            $('.service-main-menu').addClass('show');
            $(this).addClass('active');
        }
    });
}
if($(window).width() < 640){
    $(document).ready(function() {

        var header = $(".main-menu"); 
        var scrollPrev = 0 

        $(window).scroll(function() {
            var scrolled = $(window).scrollTop(); 
            var firstScrollUp = false; 
            var firstScrollDown = false; 

            if ( scrolled > 0 && $('.hamburger ').hasClass('is-active') != true) {
                if ( scrolled > scrollPrev ) {
                    firstScrollUp = false; 
                    if ( scrolled < header.height() + header.offset().top ) {
                        if ( firstScrollDown === false ) {
                            var topPosition = header.offset().top; 
                            header.css({
                                "transform": "translateY(-65px)"
                            });
                            $('.lside-menu-block').css('transform', 'translateY(-65px)');
                            firstScrollDown = true;
                        }
                        header.css({
                            "position": "fixed"
                        });
                    } else {
                        header.css({
                            "transform": "translateY(-65px)"
                        });
                        $('.lside-menu-block').css('transform', 'translateY(-65px)');
                    }

                } else {
                    firstScrollDown = false; 
                    if ( scrolled > header.offset().top ) {
                        if ( firstScrollUp === false ) {
                            var topPosition = header.offset().top; 
                            header.css({
                                "transform": "translateY(0px)"
                            });
                            $('.lside-menu-block').css('transform', 'translateY(0px)');
                            firstScrollUp = true;
                        }
                        header.css({
                            "position": "fixed"
                        });
                    } else {
                        header.removeAttr("style");
                    }
                }
                scrollPrev = scrolled;
            }
        });
    });
}
$(".hamburger").click(function () {
    $(".menu-block").toggle("slow");
    if ($('.hamburger').hasClass("is-active")) {
        $('.hamburger').removeClass('is-active');
    } else {
        $('.hamburger').addClass('is-active');
    }
});
$(document).click(function (e) {
    var container = $(".hamburger");
    var container2 = $(".left-side-menu .lside-menu-block");
    console.log(e.target.className);
    if (container.has(e.target).length === 0 && e.target.className != 'hamburger hamburger--slider is-active' && e.target.className != 'mmenu-list__link service-link-main' && e.target.className != 'mmenu-list__link service-link-main active' && e.target.className != 'column-title' && e.target.className != 'column-title active') {
        if ($('.hamburger').hasClass("is-active")) {
            $('.hamburger').removeClass('is-active');
            $(".menu-block").toggle("slow");
        }
    }
    if($('.left-side-menu .lside-menu-block').hasClass('show') && container2.has(e.target).length === 0){
        $('.left-side-menu .submenu-link').removeClass('active');
        $('.submenu-block').removeClass('show');
        $('.lside-menu-block').removeClass('show');
    }
});
$('input.phone-input').mask('+7 ( 999 ) 999-99-99');
$('input.name-input').keypress(function (key) {
    if (key.charCode < 48 || key.charCode > 57) return true;
    return false;
});
$('input.number-input').keypress(function (key) {
    if (key.charCode < 48 || key.charCode > 57) return false;
    return true;
});
$('input[name="phone_f"]').click(function() {
    this.focus();
    this.setSelectionRange(this.value.length, 4);
});
if($( window ).width() <= 768){
    $("#answers-slider").owlCarousel({
        loop: true,
        margin: 10,
        mouseDrag: true,
        touchDrag: true,
        autoHeight: true,
        dots: false,
        nav: true,
        navText: ['<i class="icon icon-s-left-arrow">', '<i class="icon icon-s-right-arrow">'],
        items: 1,
        onInitialize  : slideList,
        onInitialized  : counter,
        onTranslated : counter
    });
}
else{
    $("#answers-slider").owlCarousel({
        loop: true,
        margin: 10,
        mouseDrag: true,
        touchDrag: true,
        dots: false,
        nav: true,
        navText: ['<i class="icon icon-s-left-arrow">', '<i class="icon icon-s-right-arrow">'],
        items: 1,
        onInitialize  : slideList,
        onInitialized  : counter,
        onTranslated : counter
    });
}

function slideList() {
    var i = 0;
    var arr = {};
    $("#answers-slider").find(".slide-item").each(function() {
        var slider_type = $(this).attr('data-type');
        arr[i] = [slider_type, $(this).html()];
        i++;
    });
    $('.answer-type-link').click(function () {
        var curType = $(this).attr('data-type');
        $('.answer-type-link').removeClass('active');
        $(this).addClass('active');
        var curSlider = $(this).parents('.container').find('.owl-carousel');
        curSlider.fadeOut('fast');
        setTimeout(function() {
            curSlider.owlCarousel('destroy');
            curSlider.empty();
            if(curType == 'all'){
                jQuery.each(arr, function(index, item) {
                    curSlider.append('<div class="slide-item type-' + item[0] + '" data-type="'+ item[0] +'">' + item[1] + '</div>');
                });
            }
            if(curType == 'video'){
                jQuery.each(arr, function(index, item) {
                    if(item[0] == 'video'){
                        curSlider.append('<div class="slide-item type-' + item[0] + '" data-type="'+ item[0] +'">' + item[1] + '</div>');
                    }

                });
            }
            if(curType == 'info'){
                jQuery.each(arr, function(index, item) {
                    if(item[0] == 'info'){
                        curSlider.append('<div class="slide-item type-' + item[0] + '" data-type="'+ item[0] +'">' + item[1] + '</div>');
                    }
                });
            }

            curSlider.owlCarousel({
                loop: true,
                margin: 10,
                mouseDrag: true,
                touchDrag: true,
                dots: false,
                nav: true,
                navText: ['<i class="icon icon-s-left-arrow">', '<i class="icon icon-s-right-arrow">'],
                items: 1,
                onInitialized  : counter,
                onTranslated : counter
            });

        }, 100);


        setTimeout(function() {
        curSlider.fadeIn('fast')}, 300);
    });
}


function counter(event) {
    var element   = event.target;         
    var items     = event.item.count;     
    var item      = event.item.index + 1;     

    if(item > items) {
        item = item - items
    }
    console.log(item);
    console.log(items);
    console.log(event.target);
    console.log(event.target.id);
    $('#'+ event.target.id +'').closest('.container').find('.current-slide').text(item);
    $('#'+ event.target.id +'').closest('.container').find('.all-slides').text(items);
}

$("#serv-slider").owlCarousel({
    loop: true,
    margin: 10,
    mouseDrag: true,
    touchDrag: true,
    dots: false,
    nav: true,
    navText: ['<i class="icon icon-s-left-arrow">', '<i class="icon icon-s-right-arrow">'],
    items: 1
});

$('.persons-row .person-link').click(function(){

    var curSlide = $(this).attr('data-slide');
    console.log(curSlide);
    $('#keypersons-slider').trigger('to.owl.carousel', curSlide)
});
$("#keypersons-slider").owlCarousel({
    loop: false,
    margin: 10,
    startPosition: '#s1',
    mouseDrag: true,
    touchDrag: true,
    dots: false,
    nav: true,
    navText: ['<i class="icon icon-s-left-arrow">', '<i class="icon icon-s-right-arrow">'],
    items: 1,
    onInitialized  : counter, 
    onTranslated : counter 
});
$("#awards-slider").owlCarousel({
    loop: true,
    margin: 10,
    mouseDrag: true,
    touchDrag: true,
    dots: false,
    nav: true,
    navText: ['<i class="icon icon-s-left-arrow">', '<i class="icon icon-s-right-arrow">'],
    items: 1,
    onInitialized  : counter, 
    onTranslated : counter 
});

$("#servicecases-slider").owlCarousel({
    loop: true,
    margin: 34,
    mouseDrag: true,
    touchDrag: true,
    dots: false,
    nav: true,
    navText: ['<i class="icon icon-s-left-arrow">', '<i class="icon icon-s-right-arrow">'],
    responsive: {
        0: {
            items: 1
        },
        450: {
            items: 2
        },
        1100: {
            items: 3
        },
        1600:{
            items: 3
        }
    },
    onInitialized  : counter, 
    onTranslated : counter 
});
$("#know-slider").owlCarousel({
    loop: true,
    margin: 34,
    mouseDrag: true,
    touchDrag: true,
    dots: false,
    nav: true,
    navText: ['<i class="icon icon-s-left-arrow">', '<i class="icon icon-s-right-arrow">'],
    responsive: {
        0: {
            items: 1
        },
        450: {
            items: 2
        },
        1050: {
            items: 3
        },
        1600:{
            items: 3
        }
    },
    onInitialized  : counter, 
    onTranslated : counter 
});
$("#spersons-slider").owlCarousel({
    loop: true,
    margin: 33,
    mouseDrag: true,
    touchDrag: true,
    dots: false,
    nav: true,
    navText: ['<i class="icon icon-s-left-arrow">', '<i class="icon icon-s-right-arrow">'],
    responsive: {
        0: {
            items: 1
        },
        450: {
            items: 2
        },
        1100: {
            items: 4
        },
        1600:{
            items: 4
        }
    },
    onInitialized  : counter, 
    onTranslated : counter 
});
$("#subscripe-slider").owlCarousel({
    loop: true,
    margin: 32,
    mouseDrag: true,
    touchDrag: true,
    dots: false,
    nav: true,
    navText: ['<i class="icon icon-s-left-arrow">', '<i class="icon icon-s-right-arrow">'],
    responsive: {
        0: {
            items: 1
        },
        450: {
            items: 1
        },
        1000: {
            items: 2
        },
        1600:{
            items: 2
        }
    },
    onInitialized  : counter, 
    onTranslated : counter 
});
$(".small-images-slider").owlCarousel({
    loop: true,
    margin: 20,
    mouseDrag: true,
    touchDrag: true,
    dots: false,
    nav: true,
    navText: ['<i class="icon icon-s-border-left-arrow">', '<i class="icon icon-s-border-right-arrow">'],
    responsive: {
        0: {
            items: 3
        },
        450: {
            items: 5
        },
        1100: {
            items: 6
        },
        1600:{
            items: 9
        }
    }
});
$('.modal-win').magnificPopup({
    type: 'inline',
    fixedContentPos: true,
    fixedBgPos: true,
    focus: 'input:first',
    closeBtnInside: true,
    midClick: true,
    removalDelay: 300,
    tClose: 'Закрыть',
    mainClass: 'my-mfp-zoom-in'
});


$('#answers-slider').magnificPopup({
    delegate: 'a.doc-link',
    preload: [0,2],
    type: 'image',
    tClose: 'Закрыть',
    tLoading: 'Загрузка...',
    mainClass: 'my-mfp-zoom-in',
    gallery: {
        enabled: true,
        tPrev: 'Назад',
        tNext: 'Вперед',
        tCounter: ''
    },
    image: {
        tError: 'Невозможно загрузить :('
    },
    ajax: {
        tError: 'Невозможно загрузить :('
    }
});
$('.awards-slider').magnificPopup({
    delegate: 'a',
    preload: [0,2],
    type: 'image',
    tClose: 'Закрыть',
    tLoading: 'Загрузка...',
    mainClass: 'my-mfp-zoom-in',
    gallery: {
        enabled: true,
        tPrev: 'Назад',
        tNext: 'Вперед',
        tCounter: ''
    },
    image: {
        tError: 'Невозможно загрузить :('
    },
    ajax: {
        tError: 'Невозможно загрузить :('
    }
});
$('.video-link-modal').magnificPopup({
        disableOn: 700,
        type: 'iframe',
        removalDelay: 160,
        preloader: false,
        fixedContentPos: true,
        tClose: 'Закрыть',
        mainClass: 'my-mfp-zoom-in'
});
$("#service-check_value").slider({
    ticks_labels: ['50','1000'],
    tooltip: 'always'
});
    $("#service-check_value").on("slide", function(slideEvt) {
        console.log(slideEvt.value);
});
setTimeout(function() {
    $('select').styler();
    $('input').styler();
}, 100);




$("#bgndVideo").YTPlayer();

if($( window ).width() > 1024){
$('.left-side-menu').stickySidebar({
    topSpacing: 96,
    bottomSpacing: 0
});
}
$('.close-service-menu').click(function () {
    $('.service-main-menu').removeClass('show');
    $('.service-link-main').removeClass('active');
    $('.lside-menu-block').removeClass('show');
});

$('.tab-link').click(function () {
   var curTab = $(this).attr('data-tab');
   if($(this).hasClass('active')){

   }
   else{
       $('.tab-link').removeClass('active');
       $(this).addClass('active');
       $('.tab-info').fadeOut('fast');
       $('.tab-info[data-tab="'+ curTab +'"]').fadeIn('fast');
   }
});

$('.left-side-menu .submenu-link').click(function () {
   if($(this).hasClass('active')){
       $('.left-side-menu .submenu-link').removeClass('active');
       $('.left-side-menu .lside-menu-block').removeClass('show');
       $('.submenu-block').removeClass('show');

   }
   else{
       $('.left-side-menu .submenu-link').removeClass('active');
       $(this).addClass('active');
       $('.submenu-block').removeClass('show');
       $('.left-side-menu .lside-menu-block').addClass('show');
       $(this).parent().find('.submenu-block').addClass('show');
   }
});
$('.submenu-close-link').click(function () {
    $('.left-side-menu .submenu-link').removeClass('active');
    $('.submenu-block').removeClass('show');
    $('.left-side-menu .lside-menu-block').removeClass('show');
});

$('.contact-link').click(function () {
   var curTab = $(this).attr('data-type');
   $('.contacts-main__title').removeClass('active');
   $('.contacts-main__title[data-type="'+ curTab +'"]').addClass('active');
   $('.contacts-main__type').fadeOut('fast');
   $('.contacts-main__type[data-type="'+ curTab +'"]').fadeIn('fast');
});
$('.office-list__row').click(function () {
   if($(this).hasClass('active')){
       $(this).removeClass('active').find('.office-metro-info').slideUp('fast');
   }
   else{
       $('.office-list__row').removeClass('active').find('.office-metro-info').slideUp('fast');
       $(this).addClass('active').find('.office-metro-info').slideDown('fast');
   }
});


$('.about-principles__link').click(function () {
   var curTab = $(this).attr('data-tab');
   $('.about-principles__item').removeClass('active');
   $(this).parent().addClass('active');
   $('.about-principles__tab').css('display','none');
   $('.about-principles__tab[data-tab="'+ curTab +'"]').css('display','block');
});

$('.print-btn').click(function () {
    var printContents = $('#mainContent').clone(true).find('.main-content__bottom').remove().end().html();
    console.log(printContents);
    var originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;

    window.print();

    document.body.innerHTML = originalContents;
});
});

$(document).on('af_complete', function(event,res) {
    if(res.success) setTimeout(function() {$("#thanks_link").click();}, 350);
});