var net = require('net');
var zlib = require('zlib');
//var gzip = zlib.createGzip();
var inflate = new zlib.Inflate();
var os = require('os');

//var HOST = '127.0.0.1';
//var PORT = 6970;

var HOST = '198.50.245.94';
var PORT = 7455;

var clientListen = new Array();
var clientListenCom;

var clientMic = new Array();
var clientMicCom;

var bytesReceived = 0;
var bytesSent = 0;


net.createServer(function(sock) {

    console.log('CONNECTED: ' + sock.remoteAddress +':'+ sock.remotePort);
        //        console.log('Total Mem: '+os.totalmem());
        //        console.log('Free Mem: '+ os.freemem());

    sock.on('data', function(data) {
	//	console.log('Total Mem: '+os.totalmem());
        //        console.log('Free Mem: '+ os.freemem());

		bytesReceived += data.length;
	//	console.log("Received: "+ (bytesReceived/1000000) + "MB");

       try{
			var parsed = JSON.parse(data);


			if(parsed.type == "id"){
				id = parseInt(parsed.msg);

				if(id == 4477){
				//	console.log("Mic Client Connected");
					clientMic = sock;
				} else if(id == 44771){
				//	console.log('Mic Client Communication Connected');
					clientMicCom = sock;
				}

				if(id == 5862){
				//	console.log("Listen Client Connected");
					clientListen = sock;
					clientMic.pipe(clientListen);
				} else if(id == 58621){
				//	console.log('Listen Client Communication Connected');
					clientListenCom = sock;
				}
			}

			if(sock == clientListenCom){
				if(parsed.type == "server"){
					if(parsed.msg == 'mem'){
						var zeeObject = new Object();
                                		zeeObject.type = "server";
						zeeObject.msg = ('Free Mem: '+ os.freemem());
						clientListenCom.write(JSON.stringify(zeeObject));
					}
				}
			}

			if(sock == clientListenCom){
				if(parsed.type == "mic"){
					var zeeObject = new Object();
					zeeObject.type = "mic";

					if(parsed.msg == 'on'){
						zeeObject.msg = "on";
				//		console.log("mic on");
					}else if(parsed.msg == 'off'){
						zeeObject.msg = "off";
				//		console.log("mic off");
					}
					clientMicCom.write(JSON.stringify(zeeObject));
				}
			}

		}catch(e){
			//console.log(e);
		}
    });

    sock.on('close', function(data) {
    //    console.log('CLOSED: ' + sock.remoteAddress +' '+ sock.remotePort);
    });
	sock.on('error', function(err){
		console.log(err);
	});

}).listen(PORT, HOST);


//console.log('Main Server listening on ' + HOST +':'+ PORT);
