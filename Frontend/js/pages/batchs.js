$(document).ready(function () {
  const tableRenderColumns = [
    "batchId",
    "name",
    "status",
    "quantity",
    {
      "data": 'null',
      render: function (data, type, row, meta) {
        return `
            <div class="d-flex p-2 justify-content-center">
              <button type="button" class="btn btn-danger btn-delete-batch m-1" aria-disabled="true">Delete</button>
              <button type="button" class="btn btn-primary btn-update-batch m-1">Update</button>
            </div>
          `;
      }
    },
    {
      "data": 'null',
      render: function (data, type, row, meta) {
        return `
            <div class="d-flex justify-content-center">
              <button type="button" class="btn btn-success btn-change-batch m-1" aria-disabled="true">Biến Động</button>
            </div>
              `;
      }
    },
  ]
  const BatchTable = initDataTable('#BatchTable', { ajaxUrl: API_ENDPOINT.BATCH.LIST_BATCH }, tableRenderColumns);
  // delete batch
  $('#BatchTable tbody').on('click', '.btn-delete-batch', function () {
    const row = $(this).parents('tr')[0];
    const data = BatchTable.row(row).data();
    var id = data._id;
    console.log(id);

    $.ajax({
      url: fillEndpointPlaceholder(API_ENDPOINT.BATCH.DELETE_BATCH, { id: id }),
      type: 'DELETE',
      beforeSend: function (request) {
        request.setRequestHeader("Authorization", ACCESS_TOKEN);
      },
      success: function (result) {
        alert('xóa batch thành công');
        BatchTable.ajax.reload();
      },
      error: function (error) {
        alert('Xóa batch thất bại');
      }
    });
  });
  // update batch
  $('#BatchTable tbody').on('click', '.btn-update-batch', function () {
    const row = $(this).parents('tr')[0];
    const data = BatchTable.row(row).data();
    const id = data._id;
    // console.log(id);
    window.location.href = `form-batch.html?id=${id}`
  });

  $('#BatchTable tbody').on('click', '.btn-change-batch', function () {
    const row = $(this).parents('tr')[0];
    const data = BatchTable.row(row).data();
    // console.log(data)


    $('#Batch-change-Modal').modal('show');
  });

  

});