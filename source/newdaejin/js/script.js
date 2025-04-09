$(function() {

	//배차확인
	$('.dispatch .checkbox_wrap input').on('checked click touchstart', function(e){
		if($(this).is(':checked')) {
			$(this).closest('article').addClass('selected');
		} else {
			$(this).closest('article').removeClass('selected');
		}
	});

	$('.dispatch .list_contents').on('click', function(e){
		if($(this).closest('article').hasClass('selected')) {
			$(this).closest('article').removeClass('selected');
			$(this).prev().find('input:checkbox').prop("checked", false); 
		} else {
			$(this).closest('article').addClass('selected');
			$(this).prev().find('input:checkbox').prop("checked", true); 
		}
	});

});
