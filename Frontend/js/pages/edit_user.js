$(document).ready(function () {
    // Lấy id người dùng từ query parameter trong URL
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('user_id');

    // Gọi API để lấy dữ liệu của người dùng cần chỉnh sửa
    $.ajax({
        url: fillEndpointPlaceholder(API_ENDPOINT.USER.GET_USER, { id: userId }),
        type: 'GET',
        headers: {
            'Authorization': ACCESS_TOKEN,
        },
        success: function (userData) {
            // Điền dữ liệu vào các trường trong form
            $('#name').val(userData.name);
            $('#username').val(userData.username).prop('readonly', true); // Không cho chỉnh sửa username
            $('#phoneNumber').val(userData.phoneNumber);
        },
        error: function (error) {
            // Xử lý lỗi khi không lấy được dữ liệu
            console.log('Error:', error);
        }
    });

    // Xử lý sự kiện submit form
    $('#userForm').submit(function (event) {
        event.preventDefault(); // Ngăn chặn chuyển hướng trang khi submit form

        // Gọi API để cập nhật thông tin người dùng
        $.ajax({
            url: fillEndpointPlaceholder(API_ENDPOINT.USER.UPDATE_USER, { id: userId }),
            type: 'PUT',
            headers: {
                'Authorization': ACCESS_TOKEN,
            },
            data: {
                name: $('#name').val(),
                phoneNumber: $('#phoneNumber').val()
            }, // Chuyển dữ liệu sang định dạng JSON
            success: function (response) {
                // Xử lý khi cập nhật thành công
                console.log('Update successful:', response);
                alert('User update successfully!');
            },
            error: function (error) {
                // Xử lý khi gặp lỗi trong quá trình cập nhật
                console.log('Update failed:', error);
                alert('Error update user. Please try again later.');
            }
        });
    });
});

