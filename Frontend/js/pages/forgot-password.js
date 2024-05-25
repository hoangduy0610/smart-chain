const preloaderImage = ['Preloader_1.gif', 'Preloader_2.gif', 'Preloader_3.gif', 'Preloader_4.gif', 'Preloader_5.gif', 'Preloader_6.gif', 'Preloader_7.gif'];
$('.se-pre-con').css({ 'background': "url('./assets/" + preloaderImage[Math.floor(Math.random() * preloaderImage.length)] + "') center no-repeat #ffffff" });

$(document).ready(function () {
    const params = new window.URLSearchParams(window.location.search);
    const step = params.get('s');

    switch (step) {
        case '2': {
            if (!params.get('q')) {
                window.location.href = 'forgot-password.html';
            }
            const username = atob(params.get('q'));
            $("#step1").remove();
            $("#step3").remove();
            signalStopPreloader();

            $('#validate-otp-btn').click(function () {
                $(".loader-container").addClass('active');
                var otp = $('#otp').val();
                $.ajax({
                    url: API_ENDPOINT.AUTH.VALIDATE_OTP,
                    method: 'POST',
                    data: {
                        username: username,
                        otp: otp
                    },
                    success: function (response) {
                        window.location.href = 'forgot-password.html?s=3&q=' + btoa(username) + '&t=' + response.token;
                    },
                    error: function () {
                        alert('Xác minh OTP thất bại');
                    },
                    complete: function () {
                        $(".loader-container").removeClass('active');
                    }
                });
            });
            break;
        }
        case '3': {
            if (!params.get('q') || !params.get('t')) {
                window.location.href = 'forgot-password.html';
            }
            const username = atob(params.get('q'));
            $("#step1").remove();
            $("#step2").remove();
            signalStopPreloader();

            $('#set-new-pass-btn').click(function () {
                $(".loader-container").addClass('active');
                $.ajax({
                    url: API_ENDPOINT.AUTH.SET_NEW_PASSWORD,
                    method: 'POST',
                    data: {
                        username: username,
                        token: params.get('t'),
                        password: $('#password-login').val()
                    },
                    success: function (response) {
                        alert('Đặt lại mật khẩu thành công');
                        window.location.href = 'login.html';
                    },
                    error: function () {
                        alert('Có lỗi xảy ra, vui lòng thử lại.');
                    },
                    complete: function () {
                        $(".loader-container").removeClass('active');
                    }
                });
            });
            break;
        }
        default: {
            $("#step2").remove();
            $("#step3").remove();
            signalStopPreloader();
            $('#send-otp-btn').click(function () {
                $(".loader-container").addClass('active');
                var username = $('#username').val();
                $.ajax({
                    url: API_ENDPOINT.AUTH.FORGOT_PASSWORD,
                    method: 'POST',
                    data: {
                        username: username
                    },
                    success: function (response) {
                        window.location.href = 'forgot-password.html?s=2&q=' + btoa(username);
                    },
                    error: function () {
                        alert('Gửi OTP thất bại');
                    },
                    complete: function () {
                        $(".loader-container").removeClass('active');
                    }
                });
            });
            break;
        }
    };
});