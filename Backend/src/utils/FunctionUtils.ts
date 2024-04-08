import { EnumRoles } from "src/commons/EnumRoles";

export class FunctionUtils {
    public static firestore2json = (data): any => {
        let res = {}
        for (const [key, value] of Object.entries(data)) {
            res[key] = value;
        }
        return res;
    };

    public static firestore2array = (data): any => {
        let res = []
        for (const [key, value] of Object.entries(data)) {
            res[key] = value;
        }
        return res;
    };

    public static fnDelay(mils) {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(true);
            }, mils)
        })
    }

    public static fnCheckRoleAdmin(roles: any[]) {
        return roles && (roles.includes(EnumRoles.ROLE_ADMIN));
    }

    public static getKeyByValue(object, value) {
        return Object.keys(object).find(key => object[key] === value);
    }

    public static isEmptyObject(obj) {
        return !Object.keys(obj).length;
    }

    public static quickSort(arr: any[], isObject?: boolean, keyToSort?: string) {

        if (arr.length < 2) return arr;

        // *** lấy phần tử cuối của 'arr' làm chốt
        const pivotIndex = arr.length - 1;
        const pivot = isObject ? arr[pivotIndex][keyToSort] : arr[pivotIndex];

        const left = [];
        const right = [];

        let currentItem;
        // *** 'i < pivotIndex' => chúng ta sẽ không loop qua chôt nữa
        for (let i = 0; i < pivotIndex; i++) {
            currentItem = isObject ? arr[i][keyToSort] : arr[i];

            if (currentItem < pivot) {
                left.push(arr[i]);
            } else {
                right.push(arr[i]);
            }
        }

        return [...FunctionUtils.quickSort(left, isObject, keyToSort), arr[pivotIndex], ...FunctionUtils.quickSort(right, isObject, keyToSort)];
    }

    public static reverseQuickSort(arr: any[], isObject?: boolean, keyToSort?: string) {

        if (arr.length < 2) return arr;

        // *** lấy phần tử cuối của 'arr' làm chốt
        const pivotIndex = arr.length - 1;
        const pivot = isObject ? arr[pivotIndex][keyToSort] : arr[pivotIndex];

        const left = [];
        const right = [];

        let currentItem;
        // *** 'i < pivotIndex' => chúng ta sẽ không loop qua chôt nữa
        for (let i = 0; i < pivotIndex; i++) {
            currentItem = isObject ? arr[i][keyToSort] : arr[i];

            if (currentItem > pivot) {
                left.push(arr[i]);
            } else {
                right.push(arr[i]);
            }
        }

        return [...FunctionUtils.quickSort(left, isObject, keyToSort), arr[pivotIndex], ...FunctionUtils.quickSort(right, isObject, keyToSort)];
    }

    public static mapNestedObjToArr(obj: any) {
        return Object.keys(obj).map((k) => ({ ...obj[k], key: k }))
    }
}
