const express = require('express');
const app = express();
const PORT = 3000 || process.env.PORT;
const routers = require('./routers');

app.use(express.json());
app.use("/api/v1/",routers);

// Start the App
app.listen(PORT , () =>{
  console.log(`Listening to http://localhost:${PORT}`);
});