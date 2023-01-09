const express = require('express')
const app = express()
app.use(express.static('nodeJS'));

app.get('/', function(req, resp){
    resp.send("Hello World")
})

app.listen(8090)