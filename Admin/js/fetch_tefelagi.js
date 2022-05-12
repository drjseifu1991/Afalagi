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
fetchTefelagi();

function fetchTefelagi(){
    fetch('http://localhost:8383/Afalagi/api/Tefelagi/getAll.php', {
        method: 'POST'
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
    let table = document.getElementById('table');
    let i = 1;
    data.tefelagi.forEach(function(tefelagiItem){
        let tr = document.createElement('tr');
        let first_name = document.createElement('td');
        let last_name = document.createElement('td');
        let grand_father = document.createElement('td');
        let gender = document.createElement('td');
        let phone_number = document.createElement('td');
        let used_place = document.createElement('td');
        let birth_place = document.createElement('td');
        let current_place = document.createElement('td');
        let no = document.createElement('td');
        tr.appendChild(no);
        tr.appendChild(first_name);
        tr.appendChild(last_name);
        tr.appendChild(grand_father);
        tr.appendChild(gender);
        tr.appendChild(phone_number);
        tr.appendChild(used_place);
        tr.appendChild(birth_place);
        tr.appendChild(current_place);
        table.appendChild(tr);
        first_name.textContent = tefelagiItem['first_name'];
        last_name.textContent = tefelagiItem['father_name'];
        grand_father.textContent = tefelagiItem['grand_father'];
        gender.textContent = tefelagiItem['gender'];
        phone_number.textContent = tefelagiItem['phone_number'];
        used_place.textContent = tefelagiItem['used_place'];
        birth_place.textContent = tefelagiItem['birth_place'];
        current_place.textContent = tefelagiItem['current_place'];
        no.textContent = i;
        i++;
    });
    disableLoader();
    
}

function displayNoTefelagi(){
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

