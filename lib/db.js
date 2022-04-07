import mysql from "mysql2/promise"

// create the connection to database
let db;

const initDB = async() => {
    db = await mysql.createConnection({
        host : process.env.MYSQL_HOST,
        database : process.env.MYSQL_DATABASE,
        user     : process.env.MYSQL_USER,
        password : process.env.MYSQL_PASSWORD   
    });
}


async function sqlQuery(query_string, values=[]) {
    try {
        await initDB();   
        const [rows, fields] = await db.execute(query_string);
        return rows;
    } catch (e) {
        throw Error(e.message)
    }
}

async function insertToDo(data) {
    try {
        await initDB()
        console.log(data.body)
        const [rows, fields] = await db.execute("INSERT INTO `todo`.`list` (`title`,`body`)VALUES('"+data.title+"','"+data.content+"');");
        return rows
    } catch (e) {
        throw Error(e.message)
    }
}


async function deleteToDo(id) {
    try {
        await initDB()
        const [rows, fields] = await db.execute("DELETE FROM `todo`.`list` WHERE " + "id= "+ id);
        return rows
    } catch (e) {
        throw Error(e.message)
    }
}

export {insertToDo, sqlQuery, deleteToDo}
