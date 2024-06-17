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
        $("#password").val('*******').attr('disabled', '');
        $('#roles').val(userData.roles[0]).attr('disabled', '');
        $('#name').val(userData.name);
        $('#username').val(userData.username).prop('readonly', true); // Không cho chỉnh sửa username
        $('#phoneNumber').val(userData.phoneNumber);

        $('form button[type="submit"]').html('Cập nhật người dùng')
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
      email: $("#email").val(),
    };

    if (!commonField.name) {
      alert('Vui lòng nhập tên');
      return;
    }

    if (!commonField.phoneNumber) {
      alert('Vui lòng nhập số điện thoại');
      return;
    }

    if (!/^\d{10}$/.test(commonField.phoneNumber)) {
      alert('Số điện thoại không hợp lệ. Vui lòng nhập đúng số điện thoại (Định dạng 10 số)');
      return;
    }

    if (!commonField.email) {
      alert('Vui lòng nhập email');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(commonField.email)) {
      alert('Email không hợp lệ. Vui lòng nhập đúng định dạng email');
      return;
    }

    if (!userId && !$('#password').val()) {
      alert('Vui lòng nhập mật khẩu');
      return;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    if (!userId && !passwordRegex.test($('#password').val())) {
      alert('Mật khẩu không hợp lệ. Vui lòng nhập mật khẩu có ít nhất 8 ký tự, bao gồm ít nhất một chữ cái viết thường, một chữ cái viết hoa và một số');
      return;
    }

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
        const msg = userId ? 'Cập nhật thành công' : 'Tạo thành công';
        alert(msg);
        window.location.href = 'users.html';
      },
      error: function (xhr, status, error) {
        alert('Có lỗi, vui lòng thử lại sau.');
      }
    });
  });
});