document.addEventListener('DOMContentLoaded', () => {

	new WOW({
        boxClass:     'wow',      
        animateClass: 'animated', 
        offset:       0,          
        mobile:       false,       
        live:         false    
    }).init();

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
	var counterStarted = false //Garante que só chama o counter uma vez
	jQuery(window).on('scroll', function () {
		if(counterStarted) return;
		if (isElementInViewport(jQuery('.num-scroll')[0])) {
			jQuery('.num-js').each(function () {
				var targetValue = parseInt(jQuery(this).data('count'));
				var duration = 1750;
				animateCounter(this, targetValue, duration);
				counterStarted=true;

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

	// Portfolio START
    const portfolioSwiper = new Swiper('.portfolio-swiper', {
        speed: 1000,
        spaceBetween: 20,
        pagination: {
            el: '.portfolio-swiper .swiper-pagination',
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
	// Gallery END


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


	// 3D SOLID DRAG/ROTATE START 

    const el = document.querySelector('.solid');

    if (!el) {
        console.error("ERRO: Elemento .solid não encontrado no HTML!");
        return;
    }


    const sens = 0.25;
    let autoX = 15;
    let autoY = 20;
    let manualX = 0;
    let manualY = 0;
    
    let isDragging = false;
    let startX = 0;
    let startY = 0;
    let initialManualX = 0;
    let initialManualY = 0;

    function updateTransform() {
        el.style.transform = `rotateX(${autoX + manualX}deg) rotateY(${autoY + manualY}deg)`;
    }

    // Eventos de Mouse
    el.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.clientX;
        startY = e.clientY;
        initialManualX = manualX;
        initialManualY = manualY;
        el.style.cursor = 'grabbing';
    });

    window.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        e.preventDefault(); // Evita seleções indesejadas
        const deltaX = e.clientX - startX;
        const deltaY = e.clientY - startY;
        manualX = initialManualX + (deltaY * sens);
        manualY = initialManualY + (deltaX * sens);
        updateTransform();
    });

    window.addEventListener('mouseup', () => {
        isDragging = false;
        el.style.cursor = 'pointer';
    });

    // Eventos de Touch (Mobile)
    el.addEventListener('touchstart', (e) => {
        isDragging = true;
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
        initialManualX = manualX;
        initialManualY = manualY;
    }, {passive: false});

    window.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        // e.preventDefault(); // Descomente se quiser bloquear o scroll da tela ao girar
        const deltaX = e.touches[0].clientX - startX;
        const deltaY = e.touches[0].clientY - startY;
        manualX = initialManualX + (deltaY * sens);
        manualY = initialManualY + (deltaX * sens);
        updateTransform();
    }, {passive: false});

    window.addEventListener('touchend', () => {
        isDragging = false;
    });

    function tick() {
        if (!isDragging) {
            autoY += 0.05;   // Aumentei a velocidade para testar visualização
            autoX -= 0.05;
        }
        updateTransform();
        requestAnimationFrame(tick);
    }
    
    tick();
	// 3D SOLID DRAG/ROTATE END

})

