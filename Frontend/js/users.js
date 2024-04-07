
$(document).ready(function () {
  // Call API login here
  $('#usersTable').DataTable({
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
      },
    },
    "ajax": {
      'url': 'https://dynamic-ladybird-centrally.ngrok-free.app/user/list',
      'type': 'GET',
      'beforeSend': function (request) {
        request.setRequestHeader("Authorization", ACCESS_TOKEN);
      },
      "dataSrc": ""
    },
    "columns": [
      {
        "data": "name"
      }, {
        "data": "username"
      },
      {
        "data": "phoneNumber"
      },
    ],
    "initComplete": function (settings, json) {
      console.log(json);
    }
  });
});
