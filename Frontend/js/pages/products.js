$(document).ready(function () {
  const tableRenderColumns = [
    {
      data: 'imageUrl',
      render: function (data, type, row, meta) {
        return `<img style="width: 10rem; height:auto;" src="${data}"/>`
        // return `<a href="${data}" target='_blank' class="btn btn-success">Open</a>`;
      }
    },
    'productId',
    'name',
    'price',
    'quantity',
    'description',
    {
      data: 'attributes',
      render: function (data, type, row, meta) {
        return `<button class="btn btn-danger btn-show-attributes my-2">Show</button>`;
      }
    },
    {
      "data": null,
      render: function (data, type, row, meta) {
        return `
          <div class="d-flex p-2" >
            <button type="button" class="btn btn-danger btn-delete-product mx-1" aria-disabled="true">Delete</button>
            <button type="button" class="btn btn-primary btn-update-product mx-1">Update</button>
          </div>
        `;
      }
    },
  ];

  const productTable = initDataTable(
    '#productTable',
    { ajaxUrl: API_ENDPOINT.PRODUCT.LIST_PRODUCT },
    tableRenderColumns,
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