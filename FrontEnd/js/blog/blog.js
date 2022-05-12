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
account.textContent = first_name +" "+ last_name;
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
    window.location.href = "http://localhost:8383/Afalagi/FrontEnd/blog/blog_detail.html";
    // Simulate an HTTP redirect:
    window.location.replace("http://localhost:8383/Afalagi/FrontEnd/blog/blog_detail.html");
}
function displayNoBlog(){
    let blog_div = document.getElementById('blog_div');
    let p1 = document.createElement('p');
    let p2 = document.createElement('p');
    p2.textContent = "NO Blog available";
    blog_div.appendChild(p1);
    blog_div.appendChild(p2);
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
    window.location.href = "http://localhost:8383/Afalagi/FrontEnd/index.html";
    // Simulate an HTTP redirect:
    window.location.replace("http://localhost:8383/Afalagi/FrontEnd/index.html");
}
