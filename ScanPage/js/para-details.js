$(document).ready(function () {

   const params = new window.URLSearchParams(window.location.search);
   const prefetch_id = params.get('id_batch')
   $.ajax({
      url: `${API_HOST}/batch-product/scan/${prefetch_id}`,
      method: 'GET',
      headers: {
      },
      success: function (response) {
         console.log("load data success!")
         $('.detail-para-body').append(`
               <div style ="font-weight: 700; font-size: 1.5rem !important; margin-bottom: 2px; ">${response[0].name}</div>
               <div>Số lượng: <p style ="color: blue; display: inline; ">${response[0].quantity}</p></div>
               <div>Giá bán: <p style ="color: blue; display: inline; ">${response[0].product[0].price} đ</p></div>
               <div>Trạng thái hiện tại: <p style = "color: blue; display: inline; ">${response[0].status}</p></div>
               <div  class="bar1"> </div>
               <div style ="font-weight: 700; font-size: 1.5rem !important; margin-bottom: 2px; " class="descript">
                    Mô Tả
               </div>
               <p style ="font-style: italic">${response[0].product[0].description}</p>
               ${response[0].product[0].attributes.map((attr) => {
               return showarr(attr)
               }).join('')}
               <div  class="bar1"> </div>
            `)

      },
   })

   $('.btn-back').click(function () {
      history.back();
   })
});

function showarr(attr) {
   var arr = []
   arr.push(attr)
   let result = '';
   for (let i = 0; i < arr.length; i++) {
     result += `<p>${arr[i].name} : <span style="display:inline; color: blue;">${arr[i].value}</span></p>`;
   }
   return result;
 }

 function showhis(attr) {
   var arr = []
   arr.push(attr)
   let result = '';
   for (let i = 0; i < arr.length; i++) {
     result += `<p><i class="fa-solid fa-clock-rotate-left me-1"></i>${arr[i].action}</p>`;
   }
   return result;
 }