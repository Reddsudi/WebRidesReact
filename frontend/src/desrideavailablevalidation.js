export default function Desvalidation(desrideav){
    let deserror={};
    if (desrideav.time===""||desrideav.date===""){
        deserror.time="Please enter date and time";
        deserror.date="Please enter date and time";
       
    }
    else{
        deserror.date=""
        deserror.time=""
    }
    return deserror;
}