const preloaderImage = ['Preloader_1.gif', 'Preloader_2.gif', 'Preloader_3.gif', 'Preloader_4.gif', 'Preloader_5.gif', 'Preloader_6.gif', 'Preloader_7.gif'];
$('.se-pre-con').css({ 'background': "url('./assets/" + preloaderImage[Math.floor(Math.random() * preloaderImage.length)] + "') center no-repeat #ffffffaa" });

// Get Access Token for 1 time only
const ACCESS_TOKEN = getToken();

$(document).ready(function () {
	if (!ACCESS_TOKEN) {
		window.location.href = 'login.html';
	}
});

$.fn.dataTable.ext.errMode = 'none';
