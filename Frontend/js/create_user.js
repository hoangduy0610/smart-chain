$(document).ready(function () {
    $('#userForm').submit(function (event) {
      // Prevent the default form submission
      event.preventDefault();

      // Get form data
      var formData = {
        name: $('#name').val(),
        username: $('#username').val(),
        phoneNumber: $('#phoneNumber').val(),
        password: $('#password').val(),
        roles: $('#roles').val()
      };

      $.ajax({
        method: 'POST',
        headers:{
          'Authorization': ACCESS_TOKEN,
        },
        url: API_ENDPOINT.CREATE_USER, 
        data: JSON.stringify(formData),
        contentType: 'application/json',
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