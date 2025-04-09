$(function() {
	//기본 토스트 메세지
	$('.toast.first').fadeIn(400).delay(2800).fadeOut(1000);

	// login에 차량번호 입력시 확인 버튼 활성화
	$('#car_num').on('change keyup paste', function(){
		$('.btn_confirm').addClass('active');
		if($(this).val() == '') {
			$('.btn_confirm').removeClass('active');
		}
	});
	//차량번호 확인
	$('.btn_confirm').on('click touchstart', function(e){
		$('.popup.confirm').fadeIn();
		e.preventDefault();
	});	
	$('.popup.confirm .popup_content>p').on('click touchstart', function(e){
		$('.popup.confirm').fadeOut();
		$('.toast.complete').fadeIn(400).delay(3500).fadeOut(1000);	
		e.preventDefault();
	});
	//관리자 로그인 선택
	$('.btn_admin').on('click touchstart', function(e){
		$('.popup.admin').fadeIn();
		e.preventDefault();
	});	
	//관리자 로그인 센터,차량 선택 완료시 간단메세지
	$('.btn_popup_confirm').on('click touchstart', function(e){
		$('.popup.admin').fadeOut();	
		$('.toast.complete').fadeIn(400).delay(3500).fadeOut(1000);		
		e.preventDefault();
	});	

	//거래처 납품정보 - 자세히보기
	$('.btn_detail').on('click touchstart', function(e){
		$detail = $(this).closest('.customer').next('.customer_detail');
		if($detail.is(':visible')) {
			$detail.slideUp('fast');
			$(this).css('transform','rotate(0deg)');
		} else {
			$detail.slideDown('fast');
			$(this).css('transform','rotate(-180deg)');
		}
		e.preventDefault();
	});


	//스크롤 내릴때 탭바 안보이고, 스크롤 올릴때 탭바 보이게
	var $lastScrollTop = 0;
	$(window).on('scroll', function(){
		$currentTop = $(this).scrollTop();
		if($currentTop < $lastScrollTop) { //up
			$('nav.tabbar').slideDown();
		} else {  //down			
			$('nav.tabbar').slideUp();
		}
		$lastScrollTop = $currentTop;
	});


	//카메라 촬영시 이미지 추가 및 해시태그 팝업 보이기
	$('#camera').change(function(e){
		var $hashObj = $('.hash_input .hashtag').html();
		$('.popup.hash_input').fadeIn();
		var $obj = '<article>' +
				   '<div class="hash">'+ $hashObj +'</div>' +
				   '<div class="picture"><img src="'+ URL.createObjectURL(e.target.files[0]) +'" alt="고객사 사진"></div>' +           
	               '</article>';

		$('.customer_picture').append($obj);
	});
	//해시태그 지우기
	$(document).on('click', '.hashtag span', function(e){
		$(this).remove();	
		$('.input_hash input').focus();
		e.preventDefault();
	});	
	//해시태그 추가
	$('.btn_add').on('click touchstart', function(e){
		var $hashValue = $('.input_hash input').val();
		var $obj = '<span>#' + $hashValue + '</span>'
		$('.input_hash input').focus();
		if($hashValue !== '') {
			$('.hashtag').append($obj);
			$('.input_hash input').val('').focus();
		}		
		e.preventDefault();
	});	

	//해시태그 팝업 닫기
	$('.btn_popup_confirm').on('click touchstart', function(e){
		$('.popup.hash_input').fadeOut();	
		e.preventDefault();
	});	
	
	//배송현황 : 업무전달 팝업
	$('.notice_info .btn_detail').on('click touchstart', function(e){		
		$detail = $(this).closest('.customer_detail');	
		if($detail.hasClass('up')) {
			$detail.removeClass('up');
			$(this).css('transform','rotate(180deg)');
		} else {
			$detail.addClass('up');
			$(this).css('transform','rotate(0deg)');
		}
		e.preventDefault();
	});	

	//상차검수상세내역		
	$('.checkbox_wrap input').on('checked click touchstart', function(e){
		if($(this).is(':checked')) {
			$(this).closest('article, ul').addClass('selected');
		} else {
			$(this).closest('article, ul').removeClass('selected');
		}
	});	

	//배송현황 : 거래처적재 팝업
	$('.delivery_work .load').on('click touchstart', function(e){
		$('.popup.customer_load').fadeIn();	
		e.preventDefault();
	});	

	//배송현황 : 거래처적재 유형선택 후
	$('.customer_load .btn_group button').on('click touchstart', function(e){
		//e.preventDefault();
		$('.popup.customer_load').fadeOut();	
		if($(this).hasClass('btn_popup_confirm')){
			location.href= 'customerLoading.html';
		}
	})

	//상하차검수내역 상세 : 강제상차, 하차 미스캔등록 팝업
	$('.delivery_status.product article .tit').on('click touchstart', function(e){
		$('#inspect_popup').fadeIn();	
		e.preventDefault();
	});	

	//닫기, 이전으로
	$('.btn_close').on('click touchstart', function(e){
		history.back();	
		e.preventDefault();
	});	

});


