$(document).ready(function () {

   /*--- 홈 카테고리 메뉴 ---*/
   $(".category").owlCarousel({
      margin: 0,
      autoWidth: true,
      dots: false
   });
   $('.category .owl-item:first-child').addClass('on');
   $('.category .owl-item').on('click', function () {
      $('.category .owl-item').removeClass('on');
      $(this).addClass('on');
   });


   /*--- 홈 추천쿠폰 스와이프 ---*/
   $(".recommend .coupon_list").owlCarousel({
      margin: 4,
      autoWidth: true,
      dots: false
   });


   /*--- 헤더, 독바 ---*/
   var stickyOffset = $('.sticky').offset().top;
   var prevScrolltop = $(window).scrollTop();

   $('.docbar li').click(function () { //독바
      $(this).addClass('on').siblings().removeClass('on');
   });

   $(window).on('scroll touchmove', function () {
      if ($(document).scrollTop() > stickyOffset) {
         $('.sticky').addClass('fixed');
      } else {
         $('.sticky').removeClass('fixed');
      }

      var nowScrolltop = $(window).scrollTop();
      if (nowScrolltop > prevScrolltop) {
         $('.docbar nav').addClass('out');
      } else {
         $('.docbar nav').removeClass('out');
      }
      prevScrolltop = nowScrolltop;
   });


   /*--- 탭, 뒤로가기, 아코디언, 하단팝업 ---*/
   $('.tab li').click(function () {
      var idx = $('.tab li').index(this);
      $('.tab li').removeClass('on');
      $('.tabcontents > div').removeClass('tabon');
      $(this).addClass('on');
      $('.tabcontents > div').eq(idx).addClass('tabon');
   });

   $('.btnBack, .btnClose').click(function () {
      history.go(-1);
   });

   $('.policy > h4').click(function () {
      $('.policy article').slideUp();
      if (!$(this).next('article').is(':visible')) {
         $(this).next('article').slideDown();
      }
   });

   $('.logout a').click(function (e) {
      e.preventDefault();
      var result = confirm('정말로 로그아웃 하시겠습니까?');
      if (result) {
         location.replace('index.html');
      }
   });


   /*--- 쿠폰 수량 더하기, 빼기 ---*/
   $('.countPlus').click(function (e) { // + 버튼
      e.preventDefault();
      //var price = parseInt($(this).parent('.count').prev('a').find('.price > em').text().replace(/,/g, '') || '0'); //쿠폰가격
      var num = parseInt($(this).prev().val()); //현재쿠폰수량      
      var numCount = ++num;
      $(this).prev().val(numCount); //수량 +      
   });

   $('.countMinus').click(function (e) { // - 버튼
      e.preventDefault();
      var num = parseInt($(this).next().val());
      var numCount = --num;
      if (num >= 1) {
         $(this).next().val(numCount);
      }
   });


   /*--- 쿠폰상세_구매하기, 쿠폰보관함  ---*/
   $('.usedWrap .btnPurch a:last-child, .btnUsed').click(function (e) {
       e.preventDefault();
       $('.popup').addClass('on');
   });

   $('.btnCancel').click(function () {
      var result = confirm('정말로 결제를 취소하시겠습니까?');
      if (result) {
         location.replace();
      }
   });

   $('#allselect').change(function () { //장바구니 전체 체크시
      var allCheck = $('.contents.basket .coupon_list li input[type="checkbox"]');
      var allCount = allCheck.length;
      if ($(this).is(':checked')) {
         allCheck.prop({
            checked: true
         });
         //$('.amount h6 span em').html(allCount);  체크된 상품수
      } else {
         allCheck.prop({
            checked: false
         });
         //$('.amount h6 span em').html(0);
      }
   });

   $('.contents.basket .selectDel').click(function (e) { //선택삭제
      e.preventDefault();
      if ($("input:checkbox").is(":checked")) {
         var confirmTxt = confirm('정말로 상품을 삭제하시겠습니까?')
         if (confirmTxt) {
            $('input[type=checkbox]:checked').closest('li').remove();
         }
      }
   });

   $('.coupon_list .btnDel').click(function () { //개별 상품 삭제버튼
      var confirmTxt = confirm('해당 상품을 삭제하시겠습니까?');
      if (confirmTxt) {
         $(this).closest('li').remove();
      }
   });

   // var checkCoupon = $('.basket .coupon_list input[type="checkbox"]');
   // checkCoupon.change(function () {
   //    var checkCount = $('.basket .coupon_list input:checked').length; //체크된 상품갯수      
   //    $('.amount h6 span em').html(checkCount);
   // });


   /*--- 계정_변경할 비번 확인 ---*/
   $('#newPwd').keyup(function () {
      $('.chkNotice').html();
   });
   $('#confirmPwd').keyup(function () {
      if ($('#newPwd').val() != $('#confirmPwd').val()) {
         $('.chkNotice').html('비밀번호가 일치하지 않습니다').css('color', '#ee8326');
      } else {
         $('.chkNotice').html('비밀번호가 일치합니다').css('color', '#888');
      }
   });


   /*--- my_사진변경 ---*/
   if (!('url' in window) && ('webkitURL' in window)) {
      window.URL = window.webkitURL;
   }
   $('#camera').change(function (e) {
      $('.user p:first-child img').attr('src', URL.createObjectURL(e.target.files[0]));
   });


});