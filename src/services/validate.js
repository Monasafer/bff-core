
module.exports = function(validar){
    regex = /^[^'"\\\/<>=*@&]*$/
    var validation=regex.test(validar);
    if(validation==true){  
        v = true
    }else{
        v = false
    }
    return v;
}



