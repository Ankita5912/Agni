import { app } from "./src/app.js";

const port = process.env.PORT || 8000;

import dotenv from 'dotenv';
dotenv.config();

app.listen(port, ()=>{
  console.log("app is listening at port :", port);
})