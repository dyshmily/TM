// JavaScript Document
//公共函数
function formatMoney(num){
	num = num.toString().replace(/\$|\,/g,''); 
	if(isNaN(num))
		num = "0";
	sign = (num == (num = Math.abs(num)));
	num = Math.floor(num*100+0.50000000001);
	cents = num%100;
	num = Math.floor(num/100).toString();
	if(cents<10)
		cents = "0"	+ cents;  
	for(var i=0;i<Math.floor((num.length-(1+i))/3);i++)
		num = num.substring(0,num.length-(4*i+3))+','+
          num.substring(num.length-(4*i+3));
	return (((sign)?'':'-') + num + '.' + cents);
} 
$(function(){
	// 选中一种商品 
	$("img.cartProductItemIfSelected").click(function(){
		var selectit = $(this).attr("selectit");
		if("selectit"==selectit){
			$(this).attr("src","images/cartNotSelected.png");
			$(this).attr("selectit","false");
		    $(this).parents("tr.cartProductItemTR").css("background-color","#fff");
		}else{
			$(this).attr("src","images/cartSelected.png");
			$(this).attr("selectit","selectit");
			$(this).parents("tr.cartProductItemTR").css("background-color","#FFF8E1");
		}
		syncSelect();
		syncCreateOrderButton();
		calcCartSumPriceAndNumber();
	});
	//同步结算按钮和价格数量信息   商品全选 
	$("img.selectAllItem").click(function(){
		var selectit = $(this).attr("selectit");
		if("selectit"==selectit){
			$("img.selectAllItem").attr("src","images/cartNotSelected.png");
			$("img.selectAllItem").attr("selectit","false");
			$(".cartProductItemIfSelected").each(function(){
				$(this).attr("src","images/cartNotSelected.png");
				$(this).attr("selectit","false");
				$(this).parents("tr.cartProductItemTR").css("background-color","#fff");	
			});	
		}
      else{
			$("img.selectAllItem").attr("src","images/cartSelected.png");
			$("img.selectAllItem").attr("selectit","selectit");
			$(".cartProductItemIfSelected").each(function(){
				$(this).attr("src","images/cartSelected.png");
				$(this).attr("selectit","selectit");
				$(this).parents("tr.cartProductItemTR").css("background-color","#fff8e1");	
			});	
		}
		syncCreateOrderButton();
		calcCartSumPriceAndNumber();
	});
	//直接修改数量 
	$(".orderItemNumberSetting").keyup(function(){
		var pid=$(this).attr("pid");
		var stock=$("span.orderItemStock[pid="+pid+"]").text();
		var price=$("span.orderItemPromotePrice[pid="+pid+"]").text();
		var num=$(".orderItemNumberSetting[pid="+pid+"]").val();
		num=parseInt(num);
		if(isNaN(num))
			num=1;
		if(num<=0)
			num=1;
		if(num>stock)
			num=stock;
		syncPrice(pid,num,price);
	});
	// 增加和减少数量 
	$(".numberPlus").click(function(){
		var pid = $(this).attr("pid");
		var stock = $("span.orderItemStock[pid="+pid+"]").text();
		var price=$("span.orderItemPromotePrice[pid="+pid+"]").text();
		var num=$(".orderItemNumberSetting[pid="+pid+"]").val();
		num++;
		if(num>stock)
			num=stock;
		syncPrice(pid,num,price);			
	});
	$(".numberMinus").click(function(){
		var pid = $(this).attr("pid");
		var stock = $("span.orderItemStock[pid="+pid+"]").text();
		var price=$("span.orderItemPromotePrice[pid="+pid+"]").text();
		var num=$(".orderItemNumberSetting[pid="+pid+"]").val();
		--num;
		if(num<=0)
			num=1;
		syncPrice(pid,num,price);
	});
})
//判断是否有商品被选中
function syncCreateOrderButton(){
	var selectAny=false;//没有选中
	$(".cartProductItemIfSelected").each(function(){
		if("selectit"==$(this).attr("selectit")){//选中
			selectAny=true;	
		}	
	});
	if(selectAny){
		$("button.createOrderButton").css("background-color","#c40000");
		$("button.createOrderButton").removeAttr("disabled");	
	}
  else{
		$("button.createOrderButton").css("background-color","#aaa");
		$("button.createOrderButton").attr("disabled","disabled");	
	}
}
//同步"全选"状态
function syncSelect(){
	var selectAll=true;//选中状态为真
	$(".cartProductItemIfSelected").each(function(){
		if("false"==$(this).attr("selectit")){//如果取出的值有等于false的就说明购物车中的商品并不是完全选中
			selectAll=false;	
		}	
	});
	if(selectAll)
		$("img.selectAllItem").attr("src","images/cartSelected.png");
	else
		$("img.selectAllItem").attr("src","images/cartNotSelected.png");
}
//显示被选中的商品总数，以及总价格
function calcCartSumPriceAndNumber(){
	var sum=0;
	var totalNumber=0;
	$("img.cartProductItemIfSelected[selectit='selectit']").each(function(){
		var oiid = $(this).attr("oiid");
		var price=$(".cartProductItemSmallSumPrice[oiid="+oiid+"]").text();//根据oiid取出价钱
		price=price.replace(/,/g,"");	
		price=price.replace(/￥/g,"");
		sum+=new Number(price);
		var num=$(".orderItemNumberSetting[oiid="+oiid+"]").val();
		totalNumber+=new Number(num);
	});
	$("span.cartSumPrice").html("￥"+formatMoney(sum));
	$("span.cartTitlePrice").html("￥"+formatMoney(sum));
	$("span.cartSumNumber").html(totalNumber);
}
//同步小计价格
function syncPrice(pid,num,price){
	$(".orderItemNumberSetting[pid="+pid+"]").val(num);	
	var cartProductItemSmallSumPrice=formatMoney(num*price);
	$(".cartProductItemSmallSumPrice[pid="+pid+"]").html("￥"+cartProductItemSmallSumPrice);
	calcCartSumPriceAndNumber();
}
