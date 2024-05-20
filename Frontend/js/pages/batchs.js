$(document).ready(function () {
  $("body").tooltip({ selector: '[data-bs-toggle=tooltip]' });
  const userInfo = JSON.parse(localStorage.getItem('@auth/userInfo'));
  const tableRenderColumns = [
    "name",
    {
      "data": 'batchId',
      render: function (data, type, row, meta) {
        return `
          <div class="d-flex flex-1 justify-content-center">
            <div id="loader${data}" style="width:100px;height:100px;" class="linear-background"></div>
            <img class='d-none' style="max-width:100px" id="qr${data}"onload='(function(){document.getElementById("qr${data}").classList.remove("d-none");document.getElementById("loader${data}").classList.add("d-none")})()' src='${QR_HOST}${data}'/>
          </div>
        `;
      }
    },
    "batchId",
    {
      "data": 'status',
      render: function (data, type, row, meta) {
        let statusText = 'Đang nuôi trồng tại trang trại';
        if (row.status == 'InTransportation') {
          if (row.transporter) {
            statusText = 'Đang trên đường vận chuyển'
          } else {
            statusText = 'Đang chờ nhà vận chuyển nhận lô hàng'
          }
        } else if (row.status == 'InStore') {
          if (row.retailer) {
            statusText = 'Đã nhập vào kho bán lẻ'
          } else {
            statusText = 'Đã vận chuyển đến. Đang chờ nhập kho'
          }
        }
        return `
          <strong class="badge bg-primary p-2">${statusText}</strong> 
        `;
      }
    },
    "quantity",
    {
      "data": 'incharge',
      render: function (data, type, row, meta) {
        const isDisabled =
          !userInfo.roles.includes(data) &&
          !userInfo.roles.includes('ROLE_ADMIN') ||
          (row.status == 'InStore' && row.retailer)

        const dsb = !isDisabled ? '' : 'disabled';
        return `
          <div class="d-flex p-2 justify-content-center">
            <button
              type="button"
              class="btn btn-danger btn-delete-batch m-1"
              data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Xóa"
            ><i class="fa-solid fa-trash"></i></button>
            <button
              type="button" class="btn btn-primary btn-update-batch m-1"
              data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Cập nhật"
            ><i class="fa-solid fa-pen-to-square"></i></button>
            <button
              type="button" class="btn btn-success btn-change-batch m-1"
              data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Biến động số lượng"
            ><i class="fa-solid fa-bolt"></i></button>
            <button
              type="button" class="btn btn-${dsb ? 'secondary' : 'indigo'} btn-forward-batch m-1" ${dsb}
              data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Giao cho nhà vận chuyển"
            ><i class="fa-solid fa-forward-fast"></i></button>
          </div>
        `;
      }
    },
  ]
  const BatchTable = initDataTable('#BatchTable', { ajaxUrl: API_ENDPOINT.BATCH.LIST_BATCH }, tableRenderColumns, [], () => { signalStopPreloader(); });
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
        alert('Xóa mùa vụ thành công');
        BatchTable.ajax.reload();
      },
      error: function (error) {
        alert('Xóa mùa vụ thất bại');
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
    localStorage.setItem('@batchs/fluctuation/batch', JSON.stringify(data));


    $('#Batch-change-Modal').modal('show');
  });

  $('#BatchTable tbody').on('click', '.btn-forward-batch', function () {
    const row = $(this).parents('tr')[0];
    const data = BatchTable.row(row).data();
    $.ajax({
      url: fillEndpointPlaceholder(API_ENDPOINT.BATCH.FORWARD_BATCH, { id: data.batchId }),
      type: 'PUT',
      beforeSend: function (request) {
        request.setRequestHeader("Authorization", ACCESS_TOKEN);
      },
      success: function (result) {
        alert('Chuyển tiếp thành công');
        BatchTable.ajax.reload();
      },
      error: function (error) {
        alert('Chuyển tiếp thất bại');
      }
    });
  });


  $("#submit-fluctuation").click(function () {
    const batch = JSON.parse(localStorage.getItem('@batchs/fluctuation/batch'));
    const user = JSON.parse(localStorage.getItem('@auth/userInfo'));
    const type = $('#fluctuation').val();
    const reason = $('#fluc-reason').val();
    const amount = $('#fluc-amount').val();
    const commonField = {
      name: batch.name,
      quantity: parseInt(batch.quantity) + parseInt(amount) * (type === 'INC' ? 1 : -1),
      status: batch.status
    };

    $.ajax({
      url: fillEndpointPlaceholder(API_ENDPOINT.BATCH.UPDATE_BATCH, { id: batch._id }),
      method: 'PUT',
      headers: {
        'Authorization': ACCESS_TOKEN,
      },
      data: commonField,
      success: function () {
        const actionText = type === 'INC' ? `Nông dân ${user.name} tăng số lượng thêm ${amount} với lí do: ${reason}` : `Nông dân ${user.name} giảm số lượng đi ${amount} với lí do: ${reason}`
        $.ajax({
          url: API_ENDPOINT.HISTORY.CREATE_HISTORY,
          method: 'POST',
          headers: {
            'Authorization': ACCESS_TOKEN,
          },
          data: {
            batchId: batch.batchId,
            action: actionText,
          },
          success: function () {
            alert("Tạo biến động thành công")

            $('#Batch-change-Modal').modal('hide');
            BatchTable.ajax.reload();
          },
          error: function () {
            alert("Tạo biến động thất bại")

            $('#Batch-change-Modal').modal('hide');
            BatchTable.ajax.reload();
          }
        });
      },
      error: function () {
        alert("Tạo biến động thất bại")
        $('#Batch-change-Modal').modal('hide');
        BatchTable.ajax.reload();
      }
    })
  });
});