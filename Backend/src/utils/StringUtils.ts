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
}
