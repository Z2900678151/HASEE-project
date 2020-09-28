define(["parabola","jquery","jquery-cookie"], function(parabola, $) {
   function goods(){
     $(function(){
        shop_num();
        
         //加载数据
         $.ajax({
            url:"data/super.json",
            success:function(arr){
                console.log(arr);
                var str = ``;
                for(var i = 0;i < arr.length;i ++){
                    str += `
                    <li class="items">
                        <div class="goods_title">
                            <p>${arr[i].name}</p>
                        </div>
                        <div class="goods_information">
                            <p>${arr[i].information}</p>
                        </div>
                        <div class="money">
                            <p>商城均价：<span>￥ ${arr[i].money}</span></p>
                        </div>
                        <div class="goods_img">
                            <img src="${arr[i].img}" alt="">
                        </div>
                        <div class="sc">
                            <div id="${arr[i].id}" class="sc_btn">加入购物车</div>
                        </div>
                </li>`
                }
                $(".goods ul").html(str);
            },
            error:function(error){
                console.log(error);
            }
         }) 
         $.ajax({
            url:"data/beautiful.json",
            success:function(arr){
                console.log(arr);
                var str = ``;
                for(var i = 0;i < arr.length;i ++){
                    str += `
                    <li class="items">
                        <div class="goods_title">
                            <p>${arr[i].name}</p>
                        </div>
                        <div class="goods_information">
                            <p>${arr[i].information}</p>
                        </div>
                        <div class="money">
                            <p>商城均价：<span>￥ ${arr[i].money}</span></p>
                        </div>
                        <div class="goods_img">
                            <img src="${arr[i].img}" alt="">
                        </div>
                       
                </li>`
                }
                $(".goods .ul2").html(str);
            },
            error:function(error){
                console.log(error);
            }
         })
         //添加购物车
         $(".goods ul").on("click",".sc_btn",function(){
             var id = this.id;
             //判断是否是第一次存入
             var first = $.cookie("goods") == null ? true : false;
             if(first){
                 $.cookie("goods",JSON.stringify([{id:id,num:1}]),{
                     expires:30
                 })
             }else{
                 var cookieArr = JSON.parse($.cookie("goods"));
                 var same = false;//判断是否有重复加入购物车
                 for(var i = 0 ;i < cookieArr.length;i ++){
                     if(cookieArr[i].id == id){
                        same = true;
                        break;
                     }
                 }
                 same ? cookieArr[i].num ++ : cookieArr.push({id:id,num:1});
                 $.cookie("goods",JSON.stringify(cookieArr),{
                     expires:30
                 })
             }
             
             ball_move(this);
             shop_num();
         })

        
         //抛物线
         function ball_move(node){
             $(".ball").css({
                left: $(node).offset().left,
                top: $(node).offset().top - 200,
                display:"block"
             })
             //计算偏移量
             var offsetX = $(".shopping_car .shop_right").offset().left - $(".ball").offset().left ;
             var offsetY = $(".shopping_car .shop_right").offset().top - $(".ball").offset().top;
             
             var bool = new Parabola({
                el: ".ball",
                offset: [offsetX, offsetY],
                duration: 2000,
                curvature: 0.001,
                autostart: true,
                callback: function(){
                     $(".ball").hide();
                }
               })
               p_isRunning = true;
         }

         //编写购物车物品数量函数
         function shop_num(){
            var cookieStr1 =$.cookie("goods");
            var cookieStr2 =$.cookie("GOD_OF_WAR");
            var sum1 = 0;
            var sum2 = 0;
            if(cookieStr1 || cookieStr2){
                var cookieArr1 = JSON.parse(cookieStr1);
                var cookieArr2 = JSON.parse(cookieStr2);

                for(var i = 0 ; i < cookieArr1.length;i ++){
                    sum1 += cookieArr1[i].num;
                }
                for(var i = 0 ; i < cookieArr2.length;i ++){
                    sum2 += cookieArr2[i].num;
                }
            }
            var sum = sum1 + sum2;
           // console.log(sum);
           
             $(".shopping_car").find("p").html(sum);
         }
     })
   }
    return {
        goods:goods
    }
});