import { app } from "./src/app.js";

const port = process.env.PORT || 8000;

import dotenv from 'dotenv';
dotenv.config();
import DbConnection from "./src/DB/db.js";
DbConnection()
  .then(() => {
    app.listen(port, ()=>{
    console.log("app is listening at ports :", port);
    })
  })
  .catch((err) => {
    console.log('Mongo DB connection failed message from Index file:', err)
  })

