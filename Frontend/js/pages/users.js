$(document).ready(function () {
  const tableRenderColumns = [
    "name",
    "username",
    "phoneNumber",
    {
      data: 'id',
      render: function (data, type, row, meta) {
        return `<button class="btn btn-danger btn-xoa-user" data-id="${data}">Xóa</button>`;
      }
    },
    {
      data: 'id',
      render: function (data, type, row, meta) {
        return `<button class="btn btn-success btn-sua-user" data-id="${data}">Sửa</button>`;
      }
    },
  ]
  const userTable = initDataTable('#usersTable', { ajaxUrl: API_ENDPOINT.USER.LIST_USER }, tableRenderColumns);

  $('#usersTable tbody').on('click', '.btn-xoa-user', function () {
    var id = $(this).data('id');
    // console.log(id);

    $.ajax({
      url: fillEndpointPlaceholder(API_ENDPOINT.USER.DELETE_USER, { id: id }),
      type: 'DELETE',
      beforeSend: function (request) {
        request.setRequestHeader("Authorization", ACCESS_TOKEN);
      },
      success: function (result) {
        alert('Xóa người dùng thành công');
        userTable.ajax.reload();
      },
      error: function (error) {
        alert('Xóa người dùng thất bại');
      }
    });
  });

  $('#usersTable tbody').on('click', '.btn-sua-user', function () {
    var id = $(this).data('id');
    // console.log(id);

    // Điều hướng đến trang chỉnh sửa người dùng và truyền ID của người dùng
    window.location.href = `edit_user.html?user_id=${id}`;
  });
});
