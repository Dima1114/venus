
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