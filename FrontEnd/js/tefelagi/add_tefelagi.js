if(!localStorage.getItem('user_phone_number')){
    window.location.href = "http://localhost:8383/Afalagi/FrontEnd/index.html";
    // Simulate an HTTP redirect:
    window.location.replace("http://localhost:8383/Afalagi/FrontEnd/index.html");
}
const thisForm = document.getElementById('add_form');
const loader = document.getElementById('pre');
const account = document.getElementById('account');
let first_name = JSON.parse(window.localStorage.getItem('user_first_name'));
let last_name = JSON.parse(window.localStorage.getItem('user_last_name'));
account.textContent = first_name +" "+ last_name;
thisForm.addEventListener('submit', async function (e) {
    enableLoader();
    var user =document.createElement("input");
    user.setAttribute("name","user");
    user.id = 'tefelagi_user';
    user.setAttribute("value",JSON.parse(window.localStorage.getItem("user_phone_number")));
    var source = document.createElement("input");
    source.setAttribute("name","source");
    source.id = "source";
    source.setAttribute("value","web");
    thisForm.appendChild(user);
    thisForm.appendChild(source);
    e.preventDefault();
    const formData = new FormData(this);
    fetch('http://localhost:8383/Afalagi/api/Tefelagi/signup.php', {
        method: 'POST',
        body: formData
    }).then(function(response){
        return response.text();
    }).then(function(text){
        check(JSON.parse(text));
    });
});

function disableLoader(){
    loader.classList.remove('se-pre-con');
}
function enableLoader(){
    loader.classList.add('se-pre-con');
}

function check(data) {
    if(data.status) {
        success();
    }
    else {
        unsuccess();
    }
}
function success() {
    alert('Tefelagi posted successfully');
     // Simulate a mouse click:
     window.location.href = "http://localhost:8383/Afalagi/FrontEnd/tefelagi/my_tefelagi.html";
     // Simulate an HTTP redirect:
     window.location.replace("http://localhost:8383/Afalagi/FrontEnd/tefelagi/my_tefelagi.html");
}
function unsuccess() {
    alert("something wrong");
    let tefelagi_user = document.getElementById('tefelagi_user');
    let source = document.getElementById('source');
    thisForm.removeChild(tefelagi_user);
    thisForm.removeChild(source);
    disableLoader();
}
function displayOverlayForBrowse(){
    over_lay.classList.add('overlay');
    over_lay.classList.remove('no_overlay');
}
function hideOverlayForBrowse(){
    over_lay.classList.remove('overlay');
    over_lay.classList.add('no_overlay');
}