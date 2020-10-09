<?php
    header("Content-type:text/html;charset=utf-8");
    var_dump($_POST);
    //模拟官方的返回，生成对应的内容
    $responseData = array("code" => 0,"msg" => '');
    //将数据取出
    $username = $_POST['username'];
    $password = $_POST['password'];
    $repassword = $_POST['repassword'];
    $date = $_POST['createTime'];
    // $notcode = $_POST['notcode'];
    // $truecode = $_POST['truecode'];
    
    //初步的判断
    if(!$username){
        $responseData['code'] = 1;
        $responseData['msg'] = "用户名不能为空";
        echo json_encode($responseData);
        exit;
    }
    if(!$password){
        $responseData['code'] = 2;
        $responseData['msg'] = "密码不能为空";
        echo json_encode($responseData);
        exit;
    } 
    if($repassword !== $password){
        $responseData['code'] = 3;
        $responseData['msg'] = "两次密码不一致";
        echo json_encode($responseData);
        exit;
    }
    // if($not_code != $true_code){
    //     $responseData['code'] = 7;
    //     $responseData['msg'] = "验证码不正确";
    //     echo json_encode($responseData);
    //     exit;
    // }
    //验证数据库是否有同名的用户
    //1、连接数据库
    $link = mysql_connect("127.0.0.1","root","123456");
    //2、判断数据库是否连接成功
    if(!$link){
        $responseData['code'] = 4;
        $responseData['msg'] = "服务器忙";
        echo json_encode($responseData);
        exit;
    }
    //3、访问字符集
    mysql_set_charset("utf8");
    //4、选择数据库
    mysql_select_db("shenzhou");
    //5、准备SQL语句
    $sql = "SELECT * FROM userlist WHERE username='{$username}'";
    //echo $sql;//输出试试SQL拼接对不对
    //6、发送SQL语句
    $res = mysql_query($sql);
    //7、取出下一行
    $row = mysql_fetch_assoc($res);
   
    if($row){
        $responseData['code'] =5;
        $responseData['msg'] = "用户名已存在";
        echo json_encode($responseData);
        exit;
    }
    $password = md5(md5(md5($password).'zhenyi').'haoshuai');
    //注册
    $sql2 = "INSERT INTO userlist(username,password,data) VALUES('{$username}','{$password}','{$date}')";

    $res = mysql_query($sql2);

    if(!$res){
        $responseData['code'] = 6;
        $responseData['msg'] = "注册失败";
        echo json_encode($responseData);
        exit;
    }
    $responseData['msg'] = "注册成功";
    echo json_encode($responseData);
    //8、关闭数据库
    mysql_close($link);
?>