$(document).ready(function() {
/* Изменение селекта вида услуги */
$(document).on("change", "select[name=service-view]", function(e) {
    e.preventDefault();
    while ($('.calc-form__afterload+*').length > 0) {
      $('.calc-form__afterload+*').remove();
    }
    var val = $(this).val(),
        type = $('select[name=service-type]').val();
    $.ajax({
        type: 'POST', 
        url: '/ajax.php', 
        dataType: 'json',
        data: {"val":val, "type":type, "action":"getDependedOptions"},
        success: function (x) {
          if(x.success){
            /*$('#calculatorBlock').html(x.html);
            $('#calculatorBlock select, #calculatorBlock input').styler('destroy');
            $('#calculatorBlock select, #calculatorBlock input').styler();*/
            $('.calc-form__afterload').after(x.html);
            $('.calc-form__content__column select, .calc-form__content__column input').styler('destroy');
            $('.calc-form__content__column select, .calc-form__content__column input').styler();
            calc();
          }
          else{
            $.jGrowl((x.message) ? x.message : 'Ошибка', {theme: 'af-message-error', life:10000, sticky: false});
          }
        return true;
        }
    });
});
/* Изменение селекта типа услуги */
$(document).on("change", "select[name=service-type]", function(e) {
    e.preventDefault();
    var page = $(this).find('option:selected').attr('data-page'),
        val = $(this).val();
    $.ajax({
        type: 'POST', 
        url: '/ajax.php', 
        dataType: 'json',
        data: {"val":val, "page":page, "action":"getViewsService"},
        success: function (x) {
          if(x.success){
            $('select[name="service-view"]').html(x.html);
            $('select[name="service-view"]').styler('destroy');
            $('select[name="service-view"]').styler();
            $('select[name=service-view]').trigger('change');
            calc();
          }
          else{
            $.jGrowl((x.message) ? x.message : 'Ошибка', {theme: 'af-message-error', life:10000, sticky: false});
          }
        return true;
        }
    });
});
/* Загрузка калькулятора с начальными параметрами */
$('select[name=service-type]').trigger('change');


/* сам калькулятор */
function calc(){
    var mainArr = [];
    var baseVal = $('.calc-form').find('select[name="service-view"]').find('option:checked').attr('data-baseprice');
    /* проверяем наличие базовой стоимости */
    if(baseVal == ''){
        /* если базовая стоимость прикреплена не к виду услуги, то берем ее из след блока */
        baseVal = $('.calc-form').find('.calc-form__content__column:eq(2)').find('select').find('option:checked').attr('value');
        /* проходим по всем блокам начиная с 3 и получаем данные */
        $('.calc-form__content__column').each(function(index){
            if(index > 2){
                var optionVal;
                if($(this).find('.input-group').attr('data-column-type') == 'radio'){
                    optionVal = $(this).find('input[type="radio"]:checked').attr('value');
                }
                else{
                    optionVal = $(this).find('select').find('option:checked').attr('value');
                }
                mainArr.push([$(this).find('.input-group').attr('data-operator'), optionVal]);   
            }
        });
    }
    else{
        /* проходим по всем блокам начиная со 2 и получаем данные */
        $('.calc-form__content__column').each(function(index){
            if(index > 1){
                var optionVal;
                if($(this).find('.input-group').attr('data-column-type') == 'radio'){
                    optionVal = $(this).find('input[type="radio"]:checked').attr('value');
                }
                else{
                    optionVal = $(this).find('select').find('option:checked').attr('value');
                }
                mainArr.push([$(this).find('.input-group').attr('data-operator'), optionVal]);   
            }
        });
    }
    var result = baseVal;
    /* проходим по полученному массиву данных и считаем */
    $.each(mainArr, function (index, value) {
        console.log('Данные: Оператор — ' + mainArr[index][0] + ' коэффициент — ' +  Number(mainArr[index][1]));
        switch (mainArr[index][0]) {
            case "*":
                result = parseInt(result) * Number(mainArr[index][1]);
                console.log(result);
                break;
            case '/':
                result = parseInt(result) / Number(mainArr[index][1]);
                console.log(result);
                break;
            case '+':
                result = parseInt(result) + Number(mainArr[index][1]);
                console.log(result);
                break;
            case '-':
                result = parseInt(result) - Number(mainArr[index][1]);
                console.log(result);
                break;    
        }
    });

    console.log('Основная стоимость — ' + baseVal);
    console.log('Результат вычислений — ' + parseInt(result));
    console.log(mainArr);
    
    /* выводим общую сумму */
    $('#result-val').text((parseInt(result)).toLocaleString('ru'));
};

$(document).on("change", ".calc-form select:not([name=service-view])", function(e) {
    calc();
});
$(document).on("change", ".calc-form input", function(e) {
    calc();
});

/* -------------------------------------------- */


var titleColumn = $('.service-main-menu .service-menu-block__column:last').find('.column-title').detach();
var titleList = $('.service-main-menu .service-menu-block__column:last').find('ul').detach();
$('.service-main-menu .service-menu-block__column:last').remove();
titleColumn.appendTo('.service-main-menu .service-menu-block__column:last');
titleList.appendTo('.service-main-menu .service-menu-block__column:last');



if($(window).width() < 1721 && $(window).width() >= 1280){
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
if($( window ).width() <= 1024){


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

    if($( window ).width() <= 768){
        $('.main-menu .backcall-block').detach().appendTo('.main-menu .mmenu-list');
        if($( window ).width() >= 575) {
            $('.backcall-block .header-phone-link').detach().insertAfter('.main-menu .container .menu-block');
        }
        else{
            $('.backcall-block .header-phone-link').detach().appendTo('.main-menu .mmenu-list');
        }
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
if($(window).width() <= 1024){
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
                            if($(window).width() <= 575){
                                header.css({
                                    "transform": "translateY(-64px)"
                                });
                                $('.lside-menu-block').css('transform', 'translateY(-64px)');
                            }
                            else{
                                header.css({
                                    "transform": "translateY(-95px)"
                                });
                                $('.lside-menu-block').css('transform', 'translateY(-95px)');
                            }

                            firstScrollDown = true;
                        }
                        header.css({
                            "position": "fixed"
                        });
                    } else {
                        if($(window).width() <= 575){
                            header.css({
                                "transform": "translateY(-64px)"
                            });
                            $('.lside-menu-block').css('transform', 'translateY(-64px)');
                        }
                        else{
                            header.css({
                                "transform": "translateY(-95px)"
                            });
                            $('.lside-menu-block').css('transform', 'translateY(-95px)');
                        }

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
    $(".menu-block").slideToggle("fast");
    if ($('.hamburger').hasClass("is-active")) {
        $('.hamburger').removeClass('is-active');
    } else {
        $('.hamburger').addClass('is-active');
    }
});
$(document).click(function (e) {
    var container = $(".hamburger");
    var container2 = $(".left-side-menu .lside-menu-block");
    if (container.has(e.target).length === 0 && e.target.className != 'hamburger hamburger--slider is-active' && e.target.className != 'mmenu-list__link service-link-main' && e.target.className != 'mmenu-list__link service-link-main active' && e.target.className != 'column-title' && e.target.className != 'column-title active') {
        if ($('.hamburger').hasClass("is-active")) {
            $('.hamburger').removeClass('is-active');
            $(".menu-block").slideToggle("fast");
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
        loop: false,
        margin: 10,
        startPosition: 0,
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
        loop: false,
        margin: 10,
        startPosition: 0,
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
                loop: false,
                startPosition: 0,
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
    loop: false,
    margin: 10,
    startPosition: 0,
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

var owl = $("#awards-slider");
owl.owlCarousel({
    loop: false,
    margin: 10,
    startPosition: 0,
    mouseDrag: true,
    touchDrag: true,
    dots: false,
    nav: false,
    navText: ['<i class="icon icon-s-left-arrow">', '<i class="icon icon-s-right-arrow">'],
    items: 1,
    onInitialized  : counter, 
    onTranslated : counter 
});
$('#award-next').click(function() {
    owl.trigger('next.owl.carousel');
})
$('#award-prev').click(function() {
    owl.trigger('prev.owl.carousel', [300]);
})

$("#servicecases-slider").owlCarousel({
    loop: false,
    margin: 34,
    startPosition: 0,
    mouseDrag: true,
    touchDrag: true,
    dots: false,
    nav: true,
    navText: ['<i class="icon icon-s-left-arrow">', '<i class="icon icon-s-right-arrow">'],
    responsive: {
        0: {
            items: 1
        },
        641: {
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

$.fn.chunk = function(size) {
  var arr = [];
  for (var i = 0; i < this.length; i += size) {
    arr.push(this.slice(i, i + size));
  }
  return this.pushStack(arr, "chunk", size);
}
$(".case-block.photo-block").wrap("<div class='slide-item'></div>");
$(".case-block.text-block").chunk(2).wrap('<div class="slide-item"></div>');

$("#know-slider").owlCarousel({
    loop: false,
    margin: 34,
    startPosition: 0,
    mouseDrag: true,
    touchDrag: true,
    dots: false,
    nav: true,
    navText: ['<i class="icon icon-s-left-arrow">', '<i class="icon icon-s-right-arrow">'],
    responsive: {
        0: {
            items: 1,
            nav: true,
            touchDrag: false
        },
        641: {
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
    loop: false,
    margin: 33,
    startPosition: 0,
    mouseDrag: true,
    touchDrag: true,
    dots: false,
    nav: true,
    navText: ['<i class="icon icon-s-left-arrow">', '<i class="icon icon-s-right-arrow">'],
    responsive: {
        0: {
            items: 1,
            startPosition: 1
            
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
    loop: false,
    margin: 32,
    startPosition: 0,
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
    loop: false,
    margin: 15,
    startPosition: 0,
    mouseDrag: true,
    touchDrag: true,
    dots: false,
    nav: true,
    navText: ['<i class="icon icon-s-border-left-arrow">', '<i class="icon icon-s-border-right-arrow">'],
    responsive: {
        0: {
            items: 3
        },
        576: {
            items: 4
        },
        769: {
            items: 6
        },
        1024: {
            items: 8
        },
        1100: {
            items: 5
        },
        1600:{
            items: 5
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
$('.small-images-slider').each(function() {
    $(this).magnificPopup({
        delegate: 'a',
        preload: [0,2],
        type: 'image',
        tClose: 'Закрыть',
        tLoading: 'Загрузка...',
        mainClass: 'my-mfp-zoom-in',
        gallery: {
            enabled: false,
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
});
$('.video-link-modal').magnificPopup({
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
       //$('body').css('overflow', 'hidden');
       $(this).parent().find('.submenu-block').addClass('show');
   }
});
$('.submenu-close-link').click(function () {
    $('.left-side-menu .submenu-link').removeClass('active');
    $('.submenu-block').removeClass('show');
    $('.left-side-menu .lside-menu-block').removeClass('show');
    $('body').css('overflow', 'auto');
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
    var form = res.form;
    if(res.success) {
        switch (form.attr('id')) {
            case 'anketp_form':
                setTimeout(function() {$("#thanks_link2").click();}, 350);
                break;
            case 'ankets_form':
                setTimeout(function() {$("#thanks_link2").click();}, 350);
                break;
            case 'email_form':
                setTimeout(function() {$("#thanks_link3").click();}, 350);
                break;
            case 'subscribe_form':
                setTimeout(function() {$("#thanks_link4").click();}, 350);
                break;
            case 'news-mailing':
                setTimeout(function() {$("#thanks_link4").click();}, 350);
                break;
            default:
                setTimeout(function() {$("#thanks_link").click();}, 350);
                break;
        }
    }
});

$('.question-btn-comm').click(function () {
    $('input[name="calcVal1"]').val($('select[name="service-type"]').val());
    $('input[name="calcVal2"]').val($('select[name="service-view"]').val());
    $('input[name="calcVal3"]').val($('select[name="activity-type"]').val());
    $('input[name="calcVal4"]').val($('select[name="persons-count"]').val());
    $('input[name="calcVal5"]').val($('input[name="year-cash"]:checked').val());
    $('input[name="calcVal6"]').val($('input[name="tax-system"]:checked').val());
    $('input[name="calcVal7"]').val($('input[name="account"]:checked').val());
    $('input[name="calcVal8"]').val($('input[name="advance-accaount"]:checked').val());
    $('input[name="calcVal9"]').val($('input[name="archive"]:checked').val());
    $('input[name="calcVal10"]').val($('input[name="optimization"]:checked').val());
    $('input[name="calcVal11"]').val($('input[name="reporting"]:checked').val());
    $('input[name="calcVal12"]').val($('input[name="tax-comm"]:checked').val());
    $('input[name="calcSumm"]').val($('#result-val').text());
    setTimeout(function () {
        jQuery.magnificPopup.open({
            items:
                {src: '#offer_modal2'},
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
    }, 500);
});