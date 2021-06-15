module.exports = function(mail){
    mail = mail.toLowerCase();
    var expReg= /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
    var valido=expReg.test(mail);
    if(valido==true){  
        m = true
    }else{
        m = false
    }
    return m;
}




