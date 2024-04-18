const showHiddenPass = (loginPass, loginEye) => {
    const input = document.getElementById(loginPass),
        iconEye = document.getElementById(loginEye)

    iconEye.addEventListener('click', () => {
        if (input.type === 'password') {
            input.type = 'text'
            iconEye.classList.add('ri-eye-line')
            iconEye.classList.remove('ri-eye-off-line')
        } else {
            input.type = 'password'

            iconEye.classList.remove('ri-eye-line')
            iconEye.classList.add('ri-eye-off-line')
        }
    })
}

showHiddenPass('password-login', 'login-eye')

$(document).ready(function () {
    $('#login').submit(function (event) {
        event.preventDefault();

        var username = $('#login_email').val();
        var password = $('#password-login').val();

        // Call API login here
        $.ajax({
            url: 'https://hongdi.ddns.net/auth/signin',
            method: 'POST',
            data: {
                username: username,
                password: password
            },
            success: function (response) {
                // Save token to local storage
                localStorage.setItem('token', response.token);
                alert('Login successful!');
                window.location.href = 'index.html';
            },
            error: function () {
                alert('Login failed!');
            }
        });
    });
});