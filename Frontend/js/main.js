// Get Access Token for 1 time only
const ACCESS_TOKEN = getToken();

$('#sidebarCollapse').on('click', function () {
	$('#sidebar').toggleClass('active').promise().done(() => {
		// check if window is small enough so sidebar is hidden
		if ($(window).width() <= 768) {
			$('#content').toggleClass('d-none');
		}
	});
});

$(document).ready(function () {
	if (!token) {
		window.location.href = 'login.html';
	}
});