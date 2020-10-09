console.log("加载成功");


require.config({
    paths:{
        "jquery":"jquery-1.11.3",
        "logins":"logins"
    }
})

require(['logins'],function(logins){
    logins.login();
})