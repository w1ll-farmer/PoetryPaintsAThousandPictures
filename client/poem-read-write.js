async function saveData () {
  // Assigns poem, author and title to constants
  const poem = document.querySelector("textarea[name='poem']").value;
  const author = document.querySelector("input[name='author']").value;
  const title = document.querySelector("textarea[name='title']").value;

  // Create a data object to hold the form data
  const data = {
      author,
      title,
      poem
  };

  // Convert the data object to a string using stringify()
  const jsonData = JSON.stringify(data);

  try {
    // Use the fetch() function to send a request to the server to save the JSON data to a file
    const response = await fetch('/save-json', {
      method: 'POST',
      body: jsonData,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const result = await response.json();
    console.log('Success:', result);
  } catch (error) {
    console.error('Error:', error);
  }
}

  const form = document.querySelector('#write-form');
  form.addEventListener('submit', x => {
    x.preventDefault(); // makes sure page doesn't reload
    saveData(); // calls function to write + save data
    document.getElementById('write-form').reset();
    // resets the form so data doesn't remain inside
  });
  let previousPoemDiv = null;
  let previousPoem = null;
  async function getPoem () {
    try {
      const response = await fetch('/poems'); // makes get request
      const poemDict = await response.json();
      const poemDiv = document.getElementById('poems');
      const authors = Object.keys(poemDict); // extracts authors
      // generates random author
      const randomIndex = Math.floor(Math.random() * authors.length);
      const randomAuthor = authors[randomIndex];
      // const previousAuthor = randomAuthor;
      const poemArray = poemDict[randomAuthor];
      let randomPoem = previousPoem;
      // eslint-disable-next-line eqeqeq
      while (randomPoem == previousPoem) { // generates random poem
          const randomIndex = Math.floor(Math.random() * poemArray.length);
          randomPoem = poemArray[randomIndex];
      }
      previousPoem = randomPoem;
      const title = randomPoem.title;
      const poem = randomPoem.poem;
      const poemNode = document.createElement('div');
      poemNode.setAttribute('id', 'poem-node');
      const formattedPoem = poem.replace(/\\n/g, '<br>'); // maintain newline
      const poemContent = `<textarea readonly style="height:30px;width:200px;resize:none;font-size:12pt; background-color:rgba(255,255,255,0.5);text-align:center">${title}</textarea><br><textarea readonly style="height:300px;width:475px;resize:none;font-size:11pt;font-style:italic;font-family:Arial,san-serif;background-color: rgba(255, 255, 255, 0.5);">${formattedPoem}</textarea><p><span style="font-weight:bold">Author:</span> ${randomAuthor}</p>`;
      poemNode.innerHTML = poemContent;
      poemDiv.appendChild(poemNode);
      if (previousPoemDiv) {
          previousPoemDiv.style.display = 'none';
      }
      previousPoemDiv = poemNode;
    } catch (err) {
      console.error(err);
    }
  }

window.addEventListener('DOMContentLoaded', function () {
    const poemGenButton = document.getElementById('poem-gen');
    poemGenButton.addEventListener('click', function () {
        getPoem();
    });
});
