if(!localStorage.getItem('user_phone_number')){
    window.location.href = "http://localhost:8383/Afalagi/FrontEnd/index.html";
    // Simulate an HTTP redirect:
    window.location.replace("http://localhost:8383/Afalagi/FrontEnd/index.html");
}
const loader = document.getElementById('pre');
const account = document.getElementById('account');
let first_name = JSON.parse(window.localStorage.getItem('user_first_name'));
let last_name = JSON.parse(window.localStorage.getItem('user_last_name'));
let town = JSON.parse(window.localStorage.getItem('user_town'));
account.textContent = first_name +" "+ last_name;
enableLoader();
fetchTefelagi();

function fetchTefelagi(){
    let form = document.createElement('form');
    let phone_input = document.createElement('input');
    phone_input.setAttribute('name','phone_number');
    phone_input.setAttribute('type','text');
    phone_input.setAttribute('value',JSON.parse(window.localStorage.getItem('tefelagi_phone_number')));
    form.appendChild(phone_input);
    let formData = new FormData(form);
    fetch('http://localhost:8383/Afalagi/api/Tefelagi/searchByPhone.php', {
        method: 'POST',
        body: formData
    }).then(function(response){
        return response.text();
    }).then(function(text){
        check(JSON.parse(text));
    });
}

function check(data) {
    if(data.status){
        displayTefelagi(data);
}
    else{
        displayNoTefelagi();
    }
}

function displayTefelagi(data){
    let img = document.getElementById('tefelagi_picture');
    let full_name = document.getElementById('full_name');
    let grand_father = document.getElementById('grand_father');
    let mother_name = document.getElementById('mother_name');
    let brother_name = document.getElementById('brother_name');
    let sister_name = document.getElementById('sister_name');
    let uncle_name = document.getElementById('uncle_name');
    let aunt_name = document.getElementById('aunt_name');
    let gender = document.getElementById('gender');
    let birth_date = document.getElementById('birth_date');
    let phone_number = document.getElementById('phone_number');
    let birth_place = document.getElementById('birth_place');
    let used_place = document.getElementById('used_place');
    let current_place = document.getElementById('curent_place');
    let biography = document.getElementById('biography');
    img.setAttribute('src','http://localhost:8383/Afalagi/api/'+'uploads/'+data.tefelagi.picture);
    full_name.textContent = data.tefelagi.first_name+" "+data.tefelagi.father_name;
    grand_father.textContent = data.tefelagi.grand_father;
    mother_name.textContent = data.tefelagi.mother_name;
    brother_name.textContent = data.tefelagi.brother_name;
    sister_name.textContent = data.tefelagi.sister_name;
    uncle_name.textContent = data.tefelagi.uncle_name;
    aunt_name.textContent = data.tefelagi.aunt_name;
    gender.textContent = data.tefelagi.gender;
    birth_date.textContent = data.tefelagi.birth_date;
    phone_number.textContent = data.tefelagi.phone_number;
    birth_place.textContent = data.tefelagi.birth_place;
    used_place.textContent = data.tefelagi.used_place;
    current_place.textContent = data.tefelagi.current_place;
    biography.textContent = data.tefelagi.biography;
    disableLoader();
    
}

function disableLoader(){
    loader.classList.remove('se-pre-con');
}
function enableLoader(){
    loader.classList.add('se-pre-con');
}

function yes(){
    let completed_form = document.createElement('form');
    let user_first_name = document.createElement('input');
    user_first_name.setAttribute('name','user_first_name');
    user_first_name.setAttribute('type','text');
    user_first_name.setAttribute('value',JSON.parse(localStorage.getItem('user_first_name')));
    let user_last_name = document.createElement('input');
    user_last_name.setAttribute('name','user_last_name');
    user_last_name.setAttribute('type','text');
    user_last_name.setAttribute('value',JSON.parse(localStorage.getItem('user_last_name')));
    let user_phone_number = document.createElement('input');
    user_phone_number.setAttribute('name','user_phone_number');
    user_phone_number.setAttribute('type','text');
    user_phone_number.setAttribute('value',JSON.parse(localStorage.getItem('user_phone_number')));
    let tefelagi_first_name = document.createElement('input');
    tefelagi_first_name.setAttribute('name','tefelagi_first_name');
    tefelagi_first_name.setAttribute('type','text');
    tefelagi_first_name.setAttribute('value',JSON.parse(localStorage.getItem('tefelagi_first_name')));
    let tefelagi_last_name = document.createElement('input');
    tefelagi_last_name.setAttribute('name','tefelagi_last_name');
    tefelagi_last_name.setAttribute('type','text');
    tefelagi_last_name.setAttribute('value',JSON.parse(localStorage.getItem('tefelagi_last_name')));
    let tefelagi_phone_number = document.createElement('input');
    tefelagi_phone_number.setAttribute('name','tefelagi_phone_number');
    tefelagi_phone_number.setAttribute('type','text');
    tefelagi_phone_number.setAttribute('value',JSON.parse(localStorage.getItem('tefelagi_phone_number')));
    completed_form.appendChild(user_first_name);
    completed_form.appendChild(user_last_name);
    completed_form.appendChild(user_phone_number);
    completed_form.appendChild(tefelagi_first_name);
    completed_form.appendChild(tefelagi_last_name);
    completed_form.appendChild(tefelagi_phone_number);
    let completed_formData = new FormData(completed_form);
    fetch('http://localhost:8383/Afalagi/api/Completed/add.php', {
        method: 'POST',
        body: completed_formData
    }).then(function(response){
        return response.text();
    }).then(function(text){
        console.log(JSON.parse(text));
    }); 
    alert('Thank you for for your answer!')
     // Simulate a mouse click:
     window.location.href = "http://localhost:8383/Afalagi/FrontEnd/tefelagi/home.html";
     // Simulate an HTTP redirect:
     window.location.replace("http://localhost:8383/Afalagi/FrontEnd/tefelagi/home.html");
}
function no(){
       // Simulate a mouse click:
     window.location.href = "http://localhost:8383/Afalagi/FrontEnd/tefelagi/home.html";
     // Simulate an HTTP redirect:
     window.location.replace("http://localhost:8383/Afalagi/FrontEnd/tefelagi/home.html");
}