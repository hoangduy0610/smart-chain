$(document).ready(function () {
    $("body").tooltip({ selector: '[data-bs-toggle=tooltip]' });
    const userInfo = JSON.parse(localStorage.getItem('@auth/userInfo'));
    const tableRenderColumns = [
        {
            "data": 'batchId',
            render: function (data, type, row, meta) {
                return `
                    <div class="d-flex flex-1 justify-content-center">
                        <div id="loader${row._id}" style="width:100px;height:100px;" class="linear-background"></div>
                        <img class='d-none' style="max-width:100px" id="qr${row._id}"onload='(function(){document.getElementById("qr${row._id}").classList.remove("d-none");document.getElementById("loader${row._id}").classList.add("d-none")})()' src='${QR_HOST}${data}'/>
                    </div>
                `;
            }
        },
        {
            "data": 'departure',
            render: function (data, type, row, meta) {
                const data_arr = data.split(";");
                const lat = data_arr[0];
                const long = data_arr[1];
                const address = data_arr[2];
                return `
                    <a
                    href="https://maps.google.com/?q=${lat},${long}" target="_blank"
                    data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="${address}"
                    >
                        ${truncate(address, 25)} &nbsp;<i class="fa-solid fa-arrow-up-right-from-square"></i>
                    </a>
                `;
            }
        },
        {
            "data": 'destination',
            render: function (data, type, row, meta) {
                const data_arr = data.split(";");
                const lat = data_arr[0];
                const long = data_arr[1];
                const address = data_arr[2];
                return `
                    <a
                    href="https://maps.google.com/?q=${lat},${long}" target="_blank"
                    data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="${address}"
                    >
                        ${truncate(address, 25)} &nbsp;<i class="fa-solid fa-arrow-up-right-from-square"></i>
                    </a>
                `;
            }
        },
        {
            data: 'length',
            render: function (data, type, row, meta) {
                return `${Math.round(data / 10) / 100} km`;
            }
        },
        {
            data: 'status',
            render: function (data, type, row, meta) {
                return `<span class="badge p-2 bg-${row.status == "StartTransport" ? "success" : "danger"}">${row.status}</span>`;
            }
        },
        {
            "data": 'currentPos',
            render: function (data, type, row, meta) {
                const dep = row.departure.split(";");
                const des = row.destination.split(";");
                const data_arr = data.split(";");
                const lat = data_arr[0];
                const long = data_arr[1];
                const address = data_arr[2];
                return `
                    <a
                    href="https://www.google.com/maps/dir/?api=1&origin=${dep[0]},${dep[1]}&destination=${des[0]},${des[1]}&waypoints=${lat},${long}" target="_blank"
                    data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="${address}"
                    >
                        ${truncate(address, 25)} &nbsp;<i class="fa-solid fa-arrow-up-right-from-square"></i>
                    </a>
                `;
            }
        },
        {
            data: 'null',
            render: function (data, type, row, meta) {
                const isDisabled =
                    !userInfo.roles.includes('ROLE_TRANSPORTER') &&
                    !userInfo.roles.includes('ROLE_ADMIN') ||
                    row.status != "StartTransport"

                const dsb = !isDisabled ? '' : 'disabled';
                const dep = row.departure.split(";");
                const des = row.destination.split(";");
                return `
                    <div class="d-flex p-2 justify-content-center">
                        <a
                            target="_blank"
                            href="https://www.google.com/maps/dir/?api=1&origin=${dep[0]},${dep[1]}&destination=${des[0]},${des[1]}"
                            role="button"
                            class="btn btn-success m-1"
                            data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Mở điều hướng"
                        ><i class="fa-solid fa-route"></i></a>
                        <button
                            type="button"
                            class="btn btn-${dsb ? 'secondary' : 'warning'} btn-update-pos m-1" ${dsb}
                            data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Cập nhật vị trí"
                        ><i class="fa-solid text-white fa-location-dot"></i></button>
                        <button
                            type="button" class="btn btn-${dsb ? 'secondary' : 'indigo'} btn-forward-batch m-1" ${dsb}
                            data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Chuyển cho nhà bán lẻ"
                        ><i class="fa-solid fa-forward-fast"></i></button>
                        <button
                            type="button"
                            data-id="${row._id.toString()}"
                            class="btn btn-${dsb ? 'secondary' : 'danger'} btn-xoa-trb m-1" ${dsb}
                            data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Xóa"
                        ><i class="fa-solid fa-trash"></i></button>
                        <button
                            data-id="${row._id.toString()}"
                            type="button" class="btn btn-${dsb ? 'secondary' : 'primary'} btn-sua-trb m-1" ${dsb}
                            data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Sửa"
                        ><i class="fa-solid fa-pen-to-square"></i></button>
                    </div>
                `;
            }
        },
    ]
    const billsTable = initDataTable('#billsTable', { ajaxUrl: API_ENDPOINT.TRANSPORTER_BILLS.LIST_TRANSPORTER_BILLS }, tableRenderColumns, [], () => { signalStopPreloader(); });

    var html5QrcodeScanner = new Html5QrcodeScanner(
        "reader", { fps: 10, qrbox: 250 });

    function onScanSuccess(decodedText, decodedResult) {
        // Handle on success condition with the decoded text or result.
        const batchId = decodedText.split("?id=")[1];
        var answer = window.confirm(`Vui lòng xác nhận. Bạn có muốn tạo đơn vận cho lô hàng: ${batchId}?`);
        if (answer) {
            //some code
            window.location.href = `form-transporter-bill.html?id=${batchId}`;
        }
        $("#html5-qrcode-button-camera-stop").click();
    }

    function onScanError(errorMessage) {
        // handle on error condition, with error message
    }

    $("#qrscanCollapse").on('show.bs.collapse', function () {
        html5QrcodeScanner.render(onScanSuccess, onScanError);
        $("button[data-bs-target='#qrscanCollapse']").html("Tắt máy quét")
    });

    $("#qrscanCollapse").on('hide.bs.collapse', function () {
        $("#html5-qrcode-button-camera-stop").click();
        $("button[data-bs-target='#qrscanCollapse']").html("Tạo đơn vận")
        // html5QrcodeScanner.clear();
    });

    $('#billsTable tbody').on('click', '.btn-update-pos', function () {
        $(".loader-container").addClass('active');
        const row = $(this).parents('tr')[0];
        const data = billsTable.row(row).data();
        const id = data._id;
        const batchId = data.batchId;

        getLocation((position) => {
            console.log(position.coords.latitude, position.coords.longitude);
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
            $.ajax({
                url: fillEndpointPlaceholder(API_ENDPOINT.GEOCODING.REVERSE_GEOCODING, { lat: lat, lon: lng }),
                type: 'GET',
                success: function (data) {
                    $.ajax({
                        url: fillEndpointPlaceholder(API_ENDPOINT.TRANSPORTER_BILLS.UPDATE_TRANSPORTER_BILLS, { id: id }),
                        type: 'PUT',
                        headers: {
                            'Authorization': ACCESS_TOKEN,
                        },
                        data: {
                            currentPos: `${lat};${lng};${data.display_name}`,
                        },
                        success: function (response) {
                            alert("Cập nhật vị trí hiện tại thành công")
                            $(".loader-container").removeClass('active');
                            billsTable.ajax.reload();
                        },
                        error: function (xhr, status, error) {
                            alert("Cập nhật vị trí thất bại")
                            $(".loader-container").removeClass('active');
                        }
                    });

                    const actionText = `Nhà vận chuyển ${userInfo.name} đã cập nhật vị trí hiện tại: ${data.display_name}.`;
                    $.ajax({
                        url: API_ENDPOINT.HISTORY.CREATE_HISTORY,
                        method: 'POST',
                        headers: {
                            'Authorization': ACCESS_TOKEN,
                        },
                        data: {
                            batchId: batchId,
                            action: actionText,
                        },
                        success: function () {
                        },
                        error: function () {
                        }
                    });
                }
            });
        });
    });

    $('#billsTable tbody').on('click', '.btn-forward-batch', function () {
        const row = $(this).parents('tr')[0];
        const data = billsTable.row(row).data();
        $.ajax({
            url: fillEndpointPlaceholder(API_ENDPOINT.BATCH.FORWARD_BATCH, { id: data.batchId }),
            type: 'PUT',
            beforeSend: function (request) {
                request.setRequestHeader("Authorization", ACCESS_TOKEN);
            },
            success: function (result) {
                alert('Chuyển tiếp thành công');
                billsTable.ajax.reload();
            },
            error: function (error) {
                alert('Chuyển tiếp thất bại');
            }
        });
    });

    $('#billsTable tbody').on('click', '.btn-xoa-trb', function () {
        var id = $(this).data('id');
        // console.log(id);
    
        $.ajax({
          url: fillEndpointPlaceholder(API_ENDPOINT.TRANSPORTER_BILLS.DELETE_TRANSPORTER_BILLS, { id: id }),
          type: 'DELETE',
          beforeSend: function (request) {
            request.setRequestHeader("Authorization", ACCESS_TOKEN);
          },
          success: function (result) {
            alert('Xóa đơn vận thành công');
            billsTable.ajax.reload();
          },
          error: function (error) {
            alert('Xóa đơn vận thất bại');
          }
        });
      });
    
      $('#billsTable tbody').on('click', '.btn-sua-trb', function () {
        var id = $(this).data('id');
        window.location.href = `form-transporter-bill.html?trb=${id}`;
      });
});