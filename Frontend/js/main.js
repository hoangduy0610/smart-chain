const preloaderImage = ['Preloader_1.gif', 'Preloader_2.gif', 'Preloader_3.gif', 'Preloader_4.gif', 'Preloader_5.gif', 'Preloader_6.gif', 'Preloader_7.gif'];
$('.se-pre-con').css({ 'background': "url('./assets/" + preloaderImage[Math.floor(Math.random() * preloaderImage.length)] + "') center no-repeat #ffffffaa" });

// Get Access Token for 1 time only
const ACCESS_TOKEN = getToken();

$(document).ready(function () {
	checkPermission();
	if (!DEBUG_MODE) {
		setInterval(() => {
			const t0 = Date.now();
			eval('debugger');
			const t1 = Date.now();
			if (t0 != t1) {
				$("body").html("");
				alert("Developer Console is disabled");
				window.location.href = 'about:blank';
			}
		}, 1000);
		
		$("script").remove();

		// Disable right-click
		document.addEventListener('contextmenu', (e) => e.preventDefault());

		function ctrlShiftKey(e, keyCode) {
			return e.ctrlKey && e.shiftKey && e.keyCode === keyCode.charCodeAt(0);
		}

		document.onkeydown = (e) => {
			// Disable F12, Ctrl + Shift + I, Ctrl + Shift + J, Ctrl + U
			if (
				event.keyCode === 123 ||
				ctrlShiftKey(e, 'I') ||
				ctrlShiftKey(e, 'J') ||
				ctrlShiftKey(e, 'C') ||
				(e.ctrlKey && e.keyCode === 'U'.charCodeAt(0))
			)
				return false;
		};
	}
});

$.fn.dataTable.ext.errMode = 'none';
