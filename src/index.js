import StatusJS from 'status-js-api';
import Murmur from 'murmur-client';

let server = new Murmur({
  protocols: ["libp2p"],
  // signalServer: { host: '104.248.64.24', port: '9090', protocol: 'ws' },
  signalServers: [
    //"/dns4/cryptolife.status.im/tcp/443/wss/p2p-webrtc-star"
    "/dns4/web-bridge.status.im/tcp/443/wss/p2p-webrtc-star"
  ],
  bootnodes: []
});
server.start();

const status = new StatusJS();
status.connectToProvider(server.provider, null);

console.dir("hello world!")
