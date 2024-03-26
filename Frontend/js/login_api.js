
        $(document).ready(function() {
            $('#login').submit(function(event) {
                event.preventDefault();
                
                var username = $('#login_email').val();
                var password = $('#password-login').val();
                
                // Call API login here
                $.ajax({
                    url: 'https://dynamic-ladybird-centrally.ngrok-free.app/auth/signin',
                    method: 'POST',
                    data: {
                        username: username,
                        password: password
                    },
                    success: function(response) {
                        // Save token to local storage
                        localStorage.setItem('token', response.token);
                        alert('Login successful!');
                    },
                    error: function() {
                        alert('Login failed!');
                    }
                });
            });
        });
