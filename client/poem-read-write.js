async function saveData() { //writes and saves data to JSON
    // Assigns poem and author to variables
    const poem = document.querySelector("textarea[name='poem']").value;
    const author = document.querySelector("input[name='author']").value;
  
    // Create a data object to hold the form data
    const data = { poem, author };
  
    // Convert the data object to a string using stringify()
    const jsonData = JSON.stringify(data);
  
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
  