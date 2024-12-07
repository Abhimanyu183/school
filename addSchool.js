import formidable from "formidable";
import path from "path";
import mysql from "mysql2/promise";
import fs from "fs";

export const config = {
  api: {
    bodyParser: false, 
  },
};

export default async function handler(req, res) {
  if (req.method === "POST") {
    
    const form = formidable({
      uploadDir: path.join(process.cwd(), "public/schoolImages"),
      keepExtensions: true, 
    });

    
    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error("Form parsing error:", err);
        return res.status(500).json({ error: "Error parsing form data" });
      }

      const { name, address, city, state, contact, email_id } = fields;
      const imageFileName = path.basename(files.image.filepath);

      try {
        
        const connection = await mysql.createConnection({
            host: "localhost", 
            user: "root",      
            password: "Abc1234", 
            database: "school_db",
          });
          

        
        await connection.execute(
          `INSERT INTO schools (name, address, city, state, contact, email_id, image) VALUES (?, ?, ?, ?, ?, ?, ?)`,
          [name, address, city, state, contact, email_id, imageFileName]
        );

        connection.end();
        res.status(200).json({ message: "School added successfully!" });
      } catch (dbError) {
        console.error("Database error:", dbError);
        res.status(500).json({ error: "Database error" });
      }
    });
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
