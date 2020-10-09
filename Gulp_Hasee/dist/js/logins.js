define(['jquery'], function($) {
    function login(){
        $("#register_button").click(function(){
            $.ajax({
                type:"post",
                url:'./php/login.php',
                data:{
                    username:$(".items_account").eq(0).val(),
                    password:$(".items_account").eq(1).val()
    
                },
                success:function(result){
                    console.log(result.msg);
                   var obj = JSON.parse(result);
                   console.log(obj.msg);
                   $(".show").css("display","inline-block");    
                   
                   $(".show").html(obj.msg);
                },
                error:function(msg){
                    console.log(msg);
                }
            })
        })
       
    }
    return{
        login:login
    }

})