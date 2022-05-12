if(!localStorage.getItem('admin_phone_number')){
    window.location.href = "http://localhost:8383/Afalagi/Admin/login.html";
    // Simulate an HTTP redirect:
    window.location.replace("http://localhost:8383/Afalagi/Admin/login.html");
}
const thisForm = document.getElementById('add_admin');
const loader = document.getElementById('pre');

fetchAdmin();

function fetchAdmin(){
    fetch('http://localhost:8383/Afalagi/api/Admin/getAll.php', {
        method: 'POST'
    }).then(function(response){
        return response.text();
    }).then(function(text){
        checkAdmin(JSON.parse(text));
    });
}

function checkAdmin(data) {
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
        let edit = document.createElement('button');
        let delete_button = document.createElement('button');
        edit.classList.add('table_button');
        delete_button.classList.add('table_button');
        tr.appendChild(no);
        tr.appendChild(first_name);
        tr.appendChild(last_name);
        tr.appendChild(gender);
        tr.appendChild(phone_number);
        tr.appendChild(role);
        tr.appendChild(password);
        tr.appendChild(action);
        action.appendChild(edit);
        action.appendChild(delete_button);
        table.appendChild(tr);
        first_name.textContent = adminItem['first_name'];
        last_name.textContent = adminItem['last_name'];
        gender.textContent = adminItem['gender'];
        phone_number.textContent = adminItem['phone_number'];
        role.textContent = adminItem['role'];
        password.textContent = adminItem['password'];
        edit.textContent = "EDIT";
        delete_button.textContent = "DELETE";
        no.textContent = i;
        i++;
    });
}
function displayNoAdmin(){
    console.log('some thing wrong');
    disableLoader();
    
}
    
thisForm.addEventListener('submit', async function (e) {
    enableLoader();
    e.preventDefault();
    const formData = new FormData(this);
    //console.log(JSON.stringify(Object.fromEntries(formData)));
    fetch('http://localhost:8383/Afalagi/api/Admin/signup.php', {
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
     // Simulate a mouse click:
     window.location.href = "http://localhost:8383/Afalagi/Admin/super_admin.html";
     // Simulate an HTTP redirect:
     window.location.replace("http://localhost:8383/Afalagi/Admin/super_admin.html");
}
function unsuccess() {
    alert("something wrong");
}
function displayOverlayForAdd(){
    over_lay.classList.add('overlay');
    over_lay.classList.remove('no_overlay');
}
function hideOverlayForAdd(){
    over_lay.classList.remove('overlay');
    over_lay.classList.add('no_overlay');
}