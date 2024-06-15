
$(document).ready(function () {
    const params = new window.URLSearchParams(window.location.search);
    const prefetch_id = params.get('id')
    let imgurl = '';

    if (!!prefetch_id) {
        $(".loader-container").addClass('active');
        $.ajax({
            url: fillEndpointPlaceholder(API_ENDPOINT.PRODUCT.GET_PRODUCT, { id: prefetch_id }),
            method: 'GET',
            headers: {
                'Authorization': ACCESS_TOKEN,
            },
            success: function (response) {
                // console.log(response);

                $('#name').val(response.name);
                $('#price').val(response.price);
                $('#dscript').val(response.description);
                // $('#imgurl').val(response.imageUrl);
                imgurl = response.imageUrl;
                $('#form-attributes').empty();

                response.attributes.forEach(function (item) {
                    $('#form-attributes').append(`
                        <div class="box-item">
                            <div class="d-flex">
                                <div style="flex: 1;justify-content: center;align-items: center;display: flex;">
                                    <input type="text" id="name_at" class="shape_input name" placeholder="Name" value="${item.name}">
                                    <input type="text" id="value_at" class="shape_input value" placeholder="Value" value="${item.value}">
                                </div>
                                <button type="button" class="btn btn-danger m-2 remove-item-btn"><i
                                    class="fa-solid fa-square-minus"></i></button>
                            </div>
                        </div>
                    `);
                });

                $(".loader-container").removeClass('active');
            },
        });
    }

    $(".add-item-btn").click(function (event) {
        event.preventDefault();
        $(".show-item-attr").append(`
            <div class="box-item">
                <div class="d-flex">
                    <div style="flex: 1;justify-content: center;align-items: center;display: flex;">
                        <input type="text" id="name_at" class="shape_input name" placeholder="Name">
                        <input type="text" id="value_at" class="shape_input value" placeholder="Value">
                    </div>
                    <button type="button" class="btn btn-danger m-2 remove-item-btn"><i
                        class="fa-solid fa-square-minus"></i></button>
                </div>
            </div>
        `)
    });

    $('.show-item-attr').on('click', '.remove-item-btn', function () {
        $(this).parent().remove();
    });

    $('#imgurl').on('change', function () {
        $(".loader-container").addClass('active');
        // Upload image through formdata
        const formData = new FormData();
        formData.append('image', $('input[type=file]')[0].files[0]);
        formData.append("type", "image");
        formData.append("title", "Simple upload");
        formData.append("description", "This is a simple image upload in Imgur");

        $.ajax({
            "url": "https://api.imgur.com/3/image",
            "method": "POST",
            "timeout": 0,
            "headers": {
                "Authorization": "Client-ID 7f4cce1e07a3f9a"
            },
            "processData": false,
            "mimeType": "multipart/form-data",
            "contentType": false,
            "data": formData,
            success: function (raw) {
                const response = JSON.parse(raw);
                imgurl = response.data.link;

                $(".loader-container").removeClass('active');
            },
            error: function () {
                alert('Upload image failed!');
                $(".loader-container").removeClass('active');
            }
        });
    });

    $('#btn-submit').click(function (event) {
        event.preventDefault();
        $(".loader-container").addClass('active');

        const name = $('#name').val();
        const price = $('#price').val();
        const description = $('#dscript').val();
        // const imgurl = $('#imgurl').val();

        if (!name) {
            alert('Vui lòng nhập tên sản phẩm');
            return;
        }

        if (!price) {
            alert('Vui lòng nhập giá sản phẩm');
            return;
        }

        if (parseInt(price) < 0) {
            alert('Giá sản phẩm không hợp lệ');
            return;
        }

        if (!description) {
            alert('Vui lòng nhập mô tả sản phẩm');
            return;
        }

        if (!imgurl) {
            alert('Vui lòng chọn ảnh sản phẩm');
            return;
        }

        const arr = [];
        $('.box-item').each(function () {
            let name = $(this).find('input').eq(0).val();
            let value = $(this).find('input').eq(1).val();
            arr.push({
                name: name,
                value: value
            });
        });

        $.ajax({
            url: !prefetch_id ? API_ENDPOINT.PRODUCT.CREATE_PRODUCT : fillEndpointPlaceholder(API_ENDPOINT.PRODUCT.UPDATE_PRODUCT, { id: prefetch_id }),
            method: !prefetch_id ? 'POST' : 'PUT',
            headers: {
                'Authorization': ACCESS_TOKEN,
            },
            data: {
                name: name,
                price: price,
                description: description,
                attributes: arr,
                imageUrl: imgurl,
            },
            success: function (response) {
                const msg = !prefetch_id ? 'Create Product successfully' : 'Update Product successfully';
                alert(msg);
                window.location.href = 'products.html';
            },
            error: function () {
                const msg = !prefetch_id ? 'Create failed!' : 'Update failed!';
                $(".loader-container").removeClass('active');
                alert(msg);
            }
        });
    });
});