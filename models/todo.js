class DB {
    constructor() {
        let sqlite = require('sqlite3').verbose()
        this.db = new sqlite.Database('data.db', () => {
            console.log('数据库打开成功')
            this.db.run('CREATE TABLE IF NOT EXISTS todolist (id INTEGER PRIMARY KEY AUTOINCREMENT, title VARCHAR, state BOOLEAN, type VARCHAR, start VARCHAR, end VARCHAR, finish VARCHAR, grade VARCHAR, detail TEXT)');
        })
    }
    insert_todo(param) {
        let add = this.db.prepare("INSERT OR REPLACE INTO todolist (title, state, type, start, end, finish, grade, detail) VALUES (?,?,?,?,?,?,?,?)");
        add.run(param.title, param.state, param.type, param.start, param.end, param.finish, param.grade, param.detail)
        add.finalize()
        console.log('数据插入成功')
    }
    delete_todo(id) {
        let del = this.db.prepare("DELETE from todolist where id =?")
        del.run(id)
        del.finalize()
        console.log('数据删除成功')
    }
    update_todo(param) {
        let update = this.db.prepare("UPDATE todolist set title=?, state=?, type=?, start=?, end=?, finish=?, grade=?, detail=? where id=?")
        update.run(param.title, param.state, param.type, param.start, param.end, param.finish, param.grade, param.detail, param.id)
        update.finalize()
        console.log('数据更新成功')
    }
    selectAll_todo() {
        return new Promise((resolve) => {
            this.db.all("SELECT * FROM todolist", (err, row) => {
                resolve(row)
            })
        })
    }
    select_todo(obj) {
        return new Promise((resolve) => {
            this.db.all("SELECT * FROM todolist", (err, row) => {
                if (obj.title) {
                    const res = row.filter(item => {
                        return item.title.includes(obj.title)
                    })
                    resolve(res)
                } else if (obj.type) {
                    const res = row.filter(item => {
                        return item.type === obj.type
                    })
                    resolve(res)
                } else if (obj.title && obj.type) {
                    const res = row.filter(item => {
                        return item.title.includes(obj.title) && item.type === obj.type
                    })
                    resolve(res)
                }
            })
        })
    }
}

module.exports = {
    DB: new DB()
}