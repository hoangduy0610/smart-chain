$(document).ready(function () {
  $('#userForm').submit(function (event) {
    // Prevent the default form submission
    event.preventDefault();

    $.ajax({
      url: API_ENDPOINT.CREATE_USER,
      method: 'POST',
      headers: {
        'Authorization': ACCESS_TOKEN,
      },
      data: {
        name: $('#name').val(),
        username: $('#username').val(),
        phoneNumber: $('#phoneNumber').val(),
        password: $('#password').val(),
        roles: $('#roles').val()
      },
      success: function (response) {
        console.log('User created successfully:', response);
        alert('User created successfully!');
      },
      error: function (xhr, status, error) {
        console.error('Error creating user:', error);
        alert('Error creating user. Please try again later.');
      }
    });
  });
});