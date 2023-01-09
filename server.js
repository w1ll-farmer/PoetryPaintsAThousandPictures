const express = require('express')
const app = express()
app.use(express.static('nodeJS'));

app.get('/', function(req, resp){
    resp.statusCode = 200
    resp.setHeader('Content-Type', 'text/plain');
    resp.end("Hello World")
    
})

app.listen(8090)
console.log('server running at http//127.0.0.1:8090/')