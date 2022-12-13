function checkValidity(){
    // Check if valid
    let error = "";
    error += isValid(tempo);
    error += isValid(rate);
    error += isValid(beats);
    if(error === ""){
        return true;
    }
    else{
        alert(error);
        return false;
    }
}

function isValid(param){
    if(Number(param.value) > Number(param.max)){
        param.value = param.max;
        return "Maximum " + param.name + " is " + param.max + "\r\n";
    }
    else if(Number(param.value) < Number(param.min)){
        param.value = param.min;
        return "Minimum " + param.name + " is " + param.min + "\r\n";
    }
    else{
        return "";
    }
}