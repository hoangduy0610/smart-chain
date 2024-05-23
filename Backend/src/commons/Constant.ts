require('dotenv').config();

export enum EEnvName {
    EMAIL_FROM = 'EMAIL_FROM',
    APP_URL = 'APP_URL',
}

export class Constant {
    public static getEnv(name: EEnvName) {
        switch (name) {
            case EEnvName.EMAIL_FROM:
                return process.env.EMAIL_FROM || '"SmartChain" <hoangduy06104@gmail.com>';
            case EEnvName.APP_URL:
                return process.env.APP_URL || 'https://smartchain.ddns.net/Frontend/';
            default:
                return '';
        }
    }
    public static readonly ROUTE_MACHINE_URL = 'https://router.project-osrm.org/route/v1/driving/{{src_lng}},{{src_lat}};{{des_lng}},{{des_lat}}?overview=false';
    public static readonly EMAIL_SUBJECT = {
        FORGOT_PASSWORD: 'Đặt lại mật khẩu cho SmartChain'
    };
    public static readonly JWT_SECRET = 'c4bc8de0-c8cd-4648-92fd-0b18fa3b5aec';
    public static readonly JWT_EXPIRE = '1000d';
    public static readonly BCRYPT_ROUND = 10;
}
