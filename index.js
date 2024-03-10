import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import cors from "cors";


const app = express();
const port = 2000;




const db =new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "permalist",
    password: "Avt29012005#",
    port: 5432,
    database:"pern_transactions",
});
db.connect();

app.use(cors());
app.use(express.json());



app.get("/transactions",async(req,res) =>{
    try {
        const trans = await db.query("SELECT * FROM transactions");
        res.json(trans.rows);
        
    } catch (error) {
        console.log(error)
        
    }
    });

app.post("/transactions", async(req,res) => {
    try {
        const {item,price,record_time} = req.body;
        const newTrans = await db.query("INSERT INTO transactions (item,price,record_time) VALUES ($1, $2, $3) RETURNING *",
        [item,price,record_time]
        );
        res.json(newTrans.roes[0]);
    } 
    catch (error) {
        console.log(error.message);
        
    }
});








app.delete("/transactions/:id", async(req,res) => {
try {
    const {id} = req.params;
    const transToDelete = await db.query("DELETE FROM transactions WHERE trans_id = $1", [id]);
    console.log("Transaction deleted successfully");

} catch (error) {
    console.log(error);
    
}
});












app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });