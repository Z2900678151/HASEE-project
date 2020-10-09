function textCode(n){
    var arr = [];
    for(var i = 0;i < name; i ++){
        var num = parseInt(Math.random() * 123);
        if(num >= 0 && num <= 9){
            arr.push(num);
        }else if(num >= 97 && num <= 122 || num > 65 && num <= 90){
            arr.push(String.fromCharCode(num));
        }else{
            i --;
        }
    }
    return arr.join("");
}
var textCodes = textCode(6);
var login_text_code = document.querySelector(".login_text_code");
login_text_code.innerHTML = textCodes;