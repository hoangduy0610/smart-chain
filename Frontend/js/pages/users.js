$(document).ready(function () {
  const tableRenderColumns = [
    "name",
    "username",
    "phoneNumber",
    {
      data: 'id',
      render: function (data, type, row, meta) {
        return `
          <div class="d-flex p-2 justify-content-center">
            <button
              type="button"
              data-id="${data}"
              class="btn btn-danger btn-xoa-user m-1"
              data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Xóa"
            ><i class="fa-solid fa-trash"></i></button>
            <button
              data-id="${data}"
              type="button" class="btn btn-primary btn-sua-user m-1"
              data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Sửa"
            ><i class="fa-solid fa-pen-to-square"></i></button>
          </div>
        `;
      }
    },
  ]
  const userTable = initDataTable('#usersTable', { ajaxUrl: API_ENDPOINT.USER.LIST_USER }, tableRenderColumns, [], () => { signalStopPreloader(); });

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
    window.location.href = `form-user.html?user_id=${id}`;
  });
});
