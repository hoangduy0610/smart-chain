// Utils
const userInfo = JSON.parse(localStorage.getItem('@auth/userInfo'));
const params = new window.URLSearchParams(window.location.search);

function fillLocation(elemId, lat, lng, loc_name = '') {
    document.getElementById(elemId).value = lat + ';' + lng + ';' + loc_name;
    if (marker) map.removeLayer(marker);
    marker = L.marker([lat, lng]).addTo(map);
    map.setView([lat, lng], 13);
}

function searchLocation(query) {
    $(".loader-container").addClass('active');
    $.ajax({
        url: fillEndpointPlaceholder(API_ENDPOINT.GEOCODING.AUTOCOMPLETE, { query: query }),
        type: 'GET',
        success: function (data) {
            const locationType = localStorage.getItem('@transporter-bills/pickingLocationType');
            fillLocation(locationType, data[0].lat, data[0].lon, data[0].display_name);

            const selectElement = document.createElement('select');
            selectElement.id = 'select-location-geolocation';
            selectElement.classList.add('form-control');

            data.forEach(function (item) {
                const option = document.createElement('option');
                option.value = `${item.lat},${item.lon}`;
                option.text = item.display_name;
                selectElement.appendChild(option);
            });

            selectElement.addEventListener('change', function () {
                const selectedOption = selectElement.value;
                const lat = selectedOption.split(',')[0];
                const lng = selectedOption.split(',')[1];
                fillLocation(locationType, lat, lng, selectElement.options[selectElement.selectedIndex].text);
            });

            const form = document.querySelector('#modal-map');
            form.innerHTML = '';
            form.appendChild(selectElement);

            $(".loader-container").removeClass('active');
        }
    });
}


// MAIN CODE
var marker;
const map = L.map('map').locate({ setView: true });
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

map.on('click', function (e) {
    $(".loader-container").addClass('active');

    const lat = e.latlng.lat;
    const lng = e.latlng.lng;

    $.ajax({
        url: fillEndpointPlaceholder(API_ENDPOINT.GEOCODING.REVERSE_GEOCODING, { lat: lat, lon: lng }),
        type: 'GET',
        success: function (data) {
            const locationType = localStorage.getItem('@transporter-bills/pickingLocationType');
            fillLocation(locationType, lat, lng, data.display_name);
            $(".loader-container").removeClass('active');
        }
    });
});

document.getElementById('departure').addEventListener('focus', function () {
    localStorage.setItem('@transporter-bills/pickingLocationType', 'departure');
    $('#locationPickerModal').modal('show');
});

document.getElementById('destination').addEventListener('focus', function () {
    localStorage.setItem('@transporter-bills/pickingLocationType', 'destination');
    $('#locationPickerModal').modal('show');
});

$("#locationPickerModal").on('shown.bs.modal', function (e) {
    map.invalidateSize();
});

$("#btn-geolocation-search").click(function () {
    const search = $('#geolocation-search').val();
    searchLocation(search);
});

$("#submit-transporter-form").click(function () {
    $(".loader-container").addClass('active');

    const userId = userInfo.id
    const batchId = params.get('id')
    const departure = $('#departure').val();
    const destination = $('#destination').val();

    $.ajax({
        url: API_ENDPOINT.TRANSPORTER_BILLS.CREATE_TRANSPORTER_BILLS,
        method: 'POST',
        headers: {
            'Authorization': ACCESS_TOKEN,
        },
        data: {
            owner: userId,
            batchId: batchId,
            departure: departure,
            destination: destination,
        },
        success: function (response) {
            const actionText = `Nhà vận chuyển ${userInfo.name} đã tạo đơn vận chuyển từ ${departure} đến ${destination}.`;
            $.ajax({
                url: API_ENDPOINT.HISTORY.CREATE_HISTORY,
                method: 'POST',
                headers: {
                    'Authorization': ACCESS_TOKEN,
                },
                data: {
                    batchId: batchId,
                    action: actionText,
                },
                success: function () {
                    $(".loader-container").removeClass('active');
                    alert("Tạo thành công")
                    window.location.href = 'transporter-bills.html';
                },
                error: function () {
                    $(".loader-container").removeClass('active');
                    alert("Tạo thất bại")
                }
            });
        },
        error: function () {
            const msg = 'Create failed!';
            $(".loader-container").removeClass('active');
            alert(msg);
        }
    });
})