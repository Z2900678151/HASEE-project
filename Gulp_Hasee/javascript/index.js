define(["parabola","jquery","jquery-cookie"],function(parabola,$){
    function banner(){
        $(function(){
           var oBtns = $(".banner").find("ol li");
           var UL = $(".banner").find("ul");
           var iNow = 0;//假设在0下标处
           var skip = document.documentElement.clientWidth ;//设置图片要移动的像素
           var timer = null;
           var isRunning = false;//判断

           //侧边栏
           $(".logo").mouseenter(function(){
               $(".sidebar").css("display","block");
              
             //  $(".sidebar ul .")
           });
           $(".sidebar1").mouseenter(function(){
             $(".sidebar1").find("ul").css("display","block");
           })
           $(".sidebar1").mouseleave(function(){
            $(".sidebar1").find("ul").css("display","none");
          })
          $(".sidebar2").mouseenter(function(){
            $(".sidebar2").find("ul").css("display","block");
          })
          $(".sidebar2").mouseleave(function(){
           $(".sidebar2").find("ul").css("display","none");
         })
         $(".sidebar3").mouseenter(function(){
            $(".sidebar3").find("ul").css("display","block");
          })
          $(".sidebar3").mouseleave(function(){
           $(".sidebar3").find("ul").css("display","none");
         })
           $(".sidebar ul").mouseleave(function(){
            $(".sidebar").css("display","none");

           })

            //给导航添加划入效果
           $(".head ul li").mouseover(function(){
               
               $(this).css({
                   borderBottom: "8px solid blue",

               })
               $(this).find("div").css({
                   display:"block",
                   border:0
               }).mouseover(function(){

               })
               //$(this).siblings().css("borderBottom","0")
           })
           $(".head ul li").mouseout(function(){
               
                $(this).css({
                    borderBottom: "0",

                })
                $(this).find("div").css({
                    display:"none",
                    border:0
                }).mouseover(function(){
                    $(this).find("li").css("border",0)
                })
               
        })


           //点击下标跳转
           oBtns.click(function(){
               iNow = $(this).index();
               tab();
           })
           
           $(".banner").mouseenter(function(){
               clearInterval(timer);
           })
           $(".banner").mouseleave(function(){
            timer = setInterval(function(){
                iNow ++;
                tab();
           },3000)
           })
           timer = setInterval(function(){
                iNow ++;
                tab();
           },3000)

           $(".banner_left").click(function(){
                if(!isRunning){
                    isRunning = true;
                }else{
                    return;
                }
                if(iNow == 0){
                    iNow = 4;
                    UL.css("left",iNow * - skip);
                }
                iNow -- ;
                tab();
                return false;
           })
           $(".banner_right").click(function(){
            if(!isRunning){
                isRunning = true;
            }else{
                return;
            }
            
            iNow ++ ;
            tab();
            return false;
       })
       

       //给商品添加滑动效果
       var timer_shop = null;
       var shop_iNow = 0;
       $(".shop_box").mouseover(function(){
           clearInterval(timer_shop);
       })
       $(".shop_box").mouseout(function(){
        timer_shop = setInterval(function(){
            shop_iNow ++;
            shop_tab();
           },3000)
       })
       timer_shop = setInterval(function(){
        shop_iNow ++;
        shop_tab();
       },3000)
       function shop_tab(){
       $(".goods1").animate({
            left:shop_iNow * -1400 + 'px',
        },
        1000,
        function(){
               if(shop_iNow == 2){
                shop_iNow = 0;
                $(".goods1").css("left",0);
               } 
        }
        
        )
     }
       //给动态添加滑动效果
       var timer_dynamic = null;
       var dynamic_iNow = 0;
       $(".dynamic").mouseover(function(){
           clearInterval(timer_dynamic);
       })
       $(".dynamic").mouseout(function(){
        timer_dynamic = setInterval(function(){
            dynamic_iNow ++;
            dynamic_tab();
           },2000)
       })
       timer_dynamic = setInterval(function(){
        dynamic_iNow ++;
        dynamic_tab();
       },2000)
       function dynamic_tab(){
       $(".dynamic_banner").animate({
            left:dynamic_iNow * -340 + 'px',
        },
        500,
        function(){
               if(dynamic_iNow == 2){
                dynamic_iNow = 0;
                $(".dynamic_banner").css("left",0);
               } 
        }
        
        )
     }
    
           //编写跳转函数
           function tab(){
              oBtns.removeClass("active").eq(iNow).addClass("active");
              
              if(iNow == oBtns.size()){
                  oBtns.eq(0).addClass("active");
              }
              if(iNow < 0){
                oBtns.eq(3).addClass("active");
            }
              UL.animate({
                  left:iNow * -skip,
                
              },
              500,
              function(){
                  
                     if(iNow == 4){
                      iNow = 0;
                      UL.css("left",0);
                     } 
                
                  
                 
                 isRunning = false
              }
              
              )

           }
        });
    }
    return{
        banner:banner
    }
})