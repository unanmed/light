import { isNil } from 'lodash-es';

export function has<T>(data: T): data is NonNullable<T> {
    return !isNil(data);
}

export function deleteWith<T>(arr: T[], data: T) {
    const index = arr.indexOf(data);
    if (index === -1) return arr;
    arr.splice(index, 1);
    return arr;
}

export function toFormData(data: Record<string, string>) {
    const form = new FormData();
    for (const [key, value] of Object.entries(data)) {
        form.append(key, value);
    }
    return form;
}
