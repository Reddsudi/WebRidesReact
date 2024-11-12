
export default function LoginValidation(values){
    let error={}

    if (values.email===""){
        error.email = "Name should not be empty"
        
    }
    else{
        error.email=""
    }
    if(values.password===""){
        error.password="Password should not be empty"

    }

    return error;
}