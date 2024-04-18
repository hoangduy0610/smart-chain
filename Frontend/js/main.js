// Get Access Token for 1 time only
const ACCESS_TOKEN = getToken();

$(document).ready(function () {
	if (!ACCESS_TOKEN) {
		window.location.href = 'login.html';
	}

	$('#page-wrapper').prepend(`<div id="sidebar-loader"></div>`);
	$("#sidebar-loader").load('components/sidebar.html', function () {
		if ($(window).width() <= 768) {
			$('#sidebarCollapse').addClass('d-none');
		}
	});

	$('body').on('click', '#sidebarCollapse', function () {
		$('#sidebar').toggleClass('active').promise().done(() => {
			// check if window is small enough so sidebar is hidden
			if ($(window).width() <= 768) {
				$('#content').toggleClass('d-none');
			}

			const sidebarText = $('#sidebar').hasClass('active') ? 'Expand' : 'Collapse';
			$("#sidebarCollapse").html(`<span class="fa fa-fw fa-bars"></span> ${sidebarText} Menu`);
		});
	});
});

$.fn.dataTable.ext.errMode = 'none';