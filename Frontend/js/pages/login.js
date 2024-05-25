const showHiddenPass = (loginPass, loginEye) => {
    const input = document.getElementById(loginPass),
        iconEye = document.getElementById(loginEye)

    iconEye.addEventListener('click', () => {
        if (input.type === 'password') {
            input.type = 'text'
            iconEye.classList.add('fa-eye')
            iconEye.classList.remove('fa-eye-slash')
        } else {
            input.type = 'password'

            iconEye.classList.remove('fa-eye')
            iconEye.classList.add('fa-eye-slash')
        }
    })
}

showHiddenPass('password-login', 'login-eye')

$(document).ready(function () {
    $('#login-btn').click(function (event) {
        $(".loader-container").addClass('active');
        var username = $('#login_email').val();
        var password = $('#password-login').val();

        // Call API login here
        $.ajax({
            url: API_ENDPOINT.AUTH.LOGIN,
            method: 'POST',
            data: {
                username: username,
                password: password
            },
            success: function (response) {
                // Save token to local storage
                localStorage.setItem('token', response.token);
                localStorage.setItem('@auth/userInfo', JSON.stringify(response.info));
                alert('Login successful!');
                window.location.href = 'index.html';
            },
            error: function () {
                alert('Login failed!');
            },
            complete: function () {
                $(".loader-container").removeClass('active');
            }
        });
    });
});