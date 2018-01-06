var mic = require('mic');
var fs = require('fs');
var net = require('net');
var Speaker = require('speaker');

var HOST = '127.0.0.1';
var PORT = 6970;
 
// Create the Speaker instance 
var speaker = new Speaker({
  channels: 1,          // 2 channels 
  bitDepth: 16,         // 16-bit samples 
  sampleRate: 16000     // 44,100 Hz sample rate 
});
 
 
var micInstance = mic({ 'rate': '16000', 'channels': '1', 'debug': true, 'exitOnSilence': 6 });
var micInputStream = micInstance.getAudioStream();
  
//micInputStream.pipe(speaker);
 
micInputStream.on('data', function(data) {
    console.log("Recieved Input Stream: " + data.length);
});
 
micInputStream.on('error', function(err) {
    cosole.log("Error in Input Stream: " + err);
});
 
micInputStream.on('startComplete', function() {
        console.log("Got SIGNAL startComplete");
       /* setTimeout(function() {
                micInstance.pause();
            }, 5000);*/
    });
    
micInputStream.on('stopComplete', function() {
        console.log("Got SIGNAL stopComplete");
    });
    
micInputStream.on('pauseComplete', function() {
        console.log("Got SIGNAL pauseComplete");
        setTimeout(function() {
                micInstance.resume();
            }, 5000);
    });
 
micInputStream.on('resumeComplete', function() {
        console.log("Got SIGNAL resumeComplete");
        setTimeout(function() {
                micInstance.stop();
            }, 5000);
    });
 
micInputStream.on('silence', function() {
        console.log("Got SIGNAL silence");
    });
 
micInputStream.on('processExitComplete', function() {
        console.log("Got SIGNAL processExitComplete");
    });
 
micInstance.start();


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

