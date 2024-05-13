$(document).ready(function () {
    const params = new window.URLSearchParams(window.location.search);

    const prefetch_id = params.get('id')
    console.log(!!prefetch_id);

    if (!!prefetch_id) {
        $.ajax({
            url: fillEndpointPlaceholder(API_ENDPOINT.BATCH.GET_BATCH, { id: prefetch_id }),
            method: 'GET',
            headers: {
                'Authorization': ACCESS_TOKEN,
            },
            success: function (response) {
                $('#name').val(response.name);
                $('#qty').parent().remove();
                $('#status').parent().remove();

                $('form button[type="submit"]').html('Update Batch')
            }
        })
    }

    $('#btn-submit').click(function (e) {
        e.preventDefault();
        const commonField = {
            name: $('#name').val(),
          };

        $.ajax({
            url: !prefetch_id ? API_ENDPOINT.BATCH.CREATE_BATCH : fillEndpointPlaceholder(API_ENDPOINT.BATCH.UPDATE_BATCH, { id: id }),
            method: !prefetch_id ? 'POST' : 'PUT',
            headers: {
                'Authorization': ACCESS_TOKEN,
            },
            data: prefetch_id ? commonField : {
                ...commonField,
                quantity: $('#qty').val(),
                status: $('#status').val()
            },
            success: function () {
                alert('thanh cong')
                // window.location.href = 's.html';
            },
            error: function () {
                alert("that bai")
            }

        })
    })

});