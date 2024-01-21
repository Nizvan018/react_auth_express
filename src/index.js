import app from "./App.js";
import { conect_db } from "./db.js";

conect_db();
const port = 4000;

app.listen(port);
console.log('Server on port', port);