if(localStorage.getItem('admin_phone_number')){
   success(JSON.parse(localStorage.getItem('admin_role')));
}
const thisForm = document.getElementById('myForm');
thisForm.addEventListener('submit', async function (e) {
    e.preventDefault();
    const formData = new FormData(this);
    //console.log(JSON.stringify(Object.fromEntries(formData)));
    fetch('http://localhost:8383/Afalagi/api/Admin/login.php', {
        method: 'POST',
        body: formData
    }).then(function(response){
        return response.text();
    }).then(function(text){
        check(JSON.parse(text));
    });
});

function check(data) {
    if(data.status) {
        console.log(data);
        window.localStorage.setItem('admin_phone_number',JSON.stringify(data.admin['phone_number']));
        window.localStorage.setItem('admin_first_name',JSON.stringify(data.admin['first_name']));
        window.localStorage.setItem('admin_last_name',JSON.stringify(data.admin['last_name']));
        window.localStorage.setItem('admin_role',JSON.stringify(data.admin['role']));
        success(data.admin['role']);
    }
    else {
        unsuccess();
    }
}
function success(role) {
     // Simulate a mouse click:
    if(role === "Super admin"){
        window.location.href = "http://localhost:8383/Afalagi/Admin/super_admin.html";
     // Simulate an HTTP redirect:
     window.location.replace("http://localhost:8383/Afalagi/Admin/super_admin.html");
    }
    else if(role === "Blog admin"){
        window.location.href = "http://localhost:8383/Afalagi/Admin/blog_admin.html";
     // Simulate an HTTP redirect:
     window.location.replace("http://localhost:8383/Afalagi/Admin/blog_admin.html");
    }
    else {
        window.location.href = "http://localhost:8383/Afalagi/Admin/user_admin.html";
     // Simulate an HTTP redirect:
     window.location.replace("http://localhost:8383/Afalagi/Admin/user_admin.html");
    }
}
function unsuccess() {
    alert("Phone number or Password Incorrect please try again");
}

