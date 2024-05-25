$(document).ready(function () {

   // const params = new window.URLSearchParams(window.location.search);
   // const prefetch_id = params.get('id')

   $.ajax({
      url: 'https://api.smcsoft.online/batch-product/scan/0A4IKDHU9YJZ1715739021',
      method: 'GET',
      headers: {
      },
      success: function (response) {
         console.log("load data success!")
         $('#image_product').attr('src', response[0].product[0].imageUrl)
         $('#p-price').html(response[0].product[0].price)
         $('#name-product').text(response[0].name)
         $('#total-scan').text(response[0].totalScan)
         $('#total-user').text(response[0].totalUserScan)
      },
   })

   // show popup
   $('#show_para').click(function () {
      
      $.ajax({
         url: 'https://api.smcsoft.online/batch-product/scan/0A4IKDHU9YJZ1715739021',
         method: 'GET',
         headers: {
         },
         success: function (response) {
            console.log("load data success!")

            $("#paraModalBody").html(
               response[0].product[0].attributes
                  .map(
                     (attr) => {
                        return showarr(attr)
                     }
                  )
                  .join('')
            )
         },
      })

      $('#paraModal').modal("show")
   })

   $('.instruction').click(function () {
      window.location.href = 'instruction.html'
   })

   $('.para-detail').click(function () {
      window.location.href = `para-details.html?id_batch=${'0A4IKDHU9YJZ1715739021'}`
   })

   $('.btn-back').click(function () {
      window.location.href = 'scan.html'
   })


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