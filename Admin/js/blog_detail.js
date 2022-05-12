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
const blog_image = document.getElementById('blog_image');
const blog_title = document.getElementById('blog_title');
const blog_time = document.getElementById('blog_time');
const blog_desc = document.getElementById('desc');
let blog_id = JSON.parse(window.localStorage.getItem('blog_id'));
enableLoader();
fetchBlogById();

function fetchBlogById(){
    let id_form = document.createElement('form');
    let id_input = document.createElement('input');
    id_input.setAttribute('name','id');
    id_input.setAttribute('value',blog_id);
    id_form.appendChild(id_input);
    const id_formData = new FormData(id_form);
    fetch('http://localhost:8383/Afalagi/api/Blog/getBlog_byId.php', {
        method: 'POST',
        body: id_formData
    }).then(function(response){
        return response.text();
    }).then(function(text){
        check(JSON.parse(text));
    });
}

function check(data) {
    if(data.status){
        displayBlog(data);
}
    else{
        displayNoBlog();
    }
}

function displayBlog(data){
    blog_title.textContent = data.blog.blog_title;
    blog_time.textContent = data.blog.time;
    blog_desc.textContent = data.blog.blog_detail;
    blog_image.setAttribute('src','http://localhost:8383/Afalagi/api/'+'BlogImages/'+data.blog.blog_image);
    disableLoader();  
}
function displayNoBlog() {
    
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
    window.location.href = "http://localhost:8383/Afalagi/FrontEnd/index.html";
    // Simulate an HTTP redirect:
    window.location.replace("http://localhost:8383/Afalagi/FrontEnd/index.html");
}