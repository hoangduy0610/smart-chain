$(document).ready(function () {

   $('#show_para').click(function () {
      $('#paraModal').modal("show")
   })

   $('.instruction').click(function () {
      window.location.href = 'instruction.html'
   })

   $('.para-detail').click(function () {
      window.location.href = 'para-details.html'
   })

   $('.btn-back').click(function () {
      window.location.href = 'scan.html'
   })
});