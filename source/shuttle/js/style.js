//햄버거 메뉴
$('.menu-triger').click(function(e){
  e.preventDefault();
  $(this).toggleClass('active');
});

//메인 슬라이드
var swiper = new Swiper('.swiper-container', {
    spaceBetween: 30,
    centeredSlides: true,
    autoplay: {
      delay: 4500,
      disableOnInteraction: false,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
});
//메인 app소개
var menu = ['차량 위치','알림 서비스','자녀별 관리']
var swiper = new Swiper('.app-container', {
  spaceBetween: 30,
  centeredSlides: true,
  autoplay: {
    delay: 6000,
    disableOnInteraction: false,
  },
  pagination: {
    el: '.app-pagination',
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '">' + (menu[index]) + '</span>';
    }
  },
});

//위로가기 버튼
$(window).scroll(function(){
  if($(this).scrollTop() >200) {
    $('.btn-top').fadeIn();
  } else{
    $('.btn-top').fadeOut();
  }
});
$('.btn-top').click(function(e){
  e.preventDefault();
  $('html, body').animate({scrollTop:0}, 400);
});

// 탭
$('.tab li').click(function(){
  var idx = $(this).index();
  $('.tab li').removeClass();
  $(this).addClass('active');
  $('.tab-con article').hide();
  $('.tab-con article').eq(idx).show();
});

//아코디언
$('.faq .tab-con li dt').click(function(e){
  e.preventDefault();
  $(this).next('dd').slideToggle('fast');  
  $(this).toggleClass('on');
  $('.faq .tab-con li dt').not(this).removeClass('on');
  $('.faq .tab-con li dt').not(this).next('dd').slideUp();
});

//애니메이션
if($(window).outerWidth() > 768) {
  $('section>div, h2, h3').each(function(idx, item){
    $(item).css('opacity',0);
    $(item).waypoint(function(){
      $(item).addClass('animate');
    }, {
      offset:'80%'
    });
  });
}