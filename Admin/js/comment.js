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
fetchComment();

function fetchComment(){
    fetch('http://localhost:8383/Afalagi/api/Comment/get.php', {
        method: 'POST'
    }).then(function(response){
        return response.text();
    }).then(function(text){
        check(JSON.parse(text));
    });
}

function check(data) {
    if(data.status){
        displayComment(data);
}
    else{
        displayNoComment();
    }
}

function displayComment(data){
    let comments = document.getElementById('comments');
    data.comment.forEach(function(commentItem){
        let comment_replay = document.createElement('div');
        comment_replay.id = 'comment_replay';
        let comment = document.createElement('div');
        comment.id = "comment";
        let comment_user = document.createElement('p');
        let comment_time = document.createElement('p');
        comment_user.id = "comment_user";
        comment_time.id = "comment_time";
        let comment_message = document.createElement('p');
        comment_message.id = "comment_message";
        let add_replay_button = document.createElement('button');
        add_replay_button.id = 'add_replay';
        add_replay_button.textContent = 'Write Replay';
        comment.appendChild(comment_user);
        comment.appendChild(comment_time);
        comment.appendChild(comment_message);
        comment.appendChild(add_replay_button);
        comment_replay.appendChild(comment);
        comment_user.textContent = commentItem['user_first_name'] +" " + commentItem['user_last_name'];
        comment_time.textContent = commentItem['comment_time'];
        comment_message.textContent = commentItem['comment_message'];
        add_replay_button.addEventListener('click', function(){
        enableOverlay(commentItem['comment_id']);
    });
        let comment_id_form = document.createElement('form');
        let comment_id_input = document.createElement('input');
        comment_id_input.setAttribute('name','comment_id');
        comment_id_input.setAttribute('value',commentItem['comment_id']);
        comment_id_form.appendChild(comment_id_input);
        const comment_id_formData = new FormData(comment_id_form);
        fetch('http://localhost:8383/Afalagi/api/Replay/get.php', {
           method: 'POST',
           body: comment_id_formData
        }).then(function(response){
            return response.text();
        }).then(function(text){
           if(JSON.parse(text).status){
            JSON.parse(text).replay.forEach(function(replayItem){
                let replay = document.createElement('div');
                replay.id = "replay";
                let replay_user = document.createElement('p');
                let replay_time = document.createElement('p');
                replay_user.id = "replay_user";
                replay_time.id = "replay_time";
                let replay_message = document.createElement('p');
                replay_message.id = "replay_message";
                replay.appendChild(replay_user);
                replay.appendChild(replay_time);
                replay.appendChild(replay_message);
                replay_user.textContent = replayItem['admin'] +" "+"  \(user admin\)";
                replay_time.textContent = replayItem['time'];
                replay_message.textContent = replayItem['message'];
                comment_replay.appendChild(replay);
                
            })
           }
        });
    
        comments.appendChild(comment_replay);
    });
    disableLoader();
    
}
function displayNoComment(){
    disableLoader();
}
function disableLoader(){
    loader.classList.remove('se-pre-con');
}
function enableLoader(){
    loader.classList.add('se-pre-con');
}
function disableOverlay(){
    let overlay = document.getElementById("overlay");
    overlay.classList.remove('overlay');
}
function enableOverlay(comment_id){
    let overlay = document.getElementById("overlay");
    overlay.innerHTML = '';
    let overlay_section = document.createElement('div');
    overlay_section.id = 'overlay_section';
    let form = document.createElement('form');
    form.id = 'add_replay';
    let message_input = document.createElement('textarea');
    message_input.setAttribute('name','replay_message');
    message_input.classList.add('space');
    message_input.setAttribute('placeholder','please write your message here!');
    message_input.setAttribute('cols','50');
    message_input.setAttribute('rows','15');
    let submit_replay = document.createElement('input');
    submit_replay.setAttribute('type','submit');
    submit_replay.setAttribute('value','SUBMIT');
    submit_replay.classList.add('space');
    form.appendChild(message_input);
    form.appendChild(submit_replay);
    overlay_section.appendChild(form);
    overlay.appendChild(overlay_section);
    overlay.classList.add('overlay');
    form.addEventListener('submit', async function (e) {
        disableOverlay();
        enableLoader();
        e.preventDefault();
        let admin_input = document.createElement('input');
        admin_input.setAttribute('type','text');
        admin_input.setAttribute('name','admin');
        admin_input.setAttribute('value',JSON.parse(window.localStorage.getItem('admin_first_name'))+" "+JSON.parse(window.localStorage.getItem('admin_last_name')));
        let time_input = document.createElement('input');
        time_input.setAttribute('type','text');
        time_input.setAttribute('name','replay_time');
        time_input.setAttribute('value',new Date());
        let comment_input = document.createElement('input');
        comment_input.setAttribute('type','text');
        comment_input.setAttribute('name','comment_id');
        comment_input.setAttribute('value',comment_id);
        this.appendChild(time_input);
        this.appendChild(admin_input);
        this.appendChild(comment_input);
        const formData = new FormData(this);
        fetch('http://localhost:8383/Afalagi/api/Replay/add.php', {
            method: 'POST',
            body: formData
        }).then(function(response){
            return response.text();
        }).then(function(text){
           checkAddReplay(JSON.parse(text));
        });
    });

}
function checkAddReplay(data) {
     if(data.status){
         disableLoader();
        alert('Replay added successfully');
         
        location.reload();
}
    else{
        disableLoader();
        alert('Something goes wrong');
        location.reload();
    }
}

function addReplay(comment_id) {
      enableOverlay(comment_id);
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
