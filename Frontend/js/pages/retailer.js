$(document).ready(function () {
  const userInfo = JSON.parse(localStorage.getItem('@auth/userInfo'));
  let waitLoadedData = 3;
  function signalLoadedData() {
    waitLoadedData--;
    if (waitLoadedData === 0) {
      signalStopPreloader();
    }
  }
  const columnDefs = [
    {
      targets: '_all',
      className: 'dt-head-left dt-body-left'
    }
  ];

  const tableProductRenderColumns = [
    {
      data: 'product.imageUrl',
      render: function (data, type, row, meta) {
        return `<div class="d-flex justify-content-center"><img style="width: 10rem; height:auto;" src="${data}"/></div>`
        // return `<a href="${data}" target='_blank' class="btn btn-success">Open</a>`;
      }
    },
    "product.name",
    {
      data: "product.price",
      render: function (data) {
        return `<span class="badge bg-warning p-2" style="font-size:10pt;">${new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(data)}<span>`;
      }
    },
    {
      data: "product.attributes",
      render: function (data) {
        return data.map((e) => {
          return `<strong>${e.name}</strong>: ${e.value}`
        }).join('<br>')
      }
    },
    {
      data: "total",
      render: function (data) {
        return `<span class="badge bg-primary p-2" style="font-size:10pt;">${data}<span>`;
      }
    },
    {
      data: "sold",
      render: function (data) {
        return `<span class="badge bg-success p-2" style="font-size:10pt;">${data}<span>`;
      }
    }
  ]
  const storeAnalytics = initDataTable('#storeAnalytics', { ajaxUrl: API_ENDPOINT.RETAILER.LIST_RETAILER_PRODUCT }, tableProductRenderColumns, columnDefs, () => { signalLoadedData() });

  const tableBatchesRenderColumns = [
    "batch.name",
    {
      data: "quantity",
      render: function (data) {
        return `<span class="badge bg-primary p-2" style="font-size:10pt;">${data}<span>`;
      }
    },
    {
      data: "sold",
      render: function (data) {
        return `<span class="badge bg-success p-2" style="font-size:10pt;">${data}<span>`;
      }
    },
    {
      data: "pricing",
      render: function (data) {
        return `<span class="badge bg-warning p-2" style="font-size:10pt;">${new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(data)}<span>`;
      }
    },
    {
      data: 'createdAt',
      render: function (data) {
        return new Date(data).toLocaleString()
      }
    }
  ]
  const importHistory = initDataTable('#importHistory', { ajaxUrl: API_ENDPOINT.RETAILER.LIST_RETAILER_IMPORT }, tableBatchesRenderColumns, columnDefs, () => { signalLoadedData() });

  function importProductQRScanHandler(batchId) {
    $.ajax({
      url: fillEndpointPlaceholder(API_ENDPOINT.BATCH.GET_BATCH_BY_BATCHID, { id: batchId }),
      type: 'GET',
      beforeSend: function (request) {
        request.setRequestHeader("Authorization", ACCESS_TOKEN);
      },
      success: function (result) {
        var answer = window.confirm(`Vui lòng xác nhận. Bạn có muốn nhập lô hàng: ${result.name}?`);
        if (answer) {
          const pricing = prompt("Nhập giá bán dự kiến cho sản phẩm. (Đơn vị tính: VND)", "0");
          $.ajax({
            url: API_ENDPOINT.RETAILER.IMPORT_RETAILER,
            method: 'POST',
            headers: {
              'Authorization': ACCESS_TOKEN,
            },
            data: {
              owner: userInfo.id,
              batchId: batchId,
              quantity: result.quantity,
              pricing: pricing
            },
            success: function (response) {
              alert('Nhập hàng thành công');
              storeAnalytics.ajax.reload();
              importHistory.ajax.reload();
            },
            error: function (error) {
              alert('Nhập hàng thất bại');
            },
            complete: function (data) {
              $(".loader-container").removeClass('active');
              timeDebounce = 0;
            }
          });
        }
      },
      error: function (error) {
        alert('Không tìm thấy mùa vụ');
        timeDebounce = 0;
        $(".loader-container").removeClass('active');
      },
      complete: function (data) {
        $("#html5-qrcode-button-camera-stop").click();
      }
    });
  }

  function sellProductQRScanHandler(batchId) {
    $.ajax({
      url: fillEndpointPlaceholder(API_ENDPOINT.RETAILER.SELL_PRODUCT, { id: batchId }),
      type: 'POST',
      beforeSend: function (request) {
        request.setRequestHeader("Authorization", ACCESS_TOKEN);
      },
      success: function (result) {
        alert('Bán hàng thành công');
        storeAnalytics.ajax.reload();
        importHistory.ajax.reload();
      },
      error: function (error) {
        alert('Bán hàng không thành công');
      },
      complete: function (data) {
        $("#html5-qrcode-button-camera-stop").click();
        timeDebounce = 0;
        $(".loader-container").removeClass('active');
      }
    });
  }

  var html5QrcodeScanner = new Html5QrcodeScanner(
    "reader", { fps: 10, qrbox: 250 });
  let timeDebounce = 0;
  let triggeringScanButton = null;
  let collapsedStatus = true;

  document.addEventListener("qr-hanler-queue", (e) => {
    if (timeDebounce) {
      return;
    }
    timeDebounce = 1;
    const batchId = e.detail.batchId;
    if (triggeringScanButton === "import") {
      importProductQRScanHandler(batchId);
    } else if (triggeringScanButton === "sell") {
      setTimeout(() => sellProductQRScanHandler(batchId), 100);
    }
  });

  function onScanSuccess(decodedText, decodedResult) {
    // Handle on success condition with the decoded text or result.
    $(".loader-container").addClass('active');
    const batchId = decodedText.split("?id=")[1];
    const event = new CustomEvent("qr-hanler-queue", { detail: { batchId: batchId } });
    document.dispatchEvent(event);
    return;
  }

  function onScanError(errorMessage) {
    // handle on error condition, with error message
  }

  $("#importProduct").click(function () {
    $("#qrscanCollapse").collapse('toggle');
    triggeringScanButton = "import";
  });

  $("#sellProduct").click(function () {
    $("#qrscanCollapse").collapse('toggle');
    triggeringScanButton = "sell";
  });

  $("#qrscanCollapse").on('show.bs.collapse', function (e) {
    html5QrcodeScanner.render(onScanSuccess, onScanError);
    $("#importProduct").html("Tắt máy quét");
    $("#sellProduct").html("Tắt máy quét");
    collapsedStatus = false;
  });

  $("#qrscanCollapse").on('hide.bs.collapse', function () {
    $("#html5-qrcode-button-camera-stop").click();
    $("#importProduct").html("Nhập hàng");
    $("#sellProduct").html("Bán hàng");
    collapsedStatus = true;
    // html5QrcodeScanner.clear();
  });

  $.ajax({
    url: API_ENDPOINT.RETAILER.ANALYTICS,
    type: 'GET',
    beforeSend: function (request) {
      request.setRequestHeader("Authorization", ACCESS_TOKEN);
    },
    success: function (result) {
      $('#estimateIncome').html(new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(result.estimateIncome));
      $('#totalBatch').html(result.totalBatchCount);
      $('#totalProduct').html(result.distinctProductCount);

      const retailerCtx = document.getElementById('retailerChart');
      new Chart(retailerCtx, {
        type: 'doughnut',
        data: {
          labels: [
            'Tồn kho',
            'Đã bán'
          ],
          datasets: [{
            label: 'Sản phẩm',
            data: [result.totalProductQuantity - result.totalSoldProductQuantity, result.totalSoldProductQuantity],
            backgroundColor: [
              'rgb(255, 99, 132)',
              'rgb(54, 162, 235)'
            ],
            hoverOffset: 4
          }]
        }
      });

      const batchCtx = document.getElementById('batchChart');
      new Chart(batchCtx, {
        type: 'bar',
        data: {
          labels: ['Tổng số', 'Đã bán', 'Tồn kho'],
          datasets: [{
            label: 'Sản phẩm',
            data: [result.totalProductQuantity, result.totalSoldProductQuantity, result.totalProductQuantity - result.totalSoldProductQuantity],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(201, 203, 207, 0.2)'
            ],
            borderColor: [
              'rgb(255, 99, 132)',
              'rgb(75, 192, 192)',
              'rgb(201, 203, 207)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          aspectRatio: 1,
        },
      });

      const revenueBarChartLabels = getDateArrayLabel(new Date(), 7).reverse();
      const revenueBarChartData = [0, 0, 0, 0, 0, 0, 0];
      const countBarChartData = [0, 0, 0, 0, 0, 0, 0];
      result.revenue.revenueDetail.forEach((e) => {
        const index = revenueBarChartLabels.indexOf(e._id);
        if (index !== -1) {
          revenueBarChartData[index] = e.revenue;
        }
      });
      result.sellCount.detail.forEach((e) => {
        const index = revenueBarChartLabels.indexOf(e._id);
        if (index !== -1) {
          countBarChartData[index] = e.soldCount;
        }
      });
      console.log(revenueBarChartLabels, revenueBarChartData, countBarChartData);
      const incomeCtx = document.getElementById('incomeChart');
      new Chart(incomeCtx, {
        type: 'scatter',
        data: {
          labels: revenueBarChartLabels,
          datasets: [{
            type: 'line',
            label: 'Số lượng',
            data: countBarChartData,
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1,
            borderWidth: 1,
            yAxisID: 'y',
          },
          {
            type: 'bar',
            label: 'Doanh số (VND)',
            data: revenueBarChartData,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(255, 205, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(201, 203, 207, 0.2)'
            ],
            borderColor: [
              'rgb(255, 99, 132)',
              'rgb(255, 159, 64)',
              'rgb(255, 205, 86)',
              'rgb(75, 192, 192)',
              'rgb(54, 162, 235)',
              'rgb(153, 102, 255)',
              'rgb(201, 203, 207)'
            ],
            borderWidth: 1,
            yAxisID: 'y1',
          }]
        },
        options: {
          responsive: true,
          aspectRatio: 1,
          interaction: {
            mode: 'index',
            intersect: false,
          },
          stacked: false,
          scales: {
            y: {
              type: 'linear',
              display: true,
              position: 'left',
            },
            y1: {
              type: 'linear',
              display: true,
              position: 'right',
              grid: {
                drawOnChartArea: false,
              },
            },
          }
        },
      });
    },
    error: function (error) {
      alert('Không có dữ liệu');
    },
    complete: function (data) {
      signalLoadedData();
    }
  })
});