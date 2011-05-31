Search.Index = {
	init: function() {
		$(function() {
			$("#search input").focus(function() {
				p = $("#search input");
				p.fadeTo('fast', 1);
			});

			$('#search input').focusout(function() {
				p = $("#search input");
				p.fadeTo('fast', 0.9);
			});
		});
	}
};