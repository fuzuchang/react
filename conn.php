<?php

class db {
    private $conn = '';

    function __construct()
    {
        $this->connect();
    }
    function  connect(){
        $this->conn = mysql_connect("127.0.0.1","root","123456") or exit("数据库连接失败");
        mysql_select_db("react", $this->conn);
        $this->query("set names utf8");
        return $this;
    }

    function query($sql){
        return mysql_query($sql,$this->conn);
    }
    function one($sql){
        return mysql_fetch_array($this->query($sql),MYSQL_ASSOC);
    }

    function all($sql){
        $data = [];
        $result = $this->query($sql);
        while ($res =  mysql_fetch_array($result,MYSQL_ASSOC)){
            $data [] = $res ;
        }
        return $data;
    }
    function close(){
        mysql_close($this->conn);
    }

    function __destruct()
    {
       $this->close();
    }
}

