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
        comment.appendChild(comment_user);
        comment.appendChild(comment_time);
        comment.appendChild(comment_message);
        comment_replay.appendChild(comment);
        comment_user.textContent = commentItem['user_first_name'] +" " + commentItem['user_last_name'];
        comment_time.textContent = commentItem['comment_time'];
        comment_message.textContent = commentItem['comment_message'];
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
                replay_user.textContent = replayItem['admin'] +" "+"  \(user admin\)"
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
    let comments = document.getElementById('comments');
    let p1 = document.createElement('p');
    let p2 = document.createElement('p');
    p2.textContent = "NO Comment available";
    comments.appendChild(p1);
    comments.appendChild(p2);
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
function enableOverlay(){
    let overlay = document.getElementById("overlay");
    overlay.innerHTML = '';
    let overlay_section = document.createElement('div');
    overlay_section.id = 'overlay_section';
    let form = document.createElement('form');
    form.id = 'add_comment';
    let message_input = document.createElement('textarea');
    message_input.setAttribute('name','comment_message');
    message_input.classList.add('space');
    message_input.setAttribute('placeholder','please write your message here!');
    message_input.setAttribute('cols','50');
    message_input.setAttribute('rows','15');
    let submit_comment = document.createElement('input');
    submit_comment.setAttribute('type','submit');
    submit_comment.setAttribute('value','SUBMIT');
    submit_comment.classList.add('space');
    form.appendChild(message_input);
    form.appendChild(submit_comment);
    overlay_section.appendChild(form);
    overlay.appendChild(overlay_section);
    overlay.classList.add('overlay');
    form.addEventListener('submit', async function (e) {
        disableOverlay();
        enableLoader();
        e.preventDefault();
        let user_phone_number_input = document.createElement('input');
        user_phone_number_input.setAttribute('type','text');
        user_phone_number_input.setAttribute('name','user_phone_number');
        user_phone_number_input.setAttribute('value',JSON.parse(window.localStorage.getItem('user_phone_number')));
        let time_input = document.createElement('input');
        time_input.setAttribute('type','text');
        time_input.setAttribute('name','comment_time');
        time_input.setAttribute('value',new Date());
        let user_first_name = document.createElement('input');
        user_first_name.setAttribute('type','text');
        user_first_name.setAttribute('name','user_first_name');
        user_first_name.setAttribute('value',JSON.parse(window.localStorage.getItem('user_first_name')));
        
        let user_last_name = document.createElement('input');
        user_last_name.setAttribute('type','text');
        user_last_name.setAttribute('name','user_last_name');
        user_last_name.setAttribute('value',JSON.parse(window.localStorage.getItem('user_last_name')));
        
        this.appendChild(time_input);
        this.appendChild(user_first_name);
        this.appendChild(user_last_name);
        this.appendChild(user_phone_number_input);
        const formData = new FormData(this);
        fetch('http://localhost:8383/Afalagi/api/Comment/add.php', {
            method: 'POST',
            body: formData
        }).then(function(response){
            return response.text();
        }).then(function(text){
           checkAddComment(JSON.parse(text));
        });
    });

}
function checkAddComment(data) {
     if(data.status){
         disableLoader();
        alert('Comment added successfully');
         
        location.reload();
}
    else{
        disableLoader();
        alert('Something goes wrong');
        location.reload();
    }
}

function addComment() {
    enableOverlay();
}
function logout() {
    window.localStorage.removeItem('user_phone_number');
    window.localStorage.removeItem('user_first_name');
    window.localStorage.removeItem('user_last_name');
    window.localStorage.removeItem('user_town');
    window.location.href = "http://localhost:8383/Afalagi/FrontEnd/index.html";
    // Simulate an HTTP redirect:
    window.location.replace("http://localhost:8383/Afalagi/FrontEnd/index.html");
}
