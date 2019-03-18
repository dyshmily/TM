/*jQuery加特效*/
$(function(){
	$("div.rightMenu span").mouseenter(function(){
		var left = $(this).position().left;
		var top = $(this).position().top;
		var width = $(this).css("width");
		var destLeft = parseInt(left)+parseInt(width)/2;
		$("img#catear").css("left",destLeft);
		$("img#catear").css("top",top-20);
		$("img#catear").fadeIn(500);
	});
	$("div.rightMenu span").mouseleave(function(){
		$("img#catear").hide();
	});
});
/*交互*/
function showProductsAsideCategorys(cid){
	$("div.eachCategory[cid="+cid+"]").css("background-color","#FFF");
	$("div.eachCategory[cid="+cid+"] a").css("color","#87CEFA");
	$("div.productsAsideCategorys[cid="+cid+"]").show();
}
function hideProductsAsideCategorys(cid){
	$("div.eachCategory[cid="+cid+"]").css("background-color","#e2e2e3");
	$("div.eachCategory[cid="+cid+"] a").css("color","#000");
	$("div.productsAsideCategorys[cid="+cid+"]").hide();
}
$(function(){
	$("div.eachCategory").mouseenter(function(){
		var cid = $(this).attr("cid");
		showProductsAsideCategorys(cid);
	});
	$("div.eachCategory").mouseleave(function(){
		var cid = $(this).attr("cid");
		hideProductsAsideCategorys(cid);
	});
	$("div.productsAsideCategorys").mouseenter(function(){
		var cid = $(this).attr("cid");
		showProductsAsideCategorys(cid);
	});
	$("div.productsAsideCategorys").mouseleave(function(){
		var cid = $(this).attr("cid");
		hideProductsAsideCategorys(cid);
	});
});
$(function(){
	$("div.productsAsideCategorys div.row a").each(function(){
		var v = Math.round(Math.random()*6);
		if(v == 1)
		$(this).css("color","#87CEFA");
	});
});



















