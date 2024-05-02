document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("creat-box").addEventListener("submit", function(event) {
        event.preventDefault();

        var urlParams = new URLSearchParams(window.location.search);
        var productid = urlParams.get('product_id');
        const headers = {
            'Authorization': ACCESS_TOKEN,
        };

        // Using jQuery to perform an AJAX GET request
        $.ajax({
            url: fillEndpointPlaceholder(API_ENDPOINT.PRODUCT.GET_PRODUCT, { id: productid }),
            method: 'GET',
            headers: {
                'Authorization': ACCESS_TOKEN,
            },
            success: function(response) {
                // Handle the response data here
                var name = document.getElementById("name").value;
                var qty = document.getElementById("qty").value;
                var status = document.getElementById("status").value;

                var data = {
                    name: name,
                    quantity: qty,
                    status: status,
                    product_id: response.productId
                };
                console.log(data);
                // Further processing, e.g., another AJAX call to POST data
                $.ajax({
                    url: API_ENDPOINT.BATCH.CREATE_BATCH,
                    method: 'POST',
                    headers: headers,
                    contentType: 'application/json',
                    data: JSON.stringify(data),
                    success: function(response) {
                        console.log("Data submitted successfully:", response);
                        // Clear the form fields
                        document.getElementById("name").value = "";
                        document.getElementById("qty").value = "";
                        document.getElementById("status").value = "InFarm";
                    },
                    error: function(xhr, status, error) {
                        console.error("Error submitting data:", error);
                    }
                });
            },
            error: function(xhr, status, error) {
                console.error("Error fetching product data:", error);
            }
        });
    });
});