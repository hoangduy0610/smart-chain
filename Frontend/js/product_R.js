$(document).ready(function () {

  const productTable = $('#productTable').DataTable({
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
    // Call API login here
    "ajax": {
      'url': 'https://hongdi.ddns.net/product/list',
      'type': 'GET',
      'beforeSend': function (request) {
        request.setRequestHeader("Authorization", getToken());
      },
      "dataSrc": ""
    },
    columnDefs: [
      {
        targets: -3,
        data: 'attributes',
        render: function (data, type, row, meta) {
          return `<button class="btn btn-danger btn-show-attributes" data-attributes='${JSON.stringify(data)}' >Show</button>`;
        }
      },
    ],
    "columns": [
      {
        "data": "_id"
      },
      {
        "data": "owner"
      },
      {
        "data": "productId"
      },
      {
        "data": "name"
      },
      {
        "data": "price"
      },
      {
        "data": "quantity"
      },
      {
        "data": "description"
      },
      {
        "data": 'attributes'
      },
      {
        "data": "imageUrl"
      },
      {
        "data": null,
        render: function (data, type, row, meta) {
          return `
            <div class="d-flex p-2" >
            <button type="button" class="btn btn-danger btn-delete-product m-1"  aria-disabled="true">Delete</button>
            <button type="button" class="btn btn-primary btn-update-product m-1">Update</button>
            </div>
          `;
        }
      },
    ],
    "initComplete": function (settings, json) {
      console.log(json);
    }
  });

  $('#productTable tbody').on('click', '.btn-show-attributes', function () {
    // Get data of this row dataTable
    const row = $(this).parents('tr')[0];
    //for row data
    const data = productTable.row(row).data();
    console.log(data)
    $("#productAttributeModalBody").html(`
      ${data.attributes.map(attr => {
      return ` ${showarr(attr)}`
    }).join('')
      }`)
    // show modal bootstrap
    $('#P-AttributesModal').modal('show');
  });

  $('.btn-link-creat').click(function (e) {
    e.preventDefault();
    window.location.href = 'form-product.html';
  });

  $('#productTable tbody').on('click', '.btn-delete-product', function () {

    var table = $('#productTable').DataTable();
    var row = table.row($(this).closest('tr'));
    var data = row.data();
    var id = data._id;
    console.log(id);
    // Call API delete user here
    $.ajax({
      url: `https://hongdi.ddns.net/product/${id}`,
      type: 'DELETE',
      beforeSend: function (request) {
        request.setRequestHeader("Authorization", getToken());
      },
      success: function (result) {
        alert('Xóa sản phẩm thành công');
        productTable.ajax.reload();
      },
      error: function (error) {
        alert('Xóa sản phẩm thất bại');
      }
    });
  });

  $('#productTable tbody').on('click', '.btn-update-product', function () {
    const table = $('#productTable').DataTable();
    const row = table.row($(this).closest('tr'));
    const data = row.data();
    const id = data._id;
    console.log(id);
    window.location.href = `form-product.html?id=${id}`
  });

});

function showarr(attr) {
  var arr = []
  arr.push(attr)
  let result = '';
  for (let i = 0; i < arr.length; i++) {
    result += `<p><span style="display:inline; font-weight: 800">${arr[i].name}</span> : ${arr[i].value}</p>`;
  }
  return result;
}