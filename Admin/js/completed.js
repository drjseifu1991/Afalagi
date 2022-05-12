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
fetchCompleted();

function fetchCompleted(){
    fetch('http://localhost:8383/Afalagi/api/Completed/getAll.php', {
        method: 'POST'
    }).then(function(response){
        return response.text();
    }).then(function(text){
        check(JSON.parse(text));
    });
}

function check(data) {
    if(data.status){
        displayCompleted(data);
}
    else{
        displayNoCompleted();
    }
}

function displayCompleted(data){
    let table = document.getElementById('table');
    let i = 1;
    data.completed.forEach(function(completedItem){
        let tr = document.createElement('tr');
        let user_first_name = document.createElement('td');
        let user_last_name = document.createElement('td');
        let user_phone_number = document.createElement('td');
        let tefelagi_first_name = document.createElement('td');
        let tefelagi_last_name = document.createElement('td');
        let tefelagi_phone_number = document.createElement('td');
        let no = document.createElement('td');
        tr.appendChild(no);
        tr.appendChild(user_first_name);
        tr.appendChild(user_last_name);
        tr.appendChild(user_phone_number);
        tr.appendChild(tefelagi_first_name);
        tr.appendChild(tefelagi_last_name);
        tr.appendChild(tefelagi_phone_number);
        table.appendChild(tr);
        user_first_name.textContent = completedItem['user_first_name'];
        user_last_name.textContent = completedItem['user_last_name'];
        user_phone_number.textContent = completedItem['user_phone_number'];
        tefelagi_first_name.textContent = completedItem['tefelagi_first_name'];
        tefelagi_last_name.textContent = completedItem['tefelagi_last_name'];
        tefelagi_phone_number.textContent = completedItem['tefelagi_phone_number'];
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

