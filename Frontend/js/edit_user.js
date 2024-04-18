$(document).ready(function () {
    // Lấy id người dùng từ query parameter trong URL
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('user_id');

    // Gọi API để lấy dữ liệu của người dùng cần chỉnh sửa
    $.ajax({
        url: API_ENDPOINT.GET_USER+ `${userId}`,
        type: 'GET',
        beforeSend: function (request) {
            request.setRequestHeader('Authorization', ACCESS_TOKEN); 
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
        var updatedUserData = {
            name: $('#name').val(),
            phoneNumber: $('#phoneNumber').val()
        };

        // Gọi API để cập nhật thông tin người dùng
        $.ajax({
            url: API_ENDPOINT.GET_USER+`${userId}`, 
            type: 'PUT',
            beforeSend: function (request) {
                request.setRequestHeader('Authorization', ACCESS_TOKEN); // Thêm header Authorization
                request.setRequestHeader('Content-Type', 'application/json'); // Đặt kiểu dữ liệu của request là JSON
            },
            data: JSON.stringify(updatedUserData), // Chuyển dữ liệu sang định dạng JSON
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

