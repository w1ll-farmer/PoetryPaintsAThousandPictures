const express = require('express');
const app = express();
const fs = require('fs');

const path = require('path');
app.use(express.static(path.join(__dirname, 'client')));
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/save-json', (req, res) => {
  // Read the JSON data from the request body
  const jsonData = req.body;

  // Read existing JSON file
  const filePath = './poems.json';
  fs.readFile(filePath, 'utf8', (err, fileData) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error reading the file.');
      return;
    }

    let jsonFile = {};
    if (fileData) {
      jsonFile = JSON.parse(fileData);
    }

    // Check if author already exists in jsonFile
    if (!jsonFile[jsonData.author]) {
      // If author does not exist, create a new key-value pair with author as the key
      jsonFile[jsonData.author] = [];
    }

    // Add the new poem to the author's array of poems
    jsonFile[jsonData.author].push({ title: jsonData.title, poem: jsonData.poem });

    // Write the updated jsonFile back to the JSON file
    fs.writeFile(filePath, JSON.stringify(jsonFile), (err) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error saving the file.');
      } else {
        res.status(200).send('File saved successfully.');
      }
    });
  });
});

app.get('/poems', (req, res) => {
    // Read the file as a JSON object
    fs.readFile('./poems.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        // Parse the JSON data
        const poems = JSON.parse(data);
        const newPoems = {};
        for (const author in poems) {
            const newPoemsArr = [];
            for (let i = 0; i < poems[author].length; i++) {
            newPoemsArr.push({ title: poems[author][i].title, poem: poems[author][i].poem.replace(/\n/g, '\n') });
            }
            newPoems[author] = newPoemsArr;
            }
            // Send the poems data as a JSON response
        res.json(newPoems);
    });
});

module.exports = app;
