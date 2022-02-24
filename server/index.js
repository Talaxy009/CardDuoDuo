const express = require("express");
const session = require("express-session");
const sql = require("sqlite3").verbose();
const svgCaptcha = require("svg-captcha");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

const db = new sql.Database("./data/shop.db", (err) => {
  if (err) {
    console.error(err);
  }
});

process.on("exit", (code) => {
  db.close();
  console.log(`进程退出，状态: ${code}`);
});

app
  .use(
    session({
      secret: "topnep",
      resave: false,
      saveUninitialized: true,
    })
  )
  .use(bodyParser.json());

app.all("*", (req, res, next) => {
  res.header("Access-Control-Allow-Origin", req.headers.origin); //获取请求源 这样所有请求就都有访问权限了
  res.header("Access-Control-Allow-Credentials", true);
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type,Content-Length, Authorization, Accept,X-Requested-With"
  );
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});

app
  .get("/code", (req, res) => {
    const codeConfig = {
      size: 4, // 验证码长度
      ignoreChars: "0o1i", // 验证码字符中排除 0o1i
      noise: 3, // 干扰线条的数量
      fontSize: 42,
      color: true, //开启文字颜色
      background: "#f5deb3", //背景色
      width: 150,
      height: 44,
    };
    const captcha = svgCaptcha.create(codeConfig);

    req.session.captcha = captcha.text.toLowerCase(); //存 session 用于验证接口获取文字码
    res.type("svg").send(captcha.data);
  })
  .post("/login", (req, res) => {
    if (req.session.captcha !== req.body.captcha.toLowerCase()) {
      res.send({
        code: 403,
        msg: "验证码不符或已过期",
      });
    } else {
      const userInfo = req.body;
      db.all(
        `SELECT * FROM user WHERE account = "${userInfo.account}"`,
        (err, rows) => {
          if (err) {
            console.error(err);
            res.send({
              code: 500,
              msg: err.message,
            });
          } else if (rows.length === 0) {
            res.send({
              code: 404,
              msg: "账号不存在",
            });
          } else if (rows[0].password === userInfo.password) {
            res.send({
              code: 200,
              msg: "登录成功",
              userInfo: rows[0]
            });
          } else {
            res.send({
              code: 403,
              msg: "密码错误",
            });
          }
        }
      );
    }
  })
  .post("/signup", (req, res) => {
    const userInfo = req.body;
    db.run(
      `INSERT INTO user (account,password,nickname) VALUES ("${userInfo.account}", "${userInfo.password}", "${userInfo.nickname}")`,
      (err) => {
        if (err) {
          console.error(err);
          res.send({
            code: 500,
            msg: "账号已注册",
          });
        } else {
          res.send({
            code: 200,
            msg: "注册成功",
          });
        }
      }
    );
  })
  .get("/goods", (req, res)=>{
    db.all(
      "SELECT * FROM goods",
      (err, rows) => {
        if (err) {
          console.error(err);
          res.send({
            code: 500,
            msg: err.message,
            data: [],
          });
        } else {
          res.send({
            code: 200,
            msg: "成功",
            data: rows,
          });
        }
      }
    );
  })
  .get("/images/*", (req,res)=>{
    res.type("png").sendFile(`${__dirname}/data${req.url}`);
  });

app.listen(port, () => {
  console.log(`服务器已运行在 http://localhost:${port}`);
});