if(!localStorage.getItem('admin_phone_number')){
    window.location.href = "http://localhost:8383/Afalagi/Admin/login.html";
    // Simulate an HTTP redirect:
    window.location.replace("http://localhost:8383/Afalagi/Admin/login.html");
}
const loader = document.getElementById('pre');
const account = document.getElementById('account');
const role = document.getElementById('role');
let first_name = JSON.parse(window.localStorage.getItem('admin_first_name'));
let last_name = JSON.parse(window.localStorage.getItem('admin_last_name'));
let admin_role = JSON.parse(localStorage.getItem('admin_role'));
account.textContent = first_name +" "+ last_name;
role.textContent = admin_role;

enableLoader();
fetchUser();

function fetchUser(){
    fetch('http://localhost:8383/Afalagi/api/User/getAll.php', {
        method: 'POST'
    }).then(function(response){
        return response.text();
    }).then(function(text){
        check(JSON.parse(text));
    });
}

function check(data) {
    if(data.status){
        displayUser(data);
}
    else{
        displayNoUser();
    }
}

function displayUser(data){
    let table = document.getElementById('table');
    let i = 1;
    data.user.forEach(function(userItem){
        let tr = document.createElement('tr');
        let first_name = document.createElement('td');
        let last_name = document.createElement('td');
        let gender = document.createElement('td');
        let phone_number = document.createElement('td');
        let region = document.createElement('td');
        let zone = document.createElement('td');
        let woreda = document.createElement('td');
        let town = document.createElement('td');
        let no = document.createElement('td');
        tr.appendChild(no);
        tr.appendChild(first_name);
        tr.appendChild(last_name);
        tr.appendChild(gender);
        tr.appendChild(phone_number);
        tr.appendChild(region);
        tr.appendChild(zone);
        tr.appendChild(woreda);
        tr.appendChild(town);
        table.appendChild(tr);
        first_name.textContent = userItem['first_name'];
        last_name.textContent = userItem['last_name'];
        gender.textContent = userItem['gender'];
        phone_number.textContent = userItem['phone_number'];
        region.textContent = userItem['region'];
        zone.textContent = userItem['zone'];
        woreda.textContent = userItem['woreda'];
        town.textContent = userItem['town'];
        no.textContent = i;
        i++;
    });
    disableLoader();
    
}

function displayNoCompleted(){
    console.log('some thing wrong');
    disableLoader();
    
}
function disableLoader(){
    loader.classList.remove('se-pre-con');
}
function enableLoader(){
    loader.classList.add('se-pre-con');
}

function logout() {
    window.localStorage.removeItem('admin_phone_number');
    window.localStorage.removeItem('admin_first_name');
    window.localStorage.removeItem('admin_last_name');
    window.localStorage.removeItem('admin_role');
    window.location.href = "http://localhost:8383/Afalagi/Admin/login.html";
    // Simulate an HTTP redirect:
    window.location.replace("http://localhost:8383/Afalagi/Admin/login.html");
}

