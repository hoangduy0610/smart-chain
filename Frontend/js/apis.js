const DEBUG_MODE = false;
const API_HOST = 'http://10.10.12.55:8798';
// const API_HOST = 'https://api.smcsoft.online'

const QR_TARGET_WEB = 'https://app.smcsoft.online/?id=';
const QR_HOST = `https://api.qrserver.com/v1/create-qr-code/?data=${QR_TARGET_WEB}`;

const LOCATIONIQ_KEY = 'pk.1389b74ff08f34d73ab9adbe8dd56d4b';

const API_ENDPOINT = {
    AUTH: {
        LOGIN: `${API_HOST}/auth/signin`,
        FORGOT_PASSWORD: `${API_HOST}/auth/forgot-password`,
        VALIDATE_OTP: `${API_HOST}/auth/validate-otp`,
        SET_NEW_PASSWORD: `${API_HOST}/auth/set-new-password`,
    },

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

    BATCH: {
        CREATE_BATCH: `${API_HOST}/batch-product`,
        LIST_BATCH: `${API_HOST}/batch-product/list`,
        GET_BATCH_BY_BATCHID: `${API_HOST}/batch-product/batch-id/{{id}}`,
        GET_BATCH: `${API_HOST}/batch-product/{{id}}`,
        UPDATE_BATCH: `${API_HOST}/batch-product/{{id}}`,
        DELETE_BATCH: `${API_HOST}/batch-product/{{id}}`,
        FORWARD_BATCH: `${API_HOST}/batch-product/scan-forward/{{id}}`,
    },

    HISTORY: {
        CREATE_HISTORY: `${API_HOST}/history`,
        LIST_HISTORY: `${API_HOST}/history/list`,
        GET_HISTORY: `${API_HOST}/history/{{id}}`,
        UPDATE_HISTORY: `${API_HOST}/history/{{id}}`,
        DELETE_HISTORY: `${API_HOST}/history/{{id}}`,
    },

    TRANSPORTER_BILLS: {
        CREATE_TRANSPORTER_BILLS: `${API_HOST}/transporter/bills`,
        LIST_TRANSPORTER_BILLS: `${API_HOST}/transporter/bills/list`,
        GET_TRANSPORTER_BILLS: `${API_HOST}/transporter/bills/{{id}}`,
        UPDATE_TRANSPORTER_BILLS: `${API_HOST}/transporter/bills/{{id}}`,
        DELETE_TRANSPORTER_BILLS: `${API_HOST}/transporter/bills/{{id}}`,
    },

    RETAILER: {
        IMPORT_RETAILER: `${API_HOST}/seller/storage`,
        LIST_RETAILER_IMPORT: `${API_HOST}/seller/storage/list`,
        LIST_RETAILER_PRODUCT: `${API_HOST}/seller/storage/self`,
        SELL_PRODUCT: `${API_HOST}/seller/storage/sell/{{id}}`,
        ANALYTICS: `${API_HOST}/seller/storage/analytics`,
    },

    ANALYTICS: {
        OVERVIEW: `${API_HOST}/analytics/overview`,
    },

    GEOCODING: {
        AUTOCOMPLETE: `https://api.locationiq.com/v1/autocomplete?key=${LOCATIONIQ_KEY}&q={{query}}&limit=5&dedupe=1`,
        FORWARD_GEOCODING: `https://us1.locationiq.com/v1/search?key=${LOCATIONIQ_KEY}&q={{query}}&format=json`,
        REVERSE_GEOCODING: `https://us1.locationiq.com/v1/reverse?key=${LOCATIONIQ_KEY}&lat={{lat}}&lon={{lon}}&format=json`,
    }
}