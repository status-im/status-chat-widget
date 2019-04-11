import StatusJS from 'status-js-api';
import Murmur from 'murmur-client';
import Identicon from 'identicon.js';

window.StatusWidget = function (channelName, chatWidget) {
  if (!channelName) { throw new Error("no channelName provider"); }
  if (!chatWidget) { throw new Error("no DOM element for chat"); }

  var channelTitle = document.createElement('h3');
  channelTitle.innerHTML = "#" + channelName;

  var chatBox = document.createElement('div');
  chatBox.className = "chat";

  var chatInput = document.createElement('input');
  chatInput.type = "input";
  chatInput.className = "post";
  chatInput.placeholder = "Type a message..";

  chatWidget.className += " _status-chat-widget";
  chatWidget.append(channelTitle);
  chatWidget.append(chatBox);
  chatWidget.append(chatInput);

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
      if (err || !data) {
        console.dir("error receiving message");
        console.dir(err);
        return;
      }
      const msg = JSON.parse(data.payload)[1][0];

      const message = { username: data.username, message: msg, pubkey: data.data.sig, data };

      const options = {
          background: [255, 255, 255, 255],
          margin: 0.24,
          size: 32,
          format: 'svg'
        };
  
      const identicon = new Identicon(message.pubkey, options).toString();

      let div = document.createElement('div');
      if (lastMessageUser === message.username) {
        div.innerHTML = "<span class='message'>" + message.message + "</span>";
      } else {
        div.innerHTML = "<img class='identicon' width=40 height=40 src='data:image/svg+xml;base64," + identicon + "' /><span class='username'>" + message.username + "</span><span class='message'>" + message.message + "</span>";
      }
      chatBox.append(div);
      lastMessageUser = message.username;

      chatBox.scrollTop = chatBox.scrollHeight;
    });

    chatInput.addEventListener("keyup", function(event) {
      if (event.keyCode !== 13) {
        return
      }

      event.preventDefault();

      var value = chatInput.value;
      status.sendMessage(channelName, value);
      chatInput.value = "";
    });
  })
}
