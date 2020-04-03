let express = require("express")
let mysql = require("mysql")
let con = mysql.createConnection({
    user:"data_first",
    password:"data_first",
    database:"data_first",
    host:"120.77.99.3",
    port:"3306",
})
con.connect()
let app = express()

app.all("*",function(req,res,next){
    //设置允许跨域的域名，*代表允许任意域名跨域
    res.header("Access-Control-Allow-Origin","*");
    //允许的header类型
    res.header("Access-Control-Allow-Headers","content-type");
    //跨域允许的请求方式
    res.header("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS");
    if (req.method.toLowerCase() == 'options')
        res.send(200);  //让options尝试请求快速结束
    else
        next();
})

// 注册
app.get("/register",function (req,res) {
    var name = req.query.name
    var pwd = req.query.pwd
    var sql = "select * from data where name='"+name+"'"
    con.query(sql,function (err,rs) {
        if(err)throw err
        if(rs.length>0){
            res.send('No')
        }else{
            var sql2 = "insert into data (name,pwd) values('"+name+"','"+pwd+"')"
            con.query(sql2,function (err,rs) {if(err)throw err})
            res.send('Yes')
        }
    })
})

// 登录检查
app.get("/examine",(req,res)=>{
    let name = req.query.name
    let pwd = req.query.pwd
    let sqlFir = "select * from data where name = '"+name+"'";
    con.query(sqlFir,(err,resTwo)=>{
        if (err) throw err
        if(!resTwo.length) return res.send("Name_No")
        let sqlSec = "select * from data where name='"+name+"' and pwd='"+pwd+"'"
        con.query(sqlSec,(err,resThr)=>{
            if(err)throw err
            if(resThr.length) return res.send("Yes")
            res.send("Pwd_No")
        })
    })
})

// 检查所有数据
app.get("/allData",(req,res)=>{
    let sqlFir = "select * from data"
    con.query(sqlFir,(err,resSecond)=>{
        if(err) throw err
        res.send(resSecond)
    })
})

// 检查个人数据
app.get("/onlyData",(req,res)=>{
    let name = req.query.name
    let sqlFir = "select * from data where name='"+name+"'"
    con.query(sqlFir,(err,resSecond)=>{
        if(err) throw err
        res.send(resSecond[0])
    })
})

//更新数据
app.get("/checkout",(req,res)=>{
    let name = req.query.name;
    let newName = req.query.newName;
    let newPwd = req.query.newPwd;
    let sqlFir = "select * from data where name='"+newName+"'"
    con.query(sqlFir,(err,resSecond)=>{
        if(err)throw err
        if(name!==newName) if(resSecond.length) return res.send("No")
        let sqlSecond = "update data set name='"+newName+"',pwd='"+newPwd+"' where name='"+name+"' "
        con.query(sqlSecond,(errSecond,resThirdly)=>{
            if(errSecond)throw errSecond
            res.send("Yes")
        })
    })
})

// 添加数据
app.get("/addData",(req,res)=>{
    let newName = req.query.newName;
    let newPwd = req.query.newPwd;
    let sqlFir = "insert into data (name,pwd) values ('"+newName+"','"+newPwd+"')"
    con.query(sqlFir,(err,resSecond)=>{
        if(err) throw err
        res.send("Yes")
    })
})

// 删除数据
app.get("/deleteData",(req,res)=>{
    let name = req.query.name
    let sqlFir = "delete from data where name='"+name+"'"
    con.query(sqlFir,(err,resSecond)=>{
        if(err) throw err
        res.send("Yes")
    })
})



app.listen("1020")