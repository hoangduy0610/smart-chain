$(document).ready(function () {
  // Call API login here
  const userTable = $('#usersTable').DataTable({
    "searching": true,
    "paging": true,
    "pagingType": "full_numbers",
    "lengthMenu": [
      [5, 10, 25, 50, 100, -1],
      [5, 10, 25, 50, 100, "All"]
    ],
    "language": {
      "lengthMenu": "Hiển thị _MENU_ giá trị mỗi trang",
      "zeroRecords": "Không có bản ghi phù hợp",
      "info": "Đang hiển thị trang thứ _PAGE_ trên _PAGES_ trang",
      "infoEmpty": "Không có bản ghi nào",
      "infoFiltered": "(Đã lọc được _MAX_ bản ghi)",
      "search": "Tìm kiếm: ",
      "paginate": {
        "first": "Trang đầu",
        "last": "Trang cuối",
        "next": "Tiếp",
        "previous": "Trước"
      }
    },
    "ajax": {
      'url': 'https://hongdi.ddns.net/user/list',
      'type': 'GET',
      'beforeSend': function (request) {
        request.setRequestHeader("Authorization", ACCESS_TOKEN);
      },
      "dataSrc": ""
    },
    "columnDefs": [
      {
        targets: -2, // Targeting the second to last column for the delete button
        data: 'id',
        render: function (data, type, row, meta) {
          return `<button class="btn btn-danger btn-xoa-user" data-id="${data}">Xóa</button>`;
        }
      },
      {
        targets: -1, // Targeting the last column for the edit button
        data: 'id',
        render: function (data, type, row, meta) {
          return `<button class="btn btn-success btn-sua-user" data-id="${data}">Sửa</button>`;
        }
      }
    ],
    "columns": [
      { "data": "name" },
      { "data": "username" },
      { "data": "phoneNumber" },
      { "data": "id" }, // Placeholder for delete button
      { "data": "id" } // Placeholder for edit button
    ],
    "initComplete": function (settings, json) {
      console.log(json);
    }
  });

  $('#usersTable tbody').on('click', '.btn-xoa-user', function () {
    var id = $(this).data('id');
    console.log(id);
    // Call API delete user here
    $.ajax({
      url: `https://hongdi.ddns.net/user/${id}`,
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
    console.log(id);

    // Hiển thị tên miền chứa ID của người dùng trong form sửa
    // var params = new URLSearchParams(window.location.search);
    // var userId = params.get(${id});
    // console.log(userId);

    // Điều hướng đến trang chỉnh sửa người dùng và truyền ID của người dùng
    window.location.href = `edit_user.html?user_id=${id}`;
  });
});
