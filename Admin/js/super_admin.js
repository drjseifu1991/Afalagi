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
fetchAdmins();

function fetchAdmins(){
    fetch('http://localhost:8383/Afalagi/api/Admin/getAll.php', {
        method: 'POST'
    }).then(function(response){
        return response.text();
    }).then(function(text){
        check(JSON.parse(text));
    });
}

function check(data) {
    if(data.status){
        displayAdmin(data);
}
    else{
        displayNoAdmin();
    }
}

function displayAdmin(data){
    let table = document.getElementById('table');
    let i = 1;
    data.admin.forEach(function(adminItem){
        let tr = document.createElement('tr');
        let first_name = document.createElement('td');
        let last_name = document.createElement('td');
        let gender = document.createElement('td');
        let phone_number = document.createElement('td');
        let role = document.createElement('td');
        let password = document.createElement('td');
        let action = document.createElement('td');
        let no = document.createElement('td');
        let delete_button = document.createElement('button');
        delete_button.classList.add('table_button');
        tr.appendChild(no);
        tr.appendChild(first_name);
        tr.appendChild(last_name);
        tr.appendChild(gender);
        tr.appendChild(phone_number);
        tr.appendChild(role);
        tr.appendChild(password);
        tr.appendChild(action);
        action.appendChild(delete_button);
        table.appendChild(tr);
        first_name.textContent = adminItem['first_name'];
        last_name.textContent = adminItem['last_name'];
        gender.textContent = adminItem['gender'];
        phone_number.textContent = adminItem['phone_number'];
        role.textContent = adminItem['role'];
        password.textContent = adminItem['password'];
        delete_button.textContent = "DELETE";
        no.textContent = i;
        i++;
          delete_button.addEventListener('click', function(){
        deleteAdmin(adminItem['phone_number']);
    });
        
    });
    disableLoader();
    
}

function displayNoAdmin(){
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

function addAdmin() {
     // Simulate a mouse click:
     window.location.href = "http://localhost:8383/Afalagi/Admin/add_admin.html";
     // Simulate an HTTP redirect:
     window.location.replace("http://localhost:8383/Afalagi/Admin/add_admin.html");
}

function deleteAdmin(phone) {
    let deleteform = document.createElement('form');
    let phone_input = document.createElement('input');
    phone_input.setAttribute('name','phone_number');
    phone_input.setAttribute('value',phone);
    deleteform.appendChild(phone_input);
    let deleteformData = new FormData(deleteform);
    fetch('http://localhost:8383/Afalagi/api/Admin/delete.php',{
        method: "POST",
        body: deleteformData
    }).then(function(response){
        return response.text();
    }).then(function(text){
        //console.log(JSON.parse(text));
        window.location.reload();
    });
}
