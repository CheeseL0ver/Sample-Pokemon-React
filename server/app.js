const express = require('express')
const app = express()
const cors = require("cors");
const router = require('./routes');
const port = process.env.PORT || 3001

app.use(cors());
app.use(router);
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
