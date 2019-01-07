
export function validate(field, errors) {

    if(!errors){
        return null;
    }
    console.log(field);
    console.log(errors);
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