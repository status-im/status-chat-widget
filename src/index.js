import StatusJS from 'status-js-api';
import Murmur from 'murmur-client';

window.StatusWidget = function (channelName) {
  var channelTitle = document.createElement('h3');
  channelTitle.innerHTML = "#" + channelName;

  var chatBox = document.createElement('div');
  chatBox.id = "chat";

  var chatInput = document.createElement('input');
  chatInput.type = "input";
  chatInput.id = "post";
  chatInput.placeholder = "Type a message..";

  document.querySelectorAll("#status-chat-widget")[0].append(channelTitle);
  document.querySelectorAll("#status-chat-widget")[0].append(chatBox);
  document.querySelectorAll("#status-chat-widget")[0].append(chatInput);

  let server = new Murmur({
    protocols: ["libp2p"],
    signalServers: [
      "/dns4/web-bridge.status.im/tcp/443/wss/p2p-webrtc-star"
    ],
    bootnodes: []
  });
  server.start();

  const status = new StatusJS();
  status.connectToProvider(server.provider, null);

  var lastMessageUser = "";

  status.joinChat(channelName, () => {
    status.onMessage(channelName, (err, data) => {
      const msg = JSON.parse(data.payload)[1][0];

      const message = { username: data.username, message: msg, pubkey: data.data.sig, data };
      let div = document.createElement('div');
      if (lastMessageUser === message.username) {
        div.innerHTML = "<span class='message'>" + message.message + "</span>";
      } else {
        div.innerHTML = "<span class='username'>" + message.username + "</span><span class='message'>" + message.message + "</span>";
      }
      document.querySelectorAll("#chat")[0].append(div);
      lastMessageUser = message.username;

      var element = document.getElementById("chat");
      element.scrollTop = element.scrollHeight;
    });

    var input = document.getElementById("post")

    input.addEventListener("keyup", function(event) {
      if (event.keyCode !== 13) {
        return
      }

      event.preventDefault();

      var value = document.getElementById("post").value;
      status.sendMessage(channelName, value);
      document.getElementById("post").value = "";
    });
  })
}
