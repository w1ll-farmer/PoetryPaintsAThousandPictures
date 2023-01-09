var express = require('express')
var app = express()
app.use(express.static('nodeJS'));

app.get('/', function(req, resp){
    resp.send("Hello World")
    
})

app.listen(8090)
console.log('server running at http//127.0.0.1:8090/')