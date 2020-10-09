define(['jquery'], function($) {
    function register(){
        //console.log(textCode(6));
        $(".login_text_code").html(textCode(6));
            
            function textCode(n){
                var arr = [];
                for(var i = 0;i < n; i ++){
                    var num = parseInt(Math.random() * 123);
                    if(num >= 0 && num <= 9){
                        arr.push(num);
                    }else if(num >= 97 && num <= 122 || num > 65 && num <= 90){
                        arr.push(String.fromCharCode(num));
                    }else{
                        i --;
                    }
                }
                return arr.join(" ");
            }
        $(".login_button").click(function(){ 
           $(".alet").html(null)

            $.ajax({
                type:"post",
                url:'./php/register.php',
                data:{
                    username:$(".items_account").eq(0).val(),
                    password:$(".items_account").eq(1).val(),
                    repassword:$(".items_account").eq(2).val(),
                    notcode:$(".items_account").eq(3).val(),
                    truecode:$(".login_text_code").val(),

                    createTime:(new Date()).getTime()

                },
                success:function(result){
                    console.log(result);
                   var obj = JSON.parse(result);
                   if(obj.code){
                       $("#show").attr("class","error");
                   }else{
                       $("#show").attr("class","correct");
                   }
                   $("#show").html(obj.msg);
                },
                error:function(msg){
                    console.log(msg);
                }
            })
        })

    }
    return{
        register:register
    }
});