const endpontRoot = 'http://127.0.0.1:8090/';
async function addPoems(){
    const writeForm = document.getElementById('write-form');
    writeForm.addEventListener('submit', async function (event){
        event.preventDefault();

        const data = new FormData(writeForm);
/*JSON conversion from https://stackoverflow.com/questions/41431322/how-to-convert-formdata-html5-object-to-json */
        const dataJSON = JSON.stringify(Object.fromEntries(data));

        const response = await fetch()
    })
}