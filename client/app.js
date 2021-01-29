const form = document.querySelector('form');
const searchinput = document.querySelector('input').value;
const BASE_URL ='http://localhost:3000/search/' 


form.addEventListener('submit',formSubmitted);

function formSubmitted(event) {
    event.preventDefault();

    console.log('form submitted');
    console.log(searchinput);
    getsearchresut(searchinput);
}

function getsearchresut(searchterm){
    return fetch(`${BASE_URL}${searchinput}`)
    .then(res =>res.json())
    .then(results => {
        console.log(results);
    });
}