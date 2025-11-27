document.addEventListener('DOMContentLoaded', () => {

	new WOW().init();

	// Header START
	$('.hamburger').on('click', function() {
		if($(this).hasClass('is-active')) {
			$(this).removeClass('is-active');
			$('.header-mobile-wrap').slideUp(500);
		}
		else {
			$(this).addClass('is-active');
			$('.header-mobile-wrap').slideDown(500);
		}
	});


	function scrollHeader() {
		// Cache dos seletores para performance
		const $window = $(window);
		const $headerMenu = $('.header-menu');
		const $headerMobile = $('.header-mobile');
		const $socialSidebar = $('.social-sidebar');
		const headerTopHeight = $('.header-menu').outerHeight(); 

		if ($window.scrollTop() > headerTopHeight) {
			$headerMenu.addClass('is-opaque');
			$headerMobile.addClass('is-opaque');
			$socialSidebar.addClass('is-visible');
		} else {
			$headerMenu.removeClass('is-opaque');
			$headerMobile.removeClass('is-opaque');
			$socialSidebar.removeClass('is-visible');
		}
	}
	function showArrowUp() {
		if($(this).scrollTop() > 1500) {
			$('.go-up').addClass('is-active');
		}
		else {
			$('.go-up').removeClass('is-active');
		}
	}

	// Number counter START
	function animateCounter(element, targetValue, duration) {
		jQuery({ count: jQuery(element).text() }).animate(
			{
				count: targetValue
			},
			{
				duration: duration,
				easing: 'linear',
				step: function () {
					jQuery(element).text(Math.floor(this.count));
				},
				complete: function () {
					jQuery(element).text(targetValue);
				},
			}
		);
	}

	function isElementInViewport(elem) {
		if (!elem) return false;
		var rect = elem.getBoundingClientRect();
		return (
			rect.top >= 0 &&
			rect.left >= 0 &&
			rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
			rect.right <= (window.innerWidth || document.documentElement.clientWidth)
		);
	}

	jQuery(window).on('scroll', function () {
		if (isElementInViewport(jQuery('.num-scroll')[0])) {
			jQuery('.num-js').each(function () {
				var targetValue = parseInt(jQuery(this).data('count'));
				var duration = 1500;
				animateCounter(this, targetValue, duration);
			});

			jQuery(window).off('scroll.counter');
		}
	});

	jQuery(window).trigger('scroll');
	// Number counter END



	$(window).on('scroll', function() {
		scrollHeader();
		showArrowUp();
	});
	scrollHeader();
	showArrowUp();

	$('.anchor-link').on('click', function () {
	    let href = $(this).attr('href');

	    $('html, body').animate({
	        scrollTop: $(href).offset().top
	    }, {
	        duration: 700,
	    });
		$('.header-mobile-wrap').slideUp(500);
		$('.hamburger').removeClass('is-active');
	    return false;
	});

	$('.go-up').on('click', function () {
	    $('html, body').animate({
	        scrollTop: 0
	    }, {
	        duration: 700,
	    });
	    return false;
	});
	// Header END
	
	// Banner START
	const bannerSwiper = new Swiper('.banner-swiper', {
		speed: 1000,
		spaceBetween: 0,
		autoHeight: true,
		navigation: {
			nextEl: '.banner-swiper .swiper-button-next',
			prevEl: '.banner-swiper .swiper-button-prev',
		},
		pagination: {
			el: '.banner-swiper .swiper-pagination',
			type: 'bullets',
			clickable: true,
		},
	});
	// Banner END


	// Services START
	$('.services-btn').magnificPopup({
		type: 'inline',
		showCloseBtn: false,
		removalDelay: 500,
		callbacks: {
			beforeOpen: function() {
			   this.st.mainClass = this.st.el.attr('data-effect');
			}
		},
	});
	$('.modal-form-close').on('click', function() {
		$.magnificPopup.close();
	});
	// Services END

	// Gallery START
	$('.gallery-wrap a').magnificPopup({
		type: 'image',
		gallery: {
			enabled: true
		},
		callbacks: {
			beforeOpen: function() {
				this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
				this.st.mainClass = this.st.el.attr('data-effect');
			}
		},
	});

	$('.gallery-btn a').on('click', function(e) {
		e.preventDefault();
		var galleryItem = $('.gallery-item');

		if($(this).hasClass('is-active')) {
			$(this).removeClass('is-active');
			$(this).text('Ver mais');
			galleryItem.each(function() {
				if($(this).hasClass('is-active')) {
					$(this).removeClass('is-active');
					$(this).slideUp();
				}
			});
		}
		else {
			$(this).addClass('is-active');
			$(this).text('Ver menos');
			galleryItem.each(function() {
				if(!$(this).is(':visible')) {
					$(this).addClass('is-active');
					$(this).slideDown();
				}
			});
		}
	});
	// Gallery END


	// Reviews START
	const reviewsSwiper = new Swiper('.reviews-swiper', {
		speed: 1000,
		spaceBetween: 20,
		pagination: {
			el: '.reviews-swiper .swiper-pagination',
			type: 'bullets',
			clickable: true,
		},
		breakpoints: {
			320: {
				slidesPerView: 1,
			},
			575: {
				slidesPerView: 2,
			},
			992: {
				slidesPerView: 3,
			},
		  }
	});
	// Reviews END

	// WhatsApp Form Integration START
	const contactForm = document.getElementById('contact-form');
	
	if (contactForm) {
		contactForm.addEventListener('submit', function(e) {
			e.preventDefault(); 

			const nome = document.getElementById('form-nome').value;
			const telefone = document.getElementById('form-telefone').value;
			const email = document.getElementById('form-email').value;
			const mensagem = document.getElementById('form-mensagem').value;

			const whatsappNumber = "5531987950463";

			let text = `*Olá! Vim pelo site da Engeplena.*%0A%0A`;
			text += `*Nome:* ${nome}%0A`;
			if(telefone) text += `*Telefone:* ${telefone}%0A`;
			if(email) text += `*Email:* ${email}%0A`;
			if(mensagem) text += `*Mensagem:*%0A${mensagem}`;

			const url = `https://wa.me/${whatsappNumber}?text=${text}`; 
            
            const finalUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text.replace(/%0A/g, '\n'))}`;

			window.open(finalUrl, '_blank');
            
            contactForm.reset();
		});
	}
	// WhatsApp Form Integration END


	// 3D SOLID DRAG/ROTATE START (D3 + Lodash)
	// Certifique-se de ter:
	// <script src="https://d3js.org/d3.v5.min.js"></script>
	// <script src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.21/lodash.min.js"></script>
	// antes deste arquivo.

	if (typeof d3 !== 'undefined') {
		const sens = 0.25;
		const el = d3.select('.solid');

		if (!el.empty()) {
			let autoX = 15;    // inclinação inicial em X
			let autoY = 20;     // rotação inicial em Y
			let manualX = 0;   // rotação adicionada pelo usuário
			let manualY = 0;
			let offsetX = 0;
			let offsetY = 0;
			let startManualX = 0;
			let startManualY = 0;
			let isDragging = false;

			function updateTransform() {
				el.style(
					'transform',
					`rotateX(${autoX + manualX}deg) rotateY(${autoY + manualY}deg)`
				);
			}

			function getDragDeltaX() {
				return (d3.event.y - offsetY) * sens;
			}

			function getDragDeltaY() {
				return (d3.event.x - offsetX) * sens;
			}

			const drag = d3.drag()
				.on('start', () => {
					isDragging = true;
					offsetX = d3.event.x;
					offsetY = d3.event.y;
					startManualX = manualX;
					startManualY = manualY;
				})
				.on('drag', () => {
					manualX = startManualX + getDragDeltaX();
					manualY = startManualY + getDragDeltaY();
					updateTransform();
				})
				.on('end', () => {
					isDragging = false;
				});

			el.call(drag);

			// loop de animação suave
			function tick() {
				if (!isDragging) {
					// ajusta essas velocidades se quiser mais lento/rápido
					autoY += 0.06;   // gira em Y
					autoX += 0.015;  // leve balanço em X
				}
				updateTransform();
				requestAnimationFrame(tick);
			}
			tick();
		}
	}
	// 3D SOLID DRAG/ROTATE END

})

