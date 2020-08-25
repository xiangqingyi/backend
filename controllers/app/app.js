const jwt = require('jsonwebtoken');
const md5 = require('md5');
const config = require('../../config/config.dev');
const mysql = require('mysql');
const pool = mysql.createPool(config.dbConnection);

exports.login = async (req, res, next) => {
    console.log(req.body);
    const {name = "" , password=""} = req.body;
    if (name === '' || password === '') {
        return res.send({
            success: false,
            message: '用户名或密码不能为空'
        })
    }
    const sql = "SELECT * FROM user_info WHERE name = ? and github_id IS NULL;";
   
    try {
        pool.getConnection((err, connection) => {
            if (err) {
                console.log(err);
            } else {
                connection.query(sql, name, (err, data) => {
                    if (err) {
                        console.log(err);
                    } else {
                        if (data.length != 0) {
                            if (md5(password) === data[0].password){
                                const { id, name, sex, website, github, intro, company, avatar, location, socketId } = data[0];
                                const payload = { id };
                                const token = jwt.sign(payload, config.jwt_secret, {
                                    expiresIn: Math.floor(Date.now() / 1000) + 24 * 60 * 60 * 7 // token设置一周的有效期 
                                })
        
                                return res.json({
                                    success: true,
                                    message: '登录成功',
                                    userInfo: {
                                        name,
                                        user_id: id,
                                        sex,
                                        website,
                                        github,
                                        intro,
                                        company,
                                        avatar,
                                        location,
                                        socketId,
                                        token
                                    }
                                })
                            
                            } else {
                                return res.json({
                                    message: '密码验证失败',
                                    success: false
                                })
                            }
                        } else {
                            return res.json({
                                message: '该用户不存在',
                                success: false
                            })
                        }
           
                    }
                })
            }
        })
    } catch (error) {
        throw new Error(error);
    }
}



exports.register = async (req, res, next) => {
    console.log(req.body);
    const {name = "", password=""} = req.body;
    if (name === '' || password === '') {
        return res.send({
            success: false,
            message: '用户名或密码不能为空'
        })
    }
    try {
        pool.getConnection((err, connection) => {
            if (err) {
                console.log(err);
            } else {
                const sql_1 = "SELECT name FROM user_info WHERE name = ? and github_id IS NULL;";
                connection.query(sql_1, name, (err, data) => {
                    if (data.length > 0) {
                        return res.json({
                            success: false,
                            message: '该用户已存在'
                        })
                    } else {
                        const md5Psd = md5(password);
                        const value = [name, md5Psd];
                        const sql_2 = "insert into user_info(name, password) value(?,?);";
                        connection.query(sql_2, value, (err, data) => {
                            if (err) {
                                console.log(err);
                            } else {
                                return res.json({
                                    success: true,
                                    message: '用户注册成功'
                                })
                            }
                        })
                    }
                })
            }
        })
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}