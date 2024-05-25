const CONTRACT_ADDRESS = "0xe003EA84cf279C158c04014078855D72173287d0";
$(document).ready(function () {

   const params = new window.URLSearchParams(window.location.search);
   const batchId = params.get('id')
   let batchData = null;

   $.ajax({
      url: `${API_HOST}/batch-product/scan/${batchId}`,
      method: 'GET',
      success: function (response) {
         $('#image_product').attr('src', response[0].product[0].imageUrl)
         $('#p-price').html(response[0].product[0].price)
         $('#name-product').text(response[0].name)
         $('#total-scan').text(response[0].totalScan)
         $('#total-user').text(response[0].totalUserScan)
         batchData = response[0];
      },
   })

   // show popup
   $('#show_para').click(function () {
      $("#paraModalBody").html(
         batchData.product[0].attributes
            .map(
               (attr) => {
                  return showarr(attr)
               }
            )
            .join('')
      )
      $('#paraModal').modal("show")
   })

   $('.instruction').click(function () {
      window.location.href = 'instruction.html'
   })

   $('.para-detail').click(function () {
      window.location.href = `para-details.html?id_batch=${batchId}`
   })

   $('.btn-back').click(function () {
      window.location.href = 'scan.html'
   })

   $("#verifySmartContract").click(async function () {
      const web3 = new Web3(window.ethereum); // initialize Web3
      const accounts = await ethereum.request({ method: "eth_requestAccounts" });
      const account = accounts[0];
      const abi = JSON.parse('[{"inputs":[{"internalType":"string","name":"id","type":"string"},{"internalType":"string","name":"name","type":"string"},{"internalType":"uint256","name":"price","type":"uint256"}],"name":"addProduct","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"id","type":"string"}],"name":"getProduct","outputs":[{"internalType":"string","name":"","type":"string"},{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}]')
      const contract = new web3.eth.Contract(abi, CONTRACT_ADDRESS);
      const res = await contract.methods.getProduct(batchData.productId).call();
      // console.log(res);
      alert(`Smart contract xác nhận! Tên sản phẩm: ${res[0]}, Giá tham khảo: ${res[1]}`);
      const access_ethers = confirm("Bạn có muốn truy cập etherscan để xác minh?");
      if (!access_ethers) {
         return;
      }
      window.open(`https://holesky.etherscan.io/address/${CONTRACT_ADDRESS}#readContract`);
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