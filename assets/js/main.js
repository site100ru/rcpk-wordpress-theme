jQuery(function ($) {
    var CLOSE_DELAY = 220;

    $('.hor-menu__item.has-child').each(function () {
        $(this).data('menuTimer', null);
    });

    function openItem($item) {
        $('.hor-menu__item.has-child').not($item).each(function () {
            var $other = $(this);
            var t = $other.data('menuTimer');
            if (t) { clearTimeout(t); $other.data('menuTimer', null); }
            $other.removeClass('is-opened').children('.hor-menu__sub_list').stop(true, true).fadeOut(120);
        });

        $item.addClass('is-opened').children('.hor-menu__sub_list').stop(true, true).fadeIn(180);
    }

    function scheduleClose($item) {
        var t = $item.data('menuTimer');
        if (t) clearTimeout(t);

        t = setTimeout(function () {
            $item.removeClass('is-opened').children('.hor-menu__sub_list').stop(true, true).fadeOut(120);
            $item.data('menuTimer', null);
        }, CLOSE_DELAY);

        $item.data('menuTimer', t);
    }

    // Навешиваем обработчики на LI и на сам UL (подменю)
    $('.hor-menu__item.has-child').each(function () {
        var $li = $(this);
        var $sub = $li.children('.hor-menu__sub_list');

        // Когда заходим на li — открываем (и отменяем таймер)
        $li.on('mouseenter', function () {
            var t = $li.data('menuTimer');
            if (t) { clearTimeout(t); $li.data('menuTimer', null); }
            openItem($li);
        });

        // Когда уходим с li — ставим таймер на закрытие
        $li.on('mouseleave', function () {
            scheduleClose($li);
        });

        // Если курсор попадает на подменю — отменяем закрытие и держим открытым
        $sub.on('mouseenter', function (e) {
            var t = $li.data('menuTimer');
            if (t) { clearTimeout(t); $li.data('menuTimer', null); }
            // на всякий случай — убедимся, что родитель открыт
            $li.addClass('is-opened').children('.hor-menu__sub_list').stop(true, true).fadeIn(0);
        });

        // Уход с подменю — запланировать закрытие
        $sub.on('mouseleave', function (e) {
            scheduleClose($li);
        });
    });

    // Дополнительно: закрываем все меню при клике вне
    $(document).on('click touchstart', function (e) {
        if ($(e.target).closest('.hor-menu__item.has-child').length === 0) {
            $('.hor-menu__item.has-child').each(function () {
                var $it = $(this);
                var t = $it.data('menuTimer');
                if (t) { clearTimeout(t); $it.data('menuTimer', null); }
                $it.removeClass('is-opened').children('.hor-menu__sub_list').stop(true, true).fadeOut(120);
            });
        }
    });

});


$(document).ready(function () {
    // Инициализация начальных стилей при загрузке
    $('.side-panel__mask').css({
        'display': 'none',
        'opacity': '0',
        'transition': 'opacity 0.3s ease'
    });

    $('.side-panel__content').css({
        'display': 'none',
        'transform': 'translate3d(315px, 0px, 0px)',
        'transition': 'transform 0.3s ease'
    });

    // Клик по кнопке открытия
    $('.side-panel__button-open').on('click', function () {
        var $sidePanel = $(this).closest('.side-panel');
        var $mask = $sidePanel.find('.side-panel__mask');
        var $content = $sidePanel.find('.side-panel__content');

        // Добавляем класс is-open
        $sidePanel.addClass('is-open');

        // Показываем маску с плавным появлением
        $mask.css('display', 'block');
        setTimeout(function () {
            $mask.css('opacity', '1');
        }, 10);

        // Показываем контент с анимацией выезда
        $content.css('display', 'block');
        setTimeout(function () {
            $content.css('transform', 'translate3d(0px, 0px, 0px)');
        }, 10);
    });

    // Клик по кнопке закрытия
    $('.side-panel__button-close').on('click', function () {
        var $sidePanel = $(this).closest('.side-panel');
        var $mask = $sidePanel.find('.side-panel__mask');
        var $content = $sidePanel.find('.side-panel__content');

        // Убираем класс
        $sidePanel.removeClass('is-open');

        // Скрываем контент с анимацией
        $content.css('transform', 'translate3d(315px, 0px, 0px)');
        $mask.css('opacity', '0');

        // Скрываем после анимации (300ms)
        setTimeout(function () {
            $mask.css('display', 'none');
            $content.css('display', 'none');
        }, 300);
    });

    // Клик по оверлею - закрытие
    $('.side-panel__mask--u-ie2ugt4qt').on('click', function () {
        var $sidePanel = $(this).closest('.side-panel');
        var $mask = $(this);
        var $content = $sidePanel.find('.side-panel__content');

        // Убираем класс
        $sidePanel.removeClass('is-open');

        // Скрываем контент с анимацией
        $content.css('transform', 'translate3d(315px, 0px, 0px)');
        $mask.css('opacity', '0');

        // Скрываем после анимации (300ms)
        setTimeout(function () {
            $mask.css('display', 'none');
            $content.css('display', 'none');
        }, 300);
    });
});

$(document).ready(function () {
    // Инициализация
    $('.mosaic-popup__inner-bg--u-iim3w5fa1').css({
        'transition': 'opacity 0.3s ease',
        'opacity': '0',
        'display': 'none'
    });

    // Открытие окон - определяем по тексту кнопки
    $('.link-universal--u-ikofmis2h, [role="button"]').on('click', function () {
        var buttonText = $(this).text().trim();
        var popupId;
        
        // Определяем какое окно открыть по тексту кнопки
        if (buttonText.includes('Записаться') || buttonText.includes('Записатьс')) {
            popupId = 'popup-callback';
        } else if (buttonText.includes('Оставить заявку')) {
            popupId = 'popup-course';
        } else {
            popupId = 'popup-callback'; // по умолчанию
        }
        
        var $popup = $('#' + popupId + ' .mosaic-popup__inner-bg--u-iim3w5fa1');
        $popup.css('display', 'flex');
        setTimeout(function () {
            $popup.css('opacity', '1');
        }, 10);
    });

    // Закрытие по крестику
    $('.mosaic-popup__close--u-iqxwzmwlp').on('click', function () {
        var $popup = $(this).closest('.mosaic-popup__inner-bg--u-iim3w5fa1');
        $popup.css('opacity', '0');
        setTimeout(function () {
            $popup.css('display', 'none');
        }, 300);
    });

    // Закрытие по оверлею
    $('.mosaic-popup__inner-bg--u-iim3w5fa1').on('click', function (e) {
        if ($(e.target).hasClass('mosaic-popup__inner-bg--u-iim3w5fa1')) {
            var $popup = $(this);
            $popup.css('opacity', '0');
            setTimeout(function () {
                $popup.css('display', 'none');
            }, 300);
        }
    });
});

$(document).ready(function () {
    // Кнопка "Наверх" - плавная прокрутка
    $('.button-up--u-igorgqpz7').on('click', function () {
        $('html, body').animate({
            scrollTop: 0
        }, 800); // 800ms - скорость анимации
    });
});

$(document).ready(function() {
    // Клик на изображение для открытия модального окна
    $('.photo-swipe-image, .photo-swipe-image-nc, .lpc-image-type-1').on('click', function(e) {
        e.preventDefault();
        
        var imgSrc;
        
        // Проверяем, есть ли href у ссылки
        if ($(this).is('a') && $(this).attr('href')) {
            imgSrc = $(this).attr('href');
        } else {
            imgSrc = $(this).find('img').attr('src');
        }
        
        // Меняем src изображения в модальном окне
        $('#pswp-mosaic .pswp__img').attr('src', imgSrc);
        
        // Показываем модальное окно
        $('#pswp-mosaic').css({
            'display': 'block',
            'opacity': '0'
        });
        
        // Анимация появления
        setTimeout(function() {
            $('#pswp-mosaic').css('opacity', '1');
            $('#pswp-mosaic .pswp__bg').css('opacity', '0.7');
            $('#pswp-mosaic .pswp__img').css('opacity', '1');
        }, 50);
        
        // Блокируем скролл body
        $('body').css('overflow', 'hidden');
    });
    
    // Закрытие модального окна
    $(document).on('click', '.pswp__button--close, .pswp__bg', function() {
        $('#pswp-mosaic').css('opacity', '0');
        setTimeout(function() {
            $('#pswp-mosaic').css('display', 'none');
            $('body').css('overflow', '');
        }, 300);
    });
    
    // Закрытие по ESC
    $(document).on('keydown', function(e) {
        if (e.key === 'Escape' && $('#pswp-mosaic').is(':visible')) {
            $('#pswp-mosaic').css('opacity', '0');
            setTimeout(function() {
                $('#pswp-mosaic').css('display', 'none');
                $('body').css('overflow', '');
            }, 300);
        }
    });
});