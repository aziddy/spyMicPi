var mic = require('mic');
var fs = require('fs');
var net = require('net');

var HOST = '198.50.245.94';
var PORT = 7455;

//var HOST = '127.0.0.1';
//var PORT = 6970;


var micInstance = mic({ 'rate': '16000', 'channels': '1'});
var micInputStream = micInstance.getAudioStream();


micInputStream.on('data', function(data) {
//    console.log("Recieved Input Stream: " + data.length);
});

micInputStream.on('error', function(err) {
//    cosole.log("Error in Input Stream: " + err);
});

micInputStream.on('startComplete', function() {
        console.log("Got SIGNAL startComplete");
    });

micInputStream.on('stopComplete', function() {
        console.log("Got SIGNAL stopComplete");
    });

micInputStream.on('pauseComplete', function() {
        console.log("Got SIGNAL pauseComplete");
    });

micInputStream.on('resumeComplete', function() {
        console.log("Got SIGNAL resumeComplete");
    });

micInputStream.on('silence', function() {
        console.log("Got SIGNAL silence");
    });

micInputStream.on('processExitComplete', function() {
        console.log("Got SIGNAL processExitComplete");
    });

micInstance.start();

var micOn = true;


var clientCOM = new net.Socket();

clientCOM.connect(PORT, HOST, function() {

    console.log('COM CONNECTED TO: ' + HOST + ':' + PORT);
        var theObject = new Object();
        theObject.type = "id";
        theObject.msg = "44771";
        clientCOM.write(JSON.stringify(theObject));

});

clientCOM.on('data', function(data) {
       try{
                        var parsed = JSON.parse(data);  

                        if(parsed.type == "mic"){
                                zeeMSG = parsed.msg;

                                if(zeeMSG == 'on'){
                                        console.log("Mic On");
					micInstance.resume();
                                } else if(zeeMSG == 'off'){
                                        console.log('Mic Off');
					micInstance.pause();
                                }

                        }

                }catch(e){
                        //console.log(e);
                } 
});

clientCOM.on('error', function(error) {
    console.log(error);

});




var client = new net.Socket();

client.connect(PORT, HOST, function() {

    console.log('CONNECTED TO: ' + HOST + ':' + PORT);
	var theObject = new Object();
	theObject.type = "id";
	theObject.msg = "4477"; // PI
	client.write(JSON.stringify(theObject));
	micInputStream.pipe(client);
});


// Add a 'data' event handler for the client socket
// data is what the server sent to this socket
client.on('data', function(data) {
	//console.log('DATA: ' + data);
});

client.on('error', function(error) {
    console.log(error);

    // Close the client socket completely
    // client.destroy();
	
});

	
// Add a 'close' event handler for the client socket
client.on('close', function() {
    console.log('Connection closed');
});


