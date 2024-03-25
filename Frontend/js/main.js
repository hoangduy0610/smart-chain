$('#sidebarCollapse').on('click', function () {
	$('#sidebar').toggleClass('active').promise().done(() => {
		// check if window is small enough so sidebar is hidden
		if ($(window).width() <= 768) {
			$('#content').toggleClass('d-none');
		}
	});
});