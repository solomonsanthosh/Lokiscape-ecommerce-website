const express = require('express');
const app = express();
const AdminRoute = require('./routes/AdminRoute');
const Route = require('./routes/Route');
const bodyParser = require('body-parser');
const db = require('./database');
var cors = require('cors')
app.use(cors())
app.use(bodyParser.json());

db.connect((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('Connected to database');
    }
});

//routes

app.use('/',AdminRoute);
app.use('/',Route);

app.listen(8000, () => {
    console.log('Server started on port 8000');
});