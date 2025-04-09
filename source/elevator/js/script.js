$(function(){

	var $menu = $('#navi .gnb > li');
	var $menuHeight = 80;
	//var $menuHeight = $('#navi').outerHeight();
	var $menuOffset = $('#header').offset();

	//pc navi
	$('#navi .gnb > li > a').on('mouseenter focusin', function(){
		var $totalHeight = $menuHeight + $(this).next('.depth2_wrap').height();		
		$menu.removeClass('on');				
		if($('#header').hasClass('mobile') !== true) {
			$('#navi .depth2_wrap .dept2').css('display','block');
			//$('#header').addClass('on');
			$('#header').closest('#wrapper').addClass('on');
			$(this).parent('li').addClass('on');
			$('#header').stop().animate({
				height:$totalHeight
			});		
		}
	});
	$menu.on('mouseleave', function(){
		if($('#header').hasClass('mobile') !== true) {
			$(this).removeClass('on');
			$('#header').stop().animate({
				height:$menuHeight
			});
			//$('#header').removeClass('on');
			$('#header').closest('#wrapper').removeClass('on');
		}		
	});
	$('.btn_menuall').blur(function(){
		if($('#header').hasClass('mobile') !== true) {
			$menu.removeClass('on');
			$('#header').stop().animate({
				height:$menuHeight
			});
			$('#header').removeClass('on');
			$('#header').closest('#wrapper').removeClass('on');
		}
	});
	  

	//1024 이하일때 mobile navi, 이상일때 pc navi
	var timer = null, sec=300;
	$(window).resize(function(){		
		clearTimeout(timer);
		timer = setTimeout(function(){
			if(window.innerWidth < 1025) { 
				$('#header').removeClass('sitemap');
				$('#header, .btn_menuall').removeClass('active');
				$('#header .btn_menuall').attr('title','전체메뉴 열기');
				$('#header').addClass('mobile');
			    $('#navi .depth2_wrap .dept2').css({display:'none', padding:'0 0 20px'});	
			} else {
				$('#header').removeClass('mobile');
				$('#header, .btn_menuall').removeClass('active');
				$('#header .btn_menuall').attr('title','전체메뉴(사이트맵) 열기');
				$('#header').addClass('sitemap');
				$('#navi .depth2_wrap .dept2').css({display:'block', height:'auto', padding:'20px 0'});
			}
		}, sec);
	}).resize();	

	
	//mobile navi
	$('.btn_menuall').click(function(){  
		//$(this).toggleClass('active');
		$('#header').toggleClass('active');
		if($('#header').hasClass('active')) {
			$(this).addClass('active').attr('title','전체메뉴 닫기');
		} else {
			$(this).removeClass('active').attr('title','전체메뉴 열기');
		}
	});			
	$(document).on('click', '#header.mobile #navi .gnb > li', function(e){
		e.preventDefault();
		var $depth2 = $(this).find('.dept2');				
		$('#navi .dept2').slideUp();		
		$menu.removeClass('on');		
		if($depth2.is(':visible')){
			$(this).removeClass('on');
			$depth2.stop().slideUp('fast');
		} else {
			$(this).addClass('on');
			$depth2.stop().slideDown('fast');
		}
	});
	$(document).on('click', '#header.mobile #navi .dept2 > li', function(e){
		e.preventDefault = false;
	});


	$(window).scroll(function(){   		
		var $windowOffset = $(this).scrollTop();
		
		if($windowOffset > $menuOffset.top) {  //헤더고정
			$('#header').addClass('fixed');
		} else {
			$('#header').removeClass('fixed');
		}

		if($windowOffset > 200) {    //위로가기버튼
			$('.btn_top').fadeIn();
		} else {
			$('.btn_top').fadeOut();
		}
	});
	
	//위로가기 버튼
	$('.btn_top').click(function() { 		
		$("html, body").animate({
				scrollTop: 0
		}, 500);
	});	


	//메인에 슬라이드들
	$('.main_visual .slider').slick({  //메인
		dots: true,		
		//accessibility:true,
		//infinite: true,
		fade: true,
		autoplaySpeed: 4200,	
		//speed: 1200,
		autoplay: true,
		draggable: true,
		slickPause: true,
		pauseOnHover: false,
		prevArrow : $('.main_visual .prev-arrow'), 
		nextArrow : $('.main_visual .next-arrow'),
		appendDots: $('.dots'),
		customPaging: function (slick,index) { 
			return '<span class="current" title="현재 슬라이드 번호">0' + (index + 1) + '</span> / <span class="total" title="총 슬라이드수">0' + slick.slideCount + '</span>'; 
		}
	});

	$('.notify_zone .slider').slick({  //팝업존
		dots: false,	
		accessibility:true,	
		infinite: true,	
		speed: 500,
		autoplay: true,
		draggable: true,
		slickPause: true,
		pauseOnHover: false,
		prevArrow : $('.notify_zone .prev-arrow'), 
		nextArrow : $('.notify_zone .next-arrow'),
	});	

	$('.bann_link .slider').slick({  //하단 링크 배너
		accessibility:true,	
		infinite: true,	
		speed: 300,
		//centerPadding: '60px',
		slidesToShow: 6,
		autoplay: true,
		draggable: true,
		slickPause: true,
		pauseOnHover: false,
		prevArrow : $('.bann_link .prev-arrow'), 
		nextArrow : $('.bann_link .next-arrow'),
		responsive: [
			{
				breakpoint: 1200,
				settings: {
					slidesToShow: 5
				}
			},
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 4
				}
			},			
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 3
				}
			},
			{
				breakpoint: 530,
				settings: {
					slidesToShow: 2
				}
			},  			
			{
			  breakpoint: 480,
			  settings: {
				slidesToShow: 1
			  }
			}
		  ]
	});		
	
	$('.pause').click(function(){      //슬라이드 멈춤
		if($(this).hasClass('play')) {
			$(this).removeClass('play');
			$(this).closest('.control').next('.slider').slick('slickPlay');
		} else {
			$(this).addClass('play');
			$(this).closest('.control').next('.slider').slick('slickPause');
		}
	});	


	$('.tab_button').click(function(){  //메인에 게시판 탭
		$('.board_item').removeClass('active');
		$(this).closest('.board_item').addClass('active');
	})


	//서브메뉴 & indicator
	$('.snb > ul > li').on('mouseenter focusin', function(){	
		$(this).addClass('on');	
	});
	$('.snb > ul > li').on('mouseleave focusout', function(){
		$(this).removeClass('on');
	});

	//서브메뉴영역 외 클릭시 서브메뉴 닫음
	// $('#wrapper').click(function(e){
	// 	if(!($('.snb').has(e.target).length)) { 
	// 		$('.snb > ul > li').removeClass('on');
	// 		$('.snb_depth').slideUp(); 
	// 	} 
	// });


	$('a[href="#a"]').click(function(e){
		e.preventDefault();
	});


	//faq tab
	$('.faq_wrap > div').addClass('on');
	$('.faq_tab li').click(function(){
		var $tab = $(this).attr('data-role');
		var $tab_tit = $(this).text(); 
		$('.faq_tit').text($tab_tit); //탭 제목
		$('.faq_tab li').removeClass('on');
		$(this).addClass('on');	

		$('.faq_wrap > div').removeClass('on');
		($tab == 'all') ? $('.faq_wrap > div').addClass('on') : $('#'+ $tab).addClass('on')
	});	
	$('.faq_list dt').on('click', function(){  //faq 내용 다운 슬라이드
		var $faqContent = $(this).next('dd');
		if($faqContent.is(':visible')) {
			$faqContent.stop().slideUp();
			$(this).removeClass('on');
			$(this).find('a').attr('title','질문에 대한 답글 열기')
		} else {
			$('.faq_list dt').next('dd').slideUp();
			$faqContent.stop().slideDown();
			$(this).addClass('on');
			$(this).find('a').attr('title','질문에 대한 답글 열림')
		}
	});


});
