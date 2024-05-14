const API_HOST = 'https://hongdi.ddns.net';

const API_ENDPOINT = {
    LOGIN: `${API_HOST}/auth/signin`,

    USER: {
        CREATE_USER: `${API_HOST}/user`,
        LIST_USER: `${API_HOST}/user/list`,
        GET_USER: `${API_HOST}/user/{{id}}`,
        UPDATE_USER: `${API_HOST}/user/{{id}}`,
        DELETE_USER: `${API_HOST}/user/{{id}}`,
    },

    PRODUCT: {
        CREATE_PRODUCT: `${API_HOST}/product`,
        LIST_PRODUCT: `${API_HOST}/product/list`,
        GET_PRODUCT: `${API_HOST}/product/{{id}}`,
        UPDATE_PRODUCT: `${API_HOST}/product/{{id}}`,
        DELETE_PRODUCT: `${API_HOST}/product/{{id}}`,
    },
    BATCH:{
        CREATE_BATCH: `${API_HOST}/batch-product`,
        LIST_BATCH: `${API_HOST}/batch-product/list`,
        GET_BATCH: `${API_HOST}/batch-product/{{id}}`,
        UPDATE_BATCH: `${API_HOST}/batch-product/{{id}}`,
        DELETE_BATCH: `${API_HOST}/batch-product/{{id}}`,
    },
}