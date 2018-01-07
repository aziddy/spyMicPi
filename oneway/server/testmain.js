var net = require('net');
var zlib = require('zlib');
//var gzip = zlib.createGzip();
var inflate = new zlib.Inflate();

//var HOST = '127.0.0.1';
//var PORT = 6970;

var HOST = '198.50.245.94';
var PORT = 7455;

var clientListen = new Array();
var clientMic = new Array();

var bytesReceived = 0;
var bytesSent = 0;


net.createServer(function(sock) {

    console.log('CONNECTED: ' + sock.remoteAddress +':'+ sock.remotePort);
    
    sock.on('data', function(data) {
        
		bytesReceived += data.length;
		console.log("Received: "+ (bytesReceived/1000000) + "MB");

       try{
			var parsed = JSON.parse(data);	

			if(parsed.type == "id"){
				id = parseInt(parsed.msg);
				//connectedUsers.push([id,sock]);
				//console.log(connectedUsers);
				
				
				if(id == 4477){
					console.log("Mic Client Connected");
					clientMic = sock;
					
					/*for(var x = 0; x < connectedUsers.length; x++){
						if(connectedUsers[x][0] == 9911){
							sock.pipe(connectedUsers[x][1]);
						}
					}*/
				}
				if(id == 5862){
					console.log("Listen Client Connected");
					clientListen = sock;
					clientMic.pipe(clientListen);
				} 
			}
			
		}catch(e){
			//console.log(e);
		} 
		
    });

    sock.on('close', function(data) {
        console.log('CLOSED: ' + sock.remoteAddress +' '+ sock.remotePort);
    });
    
}).listen(PORT, HOST);


console.log('Main Server listening on ' + HOST +':'+ PORT);
