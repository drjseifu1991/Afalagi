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
fetchBlog();

function fetchBlog(){
    fetch('http://localhost:8383/Afalagi/api/Blog/getAll_blog.php', {
        method: 'POST'
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
    let blog_div = document.getElementById('blog_div');
    data.blog.forEach(function(blogItem){
        let article = document.createElement('article');
        //article.setAttribute("onclick",tefelagi_detail(tefelagiItem['phone_number']));
        let img = document.createElement('img');
        img.id = "blog_image";
        img.setAttribute('src','http://localhost:8383/Afalagi/api/'+'BlogImages/'+blogItem['blog_image']);
        let title_time = document.createElement('aside');
        let title = document.createElement('p');
        title.id = "blog_title";
        let blog_date = document.createElement('p');
        blog_date.id = "blog_date";
        title.textContent = blogItem['blog_title'];
        blog_date.textContent = blogItem['time'];
        article.appendChild(img);
        article.appendChild(title_time);
        title_time.appendChild(title);
        title_time.appendChild(blog_date);
        blog_div.appendChild(article);
        article.addEventListener('click', function(){
        blog_detail(blogItem['id']);
    });
                          });
    disableLoader();
    
}
function blog_detail(id) {
    window.localStorage.setItem('blog_id',JSON.stringify(id));
    window.location.href = "http://localhost:8383/Afalagi/Admin/blog_detail.html";
    // Simulate an HTTP redirect:
    window.location.replace("http://localhost:8383/Afalagi/Admin/blog_detail.html");
}
function displayNoBlog(){
    console.log('some thing wrong');
    disableLoader();
    
}
function disableLoader(){
    loader.classList.remove('se-pre-con');
}
function enableLoader(){
    loader.classList.add('se-pre-con');
}


function addBlog() {
      // Simulate a mouse click:
     window.location.href = "http://localhost:8383/Afalagi/Admin/add_blog.html";
     // Simulate an HTTP redirect:
     window.location.replace("http://localhost:8383/Afalagi/Admin/add_blog.html");
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
