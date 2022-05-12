if(!localStorage.getItem('user_phone_number')){
    window.location.href = "http://localhost:8383/Afalagi/FrontEnd/index.html";
    // Simulate an HTTP redirect:
    window.location.replace("http://localhost:8383/Afalagi/FrontEnd/index.html");
}
const loader = document.getElementById('pre');
const account = document.getElementById('account');
let first_name = JSON.parse(window.localStorage.getItem('user_first_name'));
let last_name = JSON.parse(window.localStorage.getItem('user_last_name'));
const over_lay = document.getElementById('overlay');
const over_lay_section = document.getElementById('overlay_section');
const tefelagi_picture = document.getElementById('tefelagi_picture');
const tefelagi_full_name = document.getElementById('tefelagi_full_name');
const tefelagi_gender = document.getElementById('tefelagi_gender');
const tefelagi_used_place = document.getElementById('tefelagi_used_place');
const tefelagi_check_form = document.getElementById('tefelagi_check_form');
let tefelagi_phone_number = JSON.parse(window.localStorage.getItem('tefelagi_phone_number'));
account.textContent = first_name +" "+ last_name;
searchTefelagiByPhone(tefelagi_phone_number);

function searchTefelagiByPhone(phone_number) {
    let phone_form = document.createElement('form');
    let phone_input = document.createElement('input');
    phone_input.setAttribute('name','phone_number');
    phone_input.setAttribute('value',tefelagi_phone_number);
    phone_form.appendChild(phone_input);
    const phone_formData = new FormData(phone_form);
    fetch('http://localhost:8383/Afalagi/api/Tefelagi/searchByPhone.php', {
        method: 'POST',
        body: phone_formData
    }).then(function(response){
        return response.text();
    }).then(function(text){
        check(JSON.parse(text));
    });
}

function check(data) {
    if(data.status) {
        success(data);
    }
    else {
        unsuccess();
    }
}

function success(data){
    tefelagi_full_name.textContent = "Full name:  " + data.tefelagi.first_name + " " + data.tefelagi.father_name;
    tefelagi_gender.textContent = "Gender:  "+ data.tefelagi.gender;
    tefelagi_used_place.textContent = "Used place:  " + data.tefelagi.used_place;
    tefelagi_picture.setAttribute('src','http://localhost:8383/Afalagi/api/'+'uploads/'+data.tefelagi.picture);
}

function unsuccess() {
    alert("Something goes wrong!");
}

tefelagi_check_form.addEventListener('submit', async function (e) {
    e.preventDefault();
    hideOverlayForBrowse();
    enableLoader();
    let phone_number_input = document.createElement('input');
    phone_number_input.setAttribute('type','text');
    phone_number_input.setAttribute('name','phone_number');
    phone_number_input.setAttribute('value',JSON.parse(window.localStorage.getItem('tefelagi_phone_number')));
    this.appendChild(phone_number_input);
    const formData = new FormData(this);
    fetch('http://localhost:8383/Afalagi/api/Tefelagi/searchByCheck.php', {
        method: 'POST',
        body: formData
    }).then(function(response){
        return response.text();
    }).then(function(text){
        tefelagi_check(JSON.parse(text));
    });
});

function tefelagi_check(data) {
    if(data.status){
        window.localStorage.setItem('tefelagi_phone_number',JSON.stringify(data.tefelagi.phone_number));
        window.localStorage.setItem('tefelagi_first_name',JSON.stringify(data.tefelagi.first_name));
        window.localStorage.setItem('tefelagi_last_name',JSON.stringify(data.tefelagi.father_name));
        displayTefelagiDetail();
    }
    else {
        alert('The you enterd doesn\'t much with the tefelagi information!');
        // Simulate a mouse click:
     window.location.href = "http://localhost:8383/Afalagi/FrontEnd/tefelagi/home.html";
     // Simulate an HTTP redirect:
     window.location.replace("http://localhost:8383/Afalagi/FrontEnd/tefelagi/home.html");
    }
}

function displayTefelagiDetail() {
     // Simulate a mouse click:
     window.location.href = "http://localhost:8383/Afalagi/FrontEnd/tefelagi/tefelagi_detail_after_check.html";
     // Simulate an HTTP redirect:
     window.location.replace("http://localhost:8383/Afalagi/FrontEnd/tefelagi/tefelagi_detail_after_check.html");
}
function disableLoader(){
    loader.classList.remove('se-pre-con');
}
function enableLoader(){
    loader.classList.add('se-pre-con');
}

function logout() {
    window.localStorage.removeItem('user_phone_number');
    window.localStorage.removeItem('user_first_name');
    window.localStorage.removeItem('user_last_name');
    window.location.href = "http://localhost:8383/Afalagi/FrontEnd/index.html";
    // Simulate an HTTP redirect:
    window.location.replace("http://localhost:8383/Afalagi/FrontEnd/index.html");
}

function displayOverlayForBrowse(){
    over_lay.classList.add('overlay');
    over_lay.classList.remove('no_overlay');
}
function hideOverlayForBrowse(){
    over_lay.classList.remove('overlay');
    over_lay.classList.add('no_overlay');
}