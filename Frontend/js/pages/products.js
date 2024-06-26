$(document).ready(function () {
  $("body").tooltip({ selector: '[data-bs-toggle=tooltip]' });
  const tableRenderColumns = [
    'name',
    {
      data: 'imageUrl',
      render: function (data, type, row, meta) {
        return `<div class="d-flex justify-content-center"><img style="width: 10rem; height:auto;" src="${data}"/></div>`
        // return `<a href="${data}" target='_blank' class="btn btn-success">Open</a>`;
      }
    },
    'productId',
    'price',
    'description',
    {
      "data": 'null',
      render: function (data, type, row, meta) {
        return `
          <div class="d-flex p-2 justify-content-center">
            <button data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Xem thuộc tính" class="btn btn-primary btn-show-attributes m-1"><i class="fa-solid fa-circle-info"></i></button>
            <button data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Xóa" class="btn btn-danger btn-delete-product m-1"><i class="fa-solid fa-trash"></i></button>
            <button data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Sửa" class="btn btn-indigo btn-update-product m-1"><i class="fa-solid fa-pen-to-square"></i></button>
            <button data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Tạo mùa vụ mới" class="btn btn-success btn-create-batch m-1"><i class="fa-solid fa-box"></i></button>
          </div>
        `;
      }
    }
  ];
  const productTable = initDataTable(
    '#productTable',
    { ajaxUrl: API_ENDPOINT.PRODUCT.LIST_PRODUCT },
    tableRenderColumns,
    [],
    () => {
      signalStopPreloader();
    }
  );

  $('#productTable tbody').on('click', '.btn-show-attributes', function () {
    const row = $(this).parents('tr')[0];
    const data = productTable.row(row).data();
    // console.log(data)

    $("#productAttributeModalBody").html(
      data.attributes
        .map(
          (attr) => {
            return showarr(attr)
          }
        )
        .join('')
    )

    $('#P-AttributesModal').modal('show');
  });

  $('.btn-link-create').click(function (e) {
    e.preventDefault();
    window.location.href = 'form-product.html';
  });

  $('#productTable tbody').on('click', '.btn-delete-product', function () {
    const row = $(this).parents('tr')[0];
    const data = productTable.row(row).data();
    var id = data._id;
    // console.log(id);

    $.ajax({
      url: fillEndpointPlaceholder(API_ENDPOINT.PRODUCT.DELETE_PRODUCT, { id: id }),
      type: 'DELETE',
      beforeSend: function (request) {
        request.setRequestHeader("Authorization", ACCESS_TOKEN);
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
    const row = $(this).parents('tr')[0];
    const data = productTable.row(row).data();
    const id = data._id;
    // console.log(id);

    window.location.href = `form-product.html?id=${id}`
  });
  $('#productTable tbody').on('click', '.btn-create-batch', function () {
    const row = $(this).parents('tr')[0];
    const data = productTable.row(row).data();
    const id = data._id;
    const productId = data.productId;
    window.location.href = `form-batch.html?product_id=${productId}`;
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
