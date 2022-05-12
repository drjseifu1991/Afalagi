if(!localStorage.getItem('user_phone_number')){
    window.location.href = "http://localhost:8383/Afalagi/FrontEnd/index.html";
    // Simulate an HTTP redirect:
    window.location.replace("http://localhost:8383/Afalagi/FrontEnd/index.html");
}
const loader = document.getElementById('pre');
const account = document.getElementById('account');
const over_lay = document.getElementById('overlay');
const over_lay_section = document.getElementById('overlay_section');
let first_name = JSON.parse(window.localStorage.getItem('user_first_name'));
let last_name = JSON.parse(window.localStorage.getItem('user_last_name'));
let user_phone_number = JSON.parse(window.localStorage.getItem('user_phone_number'));
let town = JSON.parse(window.localStorage.getItem('user_town'));
account.textContent = first_name +" "+ last_name;
enableLoader();
fetchTefelagi();

function fetchTefelagi(){
    let form = document.createElement('form');
    let user_input = document.createElement('input');
    user_input.setAttribute('type','text');
    user_input.setAttribute('name','user');
    user_input.setAttribute('value',user_phone_number);
    form.appendChild(user_input);
    let formData = new FormData(form);
    fetch('http://localhost:8383/Afalagi/api/Tefelagi/my_tefelagi.php', {
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
    let main = document.getElementById('main');
    data.tefelagi.forEach(function(tefelagiItem){
        let article = document.createElement('article');
        let img_aside = document.createElement('aside');
        let img = document.createElement('img');
        img.setAttribute('src','http://localhost:8383/Afalagi/api/'+'uploads/'+tefelagiItem['picture']);
        let name_aside = document.createElement('aside');
        name_aside.classList.add('name_place');
        let name = document.createElement('h4');
        let place = document.createElement('h5');
        name.textContent = tefelagiItem['first_name'] + " " + tefelagiItem['father_name'];
        place.textContent = tefelagiItem['current_place'];
        img_aside.appendChild(img);
        name_aside.appendChild(name);
        name_aside.appendChild(place);
        article.appendChild(img_aside);
        article.appendChild(name_aside);
        main.appendChild(article);
                          });
    disableLoader();
    
}

function displayNoTefelagi(){
    let main = document.getElementById('main');
    let p1 = document.createElement('p');
    let p2 = document.createElement('p');
    p2.textContent = "No Tefelagi";
    main.appendChild(p1);
    main.appendChild(p2);
    disableLoader();
    
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
    window.localStorage.removeItem('user_town');
    window.location.href = "http://localhost:8383/Afalagi/FrontEnd/index.html";
    // Simulate an HTTP redirect:
    window.location.replace("http://localhost:8383/Afalagi/FrontEnd/index.html");
}
