
$(document).ready(
		function($) {
			dataToDis=[{"title":"Atree Grid","description":""}];
			$('body').on(
					'click',
					'.atree-product',
					function() {
						redirectUrl = $(this).attr("href");
						window.location.href = redirectUrl;
					});			
		});

function addUtilToPage(dataToDis)
{
	
	
}