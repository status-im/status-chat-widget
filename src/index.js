import StatusJS from 'status-js-api';
import Murmur from 'murmur-client';

window.StatusWidget = function (channelName) {
  var chatBox = document.createElement('div');
  chatBox.id = "chat";

  var chatInput = document.createElement('input');
  chatInput.type = "input";
  chatInput.id = "post";

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

  status.joinChat(channelName, () => {
    status.onMessage(channelName, (err, data) => {
      const msg = JSON.parse(data.payload)[1][0];

      const message = { username: data.username, message: msg, pubkey: data.data.sig, data };
      let div = document.createElement('div');
      div.innerHTML = message.username + "> " + message.message;
      document.querySelectorAll("#chat")[0].append(div)
    })

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
