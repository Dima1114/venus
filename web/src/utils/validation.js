
export function validate(field, errors) {

    if(!errors){
        return null;
    }
    let error = errors.find(error => error.field === field);
    if(!error){
        error = errors.find(error => error.defaultMessage.toLowerCase().includes(field.toLowerCase()));
    }

    if(error){
        return error.defaultMessage;
    }else{
        return null;
    }
}

// Speed up calls to hasOwnProperty
const hasOwnProperty = Object.prototype.hasOwnProperty;

export function isEmpty(obj) {

    if (obj == null) return true;

    if (obj.length > 0)    return false;
    if (obj.length === 0)  return true;

    if (typeof obj !== "object") return true;

    for (const key in obj) {
        if (hasOwnProperty.call(obj, key)) return false;
    }

    return true;
}