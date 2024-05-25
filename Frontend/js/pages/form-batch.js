$(document).ready(function () {
    const params = new window.URLSearchParams(window.location.search);

    const prefetch_id = params.get('id')
    const product_id = params.get('product_id');
    console.log(typeof(prefetch_id));

    if (!!prefetch_id) {
        $.ajax({
            url: fillEndpointPlaceholder(API_ENDPOINT.BATCH.GET_BATCH, { id: prefetch_id }),
            method: 'GET',
            headers: {
                'Authorization': ACCESS_TOKEN,
            },
            success: function (response) {
                $('#name').val(response.name);
                $('#qty').val(response.quantity);
                $('#status').parent().parent().remove();

                $('form button[type="submit"]').html('Cập nhật')
            }
        })
    }

    $('#btn-submit').click(function (e) {
        e.preventDefault();
        const commonField = {
            name: $('#name').val(),
            quantity: $('#qty').val(),
            status: $('#status').val()
        };

        $.ajax({
            url: !prefetch_id ? API_ENDPOINT.BATCH.CREATE_BATCH : fillEndpointPlaceholder(API_ENDPOINT.BATCH.UPDATE_BATCH, { id: prefetch_id }),
            method: !prefetch_id ? 'POST' : 'PUT',
            headers: {
                'Authorization': ACCESS_TOKEN,
            },
            data: prefetch_id ? commonField : {
                ...commonField,
                productId: product_id,
            },
            success: function () {
                alert('Hành động thành công')
                // window.location.href = 's.html';
            },
            error: function () {
                alert("Hành động thất bại")
            }

        })
    })

});