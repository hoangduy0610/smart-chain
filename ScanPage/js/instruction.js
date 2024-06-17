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
               <div style ="font-weight: 700; font-size: 1.5rem !important; margin-bottom: 2px; " class="descript">
                    Nhật ký
               </div>
               ${response[0].history.map((attr) => {
                  return showhis(attr)
                  }).join('')}
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
     result += `
         <div class="container">
            <div class="content">
               <h4>${new Date(arr[i].actionDate).toLocaleDateString()}</h4>
               <p>${arr[i].action}</p>
            </div>
         </div>`;
   }
   return result;
 }