// one page scroll

$(function(){
	
	$('.maincontent').fullpage({
		verticalCentered : false
	});

	$('.down-arrow').on('click', function(e){
	    e.preventDefault();

		$.fn.fullpage.moveSectionDown();
	});
	
	$('.fixed-menu__link').on('click', function(e){
	    e.preventDefault();

	    var $this = $(this),
		    href = parseInt($this.attr('href')) + 1;

		$this.closest('.fixed-menu__item').addClass('fixed-menu__link-active')
			.siblings()
			.removeClass('fixed-menu__link-active');

		$.fn.fullpage.moveTo(href);
	    
	});

	$('.nav__link').on('click', function(event) {
		event.preventDefault();
		
		var $this = $(this),
		    href = parseInt($this.attr('href')) + 2;

		$.fn.fullpage.moveTo(href);

	});

	$('.order__link, .burger-slider__link').on('click', function(event) {
		event.preventDefault();

		$.fn.fullpage.moveTo(7);

	});
});


// burger slider 

$(function() {

	var burgerCarousel = $('.burger-slider__list').owlCarousel({
		items: 1,
		loop: true
	});

	$('.burger-slider__btn-next').on('click', function (e) {
		e.preventDefault();

		burgerCarousel.trigger('next.owl.carousel');
	});

	$('.burger-slider__btn-prev').on('click', function (e) {
		e.preventDefault();

		burgerCarousel.trigger('prev.owl.carousel');
	});
});

// team accordion

$(function () {
	
	$('.team-accordion__triger').on('click', function (e) {
		e.preventDefault();

		var $this = $(this),
			item = $this.closest('.team-accordion__item'),
			container = $this.closest('.team-accordion__list'),
			items = container.find('.team-accordion__item'),
			content = item.find('.team-accordion__content'),
			otherContent = container.find('.team-accordion__content');

		if(!item.hasClass('team-accordion__item-active')) {

			otherContent.slideUp(500);
			items.removeClass('team-accordion__item-active');
			item.addClass('team-accordion__item-active');
			content.slideDown(500);
			
		} else {
			item.removeClass('team-accordion__item-active')
			
		}
			
	});
});

// menu accordion 

$(function () {

	$('.menu-accordion__triger').on('click', function (e) {
		e.preventDefault();

		var $this = $(this),
			item = $this.closest('.menu-accordion__item'),
			container = $this.closest('.menu-accordion__list'),
			items = container.find('.menu-accordion__item'),
			content = item.find('.menu-accordion__content'),
			activeItem = items.filter('.menu-accordion__item-active'),
			activeContent = activeItem.find('.menu-accordion__content');
	

	if(!item.hasClass('menu-accordion__item-active')) {

		items.removeClass('menu-accordion__item-active');
		item.addClass('menu-accordion__item-active');

		activeContent.animate({
			'width' : '0px'
		}, 500)

		content.animate({
			'width' : '550px'
		}, 500);
	} else {
		item.removeClass('menu-accordion__item-active');
		content.animate({
			'width' : '0px'
		}, 500);
	}

	});

	$(document).on('click', function(e) {

		var $this = $(e.target);
		
		if(!$this.closest('.menu-accordion__list').length) {
			$('.menu-accordion__content').animate({
				'width' : '0px'
			}, 500);

			$('.menu-accordion__item').removeClass('menu-accordion__item-active');
		}
	});


});

// InputMask

$(function () {
	$('.phone-mask').inputmask("+7 (999) 999 99 99");
});

// fancybox 

$(function () {
	$('.review__btn-text').fancybox({
		type : 'inline',
		maxWidth : 460,
		fitToView : false,
		padding : 0
	});

	$('.full-review__close').on('click', function(e) {
		e.preventDefault();

		$.fancybox.close();
	});
});

// form submit

$(function () {

	$('#order__form').on('submit', function(event) {
		event.preventDefault();
	
	var form = $(this),
		formData = form.serialize();

	$.ajax({
		type: "POST",
		url: "form.php",
		data: formData,
		success: function (data) {
			if (data) {
				console.log(form, formData);
				$.fancybox.open({
					href: '#success',
					maxWidth: 250,
					fitToView: false,
					padding: 0,
					afterClose : function() {
                      form.trigger('reset');
                  }
				})
			} else {
				console.log(form, formData);
				$.fancybox.open({
					href: '#error',
					maxWidth: 250,
					fitToView: false,
					padding: 0,
					afterClose : function() {
                      form.trigger('reset');
                  }
				})
			}
		}

	});
	});

	$('.popup__success-close, .popup__error-close').on('click', function(e) {
        e.preventDefault();
        $.fancybox.close();
    });

});

// Yandex Map

$(function () {

 	ymaps.ready(init);
    	var myMap;

    function init(){     
        myMap = new ymaps.Map("map", {
            center: [59.91815363876071,30.30557799999997],
            zoom: 11,
            controls: []
        });

        var coords = [
			    [59.974275775103116,30.311175753825417], 
			    [59.9454783324449,30.382962623917503], 
			    [59.91706172825959,30.49236026609503],
			    [59.88865080431572,30.313604666546222]
					],
			    myCollection = new ymaps.GeoObjectCollection({}, {
			      	iconLayout: 'default#image',
			        iconImageHref: 'img/icons/map-marker.svg',
			        iconImageSize: [46, 57],
			        iconImageOffset: [-26, -52],
			        draggable: false 
			    });

			for (var i = 0; i < coords.length; i++) {
			    myCollection.add(new ymaps.Placemark(coords[i]));
			}

			myMap.geoObjects.add(myCollection);

			myMap.behaviors.disable('scrollZoom');
    }
});

