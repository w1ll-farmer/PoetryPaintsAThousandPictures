async function saveData() {
    // Get the poem and author from the form
    const poem = document.querySelector("textarea[name='poem']").value;
    const author = document.querySelector("input[name='author']").value;
  
    // Create a data object to hold the form data
    const data = { poem, author };
  
    // Convert the data object to a JSON string
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
  
  const form = document.querySelector("#write-form");
  form.addEventListener("submit", x => {
    x.preventDefault();
    saveData();
    document.getElementById("write-form").reset();
  });
  