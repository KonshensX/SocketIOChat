$(function(){
  var socket = io.connect();
  var $messageForm = $("#messageForm");
  var $message = $("#message");
  var $chat = $("#chat");
  var $messagingArea = $("#messagingArea");

  var $usernameArea = $("#usernameArea");
  var $username = $("#username");
  var $users = $("#users");
  var $change = $(".text-change");

  $username.focus();


  $usernameArea.submit(function(e){
    e.preventDefault();
    $usernameArea.hide();
    $messagingArea.show();
    socket.emit('user joined', $username.val());
  });

  $messageForm.submit(function(e){
    e.preventDefault();
    if(!($message.val() == "")) {
      socket.emit('send message', $message.val());
      $message.val('');
      $message.focus();
    }
  });

  socket.on('new message', function(data) {
    $chat.append('<span class="username">'+data.username+': </span>'+'<span class="">'+data.msg+'</span><br>')
  });

  socket.on('new user', function(data){
    console.log(data.users.length);
    for(var i=0; i < data.users.length; i++) {

      htmlContent = '<li class="list-group-item">'+data.users[i]+'</li>'
      $("#users").append(htmlContent);
    }
    console.log("New user join the conversation: ", data.users[data.users.length - 1]);
  });
});
