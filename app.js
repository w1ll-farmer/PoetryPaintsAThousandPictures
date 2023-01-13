const express = require('express');
const app = express();

app.use(express.static('client'));
app.get('/poems', function(req, resp){
    resp.send('Poems innit')
})
function switchDiv(divId) {
    var divs = document.getElementsByTagName("div");
    for (var i = 0; i < divs.length; i++) {
        divs[i].style.display = "none";
    }
    document.getElementById(divId).style.display = "block";
}
//onclick=switchDiv('intro-page-div')

module.exports = app;
