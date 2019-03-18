// JavaScript Document
$(function(){
	$("a[OrderStatus]").click(function(){
		var orderStatus = $(this).attr("orderStatus");
		if("all"==orderStatus){
			$("table[orderStatus]").show();
		}else{
			$("table[orderStatus]").hide();
			$("table[orderStatus="+orderStatus+"]").show();
		}
		$("div.orderType div").removeClass("selectedOrderType");
		$(this).parent("div").addClass("selectedOrderType");
	});
	
	//下面的是与后台互的代码
	$("a.deleteOrderLink").click(function(){
		deleteOrderid=$(this).attr("oid");
		deleteOrder = false;
		$("#deleteConfirmModal").modal("show");	
	});
	$("button.deleteConfirmButton").click(function(){
		deleteOrder = true;
		$("#deleteConfirmModal").modal("hide");	
	});
	$("#deleteConfirmModal").on("hidden.bs.modal",function(e){
		if(deleteOrder){
			var page = "foredeleteOrder";
			$post(
				page,
				{"oid":deleteOrder},
				function(result){
					if("success"==result){
						$("table.orderListItemTable[oid="+deleteOrderid+"]");	
					}else{
						location.href="login.jsp";	
					}
				}
			);	
		}	
	})
});