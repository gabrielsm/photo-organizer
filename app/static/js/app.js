(function($) {
	$(document).ready(() => {
		alert("AAAAAAAa");
		$("input").change(function() {
			alert("DDD");
			var val = $(this).val();
			alert("val: " + val);
		});
	});
})($);