
$(document).ready(function () {
    const params = new window.URLSearchParams(window.location.search);
    // console.log(params.get('user_id'));
    const prefetch_id = params.get('id')

    $(".add-item-btn").click(function (event) {
        event.preventDefault();
        $(".show-item-attr").append(`
        <div class="box-item">
            <input type="text" id="name_at" class="shape_input name" placeholder="Name" >
            <input type="text" id="value_at" class="shape_input value" placeholder="Value">                  
            <button type="button" class="btn btn-danger m-2 remove-item-btn"><i class="fa-solid fa-square-minus"></i></button>
        </div>
        `)
    });

    $('.show-item-attr').on('click', '.remove-item-btn', function () {
        $(this).parent().remove();
    });

    $('#btn-submit').click(function (event) {
        event.preventDefault();

        const name = $('#name').val();
        const price = $('#price').val();
        const quantity = $('#qty').val();
        const description = $('#dscript').val();
        const imgurl = $('#imgurl').val();
        const arr = [];
        $('.box-item').each(function () {
            let name = $(this).find('input').eq(0).val();
            let value = $(this).find('input').eq(1).val();
            arr.push({
                name: name,
                value: value
            });
        });

        // Call API login here
        if (!prefetch_id)
            $.ajax({
                url: 'https://hongdi.ddns.net/product',
                method: 'POST',
                headers: {
                    'Authorization': getToken(),
                },
                data: {
                    name: name,
                    price: price,
                    quantity: quantity,
                    description: description,
                    attributes: arr,
                    imageUrl: imgurl,
                },
                success: function (response) {
                    alert('Creat successs!');
                    window.location.href = 'products.html';
                },
                error: function () {
                    alert('Creat failed!');
                }
            });
        else {
            $.ajax({
                url: `https://hongdi.ddns.net/product/${prefetch_id}`,
                method: 'PUT',
                headers: {
                    'Authorization': getToken(),
                },
                data: {
                    name: name,
                    price: price,
                    quantity: quantity,
                    description: description,
                    attributes: arr,
                    imageUrl: imgurl,
                },
                success: function (response) {
                    alert('Update successs!');
                    window.location.href = 'products.html';
                },
                error: function () {
                    alert('Update failed!');
                }
            });
        }
    });


    if (!!prefetch_id) { // ép kiểu về boolean
        $.ajax({
            url: `https://hongdi.ddns.net/product/${prefetch_id}`,
            method: 'GET',
            headers: {
                'Authorization': getToken(),
            },
            success: function (response) {
                console.log(response);
                $('#name').val(response.name);
                $('#price').val(response.price);
                $('#qty').val(response.quantity);
                $('#dscript').val(response.description);
                $('#imgurl').val(response.imageUrl);
                $('#form-attributes').empty();
                response.attributes.forEach(function (item) {
                    $('#form-attributes').append(`
                    <div class="box-item">
                    <input type="text" id="name_at" class="shape_input name" placeholder="Name" value="${item.name}">
                    <input type="text" id="value_at" class="shape_input value" placeholder="Value" value="${item.value}">
                    <button type="button" class="btn btn-danger m-2 remove-item-btn" ><i class="fa-solid fa-square-minus"></i></button>
                    </div>`);
                });
            },
        });
    }
});