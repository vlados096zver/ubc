
$(document).ready(function() {

  $(window).on('load', function() {
    window.setTimeout(function() {
      $('body').addClass('loaded');
      $('body').removeClass('loaded__hiding');
    }, 5000);
  })

  $('.btn-scroll').on('click', function() {
    $('html, body').animate({
      scrollTop: 0
    }, '300');
    return false;
  });

  $(document).on('scroll', function() {
    $('.btn-scroll').toggleClass('btn-scroll--active', pageYOffset > 100);
  });

  function ShowBlock() {
    let ulBlock = $("ul.main-header__list li:not(ul.submenu li)");
    let points = $("ul.main-header__list li:not(ul.submenu li)").slice(-3);

    let screenWidth = $(window).outerWidth();
    if (screenWidth < 1200 && screenWidth > 650) {
      points.each(function(index, elem) {
        $(elem).css({
          'display': 'none'
        });
      })
    } else {
      ulBlock.each(function(index, elem) {
        $(elem).css({
          'display': 'block'
        });
      })
    }

  }

  ShowBlock();

  $(window).resize(function() {
    ShowBlock();
    showSubmenu('.main-header__link--add');
    if ($(window).width() > 650) {
      $('.submenu').attr('style', '');
      $('.main-header__level').removeClass('main-header__link--show');
    }
  })

  function showSubmenu(point) {
    $(point).on('click', function(e) {
      if (e.target.classList.contains('main-header__link--decor')) {
        e.preventDefault();
        $('.main-header__link--add').parent().toggleClass('main-header__link--show');
      }
      if ($(window).width() <= 650) {
        $(this).next().slideToggle();
      }
    });
  }

  showSubmenu('.main-header__link--decor');

  $('.main-nav__toggle').on('click', function() {
    $('.toggler').toggleClass('toggler--active');
    $('.main-header__row').toggleClass('main-header__row--active')
  });

  if ($('#thumbnails-gallery').length > 0) {

    window.lightGallery(
      document.getElementById("thumbnails-gallery"), {
        plugins: [lgAutoplay, lgFullscreen, lgThumbnail],
        autoplayFirstVideo: false,
        autoplay: true,
        autoplayControls: true,
        counter: false,
        addClass: 'port-gallery',
        download: true,
        controls: true,
        toggleThumb: true,

        mobileSettings: {
          controls: true,
          download: true,
          showCloseIcon: true,
          rotate: true,
        }
      }
    );
  }


  if ($('#doc-block').length > 0) {

    // Fancybox Config
    $('[data-fancybox="gallery"]').fancybox({
      buttons: [
        "slideShow",
        "fullScreen",
        "thumbs",
        "close"
      ],
      loop: false,
      arrows: true,
      infobar: false,

    });

  }

  const info = $('.info__wrap');


  info.slick({
    infinite: true,
     speed: 400,
    slidesToShow: 1,
    draggable: true,
    fade: false,
    arrows: false,
    dots: true,
    dotsClass: 'info__dots-list',
    cssEase: 'ease-in-out',
  });

  const reviews = $('.reviews__wrap');
  let arrowsReviews = $('.reviews__wrap-btn');
  reviews.slick({
    infinite: true,
    slidesToShow: 2,
    draggable: true,
    fade: false,
    arrows: true,
    appendArrows: arrowsReviews,
    prevArrow: '<button class="reviews__btn reviews__btn--dir_left"></button>',
    nextArrow: '<button class="reviews__btn reviews__btn--dir_right"></button>',
    responsive: [{
      breakpoint: 967,
      settings: {
        slidesToShow: 1,
      }
    }]
  });

  const recall = $('.recall__wrap');
  let arrowsRecall = $('.recall__wrap-btn');
  recall.slick({
    infinite: true,
    slidesToShow: 3,
    draggable: true,
    fade: false,
    arrows: true,
    appendArrows: arrowsRecall,
    prevArrow: '<button class="recall__btn recall__btn--dir_left"></button>',
    nextArrow: '<button class="recall__btn recall__btn--dir_right"></button>',
    responsive: [{
        breakpoint: 1051,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 781,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  });

  const news = $('.news__wrap');
  let arrowsNews = $('.news__wrap-btn');
  news.slick({
    infinite: true,
    slidesToShow: 1,
    draggable: true,
    fade: false,
    arrows: true,
    appendArrows: arrowsNews,
    prevArrow: '<button class="news__btn news__btn--dir_left"></button>',
    nextArrow: '<button class="news__btn news__btn--dir_right"></button>',
  });

  function loading(entries, observer) {
    const $this = $(entries[0].target);
    const $value = $this.find('.data__count');
    const value = $this.find('.data__count').data('progress-value');
    if (entries[0].isIntersecting) {
      $({
        value: 0
      }).animate({
        value,
      }, {
        duration: 1000,
        step: function load_animate(val) {
          $value.text(`${val.toFixed(0).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1,")} `);
        },
        complete: function() {
          observer.disconnect();
        }
      });
    }
  }

  var options = {
    rootMargin: '0px',
    threshold: .2
  }

  $('.data__item').each(function() {
    var sectionObserver = new IntersectionObserver(loading, options);
    sectionObserver.observe(this);
  })

  function animateBlock(entries, observer) {
    for (let i = 0; i < entries.length; i++) {
      const $this = $(entries[i].target);
      if (entries[i].isIntersecting) {
        $('.container-anim', $this).addClass('animate');
        elemObserver.unobserve(entries[i].target);
      }
    }
  }

  let elem = $('.item');
  var elemObserver = new IntersectionObserver(animateBlock, options);
  elem.each((i, e) => elemObserver.observe(e));

  function AnimetionBar(entries, observer) {
    const $this = $(entries[0].target);
    const progressBar = $this.find('.activities__bar');
    const value = progressBar.data('progress-value');
    if (entries[0].isIntersecting) {
      progressBar.width(`${value}%`);
    }
  }

  $('.activities__item').each(function() {
    var barObserver = new IntersectionObserver(AnimetionBar, options);
    barObserver.observe(this);
  })

});
