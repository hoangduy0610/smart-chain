require('dotenv').config();

export enum EEnvName {
    EMAIL_FROM = 'EMAIL_FROM',
    APP_URL = 'APP_URL',
    OWNER_WALLET_SECRET = 'OWNER_WALLET_SECRET',
    PROVIDER_KEY = 'PROVIDER_KEY',
    CONTRACT_ADDRESS = 'CONTRACT_ADDRESS',
}

export class Constant {
    public static getEnv(name: EEnvName) {
        switch (name) {
            case EEnvName.EMAIL_FROM:
                return process.env.EMAIL_FROM || '"SmartChain" <hoangduy06104@gmail.com>';
            case EEnvName.APP_URL:
                return process.env.APP_URL || 'https://management.smcsoft.online';
            case EEnvName.OWNER_WALLET_SECRET:
                return process.env.OWNER_WALLET_SECRET || 'SECRET_KEY_GET_FROM_METAMASK';
            case EEnvName.PROVIDER_KEY:
                return process.env.PROVIDER_KEY || 'ETHERSCAN_KEY';
            case EEnvName.CONTRACT_ADDRESS:
                return process.env.CONTRACT_ADDRESS || '0xe003EA84cf279C158c04014078855D72173287d0';
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
