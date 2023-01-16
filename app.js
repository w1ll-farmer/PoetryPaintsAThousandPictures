const express = require('express');
const app = express();

const path = require('path');
app.use(express.static(path.join(__dirname, 'client')));

const bodyParser = require('body-parser');
app.use(bodyParser.json());
const fs = require('fs');
app.post('/save-json', (req, res) => {
  // Read the JSON data from the request body
  const jsonData = req.body;
  const data = {};
  data[jsonData.poem] = jsonData.author;
  // Set destination file
  const filePath = './poems.json';
  /*ADAPTED FROM CHATGPT*/
  fs.readFile(filePath, 'utf8', (err, fileData) =>{
    //use of utf8 so string not buffer
    if (err) {
        console.error(err) //record error + appropriate status code
        res.status(500).send('Error reading the file.');
    } else {
        let jsonFile = {};
        if (fileData) {
            jsonFile = JSON.parse(fileData);
        }
        Object.assign(jsonFile, data);
        //adds data to dictionary, overwrites old
        fs.writeFile(filePath, JSON.stringify(jsonFile), (err) => {
            if (err) {
                console.error(err);
                res.status(500).send('Error saving the file.')
            } else {
                res.status(200).send('File saved successfully.');
            }
        })
    }
  })
  
  });




module.exports = app;
