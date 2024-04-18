$(document).ready(function () {
  const urlParams = new URLSearchParams(window.location.search);
  const userId = urlParams.get('user_id');

  if (!!userId) {
    $.ajax({
      url: fillEndpointPlaceholder(API_ENDPOINT.USER.GET_USER, { id: userId }),
      type: 'GET',
      headers: {
        'Authorization': ACCESS_TOKEN,
      },
      success: function (userData) {
        $("#password").remove();
        $('#roles').remove();
        $('#name').val(userData.name);
        $('#username').val(userData.username).prop('readonly', true); // Không cho chỉnh sửa username
        $('#phoneNumber').val(userData.phoneNumber);
      },
      error: function (error) {
        console.log('Error:', error);
      }
    });
  }

  $('#userForm').submit(function (event) {
    // Prevent the default form submission
    event.preventDefault();

    const commonField = {
      name: $('#name').val(),
      phoneNumber: $('#phoneNumber').val(),
    };

    $.ajax({
      url: userId ? fillEndpointPlaceholder(API_ENDPOINT.USER.UPDATE_USER, { id: userId }) : API_ENDPOINT.USER.CREATE_USER,
      method: userId ? 'PUT' : 'POST',
      headers: {
        'Authorization': ACCESS_TOKEN,
      },
      data: userId ? commonField : {
        ...commonField,
        username: $('#username').val(),
        password: $('#password').val(),
        roles: $('#roles').val()
      },
      success: function (response) {
        const msg = userId ? 'User updated successfully!' : 'User created successfully!';
        alert(msg);
      },
      error: function (xhr, status, error) {
        const msg = userId ? 'Error updating user. Please try again later.' : 'Error creating user. Please try again later.';
        alert(msg);
      }
    });
  });
});