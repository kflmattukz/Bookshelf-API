const express = require('express');
const app = express();
const PORT = 3000 || process.env.PORT;
const routers = require('./routers');

// Using router

app.use(express.json());
app.use(routers);

// Start the App
app.listen(PORT , () =>{
  console.log(`Listening to http://localhost:${PORT}`);
});