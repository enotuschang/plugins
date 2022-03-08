(function ($) {
  let settings,
    methods = {
      init:
        function (options) {
          settings = $.extend({
            duration: 400,
            toggleSelector: false,
            contentSelector: false,
            wrapperSelector: false,
            single: false,
            stopPropagation: true,
            preventDefault: true
          }, options);
          return this.each(function (i) {
            const $obj = $(this)
            const $toggle = settings.toggleSelector ? $(settings.toggleSelector) : $obj.children().eq(0)
            const $content = settings.contentSelector ? $(settings.contentSelector) : $obj.children().eq(1)
            const $wrapper = $(this).parent(settings.wrapperSelector)

            function closeWrappered() {
              if ($wrapper.length) {
                const $wrappered = $('.ecp-folder', $wrapper)
                $('.ecp-folder-toggle', $wrappered).removeClass('open')
                $('.ecp-folder-content', $wrappered).stop().slideUp(settings.duration)
              }
            }

            $obj.addClass('ecp-folder')
            $toggle.addClass('ecp-folder-toggle').removeClass('open')
            $content.addClass('ecp-folder-content').stop().slideUp(settings.duration)

            $obj
              .on('click', function (e) {
                if (settings.preventDefault) e.preventDefault()
                if (settings.stopPropagation) e.stopPropagation()

                $obj.trigger('beforeScroll');
                if ($toggle.hasClass('open')) {
                  closeWrappered()
                  $toggle.removeClass('open')
                  $content.stop().slideUp(settings.duration, function () {
                    $obj.trigger('afterScroll', i)
                  })
                } else {
                  closeWrappered()
                  $toggle.addClass('open')
                  $content.stop().slideDown(settings.duration, function () {
                    $obj.trigger('afterScroll', i)
                  })
                }
              });
          });
        },
    };
  $.fn.ecpFolder = function (method) {
    if (methods[method]) {
      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    } else if (typeof method === 'object' || !method) {
      return methods.init.apply(this, arguments);
    } else {
      $.error('Метод с именем ' + method + ' не существует для jQuery.ptScroll');
    }
  };
})(jQuery);
