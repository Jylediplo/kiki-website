const WebSocket =  require('ws');

const ws = new WebSocket('wss://eu1-layer.doofinder.com/layer/1/websocket?hashid=48cd202b256bd56bf22f2e53ec34a91a&origin=www.dca-france.com&zone=eu1&installation_id=24dda2f3-4766-42fc-b086-15f50c3f5ef9&language=fr&currency=EUR&session_id=621bdb07e9b148499496d242c85c00f0&session_alive=true&user_id=ed8a5616-8d07-455a-b1d6-b7439c2334bd&latest_searches%5B0%5D=BLP&voice_supported=true&&ga_client_id=1219251309.1722783093&layer_type=search&state=%2324dd%2Ffullscreen%2Fm%3D&query=BLP&vsn=2.0.0');

ws.on('error', console.error);

ws.on('open', function open() {
    console.log('open');
  ws.send(["5","11","lv:df-s0o1l508r0ab3y5fmxpoalxf9r4uhu74","event",{"type":"hook","event":"change-back-to-top-visibility","value":{"visible":false}}]);
});

ws.on('message', function message(data) {
  console.log('received: %s', data);
});