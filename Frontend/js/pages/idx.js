$(document).ready(function () {
  signalStopPreloader();
  const userInfo = JSON.parse(localStorage.getItem('@auth/userInfo'));
  let waitLoadedData = 3;
  function signalLoadedData() {
    waitLoadedData--;
    if (waitLoadedData === 0) {
      signalStopPreloader();
    }
  }

  $.ajax({
    url: API_ENDPOINT.ANALYTICS.OVERVIEW,
    type: 'GET',
    beforeSend: function (request) {
      request.setRequestHeader("Authorization", ACCESS_TOKEN);
    },
    success: function (result) {
      $('#totalUser').html(result.userCount);
      $('#totalProduct').html(result.distinctProductCount);
      $('#totalScanCount').html(result.scanCount.total);
      $('#totalScanUser').html(result.scanCount.uniqueUser);

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

      const batchCtx = document.getElementById('transporterChart');
      new Chart(batchCtx, {
        type: 'bar',
        data: {
          labels: ['Tổng số', 'Đang giao', 'Đã giao'],
          datasets: [{
            label: 'Đơn',
            data: [
              result.transporterBillCount.inProgress + result.transporterBillCount.finished,
              result.transporterBillCount.inProgress,
              result.transporterBillCount.finished],
            backgroundColor: [
              'rgba(153, 102, 255, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(201, 203, 207, 0.2)'
            ],
            borderColor: [
              'rgb(153, 102, 255)',
              'rgb(75, 192, 192)',
              'rgb(201, 203, 207)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          aspectRatio: 1,
          plugins: {
            legend: {
              display: false,
            },
          },
          scales: {
            y: {
              ticks: {
                stepSize: 1
              },
              grace: '5%'
            }
          }
        }
      });

      const revenueBarChartLabels = getDateArrayLabel(new Date(), 30).reverse();
      const revenueBarChartData = Array.from({ length: 30 }, () => 0);
      const countBarChartData = Array.from({ length: 30 }, () => 0);
      result.finance.revenueDetail.forEach((e) => {
        const index = revenueBarChartLabels.indexOf(e._id);
        if (index !== -1) {
          revenueBarChartData[index] = e.revenue;
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
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            tension: 0.1,
            borderWidth: 2,
            yAxisID: 'y',
          },
          {
            type: 'bar',
            label: 'Doanh số (VND)',
            data: revenueBarChartData,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 0.5)',
            borderWidth: 1,
            yAxisID: 'y1',
          }]
        },
        options: {
          responsive: true,
          aspectRatio: 2,
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
              ticks: {
                stepSize: 1
              },
              grid: {
                drawOnChartArea: false,
              }
            },
            y1: {
              type: 'linear',
              display: true,
              position: 'right'
            },
          },
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