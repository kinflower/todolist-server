const todo = require('../models/todo')
const express = require('express')
const url = require('url')
const db = todo.DB
const router = express.Router()
// 写入数据
router.post("/inserttodo", function (req, res) {
    let body = ''
    req.on('data', (thunk) => {
        body += thunk
    })
    req.on('end', () => {
        db.insert_todo(JSON.parse(body))
        res.send(JSON.stringify({
            code: 200
        })) // 数据响应
    })
})
// 更新数据
router.post("/updatetodo", function (req, res) {
    let body = ''
    req.on('data', (thunk) => {
        body += thunk
    })
    req.on('end', () => {
        db.update_todo(JSON.parse(body))
        res.send(JSON.stringify({
            code: 200
        })) // 数据响应
    })
})
// 查询所有数据
router.get("/selectalltodo", function (req, res) {
    db.selectAll_todo().then(val => {
        res.send(JSON.stringify({
            code: 200,
            msg: val
        }))
    })
})
// 筛选单条数据
router.get("/searchtodo", function (req, res) {
    let obj = url.parse(req.url, true).query
    db.select_todo(obj).then(val => {
        res.send(JSON.stringify({
            code: 200,
            msg: val
        }))
    })
})
// 删除数据
router.get("/deletetodo", function (req, res) {
    let obj = url.parse(req.url, true).query
    db.delete_todo(obj.id)
    res.send(JSON.stringify({
        code: 200
    })) // 数据响应
})
// 关闭服务
router.get("/close", function () {
    process.exit(0)
})

module.exports = router