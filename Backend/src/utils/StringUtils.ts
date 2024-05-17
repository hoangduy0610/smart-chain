export class StringUtils {
    public static getSplitString(string: string, index: number, regex: string) {
        const part = string.split(regex);
        return part[index];
    }

    public static xssPrevent(toOutput: string) {
        return toOutput.replace(/\&/g, '&amp;')
            .replace(/\</g, '&lt;')
            .replace(/\>/g, '&gt;')
            .replace(/\"/g, '&quot;')
            .replace(/\'/g, '&#x27')
            .replace(/\//g, '&#x2F');
    }

    public static randomGeneratePassword(length: number) {
        const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let retVal = '';
        for (let i = 0, n = charset.length; i < length; ++i) {
            retVal += charset.charAt(Math.floor(Math.random() * n));
        }
        return retVal;
    }

    public static fillEndpointPlaceholder(endpoint, params) {
        let result = endpoint;
        for (const key in params) {
            result = result.replace(`{{${key}}}`, params[key]);
        }
        // Example:
        // fillEndpointPlaceholder(API_ENDPOINT.PRODUCT.GET_PRODUCT, { id: 1 })
        return result;
    }
}
