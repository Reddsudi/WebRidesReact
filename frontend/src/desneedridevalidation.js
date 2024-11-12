export default function Desvalidation(desneedride){
    let deserror={};
    if (desneedride.destime==="" || desneedride.desdate===""){
        deserror.time="Please enter date and time";
        deserror.date="Please enter date and time";
        alert("validation if")
       
    }
    else{
        deserror.date=""
        deserror.time=""
        console.log(deserror.time)
        alert("validation else")
    }
    return deserror;
}