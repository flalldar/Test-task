(function ($) {
	$(function () {
		// Float label
		$('.form__float').each(function () {
			var labelConteiner = $(this),
			    labelTextarea  = labelConteiner.find('textarea'),
			    labelInput     = labelConteiner.find('input, textarea');
			labelTextarea.closest('.form__float').addClass('is-textarea');
			if (labelInput.val().length > 0) {
				labelInput.addClass('focused');
			}

			labelInput.on('focus blur', function (e) {
				labelConteiner.toggleClass('focused', (e.type === 'focus' || $(this).val().length > 0));
			}).trigger('blur');
		});

		// Select style
		$('select').styler({
			singleSelectzIndex: '999',
			onSelectOpened    : function () {
				// к открытому селекту добавляется красная обводка
				var drop          = $(this).find('.jq-selectbox__dropdown > ul');
				var dropScrolling = new SimpleBar(drop[0], {
					autoHide        : false,
					scrollbarMinSize: 4
				});
			}
		});

		// Range
		var slider = $('#js_experience');

		slider.ionRangeSlider({
			min         : 0,
			max         : 100,
			from        : 50,
			hide_min_max: true,
			hide_from_to: true
		});

		var sliderData = slider.data('ionRangeSlider');
		$('.form-range__label').on('click', function () {
			var labelData = $(this).data('from');
			sliderData.update({
				from: labelData
			});
			return false;
		});

		// Menu

		function mobileMenuRemover(link, content) {
			link.removeClass('is-active');
			content.removeClass('is-active');
		}

		function mobileMenuOpen(link, content) {
			link.addClass('is-active');
			content.addClass('is-active');
			$(document).on('click', function (e) {
				if (!content.is(e.target) && content.has(e.target).length === 0) {
					mobileMenuRemover(link, content);
				}
			});
		}

		var mobileLink    = $('[data-mobile-menu="nav"]'),
		    mobileContent = $('[data-mobile-menu="wrapper"]');

		$('.header__link').on('click', function (e) {
			e.preventDefault();
			mobileMenuRemover(mobileLink, mobileContent);
			$('html, body').animate({
						scrollTop: $($(this).attr('href')).offset().top - 25,
					}, 700, 'linear'
			);
		});

		mobileLink.on('click', function (e) {
			e.preventDefault();
			if ($(this).hasClass('is-active')) {
				mobileMenuRemover(mobileLink, mobileContent);
				return false;
			} else {
				mobileMenuOpen(mobileLink, mobileContent);
				return false;
			}
		});
	});
})(jQuery);
