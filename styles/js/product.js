// JavaScript Document
//图片
$(function(){
	$("img.smallImage").mouseenter(function(){
		var bigImageURL = $(this).attr("bigImageURL");	
		$("img.bigImg").attr("src",bigImageURL);
	});
	$("img.bigImg").load(
		function(){
			if(initBigImg)
				return;
				$("img.smallImage").each(function(){
					var bigImageURL = $(this).attr("bigImageURL");
					img = new Image();
					imig.src = bigImageURL;
					img.onload = function(){
						$("div.img4load").append($(img));
					};
				});	
			initBigImg=true;
		}
	);
});
//修改价格
$(function(){
	var stock=66;
	$(".productNumberSetting").keyup(function(){
		var num = $(".productNumberSetting").val();	
		num=parseInt(num);
		if(isNaN(num)){
			num=1;	
		}
		if(num<=0){
			num=1;	
		}
		if(num>stock){
			num=stock;	
		}
		$(".productNumberSetting").val(num);
	});
	$(".increaseNumber").click(function(){
		var num = $(".productNumberSetting").val();
		num++;
		if(num>stock){
			num=stock;	
		}	
		$(".productNumberSetting").val(num);
	});
	$(".decreaseNumber").click(function(){
		var num = $(".productNumberSetting").val();
		--num;
		if(num<=0){
			num=1;	
		}	
		$(".productNumberSetting").val(num);
	});
});
//详情与评价
$(function(){
	$("div.productReviewDiv").hide();
	$("a.productDetailTopReviewLink").click(function(){
		$("div.productReviewDiv").show();
		$("div.productDetailDiv").hide();	
	});
	$("a.productReviewTopPartSelectedLink").click(function(){
		$("div.productReviewDiv").hide();
		$("div.productDetailDiv").show();	
	});
});