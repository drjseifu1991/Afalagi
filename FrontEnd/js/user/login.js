if(localStorage.getItem('user_phone_number')){
   success();
}
const thisForm = document.getElementById('myForm');
thisForm.addEventListener('submit', async function (e) {
    e.preventDefault();
    const formData = new FormData(this);
    //console.log(JSON.stringify(Object.fromEntries(formData)));
    fetch('http://localhost:8383/Afalagi/api/User/login.php', {
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
        window.localStorage.setItem('user_phone_number',JSON.stringify(data.user['phone_number']));
        window.localStorage.setItem('user_first_name',JSON.stringify(data.user['first_name']));
        window.localStorage.setItem('user_last_name',JSON.stringify(data.user['last_name']));
        window.localStorage.setItem('user_town',JSON.stringify(data.user['town']));
        success();
    }
    else {
        unsuccess();
    }
}
function success() {
     // Simulate a mouse click:
     window.location.href = "http://localhost:8383/Afalagi/FrontEnd/tefelagi/home.html";
     // Simulate an HTTP redirect:
     window.location.replace("http://localhost:8383/Afalagi/FrontEnd/tefelagi/home.html");
}
function unsuccess() {
    alert("Phone number or Password Incorrect please try again");
}

