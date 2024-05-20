function getToken() {
    const localStorageToken = localStorage.getItem('token');
    if (!localStorageToken) {
        return null;
    }
    return `Bearer ${localStorageToken}`;
}

/**
 * 
 * @param {*} endpoint 
 * @param {*} params 
 * @returns 
 */
function fillEndpointPlaceholder(endpoint, params) {
    let result = endpoint;
    for (const key in params) {
        result = result.replace(`{{${key}}}`, params[key]);
    }
    // Example:
    // fillEndpointPlaceholder(API_ENDPOINT.PRODUCT.GET_PRODUCT, { id: 1 })
    return result;
}

const initDataTable = (selector, ajaxOptions, columns, columnDefs, callback) => {
    return $(selector).DataTable({
        responsive: true,
        "searching": true,
        "paging": true,
        "pagingType": "full_numbers",
        "lengthMenu": [
            [5, 10, 25, 50, 100, -1],
            [5, 10, 25, 50, 100, "All"]
        ],
        "language": {
            "lengthMenu": "Hiển thị _MENU_ giá trị mỗi trang",
            "zeroRecords": "Không có bản ghi phù hợp",
            "info": "Đang hiển thị trang thứ _PAGE_ trên _PAGES_ trang",
            "infoEmpty": "Không có bản ghi nào",
            "infoFiltered": "(Đã lọc được _MAX_ bản ghi)",
            "search": "Tìm kiếm: ",
            "paginate": {
                "first": "Trang đầu",
                "last": "Trang cuối",
                "next": "Tiếp",
                "previous": "Trước"
            },
        },
        // Call API login here
        "ajax": {
            'url': ajaxOptions.ajaxUrl,
            'type': 'GET',
            'beforeSend': function (request) {
                request.setRequestHeader("Authorization", ACCESS_TOKEN);
            },
            "dataSrc": ""
        },
        columnDefs: columnDefs || [],
        "columns": columns.map((column) => {
            if (typeof column === "string") {
                return {
                    data: column
                }
            }
            return {
                ...column
            }
        }),
        "initComplete": function (settings, json) {
            callback && callback(settings, json)
        }
    });
}

const truncate = (input, length = 5) => input.length > length ? `${input.substring(0, length).trim()}...` : input;

function getLocation(callback) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(callback);
    } else {
        alert("Geolocation không được hỗ trợ bởi trình duyệt.");
    }
}

function getDateArrayLabel(timestamp, count) {
    const result = [];
    for (let i = 0; i < count; i++) {
        const date = new Date(timestamp);
        date.setDate(date.getDate() - i);
        result.push(date.toISOString().split('T')[0]);
    }
    return result;
}

function signalStopPreloader() {
    $("#preloaderLayer").fadeOut("slow")
}