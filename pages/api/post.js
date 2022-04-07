import { sqlQuery, insertToDo, deleteToDo } from "../../lib/db";

const handler = async  (req, res) => {
    try {    
        if (req.method === "GET") {
            const {pageIndex} = req.query;
            const result = await sqlQuery(`Select * from todo.list LIMIT 5 OFFSET ${pageIndex*5}`)
            const totalPosts = await sqlQuery(`select count(*) from (select * from todo.list) as x;`)
            return res.status(201).json({message:result, 
                                        totalPosts: totalPosts[0]['count(*)']
                                           });
        } else if (req.method === 'POST') {
            const result = await insertToDo(req.body)
            return res.status(201).json({message:result})
        } else if (req.method === 'DELETE') {
            await deleteToDo(req.body);
            return res.status(200).json({message:"deleted"});
        }
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}


export default handler