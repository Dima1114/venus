
export function formRequestProps(getProps) {

    let filterPostfix = '?';

    if (typeof getProps === 'object')

        for (const key in getProps) {

            if (getProps.hasOwnProperty(key)) {
                const value = getProps[key];
                let s;
                if (Array.isArray(value)) {
                    value.forEach(function (item) {
                        s = key + (!!item ? ("=" + encodeURIComponent(item)) : "");
                        filterPostfix = filterPostfix + "&" + s;
                    });
                } else {
                    s = key + (!!value ? ("=" + encodeURIComponent(value)) : "");
                    filterPostfix = filterPostfix + "&" + s;
                }
            }
        }

    return filterPostfix === '?' ? '' : filterPostfix;
}