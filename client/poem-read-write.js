async function saveData() { //writes and saves data to JSON
    // Assigns poem and author to variables
    const poem = document.querySelector("textarea[name='poem']").value;
    const author = document.querySelector("input[name='author']").value;
  
    // Create a data object to hold the form data
    const data = { poem, author };
  
    // Convert the data object to a string using stringify()
    const jsonData = JSON.stringify(data);
    /*ADAPTED FROM PASTA PAGE*/
    try { //allows for error catching
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
  
  const form = document.querySelector("#write-form");
  form.addEventListener("submit", x => {
    x.preventDefault(); //makes sure page doesn't reload
    saveData(); //calls function to write + save data
    document.getElementById("write-form").reset(); 
    //resets the form so data doesn't remain inside
  });
  let previousPoemDiv = null;
  let previousPoem = null;
  async function getPoem() {
    try {
        const response = await fetch('/poems');
        const poemDict = await response.json();
        const poemDiv = document.getElementById("poems");
        const keys = Object.keys(poemDict);
        let randomPoem=previousPoem
        while (randomPoem === previousPoem){
            const randomIndex = Math.floor(Math.random() * keys.length);
            randomPoem = keys[randomIndex];
        }
        const author = poemDict[randomPoem];
        let poemNode = document.createElement("div");
        poemNode.setAttribute("id", "poem-node")
        let formattedPoem = randomPoem.replace(/\\n/g, '<br>');
        let poemContent = `<textarea readonly style="height:300px;width:475px;resize:none;font-size:11pt;font-style:italic;font-family:Arial,san-serif;background-color: rgba(255, 255, 255, 0.5);">${formattedPoem}</textarea><p><span style="font-weight:bold">Author:</span> ${author}</p>`;
        poemNode.innerHTML = poemContent;
        poemDiv.appendChild(poemNode);
        if (previousPoemDiv) {
            previousPoemDiv.style.display = "none";
        }
        previousPoemDiv = poemNode;
    } catch (err) {
        console.error(err);
    }
}

window.addEventListener("DOMContentLoaded", function() {
    const poemGenButton = document.getElementById("poem-gen");
    poemGenButton.addEventListener("click", function(){
        getPoem();
    });
});

//let poemContent = `<textarea style="height:20vh;width:30vw;resize:none;font-size:12pt;font-style:italic;font-family:Arial,san-serif">${formattedPoem}</textarea><p>Author: ${author}</p><br><br>`;