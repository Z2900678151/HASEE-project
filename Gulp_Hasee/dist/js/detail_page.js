define(["parabola","jquery","jquery-cookie"], function(parabola, $) {
    function detail(){
        $(function(){
            shop_num();

            //引入商品信息
            $.ajax({
                 url:"data/detail_goods.json",
                success:function(arr){
                    //console.log(arr);
                    var str = ``;
                    for(var i = 3;i < arr.length-1;i ++){
                        str += `
                        
                    <li class="ajax1">
                        <div class="num_left">${arr[i].num}</div>
                        <div class="num_center">
                            <p>${arr[i].name}</p>
                            <p>${arr[i].money}</p>
                            <p>月销量 <span style="color: red;font-size: 18px;">${arr[i].scale}</span></p>
                        </div>
                        <div class="num_right">
                            <img src="http://www.hasee.net/uploadfiles/images/2020/7/20200720034118031.jpg" alt=""style="width:150px;height:154px;">
                        </div>
                    </li>
                        `
                    }
                    $(".detail_goods_right ol").append(str);
                },
                error:function(error){
                    console.log(error);
                }
            })
            console.log("detail.js引入成功");
            $(".detail_nav .nav_li1").mouseenter(function(){
                $(".nav_1").css("display","block");
                $(".nav_2").css("display","block");

            })
            $(".nav_1").mouseleave(function(){
                $(".nav_1").css("display","none");
                $(".nav_2").css("display","none");
            })
            $(".detail_nav .li1").mouseenter(function(){
                $(".nav_2_1").css("display","block");
                $(".nav_2_1").siblings().css("display","none");
            })
            $(".detail_nav .li2").mouseenter(function(){
                $(".nav_2_2").css("display","block");
                $(".nav_2_2").siblings().css("display","none");
            })
            $(".detail_nav .li3").mouseenter(function(){
                $(".nav_2_3").css("display","block");
                $(".nav_2_3").siblings().css("display","none");
            })
            $(".detail_nav .li4").mouseenter(function(){
                $(".nav_2_4").css("display","block");
                $(".nav_2_4").siblings().css("display","none");
            })
            $(".detail_nav .li5").mouseenter(function(){
                $(".nav_2_5").css("display","block");
                $(".nav_2_5").siblings().css("display","none");
            })
            $(".detail_nav .li6").mouseenter(function(){
                $(".nav_2_6").css("display","block");
                $(".nav_2_6").siblings().css("display","none");
            })


            //给每个电脑添加划入效果
            $(".magnifying_glass .img1").mouseenter(function(){
                $(".big_img1").css("display","block");
                $(".big_img1").siblings().css("display","none");
            })
            $(".magnifying_glass .img2").mouseenter(function(){
                $(".big_img2").css("display","block");
                $(".big_img2").siblings().css("display","none");
            })
            $(".magnifying_glass .img3").mouseenter(function(){
                $(".big_img3").css("display","block");
                $(".big_img3").siblings().css("display","none");
            })
            $(".magnifying_glass .img4").mouseenter(function(){
                $(".big_img4").css("display","block");
                $(".big_img4").siblings().css("display","none");
            })


            //放大图片
            $(".small_left").mouseenter(function(){
                $(".small_magnify").css("display","block");
                $(".big_magnify").css("display","block");
                
            }).mousemove(function(ev){
                    //var e = ev || window.event;
                    var l = ev.clientX - $(this).offset().left - 100;
                    var t = ev.clientY - $(this).offset().top - 100;
                    //限制出界
                    l = Math.max(0, l);
                    l = Math.min(250, l);
                    t = Math.max(0, t);
                    t = Math.min(250, t);

                    $(".small_magnify").css({
                        top: t,
                        left:l
                    })
                    $(".big_magnify img").css({
                        top:-3 * t,
                        left:-3 * l
                    })
                }).mouseleave(function(){
                $(".small_magnify").css("display","none");
                $(".big_magnify").css("display","none");

            })
            
             //添加购物车
         $(".glass_bottom").on("click",".add_car",function(){
            var id = this.id;
            //判断是否是第一次存入
            var first = $.cookie("GOD_OF_WAR") == null ? true : false;
            if(first){
                $.cookie("GOD_OF_WAR",JSON.stringify([{id:id,num:1,money:7099}]),{
                    expires:30
                
                })
            }else{
                var cookieArr = JSON.parse($.cookie("GOD_OF_WAR"));
                var same = false;//判断是否有重复加入购物车
                for(var i = 0 ;i < cookieArr.length;i ++){
                    if(cookieArr[i].id == id){
                       same = true;
                       break;
                    }
                }
                same ? cookieArr[i].num ++ : cookieArr.push({id:id,num:1});
                $.cookie("GOD_OF_WAR",JSON.stringify(cookieArr),{
                    expires:30
                })
            }
            shop_num();     
            ball_move(this);     
        })
         //抛物线
         function ball_move(node){
            $(".ball").css({
               left: $(node).offset().left,
               top: $(node).offset().top,
               display:"block"
            })
            //计算偏移量
            var offsetX = $(".detail_shop").offset().left - $(".ball").offset().left ;
            var offsetY = $(".detail_shop").offset().top - $(".ball").offset().top;
            
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
             
        }

        //编写购物车物品数量函数
        function shop_num(){
            var cookieStr1 =$.cookie("goods");
            var cookieStr2 =$.cookie("GOD_OF_WAR");
            var sum1 = 0;
            var sum2 = 0;
            if(cookieStr1 && cookieStr2){
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
            $(".detail_shop .p").html(sum);
        }


            
    })
}
    return{
        detail:detail
    }
})