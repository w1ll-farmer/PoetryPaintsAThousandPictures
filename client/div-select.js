function switchDiv (divClass) { // switches 'visible' divs
    checkServer();
    const divs = document.getElementsByTagName('div');
    for (let i = 0; i < divs.length; i++) { // makes all divs hidden
        divs[i].classList.add('hidden');
    }

    const elements = document.getElementsByClassName(divClass);
    // unhides all divs within a specific class
    for (let i = 0; i < elements.length; i++) {
        elements[i].classList.remove('hidden');
}
}
// makes it so intro-page is the only div shown when DOM content
// has loaded
function showModal () {
    const modal = document.createElement('div');
          modal.innerHTML = `
            <div id="server-down-modal" class="modal">
              <div class="modal-content">
                <p>Sorry, the server is currently down. Please try again later.</p>
                <button id="close-modal-btn" class="btn">Close</button>
              </div>
            </div>
          `;
          document.body.appendChild(modal);
          // show modal
          document.getElementById('server-down-modal').style.display = 'block';
          // hide modal when close button is clicked
          document.getElementById('close-modal-btn').addEventListener('click', () => {
            document.getElementById('server-down-modal').style.display = 'none';
          });
        }
    function checkServer () {
      fetch('http://127.0.0.1:8090')
        .then(response => {
          if (!response.ok) {
            throw new Error('Server is down');
          }
          console.log('Server is up and running');
        })
        .catch(error => {
          console.error(error);
          // display modal
          showModal();
      });
      setTimeout(checkServer, 3000);
    }
window.addEventListener('DOMContentLoaded', function () {
    checkServer();
    switchDiv('intro-page');
});
