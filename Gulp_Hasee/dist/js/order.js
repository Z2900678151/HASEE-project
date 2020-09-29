define(["parabola","jquery","jquery-cookie"], function(parabola, $) {
    function order(){
        //console.log("order引入")
        $(function(){
           
            sc_msg_order1();
            sc_msg_order2();

            shop_num_order();

            //增加或减少商品列表的数量
            $(".order_goods_information").on("click",".detail_span1",function(){
              var id = $(this).closest("ol").attr("id");
              var cookieArr = JSON.parse($.cookie("goods"));
              for(var i =0;i < cookieArr.length;i ++){
                  if(cookieArr[i].id == id){
                      break;
                  }
              }
              if(this.innerHTML == "+"){
                  cookieArr[i].num ++;
              }else{
                  cookieArr[i].num == 1? alert("数量不能小于1！") : cookieArr[i].num --;
              }
              $.cookie("goods", JSON.stringify(cookieArr), {
              expires: 7
              })
              //console.log("cookieArr[i].num");
              //修改页面上的数量
            $(this).siblings(".num").html(`${cookieArr[i].num}`);
            shop_num_order();

            })
            //增加删除第一个商品详情页的数量
          $(".order_goods_information").on("click",".order_span",function(){
              
              var cookieArr = JSON.parse($.cookie("GOD_OF_WAR"));
              
              if(this.innerHTML == "+"){
                  cookieArr[0].num ++;
              }else{
                  cookieArr[0].num == 1? alert("数量不能小于1！") : cookieArr[0].num --;
              }
              $.cookie("GOD_OF_WAR", JSON.stringify(cookieArr), {
              expires: 7
              })
             // console.log("hahah")
              //修改页面上的数量
            $(this).siblings("#num").html(`${cookieArr[0].num}`);
            shop_num_order();

            })
            function sc_msg_order1(){
                var cookieStr = $.cookie("goods");
                if(!cookieStr){
                  return;
                }
                //下载所有的商品数据
                $.ajax({
                  url: "data/super.json",
                  success: function(arr){
                      //console.log("order:" + arr);
                    var cookieArr = JSON.parse(cookieStr);
                    //console.log("haha"+cookieArr[0].money);
                    //精益求精  写算法
                    var newArr = [];
                    for(var i = 0; i < arr.length; i++){
                      for(var j = 0; j < cookieArr.length; j++){
                        if(cookieArr[j].id == arr[i].id){
                          arr[i].num = cookieArr[j].num;
                          newArr.push(arr[i]);
                          break;
                        }
                      }
                    }
                   // console.log(newArr);
                    //通过newArr。处理数据，将数据添加页面上
                    var str = ``;
                    for(var i = 0; i < newArr.length; i++){
                      str += `<ol id ="${newArr[i].id}" class="detail_ol">
                      <li>
                          <input type="checkbox" class="input">
                      </li>
                      <li>
                          <article><img src="${newArr[i].img}" alt=""></article>
                           <p>${newArr[i].name}</p>
                      </li>
                      <li class="money">
                          ${newArr[i].money}
                      </li>
                      <li class="input_num">
                          <span class="detail_span1">-</span><span class="num input_n">${newArr[i].num}</span><span class="detail_span1">+</span>
                      </li>
                      <li class="delete">删除</li>
                     
                  </ol>`;
                    }
                    $(".order_goods_information").append(str);
                  },
                  error: function(msg){
                    console.log(msg);
                  }
                })
              }

              function sc_msg_order2(){
                var cookieStr = $.cookie("GOD_OF_WAR");
                if(!cookieStr){
                  return;
                }
                var cookieArr = JSON.parse(cookieStr);
               // console.log(cookieArr);
                 var newArr = cookieArr[0].num;
                    
                    //通过newArr。处理数据，将数据添加页面上
                    var str = ``;
                   
                      str = `<ol id="detail" class="detail_ol">
                      <li>
                          <input type="checkbox" class="input">
                      </li>
                      <li>
                          <article><img src="http://www.hasee.net/uploadfiles/images/2020/7/20200720030846458.jpg" alt=""></article>
                           <p>战神G7-CU7NA</p>
                      </li>
                      <li class="money">
                          7099
                      </li>
                      <li class="input_num">
                          <span class="order_span">-</span><span id="num" class="input_n">${newArr}</span><span class="order_span">+</span>
                      </li>
                      <li class="delete">删除</li>
                     
                  </ol>`;
                    
                    $(".order_goods_information").html(str);
                 
               
              }
              //给右侧购物车添加删除按钮
           $(".order_goods_information").on("click",".delete",function(){
            //closest获得匹配选择器的第一个祖先元素，从当前元素开始沿 DOM 树向上。
            //.attr("id")返回li 的id名
            //remove()将整个li删除
           
            var id = $(this).closest("ol").remove().attr("id");
            //删除页面上的节点  从cookie中删除数据
            var cookieArr = JSON.parse($.cookie("goods"));
            for(var i = 0; i < cookieArr.length; i++){
            if(cookieArr[i].id == id){
                cookieArr.splice(i, 1);
                break;
            }
            }
            if(cookieArr.length){
            $.cookie("goods", JSON.stringify(cookieArr), {
                expires: 7
            })
            }else{
            $.cookie("goods", null);
            }

            //更新数据数量
            shop_num_order(); 


           })
            
           var money = 0;
           var num = 0;
           //给购物车添加input按钮
          $(".order_goods_information").on("input",".input",function(){
            var goods_num = 0; 
            var goods_money = 0.00;
           
             goods_money = $(this).parent().siblings(".money").html();
             goods_num = $(this).parent().siblings(".input_num").children(".input_n").html();
            // console.log(goods_money)
            // console.log(goods_num)
             
            //console.log((cookieArr[0].money).substring(1,2))
            //判断是否选中
            if($(this).is(":checked")){
               num += parseInt(goods_num);
               money += goods_money * goods_num;
               $(".order_account").find("span").html(num);
               $(".order_account").find("i").html(money);

            }else{       
              num -= goods_num;       
              money -= goods_money * goods_num;
              $(".order_account").find("span").html(num);
              $(".order_account").find("i").html(money);

            }
            
         })
          //给订单页添加全选按钮
          $(".order_goods_title").on("input",".select",function(){
            var goods_num = 0; 
            var goods_money = 0.00;
            var goods_num_id =$(this).parent().parent().parent().siblings(".order_goods_information").find(".input_n");
            var goods_money_id = $(this).parent().parent().parent().siblings(".order_goods_information").children("ol").find(".money");
          //  console.log(goods_num_id)
          
           // console.log(goods_money_id)
          for(var i = 0;i < goods_num_id.length;i ++){
               goods_num+= parseInt($(goods_num_id.get(i)).html());
              goods_money += parseInt($(goods_money_id.get(i)).html());
              money += goods_money * goods_num;
           }
           //  console.log(goods_money)
            //console.log((cookieArr[0].money).substring(1,2))
            //判断是否选中
            if($(this).is(":checked")){
             var id = $(this).parent().parent().parent().siblings(".order_goods_information").children("ol").children("li").children("input");
             //.children("li")
              //console.log(id);
              id.prop("checked"," ")
               num += parseInt(goods_num);
              
               $(".order_account").find("span").html(num);
               $(".order_account").find("i").html(money);

            }else{   
              var id = $(this).parent().parent().parent().siblings(".order_goods_information").children("ol").children("li").children("input");
             //.children("li")
             // console.log(id);
              id.prop("checked",null);    
              num -= goods_num;       
              money -= money;
              if(num<0){
                num = 0;
              }
              $(".order_account").find("span").html(num);
              $(".order_account").find("i").html(money);

            }
            
         })
              //编写购物车物品数量函数
         function shop_num_order(){
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
           
             $(".order_goods_top ").find("i").html(sum);
         }
        })
    }
    return{
        order:order
    }
})