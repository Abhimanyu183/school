import mysql from "mysql2/promise";

export default async (req, res) => {
  if (req.method === "GET") {
    try {
      
      const connection = await mysql.createConnection({
        host: "localhost", 
        user: "root",      
        password: "Abc1234", 
        database: "school_db",
      });
      

      
      const [rows] = await connection.execute("SELECT * FROM schools");

      connection.end(); 

      
      res.status(200).json(rows);
    } catch (error) {
      console.error("Database error:", error);
      res.status(500).json({ error: "Error fetching data from the database" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" }); 
  }
};
