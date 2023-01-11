const express = require('express');
const app = express();

app.use(express.static('client'));
app.get('/', function(req, resp){
    resp.send('hola')
})



module.exports = app;
