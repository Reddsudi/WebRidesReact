

export default function SignupValidation(values){
    let error={};
    if (values.Username===""){
        error.Username="Cant leave it empty"
    }
    else{
        error.Username=""
    }

    if (values.email===""){
        error.email="Cant leave it empty"
    }
    else{
        error.email=""
    }

    if (values.Password===""){
        error.Password="Cant leave it empty"
    }
    else{
        error.Password=""
    }
    
    return error;

}